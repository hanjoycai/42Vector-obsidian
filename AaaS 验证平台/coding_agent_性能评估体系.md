# 自研推理集群 Coding Agent 性能评估体系

## 目录

- [0. 文档使用说明](#0-文档使用说明)
- [1. 项目信息(填充区)](#1-项目信息填充区)
- [2. 术语表](#2-术语表)
- [3. 评测目标与设计原则](#3-评测目标与设计原则)
- [4. 评测框架总览](#4-评测框架总览)
- [5. 场景分类与任务清单](#5-场景分类与任务清单) · *含 §5.7.4 Terminal-Bench 独立定位(v1.1)*
- [6. 测试 Case 定义模板(设计态)](#6-测试-case-定义模板设计态)
- [7. 指标体系](#7-指标体系) · **含 §7.5 正确性判据与 Parity 三层设计(v1.1)🆕**
- [8. Trace / Metrics Schema(运行态)](#8-trace--metrics-schema运行态)
- [9. 负载设计](#9-负载设计) · **含 §9.6 并发语义澄清 A/B/C(v1.1)🆕**
- [10. 硬件测试策略(单机 / 多卡 / 集群)](#10-硬件测试策略单机--多卡--集群)
- [11. SLO 定义](#11-slo-定义)
- [12. 对比基线与跨芯片对标](#12-对比基线与跨芯片对标)
- [13. 评测执行流程](#13-评测执行流程)
- [14. 失败定义与排除规则](#14-失败定义与排除规则)
- [15. 报告产出物](#15-报告产出物) · **含 §15.4 可还原性四层与跨集群交付(v1.1)🆕**
- [16. 可观测平台落地](#16-可观测平台落地)
- [17. 常见陷阱与坑位清单](#17-常见陷阱与坑位清单) · *新增陷阱 21–25(v1.1)*
- [18. 附录 A — 关键参考资料](#18-附录-a--关键参考资料)
- [19. 附录 B — 启动自检 Checklist](#19-附录-b--启动自检-checklist) · *新增 §B.4 跨集群交付(v1.1)*
- [20. 变更记录](#20-变更记录)

---

## 0. 文档使用说明

本文档是一份**可复用的评测体系模板**,而非一次性报告。使用方式:

1. **长期维护**:`§0–5、§7–10、§13–19` 为**稳定骨架**,非必要不动;新增 benchmark、新增指标、新增硬件类型在对应章节追加即可。
2. **启动一次评测**:复制本文档 → 填充 `§1` 项目信息 → 按业务调整 `§5.6` 场景权重、`§11` SLO 档位、`§14` 失败定义 → 按 `§13` 执行。
3. **交付一份报告**:以本文档的填充版为"方案",另行产出 `§15` 定义的 7 项交付物。

### 标记约定

| 标记 | 含义 |
|---|---|
| ⚠ **强制要求** | 不可协商项,缺失即评测无效 |
| ▶ **实操建议** | 建议但非强制,可按业务裁剪 |
| 🆕 | 本次合并版新增(相对原两份文档) |
| `<...>` | 项目启动时需要填充的占位符 |

### 核心原则速记

> **快是锦上添花,对是立身之本。**
> Parity 零容忍,分布优于均值,基线不可省略,Ceteris Paribus(其他条件相同)。

---

## 1. 项目信息(填充区)

| 字段 | 内容 |
|------|------|
| 评测项目名称 | `<例:自研芯片 v1.3 Coding Agent 综合评测>` |
| 评测目标模型 | `<例:Qwen3-32B-Instruct>` |
| 模型权重 hash | `<checkpoint sha256,必填以保证跨芯片可比>` |
| 被测系统(DUT) | `<例:2× 自研服务器,每台 8× 自研 NPU v1.3>` |
| 参考系统(Reference) | `<例:2× H100 服务器,每台 8× H100-80GB + vLLM>` |
| 推理引擎(DUT) | `<例:自研 Inference Engine v0.9>` |
| 推理引擎(Reference) | `<例:vLLM 0.9.x / SGLang / TensorRT-LLM>` |
| Agent 脚手架 | `<例:OpenHands v0.30 / SWE-agent v1.0 / Aider v0.60>` |
| 量化方案 | `<例:FP8(DUT 与 Reference 对齐)>` |
| 评测窗口 | `<例:2026-05-01 ~ 2026-05-31>` |
| 评测负责人 | `<PM 姓名>` |
| 报告交付节奏 | `<例:每周五出周报,结束时出终版报告 + leadership dashboard>` |

---

## 2. 术语表

| 术语 | 英文全称 | 含义 |
|------|---------|------|
| TTFT | Time To First Token | 请求发出到收到第一个非空 token 的延迟 |
| TPOT | Time Per Output Token | 除首 token 外,平均每个输出 token 的生成时间(**排除 TTFT**) |
| ITL | Inter-Token Latency | 相邻两个 token 的间隔(逐 token 测量) |
| E2EL | End-to-End Latency | 单请求端到端延迟 |
| ISL | Input Sequence Length | 输入 token 长度 |
| OSL | Output Sequence Length | 输出 token 长度 |
| RPS | Requests Per Second | 每秒成功请求数 |
| TPS | Tokens Per Second | 每秒输出(或总)token 数 |
| Goodput | — | **同时满足 SLO 约束**下的有效吞吐 |
| SLO | Service Level Objective | 服务级目标(如 P95 TTFT ≤ 500ms) |
| Resolved Rate | — | SWE-bench 解决率(主指标) |
| Pass@k | — | 采样 k 次至少一次通过单元测试的概率 |
| **Grader** | 评分器 | 单 Case 的 Pass/Fail 判据(跑测试脚本 / 验证器 / F2P+P2P 等) |
| **Parity** | — | DUT 与参考系统输出的一致性(**分多层**,见 §7.5) |
| **Outcome Parity** | — | DUT 与 Reference 在同一 Case 集合上 Resolved 结果的一致率(混淆矩阵对角线占比) |
| **First Token Agreement** | — | 同 prompt 贪心解码下,DUT 与 Reference 前 N 个 token 的一致比例 |
| **Trajectory** | 执行轨迹 | Agent 的完整执行链:每轮 prompt / response / tool call / 状态转移 |
| **Reproducibility Pack** | — | 将环境 + 输入 + 参照结果打包,供他方(如客户集群)复现的交付物(§15.4) |
| DUT | Device Under Test | 被测系统(本项目 = 自研芯片集群) |
| F2P / P2P | Fail-to-Pass / Pass-to-Pass | SWE-bench 两类测试:修复测试 / 回归保护测试 |
| Knee Point | — | 延迟随并发指数上升的拐点 |
| Roofline | — | 硬件理论峰值曲线,用于判断实际利用率 |
| AI | Arithmetic Intensity | 计算强度(FLOPs / byte),决定算力 or 带宽瓶颈 |
| DP / TP / PP / EP | Data / Tensor / Pipeline / Expert Parallel | 四类并行策略 |

> TTFT、TPOT、ITL、E2EL、RPS、TPS、Goodput 的定义取自 MLPerf Inference、NVIDIA GenAI-Perf、vLLM、AnyScale 的最小公约数。跨工具比较时注意 **LLMPerf 的 TPOT 含 TTFT**,与其他工具不一致。

---

## 3. 评测目标与设计原则

### 3.1 评测总目标

以 Coding Agent 真实工作负载为输入,在自研芯片集群上**同时**测量:

1. **性能**(latency / throughput / Goodput / 利用率 / 能效)是否达到 SLO 与业务预期;
2. **正确性**(Pass@1 / Resolved Rate / Parity)是否与参考硬件(H100 等)保持一致;
3. **稳定性与可靠性**(长时间、长上下文、高并发下是否退化或异常);
4. **扩展性**(单机单卡 → 多卡 → 多节点 的扩展效率)。

### 3.2 设计原则

| # | 原则 | 含义 |
|---|------|------|
| 1 | **双轨不可偏废** | 性能与正确性必须联合汇报;"很快但错"比"慢"更危险 |
| 2 | **严格可复现** | 环境版本、数据集版本、seed、参数、prompt hash 全部存档 |
| 3 | **分布优于均值** | 所有延迟/吞吐必须报告 P50/P90/P99,禁止只报 mean |
| 4 | **分层对比** | 硬件基线 + 软件基线 + 历史基线,三层同时对比 |
| 5 | **防数据污染** | 公开 benchmark 搭配时间滚动集(LiveCodeBench)或私有 holdout |
| 6 | **整体归因** | Agent 结果 = 模型 + 脚手架 + 工具集三者共同作用,分数必须和 scaffold 绑定 |
| 7 | **Ceteris Paribus** | 跨硬件对比时,**芯片之外**所有变量必须对齐(§12.2) |
| 8 | **分阶段测量** | Prefill(算力瓶颈)与 Decode(带宽瓶颈)分开测,混测误导芯片设计 |
| 9 | **Outcome 优于 Token** | 单 Case 的 Pass 判据用 Grader 看最终结果,不要求 token 级一致;token 级一致做不到也没意义(§7.5) |
| 10 | **可还原性分层** | 环境/输入 bit-exact,轨迹完整记录但不强求一致,最终结果要求统计可复现(§15.4) |

---

## 4. 评测框架总览

本方案用**两个正交的三层模型**来组织评测。

### 4.1 能力评测分层(按任务粒度)

| 层 | 粒度 | ISL | OSL | Agent 轮次 | 工具调用 | 单题预算 | 样本数 | 主性能指标 | 质量指标 |
|---|---|---|---|---|---|---|---|---|---|
| **L1 · 函数级** | 单函数/单文件 | 100 – 1.5K | 50 – 500 | 1 轮 | ≤ 2 | ≤ 10s, ≤ 5K tok | 500 – 1,000 | **TTFT P50/P90/P99** | Pass@1 |
| **L2 · 仓库级** | 跨文件 patch(30-150 行,1-5 文件) | 8K – 64K | 500 – 4K | 10 – 40 轮 | 20 – 100 | ≤ 10 min, ≤ 500K tok | 100 – 300 | **Goodput @ SLO**, TPOT P90 | Resolved Rate, Pass@3, P2P 通过率 |
| **L3 · 特性级** | 完整特性(200-1000 行,5-20 文件) | 64K – 256K+ | 5K – 30K | 50 – 200+ 轮 | 100 – 500 | ≤ 60 min, ≤ 2M tok | 30 – 80 | **长上下文 TTFT**, P99 TPOT, KV Hit | Resolved Rate, Spec Compliance |

> ⚠ **铁律**:每层必须跑**可验证的质量评测**(执行测试 / 功能验证),而非只看合成数据的 tok/s,否则性能数字失去产品意义。

### 4.2 性能评测视角(按硬件部署粒度)

| 视角 | 关心的问题 | 核心测量 | 对应章节 |
|---|---|---|---|
| **单机单卡** | 芯片本身能跑多快?极限在哪? | TTFT/TPOT 下限、显存带宽利用率、峰值功耗 | §10.2 |
| **单机多卡** | 并行策略选哪种?扩展效率多少? | DP/TP/PP 对比、弱/强扩展性、片间互联 | §10.3 |
| **多机集群** | 跨节点通信是否成为瓶颈? | 节点间 AllReduce、跨节点 PP、故障恢复 | §10.5 |
| **并发压力** | 生产可用并发上限在哪? | Latency-vs-Load、Goodput 拐点 | §10.4 |

### 4.3 业界 Benchmark 速查

**函数级(对应 L1)**

| Benchmark | 规模 | 特点 | 本方案定位 |
|---|---|---|---|
| HumanEval / HumanEval+ | 164 题 | 函数级 Python,EvalPlus 扩测试 80× 防假阳性 | 冒烟 + 对齐业内 |
| MBPP / MBPP+ | ~1000 题 | Python 基础编程 | 补充覆盖 |
| MultiPL-E | 164 × 18 | HumanEval 翻译到 18 种语言 | 多语言 |
| **LiveCodeBench** | 滚动 | 按时间收题防污染 | **反污染必备** |
| BigCodeBench | — | 调用真实库,贴近工程 | 工程性扩展 |
| Aider Polyglot (Exercism) | 225 | C++/Go/Java/JS/Python/Rust 编辑题 | 多语言 IDE-like |

**Agent 级(对应 L2 / L3)**

| Benchmark | 规模 | 特点 | 本方案定位 |
|---|---|---|---|
| **SWE-bench Verified** | 500 | OpenAI + 原作者人工筛选,事实标准;双测试集(F2P + P2P) | **L2 主打** |
| SWE-bench Pro (Scale AI) | 1865 | Python/JS/TS/Go;bug fix + feature + refactor;patch 均 107 行、4.1 文件;public / held-out / commercial 三分 | L2 扩展(反饱和) |
| SWE-PolyBench (AWS) | 2110 | Java/JS/TS/Python;bug fix + feature + refactor | L2 多语言 |
| SWE-Compass | — | 任务类型 × 场景 × 语言正交分类 | L2 场景设计参考 |
| Terminal-Bench | — | shell 环境真实任务,测 tool use + 规划 | L2 / L3 |
| τ-bench (Sierra) | — | 多轮、policy 文档、database 状态 | L2 多轮 |
| BFCL v4 (Berkeley) | — | 函数/工具调用事实标准;AST + 执行双评 | **工具调用主打** |
| FeatureBench / E2EDevBench / ProjDevBench | — | 完整特性实现 | **L3 主打** |

**推理性能(对应 §10 硬件侧)**

| Harness | 特点 | 本方案定位 |
|---|---|---|
| **MLPerf Inference (LLM track)** | 当前硬件评测黄金标准;v5.1 定义了 server/offline/interactive/edge 四类场景 | SLO 档位参考(§11) |
| **vLLM `bench serve`** | 开源事实标准;支持 sharegpt/burstgpt/sonnet/random,支持泊松到达、Goodput、百分位 | 性能压测主工具 |
| **NVIDIA GenAI-Perf** | 多 backend(Triton/TRT-LLM/vLLM/SGLang),滑动窗口剔除 warmup/cooldown | 多后端横评 |
| LLMPerf (AnyScale) | 并发/负载压测;⚠ TPOT 定义含 TTFT,跨工具对齐时必须标注 | 辅助参考 |
| GuideLLM (Neural Magic) | 新兴 harness | 备选 |

**MLPerf v5.1 interactive 档典型参考线**

| 模型 | TTFT P99 | TPOT P99 | 场景 |
|---|---|---|---|
| Llama 3.1-8B Interactive | ≤ 500 ms | ≤ 30 ms(≈1600 词/分钟) | **代码助手实时场景** |
| Llama 2-70B | ≤ 450 ms | ≤ 40 ms(≈25 tok/s) | 一般对话 |
| Llama 3.1-405B | ≤ 6 s | ≤ 175 ms | 大模型 |

---

## 5. 场景分类与任务清单

### 5.1 场景正交分类(借鉴 SWE-Compass)

```
场景 = 任务类型(Task Type) × 编程场景(Scenario) × 编程语言(Language) × 交互模式(Interaction Mode)
```

业界过去 benchmark 过度集中在 "Python bug fix" 上,本方案四维正交组织覆盖。

### 5.2 任务类型(Task Type)

| 类型 | 代表 Benchmark |
|---|---|
| 功能实现(Feature Implementation) | SWE-bench Pro, SWE-Compass, FeatureBench |
| 功能增强(Feature Enhancement) | SWE-bench Pro |
| Bug 修复(Bug Fixing) | SWE-bench Verified(主) |
| 重构(Refactoring) | SWE-PolyBench, SWE-Compass |
| 性能优化(Performance Optimization) | SWE-Compass |
| 测试生成(Test Generation) | TestGenEval |
| 代码理解(Code Understanding / QA) | CodeQA, Repo QA |
| 代码补全(Code Completion / FIM) | HumanEval-Infill, SantaCoder |
| 配置与部署(Config / DevOps) | SWE-Compass |
| 文档生成(Documentation) | CodeWiki |
| 迁移(Migration) | MultiPL-E 变体 |

### 5.3 编程场景(Programming Scenario)

应用开发 / 基础设施 / ML 系统 / 安全工程 / UI/UX / 数据库 / 算法。按业务优先级加权。

### 5.4 编程语言(Language)

至少覆盖:Python、JavaScript/TypeScript、Java、Go、C/C++、Rust、SQL、Shell。按业务优先级加权。

### 5.5 交互模式(Interaction Mode)

| 模式 | 负载特征 | 对硬件的主要压力 |
|------|---------|-------------------|
| **IDE 补全(Copilot 类)** | 短 ISL、短 OSL、高并发、流式 | **TTFT(极敏感)**、高 QPS |
| **单轮 Chat 改代码** | 中 ISL、中 OSL、中并发 | 平衡型 |
| **仓库级 Agent(SWE-bench 类)** | 超长 ISL(32K–100K+)、中 OSL | **长上下文 Prefill、KV 容量** |
| **多轮 Autonomous Agent** | 上下文不断累积、多 tool call | **KV 连续增长、JSON 格式稳定性、E2E 时长** |
| **CLI Agent(Terminal-Bench 类)** | 短请求高频率 | 低延迟、高 QPS |
| **批处理(Offline/重构整仓)** | 任意长度、高并发、非实时 | **总 Throughput、Goodput** |
| **超长补全(整文件/整应用)** | 短 ISL、超长 OSL | **Decode 持续性、KV 爆表边界** |

### 5.6 场景权重分配(项目启动时必填)

▶ **示例配置**(需按业务替换):

| 场景 | 权重 | 理由 |
|------|------|------|
| IDE 补全 | 30% | 业务量最大,SLA 最严 |
| 仓库级 Agent | 25% | 未来增长点 |
| 单轮 Chat | 20% | 当前主要付费场景 |
| 多轮 Autonomous Agent | 15% | 高价值客户 |
| CLI / 批处理 | 10% | 工具链集成 |

### 5.7 任务清单来源(L1 / L2 / L3)

#### 5.7.1 L1 · 函数级任务来源

| 子集 | 样本数 | 来源 | 用途 |
|---|---|---|---|
| L1-A | 164 | HumanEval | 业内对齐 |
| L1-B | 378 | MBPP | Python 基础编程 |
| L1-C | 225 | Aider Polyglot(Exercism 子集) | 多语言 |
| L1-D | 100 – 200 | **内部代码库抽取**的私有函数补全题 | **反污染 + 贴近业务** |
| L1-E | 30+ | LiveCodeBench 训练截止日后题 | **反污染滚动集** |

**典型 L1 用例**:
```
[输入] 函数签名 + docstring
   def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
       """Merge overlapping intervals and return sorted result."""
[输出] 完整函数实现
[验证] 运行 pytest 跑 10 个隐藏测试用例,全过则 Pass
```

#### 5.7.2 L2 · 仓库级任务来源

| 子集 | 样本数 | 来源 | 备注 |
|---|---|---|---|
| L2-A | 100 | SWE-bench Verified 抽样 | 业内对标必备(注意污染风险) |
| L2-B | 50 | SWE-bench Multilingual(Java/Go/JS/TS/Rust) | 防单语言偏差 |
| L2-C | 50 | SWE-bench Pro 公开子集 | 企业级难度,反污染 |
| L2-D | 50 – 100 | **内部仓库自动抽取的 issue-PR 对** | **核心,完全反污染** |
| L2-E | 30 | **训练截止日后的新 PR**(滚动) | 验证无数据泄漏 |

**L2-D 构造流水线**(内部数据):

| 步骤 | 动作 |
|---|---|
| 1 | 扫描内部 GitLab,筛 merged PR + 关联 issue + 修改了测试文件 |
| 2 | 为每个 PR 构建 Docker 镜像,锁定 PR 前 commit |
| 3 | 提取 **Fail-to-Pass 测试集**(PR 前挂、PR 后过) |
| 4 | 提取 **Pass-to-Pass 测试集**(前后都过,检测回归) |
| 5 | 人工 review:描述清晰度、测试非 flaky、gold patch 唯一解 |
| 6 | 禁用容器网络 + 禁用 git log(防作弊) |

#### 5.7.3 L3 · 特性级任务来源

| 子集 | 样本数 | 来源 |
|---|---|---|
| L3-A | 20 – 40 | FeatureBench 公开子集 |
| L3-B | 10 – 20 | ProjDevBench / E2EDevBench |
| L3-C | 10 – 20 | Terminal-Bench |
| L3-D | 10 – 30 | **内部真实 feature 需求**(PRD → PR 全流程) |

**L3 特别压测项**:

| 项 | 目的 |
|---|---|
| 超长 context prefill(ISL ≥ 128K) | 测 TTFT 是否仍可用 |
| KV cache 驱逐策略 | 总上下文超显存时是否优雅降级 |
| Prefix caching 增益 | 同 session 第 1 轮 vs 第 10 轮 TTFT 降幅(好系统 60-90%) |
| 工具调用往返开销 | 每次工具调用的序列化/反序列化 + 网络开销 |
| 长输出尾延迟 | 输出 2000+ tokens 时 P99 TPOT 是否漂移 |

#### 5.7.4 Terminal-Bench 的独立定位:多轮密集工具调用代表

Terminal-Bench(Stanford + Laude Institute,2025)与 SWE-bench 家族**不是替代关系,是互补关系**。TB 2.0 有 89 道精选任务,覆盖软工、系管、ML 训练、安全、生物、游戏等多个领域,对自研芯片评测有**独立价值**。

**核心差异**(SWE-bench vs Terminal-Bench):

| 维度 | SWE-bench Verified/Pro | Terminal-Bench 2.0 |
|---|---|---|
| 评测的根本问题 | 能不能写出正确的 patch? | 能不能把活干完? |
| Agent 产出物 | unified diff patch | 容器的最终状态(文件/进程/输出) |
| Agent 接口 | 由 scaffold 定义(多变) | 原生 Terminus 只给 tmux 按键(极简中立) |
| 领域广度 | 几乎只有 Python bug fix | 软工 + 系管 + ML + 安全 + 生物 + 游戏 |
| 轮次 | 10 – 40 | **100 – 200** |
| 工具调用数 | 15 – 30 | **100 – 500**,密集 |
| 数据集规模 | Verified 500 / Pro 1865 | **89**(CI 较宽,见下) |

**对推理引擎的压力画像对比**:

| 负载特征 | SWE-bench(长 prefill 代表) | Terminal-Bench(多轮 decode 代表) |
|---|---|---|
| ISL | **超长**(32K – 100K+),一次性灌入 | 中等但**累积增长**,单轮短、100+ 轮累计到几十 K |
| OSL | 中(patch 几百到几千 tokens) | 单轮极短(一行命令),总和中 |
| Prefill 压力 | **一次极大 prefill** | 每轮中等 prefill,**前缀缓存大量命中** |
| Decode 压力 | 偶发长 patch | **大量短 decode**,考验启停和队列 |
| KV cache 压力 | 一次性大 KV | **累积型 KV**,100 轮下持续增长,考验淘汰/分页 |
| 前缀缓存 | 帮助有限(每题 repo 不同) | **命中率 60–90%**,可直接验证自研引擎实现 |
| 工具调用 JSON 稳定性 | 中等要求 | **高要求**(一次 parse fail 全局崩) |

▶ **建议纳入方式**:在 §5.7.2 L2 子集中新增 `L2-F = 30 – 50 Terminal-Bench Core subset`(或 TB 2.0 hard subset);或视业务重要程度作为独立的 **L2.5 层**对待。

**需要特别注意的统计局限**:

- TB 2.0 只有 89 题,样本量小,置信区间宽(典型 ±1.5–2.6 个百分点)
- 同一配置下的**方差**显著大于 SWE-bench 系列
- 因此 Parity 阈值要**相应放宽**:SWE-bench Verified(500 题)Outcome Parity 阈值 ≥ 97%,TB(89 题)可放宽到 **≥ 93%**(详见 §7.5.3)
- 每题至少 **跑 3 次取中位数**,方差 > 10% 的结果标黄

**Harbor harness 的额外价值**:

Harbor(TB 2.0 的官方 harness)原生支持 Docker / Daytona / Modal / E2B / Runloop 作为 sandbox 后端,可做到几十到上百容器并行。对自研集群评测而言,它提供了一种其他工具做不到的能力:**在并发状态下同时验证正确性 + 工具调用稳定性 + prefix cache 实际收益**(与 §9.6 的"并发语义 B"对应)。



| 层级 | 题数 | 单题均耗时 | 串行总耗时(单卡) | 串行总 tokens |
|---|---|---|---|---|
| L1 | 500 – 1,000 | 5 s | 1 – 2 h | ~1 M |
| L2 | 200 – 300 | 5 min | 15 – 25 h | ~100 M |
| L3 | 40 – 60 | 30 min | 20 – 30 h | ~80 M |

▶ 实际跑回归用并发 + 子采样:
- **日常 CI** = L1 全量 + L2/L3 各 50 题抽样
- **月度全量** = L1/L2/L3 全量
- **版本发布门禁** = L1 全量 + L2 全量 + L3 抽 30 题

---

## 6. 测试 Case 定义模板(设计态)

> 本章定义**测试用例在被执行之前的描述形式**(YAML)。运行时产生的 trace/metrics 见 §8(JSON)。

### 6.1 元数据头(所有 Case 必填)

```yaml
case_id:            CA-<领域>-<序号>       # 例: CA-SWEB-0001
case_name:          <简短名称>
version:            v1.0
owner:              <设计人>
created_at:         <日期>

# 分类标签(用于切片分析)
task_type:          <Bug Fix | Feature Impl | Refactor | ...>
scenario:           <App Dev | Infra | ML System | ...>
language:           <Python | JS | ...>
interaction_mode:   <IDE Complete | Repo Agent | ...>
task_level:         <L1 | L2 | L3>         # 对应 §4.1 任务粒度
difficulty:         <Easy | Medium | Hard | Expert>
source:             <HumanEval | SWE-bench Verified | Internal | ...>
source_id:          <原始 benchmark 中的 ID,用于溯源>
contamination_risk: <Low | Medium | High>   # 训练集污染风险自评

# 规模特征
isl_tokens:         {p50: <num>, p95: <num>, max: <num>}
osl_tokens:         {p50: <num>, p95: <num>, max: <num>}
turns:              <int or range>           # 多轮场景的轮次
tool_calls:         <int or range>

# 执行策略
repeat_count:       <int>                    # 建议 ≥3;短 Case ≥30 取 P99 才稳
timeout_seconds:    <int>
sampling:
  temperature:      <float>
  top_p:            <float>
  max_tokens:       <int>
  seed:             <int or "varied">
```

### 6.2 输入 Schema(Input Spec)

```yaml
inputs:
  system_prompt: |
    <系统提示词全文,含 Agent 角色、约束、工具使用规则>

  user_prompt: |
    <用户任务描述,自然语言或 issue 原文>

  context:                            # 仓库/环境上下文(仓库级场景)
    repo_snapshot_hash:  <git commit sha>
    repo_url:            <URL or 本地路径>
    relevant_files:                   # 可选,若为 oracle 文件给出提示
      - path: <path>
        size_bytes: <num>
    total_context_tokens: <num>

  tools:                              # Agent 可用工具定义(JSON Schema)
    - name: bash
      description: <...>
      parameters_schema: <JSON Schema>
    - name: str_replace
      ...

  attachments:                         # 多模态或附加数据
    - type: <image | log | error_trace>
      path: <...>

  environment:
    docker_image:  <image:tag>
    python_version: <>
    installed_deps: <list or lockfile hash>
```

### 6.3 预期输出 Schema(Expected Output)

```yaml
expected_output:
  patch:                               # 仓库级修改
    format: <unified_diff | full_files>
    must_modify_files: [<path>, ...]
    must_not_modify_files: [<path>, ...]  # 如:不可改测试文件

  test_criteria:                       # 执行验证
    fail_to_pass:                      # SWE-bench 式
      - <test_id>
    pass_to_pass:
      - <test_id>
    coverage_threshold: <float 可选>

  functional_requirements:             # 非单元测试场景
    - <assertion 描述>

  format_requirements:
    output_schema: <JSON Schema 可选>
    required_sections: [<section>, ...]

  tool_call_trajectory:                # 仅当测试工具使用时
    expected_tool_sequence:
      - {tool: <name>, must_args: {...}}
    forbidden_tools: [<name>, ...]
```

### 6.4 Case 示例(仓库级 Bug Fix)

```yaml
case_id: CA-SWEB-0001
case_name: "django admin list_filter 崩溃修复"
task_level: L2
task_type: Bug Fixing
scenario: Application Development
language: Python
interaction_mode: Repo Agent
difficulty: Medium
source: SWE-bench Verified
source_id: django__django-11133
contamination_risk: Medium

isl_tokens: {p50: 14500, p95: 28000, max: 65000}
osl_tokens: {p50: 180, p95: 420, max: 1500}
turns: "10-20"
tool_calls: "15-30"

repeat_count: 3
timeout_seconds: 300
sampling: {temperature: 0.0, top_p: 1.0, max_tokens: 4096, seed: 42}

inputs:
  system_prompt: "<SWE-agent 默认 system prompt>"
  user_prompt: "<django issue #11133 原文>"
  context:
    repo_snapshot_hash: "<sha>"
    repo_url: "https://github.com/django/django"
  tools: [bash, str_replace, view, create_file]

expected_output:
  test_criteria:
    fail_to_pass: ["test_httpresponse_repr"]
    pass_to_pass: ["test_http_response_existing", ...]
  must_not_modify_files: ["tests/httpwrappers/tests.py"]
```

---

## 7. 指标体系

按四大类组织,每次评测全维度覆盖。

### 7.1 正确性指标(Correctness / Capability)

| 指标 | 定义 | 单位 | 应用场景 |
|------|------|------|---------|
| Pass@1 | 单次采样通过单元测试的比例 | % | L1(HumanEval、MBPP) |
| Pass@k | k 次采样中至少 1 次通过 | % | L1 |
| **Resolved Rate** | F2P 全部通过 AND P2P 全部通过的实例比例 | % | **L2 主指标** |
| Patch Apply Rate | 生成的 patch 语法合法可 apply 的比例 | % | L2 |
| Fix Rate(软) | F2P 通过比例,破坏任一 P2P 则记 0 | % | L2 大规模测试 |
| File-level Retrieval Accuracy | 是否正确定位到待修改文件 | % | L2(SWE-PolyBench) |
| CST Node-level Retrieval | AST 节点级定位准确率 | % | L2 |
| Tool Call AST Accuracy | 工具调用签名/参数合法性 | % | BFCL |
| Tool Selection Accuracy | 多工具中选对工具的比例 | % | BFCL v2/v3 |
| Long-context Tool Accuracy | 长上下文下仍正确调用工具 | % | BFCL v3 long-context |
| Spec Compliance | 特性实现是否满足 PRD | % | L3 |
| LLM-as-judge Score | 主观质量(code review、解释) | 1-5 | 对照 human |
| **Parity Rate(DUT vs Ref)** | DUT 与参考系统输出的语义一致率 | % | **全场景必测** |

⚠ **强制要求**:
- L2 场景必须同时报告 **Resolved Rate + Patch Apply Rate**
- 工具调用场景必须报告 **AST Accuracy + Execution Accuracy**
- 所有场景必须报告 **Parity Rate**

### 7.2 性能指标(Latency & Throughput)

| 指标 | 定义 | 单位 | 必测分位 |
|------|------|------|---------|
| TTFT | 请求到达 → 第一个非空 token 返回 | ms | **P50/P90/P99** |
| TPOT | (E2EL − TTFT) / (OSL − 1),**仅 decode** | ms/token | **P50/P90/P99** |
| ITL | 相邻 token 时间差 | ms | P50/P99 |
| E2EL | 请求到达 → 最后一个 token 返回 | ms | P50/P90/P99 |
| Queue Wait | 请求到达 → prefill 开始 | ms | P50/P90 |
| Prefill Latency | prefill 阶段耗时(排队除外) | ms | P50/P90 |
| Decode Latency | decode 阶段总耗时 | ms | P50/P90 |
| Output Throughput | 每秒输出 token(系统总) | tok/s | mean |
| Total Token Throughput | 每秒处理 input+output | tok/s | mean |
| Per-User Output Throughput | 单请求维度 tok/s | tok/s/user | P50/P99 |
| Request Throughput (RPS) | 每秒成功请求 | req/s | mean |
| **Goodput** | **满足 SLO 约束的 RPS / TPS** | **req/s** | **mean** |
| Prefill Throughput | 每秒处理 prompt token | tok/s | mean |
| Cold-start Latency | 冷启动首请求延迟 | ms | — |

⚠ **强制要求**:
- 所有延迟类指标**必须**报告 P50/P90/P99,禁止只报 mean
- 必须定义 Goodput 的 SLO 约束(§11),否则 Throughput 数据解释性差
- TPOT 定义**排除**首 token(与 MLPerf/GenAI-Perf 对齐);若使用 LLMPerf 默认(含 TTFT)需显式标注
- **Prefill 与 Decode 必须分开测**(§10.3.2)

### 7.3 系统与效率指标(System & Efficiency)

| 指标 | 定义 | 单位 |
|------|------|------|
| GPU/NPU Utilization | 计算单元利用率 | % |
| Memory Bandwidth Utilization | **显存带宽利用率**(decode 阶段更关键) | % |
| Memory Peak (HBM) | 显存/HBM 峰值占用 | GB |
| KV-cache Utilization | KV cache 使用率 | % |
| Prefix Cache Hit Rate | 前缀缓存命中率 | % |
| Power Draw (avg/peak) | 平均/峰值功耗 | W |
| **Energy per Request** | 每请求能耗 | J |
| **Tokens per Joule** | **能效比(自研芯片卖点)** | tok/J |
| Perf / Watt | 性能功耗比 | tok/s/W |
| Perf / $ | 性价比(按 TCO) | tok/$ |
| Cost per Resolved Task | 解决一个 L2 任务的成本 | $ |
| Temperature | 芯片温度 | °C |
| Inter-node Bandwidth | 节点间带宽利用 | GB/s |
| NVLink/互联 Utilization | 片间互联利用率 | % |

### 7.4 稳定性与可靠性指标(Reliability)

| 指标 | 定义 | 单位 |
|------|------|------|
| Success Rate | 非超时、非错误的成功率 | % |
| Timeout Rate | 超时请求占比 | % |
| Error Rate | 非 2xx / 结构化错误占比 | % |
| Format Compliance | 工具调用 JSON 可解析率 | % |
| Output Drift(长时) | 长时间运行下质量的标准差 | — |
| Continuous Run MTBF | 连续运行平均无故障时间 | hours |
| Reproducibility Delta | 同参数重复跑的结果标准差 | % |
| P99 Drift(稳压) | 固定并发下 P99 随时间的漂移 | % |

### 7.5 正确性判据与 Parity 三层设计(⚠ 关键章节)

> **本节解决一个常见争议**:"Case 跑完的结果必须和预期一致吗?"答案是:**单 Case 的 Pass 判据用评分器,不要求输出一致;但跨 Case 的 Parity 统计必须对齐 —— 两者是不同层次的事。**

#### 7.5.1 "一致"的四层拆解(术语统一)

团队内部讨论"是否一致"时,经常因为四种不同含义混用而争不出结果:

| 层次 | 含义 | 对 LLM Agent 现实吗 | 作为 Pass 判据合理吗 |
|---|---|---|---|
| **L1 字节级一致** | 输出 bytes 完全相同 | ❌ LLM 做不到 | ❌ 荒谬 |
| **L2 Token 级一致** | 输出 token 序列完全相同 | ⚠️ 同硬件同配置下偶尔可达;**跨硬件基本做不到** | ❌ 过严,会误判 |
| **L3 语义一致** | 表达的意思 / 给出的答案一样 | ✅ 可做到 | ⚠️ 部分有用,作辅助 |
| **L4 功能一致** | 最终任务完成结果一样(测试通过 / patch 可 apply / 命令跑通) | ✅ 可做到 | ✅ **正确判据** |

**为什么 L2 不能作为单 Case 的 Pass 判据**(三个不可抗力):

1. **浮点不结合律**:同一 batch size 下的 matmul 顺序一变,FP16/BF16 下 logits 就有 1e-4 级差异;softmax 之后在贪心解码的临界点上会跳到不同 token。自研芯片和 H100 的算子实现不同,**这种差异是必然的,不是 bug**。
2. **同一 Case 有很多正确答案**:让 Agent 修一个 bug,可能有 3–5 个合理 patch 都能让测试通过;预期输出只是某一次 run 的快照,不是唯一正解。
3. **多轮放大效应**:第 1 轮的 token 差异会让 Agent 在第 2 轮进入不同探索路径;100 轮之后 trajectory 可能完全不同,**但都是对的**。

若把 L2 作为 Pass 判据,会出现荒谬情形:**DUT 把题做对了**(测试通过),但因中间 trace 不同被判 Fail —— 这时该修的是判据,不是 DUT。

#### 7.5.2 三层正确性判据设计(推荐做法)

| 层 | 名称 | 粒度 | 角色 | 何时使用 |
|---|---|---|---|---|
| **第 1 层** | **Grader(评分器)** | 单 Case | **主判据**,决定 Pass/Fail | 所有 Case 必须 |
| **第 2 层** | **Outcome Parity(结果 Parity)** | 跨 Case 统计 | **芯片级守门**,辅助信号 | DUT vs Reference 对比 |
| **第 3 层** | **First Token Agreement** | 请求级 | **sanity check**,可选 | CI 快速冒烟 |

**第 1 层 · Grader(主判据)**:
- 对 L1(函数级):跑单元测试,F2P 通过即 Pass
- 对 L2(仓库级):F2P 全部通过 AND P2P 全部通过 → Resolved
- 对 L3(特性级):跑验证脚本 / Spec compliance 检查
- 对 Terminal-Bench 式:`/logs/verifier/reward.txt` 为 1 即 Pass
- **不要求**输出 byte/token 级与预期一致,**只看最终功能结果**

**第 2 层 · Outcome Parity(跨 Case 统计)**:

单看 Grader 的问题:如果自研芯片有 numerical bug 导致"对题更难对、错题更容易错,但在你有限的 10 个 Case 上刚好都对了",Grader 会给你绿灯,发版到客户端 Case 一变就崩。Outcome Parity 专门防这个。

做法:同一份权重、同一份 prompt、同一份 sampling 参数、同一个 seed,DUT 和 Reference 各跑一次,对整个 Case 集合做 **2×2 混淆矩阵**:

|  | Reference: Resolved | Reference: Not Resolved |
|---|---|---|
| **DUT: Resolved** | A(同对) | B(DUT 对 Ref 错) |
| **DUT: Not Resolved** | C(DUT 错 Ref 对) | D(同错) |

$$\text{Outcome Parity} = \frac{A + D}{A + B + C + D}$$

阈值建议(按数据集规模分):

| 数据集 | 题数 | Outcome Parity 阈值 | 理由 |
|---|---|---|---|
| HumanEval | 164 | ≥ 98% | 题简单,一致性高 |
| SWE-bench Verified | 500 | ≥ 97% | 大样本,阈值可严 |
| SWE-bench Pro | 1865 | ≥ 97% | 大样本 |
| **Terminal-Bench** | **89** | **≥ 93%** | **小样本,方差大,阈值放宽** |
| 内部私有 Case(10-50) | < 50 | ≥ 90%,且**每题重复 ≥ 5 次取多数投票**后再比 | 样本过小,必须靠重复降方差 |

⚠ **Parity 不通过即暂停性能测试**(对应 §13.1 Step 3 Parity 守门)。

**第 3 层 · First Token Agreement(可选 sanity check)**:
- 同 prompt、贪心解码(`temperature=0.0`)下,前 N(建议 10)个 token 与 Reference 完全一致的比例
- 阈值:≥ 80%(多轮 Agent 在第 10 个 token 处分叉是正常的,无需 100%)
- **如果前 1 个 token 就大幅不一致,说明 prefill numerics 有问题**,根本不用往下测
- 成本低,可以每次 CI 都跑,作为最前置的冒烟测试

#### 7.5.3 团队常见争议的一句话答复模板

> **"10 个 Case 跑完,每题是否 Pass 看 Grader,不要求输出和预期 byte-level / token-level 一致(那个既做不到也没意义)。但 10 题整体的 Resolved 矩阵必须和 Reference 对齐(Outcome Parity ≥ 90%,重复 ≥ 5 次投票后计算)—— 这才是芯片级的守门。'一致' 这个词在我们项目里特指后者,不指前者。"**

#### 7.5.4 内部 Case 数量少时的补救措施

当内部私有 Case 只有 10–50 个时,单次 Resolved Rate 的统计置信区间很宽。补救方式:

| 方法 | 做法 | 效果 |
|---|---|---|
| 多次重复取多数投票 | 每 Case 跑 5 次,取多数结果作为该 Case 的"真 Resolved" | 降低单次方差 |
| 温度拉到 0 + 固定 seed | `temperature=0.0, top_p=1.0, seed=42` | 最大化可复现性 |
| 配公开 benchmark 做广谱守门 | 除内部 10 Case 外,每次 run 必跑 HumanEval 全量作为背景 | 用大样本捕捉系统性 numerical 问题 |
| First Token Agreement 前置 | 跑 Case 前先做 10 个 prompt 的首 token 对比 | 快速发现 prefill bug |

---

## 8. Trace / Metrics Schema(运行态)

> 本章定义运行时采集的埋点字段。所有埋点时间戳必须**统一时钟源(NTP/PTP)**,跨层可对齐。

### 8.1 三层埋点总览

| 层级 | 对象 | 每条对应 | 主要字段组 |
|---|---|---|---|
| **Request** | 每次 LLM 调用 | 1 个 HTTP/RPC 请求 | `_timing`, `_tokens`, `_resource`, `_status` |
| **Turn** | Agent 每一轮 / 工具调用 | 1 个推理或工具轮次 | `turn_type`, `tool_name`, `turn_e2el_ms` |
| **Task** | 每道测试题 | 1 道 benchmark 题 | `_quality`, `_agent`, `_performance` |
| **Run** | 一次完整评测 | 1 个配置下的全量测试 | `_config`, `_quality_aggregate`, `_performance_aggregate` |

### 8.2 Request-level Schema(每次 LLM 调用一条)

```json
{
  "trace_id": "uuid",
  "parent_task_id": "swe-bench-verified-django__django-12345",
  "turn_index": 7,
  "request_id": "req_8f3a2b",
  "run_id": "20260501-custom-swebench_lite-c32-a1",

  "_hardware": {
    "chip_type": "custom-NPU-v1.3 | NVIDIA-H100 | ...",
    "chip_firmware": "v2.3.1",
    "driver_version": "...",
    "node_id": "node-07",
    "tp_size": 8, "pp_size": 1, "dp_size": 1, "ep_size": null,
    "concurrency_level": 32
  },

  "_software": {
    "inference_engine": "custom-engine-0.9 | vLLM-0.9 | TRT-LLM-0.15 | SGLang-0.4",
    "model_name": "Qwen3-32B",
    "model_weight_hash": "sha256:...",
    "quantization": "fp16 | bf16 | fp8 | int8 | awq-int4",
    "tokenizer_hash": "sha256:...",
    "agent_scaffold": "OpenHands-0.30 | SWE-agent-1.0",
    "scaffold_prompt_hash": "sha256:..."
  },

  "_timing": {
    "t_request_sent":      1713456789.120,
    "t_request_received":  1713456789.125,
    "t_queue_exit":        1713456789.135,
    "t_prefill_start":     1713456789.135,
    "t_first_token":       1713456789.287,
    "t_last_token":        1713456791.450,
    "t_response_returned": 1713456791.455,

    "ttft_ms":       162.0,
    "queue_wait_ms": 10.0,
    "prefill_ms":    152.0,
    "decode_ms":     2163.0,
    "e2el_ms":       2335.0,
    "tpot_mean_ms":  7.3,
    "itl_p50_ms":    7.1,
    "itl_p99_ms":    18.2
  },

  "_tokens": {
    "input_tokens":           12480,
    "input_cached_tokens":    10200,
    "cache_hit_rate":         0.817,
    "output_tokens":          296,
    "output_reasoning_tokens": 40,
    "total_tokens":           12776
  },

  "_resource": {
    "gpu_util_mean_pct":       78.0,
    "gpu_mem_used_gb":         62.4,
    "gpu_mem_bw_util_pct":     91.0,
    "power_avg_w":             580,
    "energy_j":                1354.3,
    "interconnect_bw_util_pct": 45.0
  },

  "_status": {
    "status": "ok | timeout | oom | error",
    "error_type": null,
    "retries": 0
  }
}
```

**关键字段说明**

| 字段 | 为什么重要 |
|---|---|
| `prefill_ms` / `decode_ms` 分开 | 定位是 prefill(计算瓶颈)还是 decode(带宽瓶颈)出问题 |
| `queue_wait_ms` | 拆开排队时间,避免误判"TTFT 高 = 芯片慢" |
| `cache_hit_rate` | Agent 场景的核心,决定第 2 轮起的真实性能 |
| `gpu_mem_bw_util_pct` | 比算力利用率更反映 decode 阶段瓶颈 |
| `energy_j` | 自研芯片的能效卖点,每请求必采 |
| `concurrency_level` | 记录采样时的并发压力,后续分析必备 |
| `model_weight_hash` + `tokenizer_hash` | 跨芯片对比时证明用的是**同一 checkpoint** |

### 8.3 Turn-level Schema

```json
{
  "trace_id": "uuid",
  "parent_task_id": "...",
  "turn_index": 7,
  "turn_type": "thinking | tool_call | final_answer",
  "tool_name": "bash | str_replace | view | run_tests | null",
  "tool_call_latency_ms": 450,
  "llm_request_ids": ["req_8f3a2b"],
  "turn_e2el_ms": 2785,
  "context_size_tokens": 12480,
  "cumulative_tool_calls": 18,
  "_status": {"status": "ok | tool_error | parse_error | budget_exceeded"}
}
```

### 8.4 Task-level Schema(每题一条)

```json
{
  "task_id": "swe-bench-verified-django__django-12345",
  "task_level": "L2",
  "task_suite": "swe_bench_verified",
  "task_run_id": "20260501-custom-swebench_lite-c32-a1",

  "_quality": {
    "resolved": true,
    "f2p_passed": 12, "f2p_total": 12,
    "p2p_passed": 234, "p2p_total": 234,
    "patch_lines_added": 47, "patch_lines_deleted": 8, "patch_files_changed": 3,
    "failure_mode": null
  },

  "_agent": {
    "total_turns": 23,
    "total_tool_calls": 41,
    "total_llm_requests": 23,
    "input_tokens_sum":  487200,
    "output_tokens_sum": 8430,
    "cached_tokens_sum": 412000,
    "overall_cache_hit": 0.846
  },

  "_performance": {
    "task_wall_time_s": 287.4,
    "ttft_mean_ms": 178, "ttft_p90_ms": 412, "ttft_p99_ms": 890,
    "tpot_mean_ms": 8.2, "tpot_p90_ms": 14.5, "tpot_p99_ms": 32.1,
    "throughput_tok_per_s": 11200,
    "peak_gpu_mem_gb": 72.1,
    "energy_kj": 380.2
  },

  "_parity": {
    "reference_task_run_id": "20260501-h100-swebench_lite-c32-a1",
    "token_exact_match_rate": 0.74,
    "semantic_match_rate":    0.96,
    "resolved_agreement":     true
  },

  "_meta": {
    "seed": 42, "attempt": 1, "is_flaky_rerun": false,
    "timestamp": "2026-04-19T10:23:45Z"
  }
}
```

**failure_mode 枚举**

| 值 | 含义 |
|---|---|
| `wrong_answer` | Patch 应用成功但测试不过 |
| `test_timeout` | 测试执行超时 |
| `budget_exceeded` | 超 token / 轮次 / 工具调用预算 |
| `parse_error` | Agent 输出格式解析失败 |
| `tool_error` | 工具调用失败(bash 出错、文件不存在等) |
| `oom` | 显存不足 |
| `hardware_fault` | 芯片/集群硬件故障 |
| `patch_apply_failed` | Patch 格式非法无法应用 |
| `infinite_loop` | Agent 卡死或循环 |

### 8.5 Run-level 聚合 Schema

```json
{
  "run_id": "20260501-custom-swebench_lite-c32-a1",
  "_config": {
    "chip": "custom-NPU-v1.3", "firmware": "v2.3.1",
    "engine": "custom-engine-0.9",
    "model": "Qwen3-32B", "model_weight_hash": "sha256:...",
    "quant": "fp8",
    "tp": 8, "pp": 1, "dp": 1, "concurrency": 32,
    "task_suite": "L2-SWE-bench-Verified-100",
    "task_suite_version": "v2026.04",
    "seed": 42
  },
  "_quality_aggregate": {
    "pass_at_1": 0.612,
    "pass_at_3": 0.744,
    "resolved_rate": 0.58,
    "patch_apply_rate": 0.91,
    "parity_rate_vs_reference": 0.97,
    "avg_turns": 21.3,
    "avg_tokens_per_task": 425000,
    "cost_per_resolved_task": 0.89,
    "failure_distribution": {
      "wrong_answer": 0.22,
      "budget_exceeded": 0.08,
      "oom": 0.005,
      "parse_error": 0.01
    }
  },
  "_performance_aggregate": {
    "ttft_p50_ms": 142, "ttft_p90_ms": 398, "ttft_p99_ms": 820,
    "tpot_p50_ms": 7.1, "tpot_p90_ms": 13.2, "tpot_p99_ms": 28.4,
    "throughput_output_tok_per_s_per_gpu": 1384,
    "rps": 86.5, "goodput_rps": 72.3, "goodput_ratio": 0.836,
    "avg_cache_hit_rate": 0.78,
    "peak_gpu_mem_gb": 74.8,
    "avg_mem_bw_util_pct": 91.0,
    "total_energy_kwh": 4.23,
    "tokens_per_joule": 74.5
  }
}
```

### 8.6 Run ID 规范(⚠ 强制)

所有跨系统数据对齐依赖统一 `run_id`:

```
<yyyymmdd>-<target>-<workload>-<concurrency>-<attempt>

例: 20260501-custom-swebench_lite-c32-a1
```

Langfuse trace、Opik eval record、Prometheus label、原始日志文件名**必须全部**带这个 `run_id`。

---

## 9. 负载设计

### 9.1 ISL / OSL 规模带

| 规模带 | ISL 范围 | OSL 范围 | 对应场景 |
|-------|---------|---------|---------|
| **XS**(补全) | 256 – 2K | 16 – 128 | IDE FIM 补全 |
| **S**(短 Chat) | 512 – 4K | 128 – 512 | 简单改代码 |
| **M**(中 Chat) | 4K – 16K | 256 – 2K | 单函数生成/解释 |
| **L**(长) | 16K – 32K | 256 – 1K | 整文件重构 |
| **XL**(仓库级) | 32K – 64K | 128 – 1K | L2 SWE-bench 类 |
| **XXL**(超长) | 64K – 128K+ | 64 – 512 | L3 仓库问答 / 长 Prefill |
| **长输出** | 1K – 4K | 4K – 16K+ | 整应用/整类生成 |

### 9.2 请求到达模式

| 模式 | vLLM bench 参数 | 用途 |
|------|-----------------|------|
| Burst(一次性打满) | `--request-rate inf` | 最大吞吐探底 |
| 固定速率 | `--request-rate <N>` | SLO 验证 |
| 泊松到达 | `--request-rate <N> --burstiness 1.0` | 模拟真实在线流量 |
| 突发(Burst) | `--burstiness < 1.0` | 压测尾延迟 |
| 斜坡(Ramp) | 递增 `--request-rate` | 探测系统拐点 |

### 9.3 并发档位(几何级数扫描)

```
1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256 → 512
```

每级至少跑 1000 次请求,对应关键数字见 §10.4。

### 9.4 数据集选择

**合成数据**(纯性能压测,可控且无污染)

- `vllm bench serve --dataset-name random`:按 ISL/OSL 生成,`--random-range-ratio` 控制分布
- `sonnet`:固定前缀 + 随机后缀,可控前缀缓存命中

**真实数据**(评测真实 workload)

- `sharegpt`:业内默认对照,但**偏通用对话,不代表 Coding**,仅参考
- `HumanEval / MBPP / LiveCodeBench`:L1 能力
- `SWE-bench Verified / Pro`:L2 Agent
- `Aider Polyglot`:多语言编辑
- `BFCL v4`:工具调用
- **内部数据**:生产流量采样 prompt(脱敏),最能反映真实分布

⚠ **强制要求**:评测报告必须至少包含 (1) 合成数据 — 纯性能 (2) Coding 专用 benchmark — 真实性能 (3) 内部数据(若有)— 业务代表性 **三份**。

### 9.5 基础测试矩阵

**H-1 基础矩阵**(⚠ 必跑,每 cell 重复 ≥3 次)

| 场景 | 任务层 | ISL 带 | 并发 | 数据集 |
|------|-------|-------|------|--------|
| IDE 补全 | L1 | XS | 1, 32, 128 | random + FIM 数据 |
| 单轮 Chat | L1 | M | 1, 16, 64 | HumanEval, MBPP |
| 仓库 Agent | L2 | XL | 1, 8, 32 | SWE-bench Lite 30 题 |
| 特性 Agent | L3 | XXL | 1, 4 | FeatureBench 抽 10 题 |
| 长输出 | — | 长输出 | 1, 8 | 自定义 |

**H-2 扩展矩阵**(SLO 探底、拐点分析)

在 H-1 基础上对每个场景做 ramp-up(并发 1 → 256),找 Goodput 拐点。

**H-3 稳定性矩阵**

选定 1 – 2 个代表场景,持续 24h / 72h,观察 P99 漂移与 MTBF。

### 9.6 并发语义澄清(⚠ 术语必须统一)

> **"32 并发"这三个字在不同工具语境下是不同的东西**,方案和报告里必须明确指定是哪一种,否则数据无法对齐。

#### 9.6.1 三种并发形态

| 类型 | 典型工具/场景 | 会话形态 | 单会话内部 | 到达模式 | 测出什么 |
|---|---|---|---|---|---|
| **A. 无状态请求并发** | `vllm bench serve --max-concurrency 32` | 32 个独立、一次性请求 | 一次就结束,无状态 | 可设泊松/固定/burst | 引擎纯吞吐、Goodput 拐点、调度极限 |
| **B. 多会话 Agent 并发** | Harbor `--n-concurrent 32`、TB 评测 | 32 个独立 Agent 会话,各跑一道任务 | **串行**多轮(100–200 turns) | 齐刷刷启动 | 真实 Agent workload 下的端到端行为 |
| **C. 生产用户并发** | 上线后 32 个用户同时用 | 32 个用户会话 | **串行**多轮 | 泊松/真实行为 | 实际产品服务表现 |

**关键观察**:**B 和 C 在推理服务器看来几乎等价** —— 推理服务器不关心调用方是"32 个容器各跑 1 个 Agent"还是"1 个 Agent 服务用协程处理 32 个会话",它只看到 32 条并发的多轮对话。

#### 9.6.2 B(Harbor 式)与 C(生产)的四个细微差异

虽然 B ≈ C,但四个工程细节差异会影响测试代表性,报告中需标注:

| 差异 | Harbor / TB 并发 | 生产用户并发 | 影响 |
|---|---|---|---|
| **到达分布** | 32 个容器**同时启动**,头几秒 prefill 脉冲 | 泊松到达,负载分散 | Harbor 前几秒 P99 会被拉高 |
| **Prefix Cache 共享度** | 所有会话跑同 benchmark,system prompt 相同 → 共享**极高** | 多租户时各客户 prompt 不同,共享度低 | **Harbor 数据偏乐观**,不适合直接外推到多租户场景 |
| **会话时长分布** | 任务类型集中,时长分布集中 | IDE 补全 1s、Chat 10s、Agent 10 min,**混合分布** | Harbor 测不出"短请求被长请求饿死"的调度公平性 |
| **稳态 vs Batch** | 89 题跑完就结束,**batch 式** | 持续到达,稳态运行 | Harbor 测不出 24h+ KV 碎片累积、热降频 |

#### 9.6.3 补齐差异的方法

| 差异 | 补齐方式 |
|---|---|
| 到达分布 | 在 Harbor wrapper 里加 staggered start(泊松间隔 sleep);或拉长 run 时间取稳态区间分析 |
| Prefix Cache 共享度 | 补一组 **system prompt 扰动 variant**(随机插入 session id / 租户标识),做乐观 vs 悲观两组数据 |
| 会话时长分布 | 回归到 vLLM `bench serve` 的 Mixed ISL/OSL 模式,或自建混合 workload |
| 稳态 vs Batch | 靠 §9.5 H-3 稳定性矩阵(24h / 72h 持续负载)补足,Harbor 不替代 |

#### 9.6.4 三种并发工具在本方案中的分工

| 工具 / 数据 | 覆盖的问题 | 不擅长 |
|---|---|---|
| vLLM `bench serve` + random/sonnet | 引擎上限、Goodput 拐点、合成压力稳态 | 不测正确性,不测多轮 |
| **SWE-bench Verified** | 长 prefill + 中 patch,一次性大请求代表 | 单次大,多轮弱 |
| **Harbor + Terminal-Bench** | **并发下同时验证正确性 + 工具调用稳定性 + prefix cache 实际收益** | 样本小,非稳态 |
| vLLM bench + Mixed ISL/OSL | 调度公平性(长短请求混跑) | 不测正确性 |
| 内部生产流量 replay | 真实到达 + 真实 prefix 多样性 | 需要上线后才有 |

⚠ **强制要求**:
- 报告中写 "并发 = 32" 时**必须标注是哪一类**(A/B/C),例如 `Goodput @ concurrency=32 (Type A, Poisson arrival)` 或 `Resolved Rate @ concurrency=32 (Type B, Harbor)`
- Harbor 数据不得直接外推到多租户生产场景(Prefix 共享度差异)

---

## 10. 硬件测试策略(单机 / 多卡 / 集群)

> 本章是芯片压测的**主战场**,承接 §4.2 的"性能评测视角"。

### 10.1 单机单卡矩阵

**目的**:建立芯片本身的性能基线,不受并行/网络影响。

| 维度 | 取值 | 目的 |
|---|---|---|
| 模型大小 | 7B / 14B / 32B / 70B(能单卡装下的最大) | 覆盖主流模型规模 |
| 量化精度 | FP16 / BF16 / FP8 / INT8 / INT4(如支持) | 对比精度-速度权衡 |
| ISL 档位 | 512 / 2K / 8K / 32K / 64K / 128K | 覆盖短-中-长上下文 |
| OSL 档位 | 128 / 512 / 2K / 8K | 覆盖短-中-长输出 |
| Batch size | 1 / 2 / 4 / 8 / 16 / 32 | 观察吞吐-延迟 trade-off |
| 并发 | 单请求 | 排除调度影响 |

**每格采 ≥ 100 次请求,取 P50/P90/P99**。矩阵扫描应产出:

- **Roofline 图**:横轴 ISL、纵轴 TTFT,看是否贴合芯片理论峰值
- **批量扩展曲线**:横轴 batch size、纵轴 throughput,识别饱和点
- **精度对比表**:同 ISL/OSL 下不同量化精度的 TTFT/TPOT 对比

### 10.2 单机多卡并行策略对比

芯片压测的重点:**同一模型用不同并行策略跑**,看片间互联带宽、通信开销是否达标。

#### 10.2.1 三种并行的适用场景

| 并行方式 | 切分维度 | 通信模式 | 适合场景 | 对互联需求 |
|---|---|---|---|---|
| **DP**(Data Parallel) | 请求级 | 无(独立副本) | 请求量大、模型单卡装得下 | 低 |
| **TP**(Tensor Parallel) | 层内(行列切) | AllReduce(每层一次) | 要降延迟、prefill 重 | **高**(NVLink 级) |
| **PP**(Pipeline Parallel) | 层间 | 阶段间传递激活 | 模型单卡装不下、decode 重 | 中 |

> **经验口诀**:**受限于请求量 → DP,受限于显存 → PP,受限于延迟 → TP**

#### 10.2.2 推荐测试组合(8 卡单机为例)

| 配置 | TP | PP | DP | 适用/看点 |
|---|---|---|---|---|
| TP8 | 8 | 1 | 1 | 最低延迟(需 NVLink 等效互联) |
| TP4 × DP2 | 4 | 1 | 2 | 平衡延迟与吞吐 |
| TP2 × DP4 | 2 | 1 | 4 | 吞吐优先 |
| DP8 | 1 | 1 | 8 | 最大吞吐(模型必须单卡装下) |
| TP4 × PP2 | 4 | 2 | 1 | 超大模型装不下时 |
| PP8 | 1 | 8 | 1 | 极限显存压力(不推荐常用) |

**每配置跑相同任务集,对比**:

| 对比维度 | 期待看到 |
|---|---|
| TTFT P90 | TP8 应最低,DP8 最高 |
| Throughput(总) | DP8 应最高(线性扩展) |
| 扩展效率 | (N 卡吞吐 / N×单卡吞吐)× 100%,> 75% 为健康 |
| 片间通信开销占比 | TP 配置下 AllReduce 占比,≤ 30% 为合格 |
| 显存利用率 | PP 配置下各 stage 是否均衡 |

#### 10.2.3 Prefill vs Decode 分阶段测量(⚠ 关键)

芯片压测**必须把 prefill 和 decode 分开测**,两阶段特性截然不同:

| 阶段 | 特性 | 瓶颈 | TP 效果 | PP 效果 |
|---|---|---|---|---|
| **Prefill** | 计算密集(高 AI) | 算力、Tensor Core | ✅ 线性扩展 | ❌ 收益有限 |
| **Decode** | 带宽密集(低 AI) | 显存带宽、KV 访问 | ⚠️ 收益递减 | ✅ 相对友好 |

**实验设计**:

| 子实验 | 配置 | 观察 |
|---|---|---|
| Prefill-heavy | 长 ISL(32K+) + 短 OSL(< 128) | TP 加速比接近线性 |
| Decode-heavy | 短 ISL(< 512) + 长 OSL(4K+) | TP 加速比递减,PP 可能更优 |
| 混合 | L2 任务典型 ISL/OSL | 真实场景 |

### 10.3 并发扫描策略(业内标配)

**目的**:找到 **SLO knee point(拐点)** — 在延迟可接受的前提下能承受的最大并发。

#### 10.3.1 每级记录六个关键数字

| 数字 | 说明 |
|---|---|
| TTFT P50 / P90 / P99 | 关注 P99 什么时候开始爆炸 |
| TPOT P90 | decode 稳态质量 |
| Throughput(tokens/s) | 系统吞吐 |
| **Goodput(tokens/s @ SLO)** | 满足 SLO 约束下的有效吞吐 |
| GPU 利用率 | 瓶颈是否在芯片 |
| Queue Wait P90 | 拐点后队列排队会先爆 |

#### 10.3.2 产出两条核心曲线

**曲线 1:延迟 vs 并发(Latency vs Load)**

- X 轴:并发级别(对数刻度)
- Y 轴:TTFT P90、TPOT P90(双轴或分图)
- 识别 **knee point**:延迟开始指数上升的那个点

**曲线 2:Goodput vs 并发**

- X 轴:并发
- Y 轴:Throughput(总)vs Goodput(满足 SLO 部分)
- 二者会在某一点**分叉**(超过那点 SLO 开始破,Goodput 下降)

> Goodput 开始下降的并发点 = **该配置下的产品可用并发上限**。

#### 10.3.3 并发测试类型

| 类型 | 做法 | 目的 |
|---|---|---|
| Step load(阶跃) | 从 N 并发跳到 N+K | 测调度响应速度 |
| Ramp load(渐升) | 并发线性上升 | 找持续可用峰值 |
| Sustained load(稳压) | 固定并发跑 ≥ 30 min | 测系统稳定性、热降频 |
| Burst load(突发) | 短时间注入大量请求 | 测队列和 autoscaling |
| Mixed ISL/OSL(混合) | 同时跑短+长请求 | 测调度公平性(避免长请求饿死短请求) |

### 10.4 多机集群测试

**单机多卡能测的**:TP/PP 纵向扩展性。
**多机集群必须测的**:跨节点通信、集群调度、容错。

#### 10.4.1 多机测试矩阵

| 维度 | 取值 | 目的 |
|---|---|---|
| 节点数 | 1 / 2 / 4 / 8 节点 | 观察跨节点扩展效率 |
| 组网方式 | InfiniBand / RoCE / 自研互联 | 测不同网络介质 |
| 并行组合 | TP=GPU 数 × PP=节点数 | 业内推荐配置 |
| 任务类型 | L2 / L3 | 复用任务集 |

#### 10.4.2 跨节点扩展性指标

| 指标 | 公式 | 合格线 |
|---|---|---|
| 弱扩展效率 | 吞吐(N 节点) / 吞吐(1 节点) / N | ≥ 75% |
| 强扩展效率 | 固定问题规模下的加速比 / N | ≥ 60% |
| AllReduce 延迟 | 跨节点 AllReduce 平均耗时 | 越低越好,需与互联带宽对齐 |
| 节点间带宽利用率 | 实测带宽 / 理论带宽 | ≥ 60% |

#### 10.4.3 必测的集群特性(非性能但关键)

| 特性 | 测法 |
|---|---|
| 单节点故障恢复 | 运行中 kill 一个节点,观察是否能优雅 drain |
| 慢节点(straggler)影响 | 人为注入一个慢节点,看整体 P99 是否爆炸 |
| 扩容/缩容 | 运行中增减节点,测服务是否中断 |
| 负载均衡 | 同节点内多请求,观察是否均衡分配到各卡 |

### 10.5 一个完整测试 Run 的组织

**典型一次完整测试 Run 的动作清单(约 8 – 24 小时)**:

| 阶段 | 时间 | 动作 |
|---|---|---|
| 0. 环境对齐 | 30 min | 确认芯片/固件/驱动/引擎/tokenizer 版本,记录到 Run 元数据 |
| 1. 预热 | 10 min | 跑 100 次请求预热,丢弃这部分数据 |
| 2. 单机单卡 | 2 – 4 h | 矩阵扫描(§10.1) |
| 3. 单机多卡并行对比 | 4 – 8 h | 6 种配置 × L2 子集(§10.2) |
| 4. 并发扫描 | 2 – 4 h | 最优配置下做并发扫描(§10.3) |
| 5. 多机集群 | 4 – 8 h | 2/4/8 节点 × L3 子集(§10.4) |
| 6. 稳定性验证 | 2 h | 固定负载持续跑 2 小时,观察 P99 漂移 |
| 7. 报告生成 | 30 min | 聚合 Run schema,输出 JSON + 可视化 |

---

## 11. SLO 定义

### 11.1 三档 × 三场景 SLO 总表

⚠ **SLO 必须在项目启动时冻结**,中途变更需走变更流程并重跑基线。

| 指标 | **补全 Baseline** | **补全 Target** | **补全 Stretch** | **Chat Baseline** | **Chat Target** | **Chat Stretch** | **Agent Baseline** | **Agent Target** | **Agent Stretch** |
|---|---|---|---|---|---|---|---|---|---|
| TTFT P50 | ≤ 200 ms | ≤ 100 ms | ≤ 50 ms | ≤ 500 ms | ≤ 300 ms | ≤ 150 ms | — | — | — |
| TTFT P90 | ≤ 400 ms | ≤ 200 ms | ≤ 100 ms | ≤ 1.5 s | ≤ 800 ms | ≤ 400 ms | ≤ 4 s | ≤ 2 s | ≤ 1 s |
| TTFT P99 | ≤ 800 ms | ≤ 400 ms | ≤ 200 ms | ≤ 3 s | ≤ 1.5 s | ≤ 800 ms | ≤ 15 s | ≤ 8 s | ≤ 4 s |
| TPOT P50 | ≤ 30 ms | ≤ 15 ms | ≤ 10 ms | ≤ 40 ms | ≤ 25 ms | ≤ 15 ms | — | — | — |
| TPOT P99 | ≤ 60 ms | ≤ 30 ms | ≤ 20 ms | ≤ 80 ms | ≤ 50 ms | ≤ 30 ms | ≤ 50 ms | ≤ 25 ms | ≤ 15 ms |
| Task Wall Time P90 | — | — | — | — | — | — | ≤ 20 min | ≤ 10 min | ≤ 5 min |
| Resolve Rate(L2) | — | — | — | — | — | — | ≥ 40% | ≥ 60% | ≥ 75% |
| Goodput / GPU | ≥ 50 RPS | ≥ 100 RPS | ≥ 200 RPS | ≥ 10 RPS | ≥ 25 RPS | ≥ 50 RPS | — | — | — |
| Prefix Cache 命中 | — | — | — | ≥ 40% | ≥ 60% | ≥ 80% | ≥ 60% | ≥ 80% | ≥ 90% |
| OOM / 错误率 | ≤ 0.5% | ≤ 0.1% | ≤ 0.05% | ≤ 0.5% | ≤ 0.1% | ≤ 0.05% | ≤ 1% | ≤ 0.1% | ≤ 0.01% |

> **"—" 表示该场景对该指标不强制**。Agent 场景用户不直接感知单轮 TTFT/TPOT 的 P50,重点看 P90/P99 和端到端 Task Wall Time。

### 11.2 档位使用规则

| 档位 | 用途 |
|---|---|
| **Baseline** | 新版本引擎/固件/驱动发布的**准入门槛** |
| **Target** | 产品级发布的**发布门槛** |
| **Stretch** | 对外宣传的**宣传门槛** |
| **回归阈值** | 任一指标跌出对应档位 **5%** 以上,自动 block + 告警 |

### 11.3 业界参考线

本方案 SLO 档位与 MLPerf Inference v5.1 交叉对齐:

- **补全 Target 档** ≈ MLPerf Llama 3.1-8B Interactive 档(TTFT ≤ 500ms, TPOT ≤ 30ms)
- **Chat Baseline 档** ≈ MLPerf Llama 2-70B 档(TTFT ≤ 450ms, TPOT ≤ 40ms)
- **Agent 档** 业界尚无统一标准,本方案按 Coding Agent 真实需求制定

---

## 12. 对比基线与跨芯片对标

### 12.1 三层基线

⚠ **强制要求**:所有关键指标必须同时对比以下三层,单层对比视为不完整。

| 基线层 | 对比对象 | 回答什么 |
|--------|---------|---------|
| **硬件基线** | H100/H200 + vLLM(或等价开源栈) | 自研芯片是否追平业界旗舰? |
| **软件基线** | 自研芯片 + vLLM/SGLang 移植版 vs 自研芯片 + 自研引擎 | 自研推理引擎是否追平开源? |
| **历史基线** | 上一次自研 release | 是否发生回归? |

### 12.2 公平性对齐清单(Ceteris Paribus)

⚠ **违反任何一条,结果不可信,不可对外宣传**。

| 变量 | 必须对齐的程度 |
|---|---|
| 模型权重 | **同一 checkpoint 的 hash** |
| 量化精度 | 完全相同(都 FP16 或都 FP8;否则作为独立维度单独汇报) |
| 推理引擎 | 尽可能同一版本;或两边都是对方最优版(需显式说明) |
| Agent scaffold | 同一版本 + 同 prompt hash |
| 工具定义 | 同名称/描述/参数 schema |
| 数据集版本 | 同一 dataset hash |
| 采样参数 | 同 temperature/top_p/max_tokens/seed |
| Tokenizer | **同 hash**(否则 tok/s 不可比) |
| Chat template | 完全一致 |
| 请求到达模式 | 同并发 + 同到达分布 |
| 超时阈值 | 一致 |
| 预热策略 | 舍弃前 N 次一致(建议前 100 次) |
| BOS/EOS 处理 | 一致 |

### 12.3 跨芯片对比实验矩阵

#### 12.3.1 对标芯片选型(三档)

| 档 | 芯片 | 定位 |
|---|---|---|
| **参考旗舰** | NVIDIA H100 / H200 | 业内最广泛对标,leadership 和客户都看这个 |
| **新旗舰** | NVIDIA B200 / GB200(如可获得) | 前瞻性对比,留一档向上空间 |
| **国产对标** | 其他自研/国产芯片(可选,敏感) | 横向对比 |

▶ **建议做法**:**首轮聚焦 H100**(最可信),后续视需求扩展。

#### 12.3.2 实验矩阵骨架

| 维度 | 取值 |
|---|---|
| 芯片 | 自研芯片 · H100 · (可选)其他 |
| 模型 | Qwen3-32B · Qwen3-72B · DeepSeek-V3(MoE) |
| 量化 | FP16 · FP8 |
| 并行 | TP8 · TP4×DP2 · TP4×PP2(跨节点) |
| 并发 | 1, 8, 32, 128 |
| 任务层 | L1(100 题)· L2(50 题)· L3(20 题) |

全矩阵 = 3 × 3 × 2 × 3 × 4 × 3 = **648 组**,不跑满。

#### 12.3.3 优先级筛选

| 优先级 | 组合 | 单元格数 |
|---|---|---|
| **P0(必跑)** | 自研 vs H100,Qwen3-32B,FP16 & FP8,TP8,全并发,全任务层 | 48 组 |
| P1 | 加入 Qwen3-72B 和 MoE 模型 | +96 组 |
| P2 | 加入其他并行配置 | +180 组 |
| P3 | 加入其他芯片 | +× |

▶ **首轮对标只做 P0 = 48 组,已经足够产出首份对比报告**。

### 12.4 七个对标核心问题

对标报告应该回答**七个问题**,每个问题对应一组指标:

| # | 问题 | 关键指标 | 期待结论形式 |
|---|---|---|---|
| 1 | 单请求有多快? | TTFT P90, TPOT P90(ISL=4K/32K) | "自研芯片在 ISL=4K 时 TTFT 是 H100 的 1.x 倍" |
| 2 | 吞吐上限? | Throughput @ concurrency=128 | "自研芯片在 128 并发时吞吐为 H100 的 x%" |
| 3 | 生产可用并发? | Goodput @ SLO vs 并发曲线拐点 | "自研芯片 knee point 为 64 并发,H100 为 96 并发" |
| 4 | 扩展性? | N 卡吞吐 / 1 卡吞吐 / N | "TP8 下自研扩展效率 82%,H100 为 87%" |
| 5 | 长上下文表现? | TTFT @ ISL=128K | "128K 上下文下自研 TTFT 为 H100 的 y 倍" |
| 6 | 能效? | Tokens/Joule | "自研芯片能效为 H100 的 1.2 倍" **← 自研卖点** |
| 7 | 质量有无降级? | L2 Resolve Rate diff, Parity Rate | "自研 resolve rate 与 H100 差异 < 2%" |

### 12.5 结果呈现规范

#### 规则 1:所有数字必须标注 ISL/OSL 区间和并发

❌ **错误**:"自研芯片 TTFT = 80 ms"
✅ **正确**:"自研芯片 TTFT P90 = 80 ms(ISL=4K, OSL=512, 并发=1, Qwen3-32B FP8, TP8)"

#### 规则 2:所有对比必须同一天、同一软件栈跑出

如果 H100 用的是 vLLM 0.9,自研用的是 vLLM 0.7,结果**不可比**。版本差异可让性能差 20%+。

#### 规则 3:报告 P50/P90/P99 全套,不能只报均值

❌ 反模式:"自研比 H100 快 10%(均值)" — 如果 P99 差 3 倍就是灾难
✅ 正确:表格列出 P50 / P90 / P99 三列

#### 规则 4:标出统计显著性

每个对比跑至少 **3 次**,报告**均值 ± 方差**。方差 > 10% 的结果要标黄提醒。

### 12.6 leadership 总览表示例

**首页总览表**(给 leadership 看的):

| 场景 | 指标 | 自研芯片 | H100 | 比值(自研/H100) | 结论 |
|---|---|---|---|---|---|
| 补全 | TTFT P90(ISL=2K) | 95 ms | 82 ms | 1.16× | 轻微落后 |
| 补全 | Goodput @ SLO | 145 RPS | 168 RPS | 0.86× | 落后 14% |
| Chat | TTFT P90(ISL=32K) | 1.8 s | 2.1 s | 0.86× | **领先 14%** 🎯 |
| Agent | L2 Resolve Rate | 61% | 60% | 1.02× | 质量无差异 |
| Agent | Parity Rate | 97% | — | — | **达标** |
| Agent | Tokens/Joule | 92 | 68 | **1.35×** | **显著领先** 🎯 |
| Agent | Cost/Resolved Task | $0.71 | $0.89 | **0.80×** | 成本优势 20% |

**详细分析分章节**(给工程团队看):摘要 → 实验设置 → 单机单卡 → 并行策略 → 并发扫描 → 长上下文 → 能效 → 质量 → 失败模式 → 结论与建议。

### 12.7 持续对标节奏

⚠ **对标不是一次性的**,软件栈快速演进时更要持续。

| 频率 | 动作 |
|---|---|
| **每次固件更新** | 自动跑 P0 矩阵 + 生成回归报告 |
| **每次引擎版本升级** | 重跑对标,验证提升幅度 |
| **每季度** | 加入新任务集(防过拟合),重跑全量对比 |
| **每半年** | 升级 H100 对标栈到业内最新版本,重新校准 |

▶ 建议建立一个 "对标看板"(Dashboard),任何人随时都能看到:
- 当前版本自研 vs H100 的 7 个核心指标
- 过去 6 个月的趋势曲线
- 与上一次对标的 diff

---

## 13. 评测执行流程

### 13.1 六步执行法

```
Step 1 环境就绪   →  Step 2 基线验证      →  Step 3 Parity 守门
         ↓                ↓                          ↓
Step 6 持续化     ←  Step 5 报告与可视化  ←  Step 4 性能矩阵
```

| Step | 动作 | 产出 |
|------|------|------|
| 1. **环境就绪** | LiteLLM 网关配置 DUT/Reference 双 endpoint;Langfuse/Opik/Prometheus 打通;确认 §12.2 公平性对齐 | Run 元数据 |
| 2. **基线验证** | 在 Reference(H100)上用 vLLM `bench serve` 跑 random dataset,确认落在社区公开水位,排除自身栈问题 | 基线报告 |
| 3. **Parity 守门** ⚠ | 在自研芯片上跑 HumanEval 全量 + SWE-bench Lite 30 题,对比 Reference 的 Pass@1 / Resolved Rate,允许 ≤ 2% 统计波动;**超阈值则暂停性能测试,转算法/芯片团队修 bug** | Parity 报告 |
| 4. **性能矩阵** | 执行 §9.5 H-1/H-2 矩阵 + §10 硬件矩阵,每 cell 重复 ≥ 3 次;结果三路落地(Langfuse trace / Opik 分数 / Prometheus 指标) | 原始数据 + Run 聚合 |
| 5. **报告与可视化** | Grafana 并排对比图、Opik Resolved Rate 时间趋势、Langfuse failure 分类 | 报告与看板 |
| 6. **持续化** | 推理引擎每版本自动触发小型矩阵(HumanEval 全量 + SWE-bench Lite 50 题 + 3 档并发),出日报 | CI 产物 |

### 13.2 三种评测频率档位

| 档位 | 触发时机 | 耗时 | 范围 |
|---|---|---|---|
| **日常 CI** | 每次引擎 PR 合并 | < 2 h | L1 全量 + L2/L3 各 50 题抽样 + H-1 缩减 |
| **版本发布门禁** | 引擎/固件/驱动每次发版 | 8 – 12 h | L1/L2 全量 + L3 抽 30 题 + H-1/H-2 + P0 对标 |
| **月度全量** | 每月 1 次 | 24 – 48 h | 全矩阵 + P0 + 稳定性 72h |

---

## 14. 失败定义与排除规则

⚠ **启动前必须冻结**,中途不可更改,否则会被质疑"挑数据"。

| 事件 | 是否计入失败 | 处理方式 |
|------|------------|---------|
| 请求超时(> timeout) | 是 | 记 `timeout`,**不参与 latency 分布** |
| HTTP 5xx | 是 | 记 `infra_error`,单独统计 |
| HTTP 4xx(如 context 超限) | 视情况 | 记 `input_too_long`,单独统计 |
| 工具调用 JSON 解析失败 | 是(正确性) | 记 `parse_error` |
| Patch apply 失败 | 是(正确性) | 记 `patch_apply_failed`,not resolved |
| OOM | 是 | 记 `oom`,触发 KV 容量边界分析 |
| 模型提前停止(无输出) | 视情况 | 记 `empty_output`,计入失败 |
| 重复 N 次全部失败 | 是 | 直接计 0 分 |
| Agent 超预算(token/轮次) | 是 | 记 `budget_exceeded` |
| Agent 循环卡死 | 是 | 记 `infinite_loop` |
| 硬件故障(评测机器) | 否 | 整批重跑,不计入任何指标 |
| Flaky 测试 | 重跑 ≥ 3 次 | 取中位数,记录方差;方差 > 10% 标黄 |


---

## 15. 报告产出物

### 15.1 每次评测最终产出(7 项)

1. **评测方案**(本文档的填充版)
2. **Run Summary Table**:所有 run 的 metadata + 核心指标 CSV
3. **Performance Report**:Grafana 看板链接 + 关键图表 PDF
4. **Correctness Report**:Pass@1 / Resolved Rate / Parity 表
5. **Failure Analysis**:按 failure 类别的聚合 + 代表性 trace 链接
6. **Delta Report**:与硬件基线、软件基线、历史基线的差异
7. **Reproducibility Pack**:Docker image tag、commit SHA、配置文件、脚本入口、模型 hash、tokenizer hash、seed

### 15.2 报告章节模板

每份报告至少包含以下 10 章:

1. Executive Summary(TL;DR,一页)
2. 环境信息(HW/SW 版本矩阵)
3. 数据集与 workload 清单
4. 正确性结果(三层基线对比)
5. 性能结果(分布图 + 表格)
6. Goodput 与 SLO 达成
7. 系统效率(利用率、功耗、Tokens/Joule)
8. 稳定性与失败分析
9. 已知 issue 与下步计划
10. 复现附录(脚本、配置、seed)

### 15.3 可视化看板分工

| 看板 | 内容 | 工具 |
|------|------|------|
| 性能总览 | DUT vs Reference 并排延迟/吞吐时序图 | Grafana + Prometheus |
| Goodput 拐点 | 并发 × Goodput 曲线 | Grafana |
| 正确性趋势 | Resolved Rate / Pass@1 按版本 | Opik |
| Failure 解剖 | 失败 trace 检索 + 分类 | Langfuse |
| Parity 差异 | DUT 与 Reference 输出 diff | Langfuse trace 对比 |
| **Leadership Dashboard** | 7 个核心指标 + 6 个月趋势 + 与上次对标 diff | Grafana 总览 |

### 15.4 可还原性四层设计(⚠ 跨集群交付关键章节)

> **适用场景**:已验证的 Case 需要在客户集群或其他团队的集群上重跑验证。本节定义**什么必须一致、什么只需记录、什么只要求统计对齐**。

#### 15.4.1 四层可还原性总表

| 层次 | 是否必须可还原 | 强制程度 | 理由 |
|---|---|---|---|
| **L1 · 环境(Environment)** | ✅ 必须 **bit-exact** | 强制 | 依赖版本 / 数据 / MCP 行为不同 → Agent 行为完全发散 |
| **L2 · 输入(Inputs)** | ✅ 必须 **bit-exact** | 强制 | prompt / seed / sampling / 工具 schema 必须锁死 |
| **L3 · 执行轨迹(Trajectory)** | ❌ **无法** bit-exact,但必须**完整记录** | 强制记录,不强制复现 | 浮点不结合律导致 token 级必然分叉;trace 用于事后 diff 与 debug |
| **L4 · 最终结果(Outcome)** | ⚠️ 不要求 bit-exact,要求**统计可复现** | 强制对齐分布 | 单次方差不可避免,统计层面必须对齐 |

**常见误区**:把 L3 当作 L1/L2 的强度来要求 → "客户那边 trace 不一样,所以不合格" —— 这是**搞错了层次**,等于给自己挖一个验不过的坑。

#### 15.4.2 L1 · 环境必须 bit-exact(最常翻车的一层)

症状:"内部跑得好好的,到客户就不一样。" 检查清单:

| 项 | 正确做法 | 常见错误 |
|---|---|---|
| 基础镜像 | `FROM ubuntu@sha256:abc...`(用 **digest** 而非 tag) | `FROM ubuntu:22.04`(tag 会被重新打) |
| Python/Node 依赖 | 所有包锁定到**版本 + hash**(pip `--require-hashes`、npm lockfile、conda-lock) | `pip install pandas`(每次拉的可能不同) |
| 语言运行时 | 镜像内置,不依赖客户机 | 假设客户有 python 3.11 |
| 工具(bash/grep/curl…) | 镜像内置 | 依赖客户 OS 自带 |
| MCP server / 外部工具 | 作为 sidecar 容器打包,版本锁死 | 依赖客户自建 MCP |
| 测试数据 | 作为 image 层或 volume,**hash 可验证** | 运行时下载 |
| 时钟/时区/locale | 显式设置 `TZ=UTC`、`LANG=C.UTF-8` | 继承宿主机 |
| 网络 | `--network=none` 或固定内部 DNS;**测试启动前断外网** | 测试里偷偷访问外网 |
| 内网隐式依赖 | NTP / DNS / 镜像站必须打包或文档化 | 默认客户有一样的内网环境 |

▶ **内网评测场景的注意**:强制"全部内网、无外网 MCP"客观上已帮你们做了大半环境可还原性。但给客户交付时仍要检查**内网隐式依赖**(NTP、DNS、镜像站等),这些要么打包进去,要么文档化为客户前置条件。

#### 15.4.3 L2 · 输入必须 bit-exact

每个 Case 必须锁定并记录 hash 的输入项:

- `system_prompt` 全文入库,记 sha256
- `user_prompt` 全文入库,记 sha256
- `tools` 工具 schema 全文入库,记 sha256(对应 §6.2)
- Sampling: `temperature=0.0`, `top_p=1.0`, `seed=<fixed>`, `max_tokens=<fixed>`
- Model 权重:记 checkpoint sha256(对应 §1 `model_weight_hash`)
- Tokenizer:记 hash(对应 §17 陷阱 6)
- Chat template:全文入库,记 hash

▶ **建议做法**:把所有 hash 打包成 `case_manifest.yaml`,客户跑前做 **self-check**,所有 hash 匹配才允许开始跑 —— 比事后发现不一致再 debug 便宜得多。

#### 15.4.4 L3 · 执行轨迹:强记录,不强复现

"可还原" 在这一层**不是**"客户能跑出一模一样的 trace"(浮点不结合律导致做不到),而是**"出了问题你能定位、能复盘、能两端 diff"**。

每次 run 必须采集(对应 §8.2 Request-level Schema 完全适用,此处是给跨集群交付场景的侧重强调):

| 采集对象 | 字段 |
|---|---|
| 每次 LLM 调用 | prompt hash / completion 全文 / token 数 / 各阶段 timing |
| 每次工具调用 | 输入 / 输出 / 退出码 / timing |
| 每轮 Agent 状态 | turn_index / 累计上下文 / 累计工具调用数 |
| 状态机转移 | Agent 从 thinking → tool_call → final 的每一步 |

**trace 必须是结构化 JSON**。内部 run 产生 "golden trace",客户 run 产生 "customer trace",出问题就 diff 两者,能定位到**哪一轮开始发散**。

#### 15.4.5 L4 · 最终结果:统计可复现,不单次可复现

这是**客户验收的真正判据**。

**做法**:内部跑 Case 集合(如 10 Case × 3 次 = 30 次),得到 **golden reference statistics**:

- Resolved Rate:X% ± σ(95% CI)
- 平均 turns / 平均 tokens
- TTFT P95 / TPOT P95 / E2EL P95

客户端跑同样规模,期望落在:

| 指标 | 客户端验收区间 | 容差依据 |
|---|---|---|
| **Outcome Parity**(单题一致性) | **≥ 90%**(小样本;大样本 ≥ 97%,见 §7.5.2) | 这是**最硬**的判据 |
| Resolved Rate(整体分布) | 内部均值 ± 2σ | 硬件方差 |
| 平均 turns | 内部值 ± 50% | 路径差异 |
| TTFT P95 | ≤ 内部值 × 1.5 | 客户硬件可能更弱 |
| TPOT P95 | ≤ 内部值 × 1.5 | 同上 |

任一项超出 → 启动 debug 流程(用 L3 的 trace 做 diff)。

#### 15.4.6 客户交付的 Reproducibility Pack 清单

§15.1 第 7 项 Reproducibility Pack 在跨集群交付场景下**必须**具体化为以下 7 个组件:

| 组件 | 内容 | 作用 |
|---|---|---|
| **Docker images** | 所有 Case 的环境镜像,by **digest** | 跑得起来 |
| **Case manifest** | 每题的 prompt / tools / sampling / 全套 hash | 锁死输入 |
| **Harness** | 运行 Case 的脚本 + Grader + trace collector | 跑与评分 |
| **Golden trace bundle** | 内部 run 的完整 trace(JSON) | Diff 参照 |
| **Golden statistics** | Resolved Rate / P95 / Parity 等统计 | 验收判据 |
| **Acceptance criteria** | 客户端 pass 门槛 + 容差表 | 判是否通过 |
| **Runbook** | 客户照着跑的操作手册(含 self-check 步骤) | 降低执行方差 |

#### 15.4.7 哲学定位:这是一套芯片兼容性认证测试

跨集群可还原性本质上是在做**芯片兼容性认证**(类似 CPU 厂商做 Linux distro 认证):

- 要求 "环境 + 输入 + 结果统计" 三者对齐
- "轨迹" 要记录但不强求一致
- **硬要求单次 trajectory 一致 = 给自己挖一个必然验不过的坑**

这一哲学定位要在项目启动会上与客户对齐,避免后期因"trace 不同所以不合格"的无谓纠纷。

---

## 16. 可观测平台落地

### 16.1 职责分层

```
                 开源 Coding Agent
                (SWE-agent / Aider / OpenHands)
                          │
                          ▼
                    LiteLLM Proxy         ← 统一 API 入口,路由 DUT/Reference
                  ┌───────┴───────┐
                  ▼               ▼
           Reference endpoint  自研芯片 endpoint
           (H100 + vLLM)        (自研 Inference Engine)

观测平面:
  • Langfuse    → Agent trace(prompt / response / tool call / 多轮)
  • Opik        → Eval 结果(Pass@1 / Resolved / LLM-as-judge / Parity)
  • Prometheus  → 硬件指标(NPU util / latency / QPS / 功耗 / KV)
```

### 16.2 数据对齐约定

| 约定 | 内容 |
|---|---|
| 统一 Label | `run_id`、`target`、`workload`、`concurrency`、`model_ver`、`engine_ver` 六个 label **同时**出现在 Langfuse trace、Opik record、Prometheus label 上 |
| 时间戳对齐 | 所有组件 NTP 同步至 < 100 ms 误差;跨节点测试需 PTP |
| JOIN key | 以 `run_id` 为 JOIN key 跨三库分析 |
| 数据保留 | 原始 trace 保留 ≥ 90 天;聚合 run-level schema 永久保留 |

---

## 17. 常见陷阱与坑位清单

> ⚠ 本章是"血泪清单",每次评测启动前 PM 必须逐条自检。

| # | 陷阱 | 后果 | 应对 |
|---|---|---|---|
| 1 | **只看均值** | LLM serving 的 P99 比 P50 敏感 10 倍,用户体感和 SLO 达成都卡尾部 | 强制报告 P50/P90/P99 |
| 2 | **数据污染** | 公开 benchmark(尤其 HumanEval)可能在训练集中,分数虚高 | 搭配 LiveCodeBench 或私有 holdout;用训练截止日后的题做反污染检查 |
| 3 | **TPOT 定义不一致** | LLMPerf 默认把 TTFT 算入 TPOT,MLPerf/GenAI-Perf/vLLM 不算 | 跨工具对比时显式标注定义 |
| 4 | **Warmup 效应** | 第一批请求受冷启动/KV 空/prefix cache 空影响 | 使用 `--num-warmups` 或手动丢弃前 100 次 |
| 5 | **输出长度波动** | 同 prompt 不同采样输出不同长度,扰动 TPOT | 对性能测试固定 `min_tokens=max_tokens` 或 `--ignore-eos` |
| 6 | **Tokenizer 差异** | DUT 与 Reference tokenizer 版本不一致时 tok/s 指标不可比 | 对齐 tokenizer hash |
| 7 | **Agent 结果归因** | SWE-bench 同一模型在不同 scaffold 下分数能差数十个百分点 | 分数必须和 scaffold 版本 + prompt hash 绑定汇报 |
| 8 | **benchmark 生态偏差** | 业界 benchmark 集中在 Python bug fix,如果业务重在 Java/TS 或 refactoring,评测不代表真实业务 | 补充 SWE-PolyBench / SWE-Compass / 内部数据 |
| 9 | **Chat-style 与 Issue-style 不等价** | 真实 IDE 用户提问方式和 SWE-bench issue 差异很大,公开 benchmark 会系统性**高估** Agent 能力(部分模型幅度 > 50%) | 对关键场景补充 chat-style mutation |
| 10 | **KV 碎片与长多轮** | 长多轮场景下 KV 管理策略(PagedAttention、前缀缓存)对自研引擎影响大 | 专门设计多轮场景矩阵(L3) |
| 11 | **只测性能不测正确性的死亡螺旋** | 性能很快但输出和 Reference 差 5%,客户不能用 | **Parity 必须做 P0 守门**(§13.1 Step 3) |
| 12 | **单机结果 ≠ 集群结果** | TP/PP/EP 切分显著影响通信开销 | 集群评测不能只做单机外推(§10.4) |
| 13 | **把 L1 的 TTFT 当 L3 的 TTFT 宣传** | 同硬件同模型,L1 TTFT 可能 50 ms,L3(ISL=128K)TTFT 能到 10 s+,差 200 倍 | 所有数字必须标注 ISL/OSL 区间和并发等级 |
| 14 | **Goodput 的 SLO 绑定没写死** | "Goodput = 72 RPS" 毫无意义 | 必须写 "Goodput(TTFT P90 ≤ 500ms & TPOT P90 ≤ 20ms)= 72 RPS" |
| 15 | **Flaky 测试只跑一次** | 涉及 P99 时单次结果是噪声 | 每题至少 3 跑,取中位数 + 记录方差 |
| 16 | **脱离横向对比的绝对数字** | 自研芯片数字漂亮但没对标,没有决策价值 | 每次跑自研,同一天同一软件栈在 H100 上也跑一遍 |
| 17 | **Prefill 与 Decode 混测** | 一个计算瓶颈、一个带宽瓶颈,混看指标会误导芯片设计 | 必须分阶段测量(§10.2.3) |
| 18 | **跨节点实验跳过** | TP8 单节点内再好,跨节点 AllReduce 慢 10× 也会让集群方案崩盘 | 必做多机测试(§10.4) |
| 19 | **元数据不全** | 少一项(固件/驱动/引擎/模型/量化/并行配置/任务集版本/种子)结果都不可复现 | Run 元数据强校验 |
| 20 | **对标 H100 用不同版本 vLLM** | 版本差异可让性能差 20%+ | 同一天同一栈 |
| 21 | **把 token 级一致当 Pass 判据** | 浮点不结合律让跨硬件 token 必然分叉,本来做对了的 Case 被误判 Fail | 单 Case 用 Grader 判 Pass/Fail;跨 Case 用 Outcome Parity 做芯片级守门(§7.5) |
| 22 | **把 trace 一致当跨集群验收判据** | 客户 trace 和内部必然不同,等于给自己挖了个验不过的坑 | 环境/输入 bit-exact,trace 只要求**完整记录**,结果只要求**统计一致**(§15.4) |
| 23 | **"32 并发"不标类型** | A / B / C 三种并发语义下 32 的含义完全不同,报告无法对齐 | 报告中必须标 `Goodput @ concurrency=32 (Type A)` 或 `(Type B, Harbor)`(§9.6) |
| 24 | **小样本 Parity 用大样本阈值** | TB 89 题用 97% 阈值会频繁误报;内部 10 Case 用 97% 阈值根本没统计意义 | 按数据集规模调整 Parity 阈值,小样本 + 重复投票(§7.5.2) |
| 25 | **Harbor 数据直接外推到多租户** | Harbor 内所有会话共享 system prompt,prefix cache 命中率偏乐观 | 多租户场景需补 system prompt 扰动 variant(§9.6.3) |

---

## 18. 附录 A — 关键参考资料

### 代码生成与 Agent 评测
- SWE-bench 原论文 / SWE-bench Verified(OpenAI, 2024) / SWE-bench Pro(Scale AI, 2025)
- SWE-PolyBench(AWS, 2025)— 多语言
- SWE-Compass(2025)— 任务类型 × 场景 × 语言正交分类
- HumanEval(OpenAI) / HumanEval+(EvalPlus) / MBPP / MultiPL-E / LiveCodeBench / BigCodeBench
- Aider Polyglot benchmark
- Terminal-Bench / RepoBench / FeatureBench / E2EDevBench / ProjDevBench
- τ-bench(Sierra Research, 2024)— 多轮 tool-agent-user 交互
- BFCL v1–v4(Berkeley Gorilla Lab)— 函数调用/工具调用

### 推理性能评测
- MLPerf Inference v4.0 / v5.0 / v5.1(MLCommons)
- vLLM `benchmark_serving.py` / `vllm bench serve`(官方文档)
- NVIDIA GenAI-Perf / Triton Perf Analyzer
- LLMPerf(AnyScale)
- GuideLLM(Neural Magic)

### 延迟与吞吐指标规范
- NVIDIA《LLM Inference Benchmarking: Fundamental Concepts》
- BentoML《LLM Inference Handbook — Key Metrics》
- AnyScale《Understand LLM latency and throughput metrics》
- AWS Neuron《LLM Inference benchmarking guide》

### Agent 评测最佳实践
- LangChain《Agent Evaluation Readiness Checklist》
- OpenAI Preparedness Framework — SWE-bench Verified 方法论
- Galileo Agent Leaderboard(BFCL + τ-bench + xLAM + ToolACE 综合)

---

## 19. 附录 B — 启动自检 Checklist

### B.1 启动前

- [ ] 本文档 §1 项目信息已填充完整
- [ ] 场景权重已按业务敲定(§5.6)
- [ ] L1/L2/L3 任务清单已选定(§5.7)
- [ ] Terminal-Bench 是否纳入已决策;若纳入,Parity 阈值按小样本规则设定(§5.7.4, §7.5.2)
- [ ] SLO 已按场景敲定,Baseline/Target/Stretch 三档齐全(§11)
- [ ] 失败定义已冻结(§14)
- [ ] Case 清单已完成 Schema 填充(§6)
- [ ] **Grader 判据已冻结,团队已就"不要求 token 级一致"达成共识**(§7.5)
- [ ] **Outcome Parity 阈值已按数据集规模设定**(§7.5.2)
- [ ] DUT / Reference 公平对齐清单已核对(§12.2)
- [ ] Langfuse / Opik / Prometheus / LiteLLM 链路已联调通过(§16)
- [ ] Run ID 规范已在所有脚本中实现(§8.6)
- [ ] 模型权重 hash + tokenizer hash 已记录
- [ ] **"并发"在所有脚本和报告中的语义类型(A/B/C)已统一**(§9.6)

### B.2 跑分前

- [ ] Reference 基线跑 vLLM random dataset,结果落在社区公开水位
- [ ] **First Token Agreement 前置冒烟已通过**(≥ 80%,§7.5.2)
- [ ] Parity 守门已通过(§13.1 Step 3 + §7.5.2 的阈值)
- [ ] Warmup 策略已生效(前 100 次丢弃)
- [ ] Tokenizer 一致性已验证
- [ ] 性能测试的 `min_tokens=max_tokens` 或 `--ignore-eos` 已设置(§17 陷阱 5)
- [ ] NTP / PTP 时钟同步已确认
- [ ] **内部私有 Case 数量 < 50 时,每题重复 ≥ 5 次的多数投票机制已就绪**(§7.5.4)

### B.3 报告前

- [ ] 全量延迟指标包含 P50/P90/P99
- [ ] **所有并发数字标注了类型**(Type A/B/C,§9.6)
- [ ] Goodput 的 SLO 约束已显式标注(§17 陷阱 14)
- [ ] **Outcome Parity 的 2×2 混淆矩阵已汇报**(§7.5.2)
- [ ] 三层基线(硬件 / 软件 / 历史)齐全(§12.1)
- [ ] 跨芯片对比的 7 个问题都有答(§12.4)
- [ ] 每 cell 至少重复 3 次,方差已记录
- [ ] Failure 已分类聚合
- [ ] 复现 pack(Docker tag + commit + seed + hash)已归档
- [ ] 所有数字标注了 ISL/OSL 区间和并发等级(§17 陷阱 13)

### B.4 跨集群交付前(仅适用于需要在客户集群复跑的场景)

- [ ] **L1 环境层**:所有镜像用 digest(非 tag)、依赖用 hash 锁定(§15.4.2)
- [ ] **L1 环境层**:已断外网或显式记录内网依赖(NTP/DNS/镜像站)(§15.4.2)
- [ ] **L2 输入层**:`case_manifest.yaml` 含所有 prompt/tools/sampling/权重/tokenizer/chat-template 的 sha256(§15.4.3)
- [ ] **L2 输入层**:客户端 self-check 脚本已提供,hash 不匹配直接 fail-fast
- [ ] **L3 轨迹层**:trace 采集字段完整(按 §8.2 Request-level Schema),JSON 结构化
- [ ] **L3 轨迹层**:golden trace bundle 已打包
- [ ] **L4 结果层**:golden statistics 已计算(Resolved Rate 均值 ± σ、turns、tokens、TTFT/TPOT P95)
- [ ] **L4 结果层**:验收容差表已与客户确认(Outcome Parity ≥ X%、Resolved Rate ± 2σ、TTFT × 1.5)
- [ ] **Reproducibility Pack 7 件**全部齐备(§15.4.6)
- [ ] Runbook 已交付,含客户端 self-check 步骤
- [ ] **已与客户书面对齐"trace 一致 ≠ 验收判据"的哲学**,避免后期争议(§15.4.7)

---

## 20. 变更记录

| 版本 | 日期 | 作者 | 变更说明 |
|---|---|---|---|
| v1.0 | 2026-04-20 | `<合并 PM>` | 首版:合并 `coding_agent_eval_spec.md` v1.0 与 `coding_agent_benchmark_templates_v2.md` v2;统一 L1/L2/L3 为任务粒度语义;Spec 的"推理性能层"改名为"性能评测视角"置于 §10;SLO 采用 v2 的三档矩阵;Trace 使用 v2 的四层 JSON;新增并行策略 / Prefill vs Decode 分阶段 / 并发扫描 / 跨芯片七问 / 持续对标节奏 |
| **v1.1** | **2026-04-21** | `<PM>` | 基于团队讨论补充三项关键机制:**(1)**§5.7.4 Terminal-Bench 独立定位与负载画像对比;**(2)**§7.5 正确性判据与 Parity 三层设计(Grader / Outcome Parity / First Token Agreement),解决"Case 输出必须和预期一致吗"的争议;**(3)**§9.6 并发语义的 A/B/C 三形态澄清(vLLM bench / Harbor / 生产用户);**(4)**§15.4 可还原性四层设计与跨集群交付 Pack(环境 bit-exact / 输入 bit-exact / 轨迹强记录 / 结果统计对齐),解决"Case 拿到客户集群复跑"的需求;新增设计原则 #9、#10;新增陷阱 21–25;新增 Checklist §B.4 跨集群交付 |
| `<v1.2>` | `<日期>` | `<PM>` | `<变更说明>` |

---

> **终极原则再次重申**:
>
> 🔹 **快是锦上添花,对是立身之本**
> 🔹 **Parity 零容忍,分布优于均值,基线不可省略**
> 🔹 **Ceteris Paribus:芯片之外所有变量必须对齐**
> 🔹 **Prefill 与 Decode 必须分开测,单机与集群必须都测**
> 🔹 **Outcome 判 Pass,Parity 守芯片;token 一致既做不到也没意义**
> 🔹 **跨集群交付:环境锁死,输入锁死,轨迹记录,结果对齐统计 —— 不要追求单次复现**
