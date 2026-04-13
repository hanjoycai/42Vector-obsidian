---
title: "Anthropic 官方 Harness 发布：全面解读 Managed Agents"
tags:
  - "Agent"
description: "Anthropic 把 Harness 做成了可托管的 Agent 基础设施"
source: "https://mp.weixin.qq.com/s?__biz=MzkzNDQxOTU2MQ==&mid=2247515269&idx=1&sn=78628a460406eb387510e040e7ff7108&chksm=c3b531c68825c2750f0385ae1f1b26634198a1b0a93023063e4d0987c6f6891ef40e0ec70edb&mpshare=1&scene=1&srcid=0409aYVNwn0ZQng7l634J1H3&sharer_shareinfo=3855f41c1fcc8fc8f9ba608f9657c97c&sharer_shareinfo_first=3855f41c1fcc8fc8f9ba608f9657c97c"
---
原创 金色传说大聪明 *2026年4月9日 10:15*

API Product

今天，Anthropic 发布了 **Claude Managed Agents**

这是一套可组合的 API，用于构建和部署云托管的 AI Agent。但跟市面上的 Agent 框架不同，Anthropic 卖的核心是 **Harness（Agent 编排引擎）** ：一个经过调优的编排循环，自动处理工具调用决策、上下文管理、错误恢复，并且随模型能力升级自动演进

![image.png](https://42notion.oss-cn-shenzhen.aliyuncs.com/book/20260413201724272.png)


Claude Managed Agents 架构，来自官方产品博客

之前 Anthropic 的产品线有一个明显的断层。面向消费者有 claude.ai 和 Claude Code，面向开发者有 Messages API。但如果一家企业想基于 Claude 做一个长时间运行的、能自主调用工具的 Agent，它需要自己搭沙箱、做状态管理、处理权限、写错误恢复逻辑。这些基础设施工作可能比 Agent 本身的业务逻辑还重

Managed Agents 填的就是这个空。你定义 Agent 的任务、工具和约束，Anthropic 负责跑

## 它能做什么

### 生产级沙箱

每个 Agent 跑在一个安全的云容器里，可以预装 Python、Node.js、Go 等环境，配置网络访问规则，挂载文件。Agent 在容器里执行代码、编辑文件、跑命令，都在隔离环境中

### 长时间运行的 Session

Agent 可以自主运行几个小时，断连了会恢复，进度和产出持久化。这解决了「Agent 跑到一半挂了怎么办」的问题

### 内置编排 Harness

Anthropic 提供了一个经过调优的 Agent Harness，自动处理工具调用决策、上下文管理和错误恢复。内置 prompt caching、compaction 等性能优化

### 多 Agent 协调

研究预览阶段。一个 Agent 可以启动其他 Agent，分配子任务并行处理

### 自评估能力

研究预览阶段。你定义成功标准，Claude 自己迭代直到达标。在内部测试中，结构化文件生成任务的成功率比标准 prompting 方式提高了最多 **10 个百分点** ，提升在难题上最明显

### 治理工具

Scoped permissions（作用域权限）、身份管理、执行追踪。Session tracing 和集成分析直接内置在 Claude Console 里，可以检查每一个工具调用、决策点和失败模式

定义 Agent 可以用自然语言描述，也可以用 YAML 文件。支持 MCP 服务器和 Agent Skills

## Harness 怎么做的：把大脑和手分开

这是这次发布中技术含量最高的部分。Anthropic 同时发了一篇工程博客，标题是「Scaling Managed Agents: Decoupling the brain from the hands」，详细讲了 Harness 的架构设计

Harness 编码的是模型做不到什么的假设，这些假设会过时

一个具体例子：Sonnet 4.5 在接近上下文限制时会提前收工（他们叫「context anxiety」），Anthropic 在 Harness 里加了上下文重置来应对。但换到 Opus 4.5 之后，这个行为消失了，重置变成了多余的负担

所以 Managed Agents 的设计目标是： **为「尚未想到的程序」设计系统** 。这个思路借鉴了操作系统的做法。操作系统通过虚拟化硬件（进程、文件）来支持还不存在的程序。抽象比硬件活得久

### 三层虚拟化

Managed Agents 把 Agent 的组成部分虚拟化成三个接口：

**Session（会话）** ：所有事件的追加写入日志，持久存储在 Harness 之外

**Harness（编排循环）** ：调用 Claude、把 Claude 的工具调用路由到对应基础设施的循环

**Sandbox（执行环境）** ：Claude 可以在里面跑代码和编辑文件的容器

三者解耦，互不依赖。任何一个出故障或需要替换，都不影响其他两个
![image.png](https://42notion.oss-cn-shenzhen.aliyuncs.com/book/20260413201713924.png)


大脑与双手解耦的架构

### 从宠物到牲畜

最初的设计把所有组件放在一个容器里。好处是文件操作是直接系统调用，没有服务边界。但坏处是：容器变成了一只「宠物」。宠物坏了你得救它，牲畜坏了换一头就行

耦合 vs 解耦：从宠物到牲畜

解耦之后，容器变成了牲畜。Harness 通过 `execute(name, input) → string` 调用容器，就像调用其他工具一样。容器挂了，Harness 捕获错误传给 Claude，Claude 决定是否重试，重试就起一个新容器

Harness 也变成了牲畜。Session 日志在 Harness 之外，Harness 崩溃了什么都不丢。新的 Harness 通过 `wake(sessionId)` 启动，从上次停下的地方继续

安全边界也因此变干净了。耦合设计里，Claude 生成的不可信代码跟凭证在同一个容器里。解耦后，凭证永远不在沙箱里。Git 令牌在初始化时写入本地 remote，Agent 不经手。OAuth 令牌存在安全保管库里，通过代理调用

### Session 不是上下文窗口

长任务经常超出 Claude 的上下文窗口。压缩、裁剪、总结都是不可逆操作，可能丢掉后面用得上的信息

Session 与上下文窗口的关系

Managed Agents 的做法是：Session 作为一个独立的、持久化的上下文对象存在于上下文窗口之外。Harness 通过 `getEvents()` 按需取回事件流的切片，可以回到特定时刻之前重读上下文

### 多个大脑，多双手

解耦带来了扩展能力。之前 Harness 在容器里，每个 Agent 会话都要等容器起好才能开始推理。解耦后，推理可以在容器起好之前就开始。 **p50 TTFT 下降了约 60%，p95 下降了超过 90%**

多大脑多双手

每双手就是一个工具调用： `execute(name, input) → string` 。Harness 不知道沙箱是容器、手机还是 Pokémon 模拟器。因为手不绑定大脑，大脑之间可以互相传递手

Anthropic 工程博客把这个架构叫「meta-harness」：不对具体的 Harness 实现做假设，只对 Claude 需要的接口形状做假设

## 谁在用

我们希望 Notion 成为团队与 Agent 协作、把事情做完的最佳场所。Claude Managed Agents 能处理长时间运行的 Session、管理记忆、持续输出高质量结果

Eric Liu，Notion 产品经理

**Rakuten** 在产品、销售、营销、财务、HR 部门都部署了 Agent，接入 Slack 和 Teams。每个专项 Agent 一周内部署完成

**Asana** 做了 AI Teammates，在项目管理流程中跟人类协作。团队表示用 Managed Agents「显著加速了高级功能的开发」

**Sentry** 把 Seer 调试 Agent 跟 Claude Agent 配对，后者负责写补丁和开 PR。集成在几周内完成，而非原来预估的几个月

**Atlassian** 把 Agent 直接构建到 Jira 工作流里，用户可以在 Jira 中直接分配任务给 Agent

## 定价

标准的 Claude Platform token 费率，加上每个 Session 的活跃运行时间 **$0.08/小时** （按毫秒计量）。Agent 等待用户输入或等待工具返回的空闲时间不计费。Agent 做 web 搜索额外收 **$10/千次搜索**

## 几个信号

第一，Anthropic 的产品形态在这一步发生了质变。之前它卖的是模型（API token），现在它卖的是运行 Agent 的基础设施（容器、Session、Harness、权限管理）。从「模型提供商」到「Agent 基础设施提供商」，这是一个根本性的定位转移

第二，Harness 的 meta-harness 设计思路值得注意。Anthropic 没有把某一个具体的 Harness 实现写死，而是虚拟化了 Harness 的接口。这跟操作系统的设计哲学一致：接口比实现活得久

第三，时间线。4 月 4 日封杀 OpenClaw 订阅通道，4 月 7 日发布 Mythos，4 月 8 日发布 Managed Agents。三天三个动作：收紧第三方 Agent 的薅羊毛通道，展示最强模型能力，推出自己的 Agent 基础设施平台。商业闭环形成

$0.08/session-hour 意味着 Anthropic 开始在 token 之外赚钱了

Token 收入跟模型使用量挂钩，session-hour 收入跟 Agent 运行时长挂钩。后者是一个更稳定、更可预测的收入流

参考材料

Claude Managed Agents 产品公告  
`https://claude.com/blog/claude-managed-agents`

Anthropic 工程博客：Scaling Managed Agents  
`https://www.anthropic.com/engineering/managed-agents`

Claude Managed Agents API 文档  
`https://platform.claude.com/docs/en/managed-agents/overview`