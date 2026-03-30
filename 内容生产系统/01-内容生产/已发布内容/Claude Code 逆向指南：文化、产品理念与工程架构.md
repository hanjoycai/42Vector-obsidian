---
tags:
  - "已发布内容"
title: "Claude Code 逆向指南：文化、产品理念与工程架构"
---
原创 JC-蔡杭洲 *2026年2月8日 16:28*

Claude Code是今年最推荐的AI产品之一。虽然叫Code，但它的功能绝对不止是写代码，而是一款真正意义上的通用 Agent。

Boris Cherny在2024年9月将Claude Code作为副业项目时，完全没想到它会发展成今天的模样。如今Claude Code已成为众多工程师的核心开发工具，很多用户将其应用于编程、运维、研究乃至写作设计等非技术场景。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyumwzkzAKJgFfGMXapQZgib2yS4JEXXibiaavxnx3PVvCcrNicDRUgLbg0icYib0nf0rzlloYKjtveSibia8g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

诞生于一个听歌小工具

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyumwzkzAKJgFfGMXapQZgib20CSKIPUfAtE6X8gZh2Zs1ZeKIb05Rich9PJiaXtKFiaOgCicm9qlsjUpMg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

*▲左边是产品经理Cat Wu，右边是创始工程师Boris Cherny*

Claude Code 早期的三位核心创始成员，分别是：

- 创始工程师 Boris Cherny
- 产品经理 Cat Wu
- 二号工程师 Sid Bidasaria（负责Subagents）

2024年9月，Boris Cherny 刚加入Anthropic，并开始利用 Claude 3.6 模型构建一系列不同的demo，闲着没事写了个命令行小工具。

> “我开始尝试在终端里使用 Claude。第一个版本非常简陋：它既不能读取文件，也不能使用 bash，完全无法处理任何工程任务。但它可以与计算机进行交互。-Boris Cherny

这东西能用 AppleScript 告诉你现在在听什么歌，还能根据你输入的指令换歌。Boris 自己的评价是：“demo挺酷，但没啥意思。”

与此同时，产品经理Cat正在研究 AI Agent 的计算机使用能力，在与 Cat 交流后，Boris 产生了一个想法：如果给这个命令行工具更多权限呢？比如让它能读写文件、能执行命令？

接着Boris就在代码库运行了它，并开始向它提问。此时Claude 开始探索本地的文件系统并进行读取文件。查看导入项，然后去读取那些导入项中的文件，就这样持续进行，直到找到满意的答案。Claude 探索文件系统的过程令Boris大受震撼，因为Boris自己都从未用过这样的 AI 工具。

> 这里给我最大的启发是： AI 公司团队的所有人，都应该自主的、持续探索出模型的能力边界，这是 AI 产品化洞察的关键来源。如果Boris天天忙着给领导汇报写 PPT，那是不可能诞生出 Claude Code的。-JC  

  

○Boris Cherny的早期经历

## 早期背景与教育基石

Boris Cherny 出生于美国加利福尼亚州圣何塞，作为硅谷的心脏地带，这里为他提供了得天独厚的教育启蒙环境 。

与许多纯计算机科学背景的工程师不同，Boris的学术背景植根于社会科学与数理逻辑的交汇点。他于2009年至2011年间在加州大学圣地亚哥分校攻读并获得了经济学学位 。

他将代码库视为一个动态的激励系统，将工程生产力视为稀缺资源的优化配置问题。在后来的职业生涯中，他频繁提及“注意力分配”（Attention Allocation）是工程链条中的核心瓶颈，而非单纯的代码生成速度。

在 AgileMD 和 Turn 的经历，使 Boris 深刻理解了在快速增长的业务压力下，动态语言（如当时的 JavaScript）在维护性方面面临的巨大挑战。这为其后来转向强类型系统和静态分析技术埋下了伏笔。

### Coatue Management的架构实践

2015 年 1 月，Boris 加入了知名投资机构 Coatue Management 担任架构师 。在这家管理着数百亿美元资产的公司，他负责监督所有前端系统的开发。金融行业对于数据准确性和系统稳定性的严苛要求，进一步强化了他对“类型驱动开发”的信仰。他开始探索如何在不牺牲开发速度的前提下，通过编译检查来消除运行时错误。

Instagram的规模化挑战（2017–2024）

2017 年 11 月，Boris 加入 Meta，担任首席工程师近七年。他主要在 Instagram 团队工作，见证了 Instagram 从单一图片分享应用向全球多媒体平台的转型。

他在 Meta 的核心职责包括：

1. 服务器架构设计：设计支撑数亿用户的后端基础设施，确保系统在高负载下的稳定性。
2. 代码质量提升：领导 Meta 内部的代码质量改进计划。面对数千万行 JavaScript/Flow 代码库，他通过静态分析工具降低开发者的认知负担。
3. 技术栈迁移：虽然 Meta 早期自主研发了 Flow 类型检查器，但随着 TypeScript 社区的快速发展，Boris 成为推动内部向 TypeScript 迁移的关键人物。他开发了 flow-to-typescript 等自动化工具，不仅解决了公司内部的迁移难题，也为全球开发者社区创造了价值。

2019年，O'Reilly Media 出版了 Boris 撰写的《Programming TypeScript: Making Your JavaScript Applications Scale》。这本书迅速成为该领域的权威指南，核心理念是将 TypeScript 作为一种独特的类型层，让编程在保证安全的同时更具趣味性。

  

○产品滞后于模型能力

AI 能力与实际业务之间的脱节被冠以一个名称：叫能力过剩（capability overhang）。这一术语最早由微软首席技术官凯文·斯科特（Kevin Scott）提出，描述了 AI 理论上能交付的效果与实际能落地应用之间的差距。就好比如你有一辆F1赛车，却只能在学校停车场里驾驶它。

机器的潜力远超有效使用它的能力。

Notion CEO Ivan Zhao 认为我们还在"信息高速公路上费力地蹬着自行车"。

多数人早就不应该自己写代码了。比如 Notion 联合创始人 Simon，原本是硅谷的 10x coder，如今每天同时指挥 3-4 个 coding agents 干活，他自己则成了 30-40x coder。他可以走开吃饭、开会或做其他事情。

人只需要在几个关键杠杆点（leveraged points）把控 AI 的工作流即可。但仅仅这样还不够——因为过去的思维局限，我们没有将 AI 真正融入生活和工作的每个角落。

工业革命初期，蒸汽机刚发明出来时，纺织厂最先用上了。但过去的纺织厂依赖水力驱动，必须建在河流湖泊附近。所以这些最早用上蒸汽机的纺织厂，依然选择把厂建在靠近水源的地方。结果生产力提升十分有限。

真正的突破，发生在有些厂主突然意识到：现在我们何必造在水边呢?

用不着水力了，可以直接建在其他三种地方：第一，离原材料近的地方，拿来直接生产；第二，离港口近的地方，做完直接送出去；第三，离廉价劳动力近的地方，大幅减少人力成本。

后来电力普及后，工厂主进一步去中心化，摒弃了单一的中央传动轴，转而在工厂各处为不同机器配置小型电机（未来个人手机和眼镜里的小参数模型）。也就是说，工具的出现使得解耦（decouple）同步发生了。

如今的 AI 时代似乎也是如此——大家用上了更先进的工具：大语言模型（蒸汽机），却依然把厂房建在水边。

产品滞后（product overhang）意味着模型已经具备某种特定能力，但运行该 AI 的产品在设计上却未能捕捉或发挥出这种能力。所以 Boris Cherny 发现 Claude 能够自动操作文件系统，这完全属于 product overhang。

模型其实已经具备某种能力了，但现有的产品形态没有把这种能力释放出来。

  

○不仅仅面向程序员

如今，Anthropic 超过 80% 编写代码的工程师每天都在使用 Claude Code，但使用者并不仅限于他们。

Boris 最初只想着给程序员用的——所以才叫“Claude Code”。

但有一天他走过数据工程师的工位，发现对方屏幕上也跑着 Claude Code。“你用这个干嘛？”“我让它帮我写查询、做可视化图表啊。”

一个听歌小工具，因为多给了几个权限，变成了一个价值数十亿美元的产品。这大概是“product overhang”最好的证明，模型能力一直在那儿，等的只是有人把它释放出来。

○用Claude Code开发Claude Code

> “如果使用非主流的技术栈开发语言，模型虽然也能学会，但你必须重新训练模型并投入大量微调的精力。我们想要的是一个无需额外训练的技术栈：一个 Claude Code 能够自我构建的环境。目前Claude Code 约 90% 的代码都是由 Claude Code 编写的。”-Boris Cherny

Claude Code 的技术栈：TypeScript 写主体，React 搭配 Ink 框架做终端 UI，Meta 开源的 Yoga 做布局系统，Bun 负责构建打包。

- TypeScript：Claude Code 基于此语言构建。
- React 与 Ink：UI 使用 React 编写，并采用 Ink 框架来实现交互式命令行元素。
- Yoga：由 Meta 开源的布局系统。这是一个运行良好的基于约束的布局系统。终端应用程序的劣势在于需要支持各种尺寸的终端，因此需要一个布局系统来务实地解决这一问题。
- Bun：用于构建和打包。团队选择它是由于其速度优于 Webpack、Vite 等其他构建系统。
- Ink 框架是一个精巧的组件，允许在终端中创建美观的 UI。

这个选择带来一个完美闭环：用 Claude 擅长的技术栈语言写 Claude Code，然后用 Claude Code 写更多 Claude Code。90%的代码功能都是自己写自己。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyumwzkzAKJgFfGMXapQZgib2SLDFeU17RouXvdQ5dYXJomJM0S9CY0hA06cGP0lgQjyNgAL0ETg8mA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

AI-First工程团队的范本

Anthropic 的工程团队，可能是目前把 AI 工具用得最极致的团队之一。Product-minded engineer (有产品感的工程师) 的价值被进一步放大：Claude Code 团队没有设计师、没有 PM，就靠几个有产品感的工程师。

代码审查：所有 PR 的第一遍审查由 Claude Code 完成，工程师做第二遍。Boris 说，Claude Code 在第一遍就能发现很多问题。这个功能原本只在内部用，后来他们把它公开了，所有人都能用 Claude Code 做安全审查。

写测试：Claude Code 的测试用例几乎全是 Claude Code 写的。Boris 说：“以前如果有人提 PR 不写测试，我会犹豫要不要说什么——感觉像在挑刺。但现在有了 Claude，写测试就是一句提示词的事，没有借口不写。”

事故响应：oncall 的工程师会让 Claude Code 帮忙分析 Root Cause（导致问题最根本的原因）。它能从 Slack 拉相关讨论，从 Sentry 拉错误日志，从各种监控系统拉数据，然后综合分析。Boris 说 Claude Code 在某些场景下找 Root Cause 比人还快。

GitHub issue 分流：每当有新 issue 进来，Claude Code 会先做一遍分析，然后工程师问它“能不能实现一下”。Boris 说，大概 20%-40% 的情况下，它第一次就能全部搞定。

图表和查询：产品数据存在 BigQuery 里，几乎所有查询和可视化都是用 Claude Code 生成的。工程师甚至会让它直接输出 ASCII 图表。

  

○组建早期Claude Code工程团队

最初，团队只有 Boris 一人，直到 11 月，Sid Bidasaria 加入 Anthropic 并接触到了 Claude Code 的早期版本。他非常喜欢这个想法，于是加入了 Boris 的项目。

> “我们团队大部分工作是快速出多个原型，并构建出能够展示底层模型强大实力的产品。团队内部没有正式的流程：一切都非常灵活。团队成员几乎可以研究任何想做的东西，所以只需不断挑选那些最有前景的想法。”-Sid

Cat当时用 Claude Code 进行数据可视化分析，发现它能便捷地创建临时数据流进行实时聚合统计，当时给 Boris 提了许多产品上的反馈，后来Boris 便邀请Cat负责这个项目。

到2025 年 7 月份，团队规模扩大到了 10 名左右的工程师，且招聘工作一直在持续。

这里单独说说 Anthropic 这家公司和背后推动产品创新的人：Mike Krieger。

2024年5月，Instagram 联合创始人 Mike Krieger 加入 Anthropic 担任首席产品官。

2024年6月，Claude Artifacts 随 Claude 3.5 Sonnet 推出，引发 AI 圈内热议，好评如潮。Artifacts 将 AI 输出从「对话文本」转向「可以独立交互、实时预览和迭代的内容单元」，在代码、网页、图形等工作流中比单纯的 ChatBot 更加直观高效，改变了人机交互的方式。

那时候 Mike Krieger 刚出来接受采访，你几乎能一眼看出来他和其他泛泛而谈、天马行空的 AI 战略家不同——他是做过产品的。

一个最懂 C 端用户的技术型产品经理(Instagram 创始人)，来到最懂 B 端/Agent 开发的模型公司，会碰撞出怎样的火花?

更具体地说：在当时还基本都是 CUI 的形态下，Artifacts 会如何重构人机交互?

让我意外的是，Claude 并没有——像互联网经典路径那样——围绕 Artifacts 持续迭代细节。

到了2024年底，Krieger 反思：觉得 Artifacts 的方向可能是错的。

结合后来的情况看，Krieger 的反思可以归纳为：Artifacts 在启发性和早期价值上是成功的，但要实现 AI 与人类的真正协作，需要更基础的交互范式——一个能让模型理解高层意图、在更长时间跨度内自主工作，并自然融入用户流程的交互和 Agent 环境设计，而不是在现有 ChatBot 形式上叠加功能。

换句话说：Artifacts 是不错的交互尝试("对话+内容块")，但天花板不高——Claude 并没有停在这里，而是继续往任务执行和 Agent 协作层探索。

2024年11月，Claude 发布 Model Context Protocol，风头无两，迅速成为 Agent 通用协议。

2025年5月，Claude Code 正式发布。Anthropic 最新一轮融资估值应该 3500 亿美元——除了模型本身，Claude Code 可能是估值飙升的最大功臣。

Claude Code 发布前(2025 年 3 月)，Anthropic 估值约为 615 亿美元。

Claude Code 发布不到 4 个月(2025 年 9 月)，ARR 数亿美元，Anthropic 估值飙升至约 1830 亿美元。

Claude Code 发布不到半年(2025 年底)，ARR 突破十亿美元；同期 Anthropic 新一轮融资估值翻倍至约 3500 亿美元。

2025 年 10 月，Claude Skill 上线，风靡全球。

2026 年 1 月，Claude Cowork 发布，我觉得很可能是被低估的通用 Agent。

以上就算在遍地神迹的 AI 时代，这仍然是难得一见的产品创新奇迹、增长奇迹、团队协作奇迹。而这些产品，最初都由 Labs 团队试验。

这个 Labs 团队是什么来头?

Labs 团队其实 2024 年年中才成立，顾名思义，产品探索团队——这个团队最初只有两名成员，却以不可思议的速度和创意推动了 Anthropic 甚至整个 Agent 行业的进步。

直到最近，Anthropic 决定大幅扩张 Labs 团队。和专注于规模化已有产品的 Claude 等团队不同，Labs 专注于构建 Claude 模型的「实验性产品」。

Mike Krieger 宣布卸任 CPO，转为 Labs 的一名工程师(a member of technical staff)，直接汇报给 CEO Amodei。

Mike Krieger 表示：

「AI 已迎来关键转折点——模型能力正以惊人速度发展，塑造模型应用的窗口期就在当下。

因此我将重返建设者模式，从首席产品官职位转入实验室团队：我渴望亲身投身前沿领域，打造能引导人工智能解决全球最棘手难题的产品。」

  

○两天20个demo版本-构建todo lists功能

传统的产品开发流程是：想法 → 讨论 → 画线框图 → 做高保真设计 → 开发 → 测试 → 上线。每一步都要时间，每一步都可能卡住。

现在的流程变成了：想法 → 一句话提示词 → 可运行的原型 → 感觉不对就再来一版。

工作流程通常是先用 Claude Code 生成代码，若效果不理想再由工程师介入修改。有些复杂任务，如重构复杂数据模型，更倾向于手动编写。总体而言，大约80%-90%的代码是由 AI 助手生成的。

*建议观看原型演进步骤的视频，以感受这项功能是如何发展的，以及 Boris 是如何不断尝试新想法，最终将其精简为如今工具中待办事项列表的样式的。*

![图片](https://mmbiz.qpic.cn/mmbiz_gif/y8swr5Nkbyuibo3j6aM2UdmicMXhY0JE9S3DE72hiaRBU16CQR2dM0ib0cwAs9Pmg8HiaoAbQwqdOfWoJ92I3k0cpGQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

https://www.threads.com/@boris\_cherny/post/DOJ5SiCkxG1

  

  

○TDD-测试驱动开发

TDD是一种软件开发的方法论，强调在编写实现代码之前先编写单元测试，并根据测试结果驱动代码的编写。其基本的开发流程是：先写测试，然后编写代码，最后重构。

TDD的工作流程可以简单概括为以下几个步骤：

- 先写一个失败的单元测试
- 编写实现代码，使得该测试通过
- 重构代码，保持所有测试通过状态

Boris 说，用 Claude Code 之后，他做了大量 TDD：

“我会先让模型写一个测试，同时告诉它这个测试现在会失败，不要试图让它通过。然后我再让它写代码实现功能，并且让测试通过，但不能改测试本身。”

“当模型有一个明确的目标去迭代——比如一个单元测试或者一个 mock——它表现得非常好。”

他特别提到，Claude 4.0 是第一个能让模型写大部分测试的模型系列。

Claude Code通过集成测试框架（如Jest， Vitest）赋能测试驱动开发（TDD）。开发者可定义~/claude/skills/中的TDD技能实现自动化工作流。其核心流程为：先利用Claude编写失败的测试用例，再通过代码优化使其通过，最后重构代码以确保质量。

Claude Code 中使用TDD的优势

- 更高的质量与可维护性：Claude 的循环优化能力有助于发现并解决隐藏问题；
- 更快的迭代与反馈循环：自动运行测试提供即时反馈，Claude 能迅速自我修正，大幅减少人工调试干预；
- 降低上下文漂移风险：测试套件作为"事实依据"，让 Claude 不容易偏题，即使在长对话中也能避免引入非预期的代码副作用。

  

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyumwzkzAKJgFfGMXapQZgib2ibalaU5yD3WtUWy2U5yxFXEjFoDkuibDIKI4Od5xBF6f2sDVL7wJAxxQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

Claude Code的产品理念

○ **大道至简**

Claude Code在本地运行。没有Docker容器，没有云端沙箱，而是直接在你的电脑上读写文件、执行命令。

Boris 的回答是：“每次做设计决策，我们几乎都选最简单的方案。本地运行就是最简单的答案。”

> 尽可能少写业务逻辑，让模型做主角。

观察许多 Agent 产品会发现，它们反而成为了模型的阻碍。通过增加 UI 元素和其他杂乱的部件来搭建脚手架，那些本意是帮助用户的功能，最终却限制了模型的能力。因此需要努力将 UI 做到尽可能简洁。

每当有新模型发布时，Claude Code 团队都会删除大量代码。例如，在 4.0 模型发布后，他们删除了大约一半的系统提示词，因为不再需要它们了。

关键是尽量减少模型周边的代码量——最大限度地减少提示词和工具的数量，不断删除旧工具并尝试新工具。

- 代码是数字世界的通用语言，解决好代码问题就能在数字世界畅通无阻。
- Anthropic的一个重要产品开发原则是do the simple thing first-“从简开始”。
- 架构哲学：删繁就简。只需要一个简单的循环，去掉脚手架。少即是多，把舞台留给模型自己发挥。
- 回归软件工程的本质。抛弃Classifiers和路由，抛弃复杂的 DAG（有向无环图），拥抱Master While Loop。
- 在构建Agent 时，团队的“控制欲”往往是AI产品最大的敌人。因为额外的信息会变成噪音，分散了模型注意力。模型原本可以通过“观察-尝试-纠错”的循环自己搞定任务，但人类的“硬编码干预”反而限制了模型的泛化能力。
- Claude Code 的设计哲学是：当你有疑问时，相信模型(rely on the model)
- 不要预设所有边缘情况，以前会写一堆正则来解析输出，现在直接把错误扔回给模型：“你报错了，修好它。”
- 探索即纠错：模型不仅能写代码，还能读懂报错信息。Claude Code 之所以强大，不是因为它一次就能写对，而是因为它在 Master Loop 中具备了自我修复（Self-Correction）的能力。
- 研发团队以前的产品直觉是“把路铺好”，但 AI 时代的直觉应该是“给模型地图，让它自己走”。
- 在工具选择上，不要重新发明轮子，Bash is all you need，让模型学习使用强大的通用工具才是正解。
- Claude Code证明了一个反直觉的事实： **复杂能力可以从简单规则中涌现** 。
![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyuU0SRwBbHmnK1gM4GwOS91xF9yt1bVSVWBpzppW9SLDG0yGqJjia4y8m7UHibPh3MO9SQAJFibo18mA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

  

○Claude Code发布历史

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/KT8diaTkiaUgzwCxOaehpGvnwtRNjkn6e8Lp0s8TgfSUXiau3RpfNeicNmsHkFgBUCWKC6BPKESK3XCQQWdWA96HLib3XlnOdekyicqvpqXIXMVKA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

回顾关键里程碑，可以看到 Anthropic 如何逐步构建其能力：

- 2025 年 2 月：研究预览发布。Claude Code 以代理式 CLI 形式亮相，可读取/编辑文件、运行测试、提交/推送代码。这标志着 AI 从辅助工具转向主动代理。
- 2025 年 3-4 月：内存支持引入。添加本地内存文件（如 CLAUDE.md），实现项目上下文持久化，提升交互智能性。
- 2025 年 4 月：最佳实践指南。Anthropic 发布工程指导，强调安全使用，体现对代理式编码的责任感。
- 2025 年 9-10 月：v2.0 大升级。集成 VS Code、添加检查点/回滚功能，优化 UI 和代理编排，与 Sonnet 4.5 等模型更新同步。
- 2025 年 10-12 月：技能与插件生态。"技能"功能将工具扩展为可插拔平台，支持工作流打包和企业级市场。
- 2025 年 11 月：模型优化。Opus 4.5 提升计划模式，强化任务分解与执行。
- 2025 年 9-12 月：持续迭代。加入 GitHub Actions 集成、安全增强和自动化功能，使其更适用于生产环境。
- 2026 年 1 月：v2.1 系列。技能大修，包括热重载、命令合并，以及图像/文件 UX 优化。

这些迭代从 CLI 起步，超越了 VS Code 插件或 Cursor 等预期形式，证明了原生终端代理的强大潜力。尽管 Claude Code 面向开发者，门槛较高（CLI 操作需技术背景），但 **用户已开始将其用于非编码任务** ——这直接启发了 Cowork 的诞生。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyumwzkzAKJgFfGMXapQZgib2tNoAxF5krkbVzn7VuaM3Zc5az8jqUcmSrHkWjYSUIRGO8rEjaf9cUQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

"大道至简"背后的工程架构

  

○Claude Code整体架构

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/y8swr5Nkbyuibo3j6aM2UdmicMXhY0JE9SQ0oj6vntQpicANxZBpyXibia01krN42D50w68icCx5hY19xLw0FhStWBzQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

以上是逆向推断版出来的 Claude Code 系统架构全景图

  

  

○主循环控制

  

![图片](https://mmbiz.qpic.cn/mmbiz_gif/y8swr5NkbyumwzkzAKJgFfGMXapQZgib24wTxxZwYXOZua68tR5drkbLpic0SjaJC28Y0yQQV63BbOSibMqre5aaw/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

核心引擎是 Claude Code 的"大脑"，负责协调各个组件的工作：

- 消息系统：管理用户输入、AI 响应和工具结果的消息流；
- 查询引擎：与 AI 模型交互，发送请求并处理响应；
- 工具调度器：协调工具的调用和结果处理；

核心调度层是一个叫 nO 的主循环引擎（其实就是 AgentLoop），它负责管理一切智能体行为的“总调度室”。流程图是这样的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/KT8diaTkiaUgzLIAfPz4Qicw8icY9Bjr6vHcPphOaug5QrAUIReMbnPbLOs1d8Ya8xUyLHrarWeRc6iad7z2KyKjZRllNOJp4XQriadoM24voDCoQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

用户每输一句话，Claude Code都会判断：

- 是不是新任务？
- 调用哪些工具？
- 哪些 Agent 该被唤醒？
- 哪些历史信息要压缩？
- 有没有地方出错要补救？

这些决策的执行， **h2A 消息队列** （负责异步传输和流式反馈）， **wu 会话流生成器** （实时生成文字输出），加上一套名为 **wU2 的压缩引擎** 来动态优化用过的上下文。

---

  

○提示词工程与上下文工程

  

记忆系统-CLAUDE.md

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyuU0SRwBbHmnK1gM4GwOS91OpZkO3YaCqicGIQFCXMOx60ygbfq5HBZpjES6cYatNJV0dQ3icicUDAOg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

最底层，是 **存储与持久化系统** 。这是 Claude 记忆力的来源，整个记忆架构分三层。

当前会话 → 放在 Messages 里，支持即时交互；

中期摘要 → 放进 Compressed 模块，由 wU2 压缩器负责优化；

永久偏好 → 写入 CLAUDE.md，包括你常用语言、项目结构、喜好工具等；

系统状态 → 存在 StateCache 里，比如某工具运行次数、是否曾报错、是否因权限受限被禁用等。

每一次调用、每一个决策，其实都依赖于这些存储结构的回忆。

Claude Code 并不依赖于云端记忆，而是靠本地状态文件、上下文压缩算法、状态缓存系统构建出一个“类人记忆”的思维体系。

不需要复杂的微调，也不需要向量库。Claude Code 依靠项目根目录下的 CLAUDE.md 来理解项目规范。

相当于给模型提供“记忆”，避免在每次对话重复说明。

项目根目录下特殊的Markdown文件，内容会在每次会话自动加载作为长期上下文 。开发者可在其中记录项目常用命令、代码规范、测试指引、约定俗成规则等，让Claude始终遵循这些指示 。

这本质上是 **Prompt Engineering 的胜利** 。它让配置变得透明、可读、可由用户甚至 Agent 自己随时修改。

  

### LLM搜索(Grep&Glob)>基于RAG搜索

以前为了让 Agent 理解代码库而建立的复杂向量数据库（Vector DB），现在Claude Code 直接使用 grep 和 glob。这不仅是因为现在的 Context Window 够大，更是因为这符合工程直觉。当你接手一个新项目时，你不会先在大脑里建立一个向量索引，你会先 ls 看看目录结构，然后 grep 关键字。 **模拟人类的行为，往往是最佳策略。**

> 多数长记忆方案采用外部存储系统如向量数据库（ChromaDB）。目前主流是键值存储或图数据库。
> 
> 但我现在的看法是：模型才是最终胜出的方案。
> 
> 随着模型能力提升，它最终会涵盖其他技术。配备合适的工具，模型能自主构建知识图谱或实现键值存储。关键是如何有效地将信息注入上下文。
> 
> 我们早期尝试过RAG（检索增强生成）方案，对整个代码库建立索引，但索引维护和安全隐患是痛点。
> 
> 最终发现智能 Agent 搜索（使用 glob、grep 等标准代码检索工具，让 Agent 自主决定搜索轮次）是更合适的解决方案，尽管有延迟和 token 消耗，但换来的是安全可靠的搜索能力。-Boris Cherny

  

System Prompt核心原则

系统指令的目的只有一个： **让 Agent 看起来更像一个干练的高级工程师**

- Concise Output（极简输出）：除非用户要求细节，否则输出不要超过 4 行。
- No "Here is..."（拒绝废话）：不要说“好的，这是您的代码...”，直接给代码。Just do it.
- Action over Text（行动至上）：能用工具（Tool）解决的，别用文字解释。
- Style Match（风格一致）：严格匹配项目现有的代码风格。
- No Comments（拒绝注释）：除非用户要求，否则不要画蛇添足地加注释。
- Parallelism（并行执行）：鼓励并行运行命令，大规模搜索，并使用 TodoWrite 跟踪进度。

  

To-Do Lists

> 模型依旧是核心，但要用规则把它“拴”在结构化工作流里。

**Todo 工具链** 。它把“规划—执行—复盘”的节奏落在了代码级别，迫使模型对复杂任务进行显式拆解，从而让用户和模型都能清楚地看到每一步发生了什么。

- 结构化约束代替自由生成：单纯的文本指令很容易让模型忘记计划，Todo工具则把“计划”实体化为数据结构，模型只有维护好它才能继续执行。
- 显式反馈增强自我监督：每次Todo更新都会立即显示当前状态，模型能在下一轮读到这段文本，相当于用环境反馈提醒它“你现在在做哪一步”。
- 系统提示形成软约束：提醒块不是条件语句，而是上下文资料；它们用最小侵入的方式告诉模型“别忘记Todo”，既保留灵活性，又能降低跑偏概率。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/KT8diaTkiaUgz3osbo2PvdT5jcmyBXLOtIccLXzLJKjjY0xz0SqFQlfkGUe2yJiajvMSWODQib6AYg6fCD0ia18HyysvmybxwrB5w6zuibhT6yn9o/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)

- Todo List 给用户一种“确定性”的心理安全感。
- Todo List支持断点续传：即使程序 Crash 了，重新把 To-Do List 喂给模型，它也能知道下一步该干嘛。

---

  

○子代理 **subagents-分而治之**

当任务规模再大一些，比如"探索整个代码库然后重构认证模块"，单一代理就会陷入上下文膨胀的泥潭：探索时的大量文件内容、重构时的代码细节，全部堆在一个对话里，模型的注意力被稀释，效果急剧下降。

Claude Code 的解法是 **Task 工具** ——让主代理（主 Agent）像项目经理一样，把子任务派发给专门的"子代理"（Subagent），各自独立完成后再汇报结果。

> Subagents 这个功能的灵感，来自 Reddit 上的一条帖子。有人说他同时开了五个 Claude Code 实例，给每个实例设定不同的角色，然后用文件系统让它们互相通信。

每种子代理类型定义三件事：

**1、什么时候用（description）：写进 Task 工具描述，让主代理知道何时派发**

**2、能用什么工具（tools）：白名单机制，explore 只能读不能写**

**3、怎么工作（system\_prompt）：代理专属指令，聚焦单一职责**

Claude Code 中， `Task` 就是一个子智能体。它接收两个参数：描述给用户看和接受提示词。这就很有趣了： **编程智能体在为自己的子智能体编写提示词** 。如果任务报错，它可以把更多信息塞进这个提示词字符串里，让模型去解决。

整个机制的核心，核心逻辑只有 5 步：

**隔离消息历史** 是灵魂：子代理看不到主对话的任何内容，也不会污染主对话。它执行完毕后，只有最终总结文本被返回——就像员工提交的工作报告，而不是把所有草稿都堆到老板桌上。

![图片](https://mmbiz.qpic.cn/mmbiz_png/KT8diaTkiaUgz0hnic1iaibST1lfpnIicZ1QkRiaBRDhibOuwpkcJQdrDmUashhVO3nxno1mdY56H7UAb4wGIxBJTdjho2BxCSiaspjiaAzFuz0wB9EI4/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=13)

  

○ Skills：让模型成为领域专家

Claude Code引入了子代理机制——用 Task 工具将复杂任务分解给专门的"员工"处理。但有一个问题始终存在：

**模型怎么知道"如何"处理特定领域的任务？**

让模型处理 PDF？它需要知道用 `pdftotext` 还是 `PyMuPDF` 。让模型构建 MCP 服务器？它需要知道协议规范和最佳实践。让模型做代码审查？它需要一套系统的检查清单。

这些"领域知识"不是工具，而是 **专业技能** 。

Claude Code 的解法是 **Skills 机制，** 一套开放标准，让模型按需加载领域专家的"说明书"。这个机制的核心： **渐进式披露 + SKILL.md 标准 + 上下文注入** 。

如果说 MCP 为智能体提供了"手"来操作工具，那么 Skills 就提供了"操作手册"或"SOP（标准作业程序）"，教导智能体如何正确使用这些工具。

这种设计理念源于一个简单但深刻的洞察： **连接性（Connectivity）与能力（Capability）应该分离** 。MCP 专注于前者，Skills 专注于后者。这种职责分离带来了清晰的架构优势：

**MCP 的职责：提供标准化的访问接口，让智能体能够"够得着"外部世界的数据和工具**

**Skills 的职责：提供领域专业知识，告诉智能体在特定场景下"如何组合使用这些工具"**

![图片](https://mmbiz.qpic.cn/mmbiz_png/KT8diaTkiaUgyhXEYuuAFdj84pPQZc2O22r8SOgPBYxcd9UCW2ymtsick2fTueJdhQkHm80kdYU9XCfy5w4yHRUZHibAsgM5bDJu6hlYw9bbOnE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=14)

  

核心洞察

- Skills机制体现了一个深刻的范式转变：知识外化 (Knowledge Externalization)。
- 解决过去核心痛点：AI Agent是"工具调用器"——模型决定用什么工具，代码执行工具。但忽略了模型如何知道应该怎么做？
- Skill内容作为新消息追加到末尾
- 之前的所有内容（system prompt + 历史消息）都被缓存复用
- 只有新追加的skill内容需要计算，整个前缀都命中缓存

  

### 早期LLM的困境

![图片](https://mmbiz.qpic.cn/mmbiz_png/KT8diaTkiaUgwMl8RerccQR8fBEF8j4XtO3ALy1By0gctcCpZc9ibhx4ficTEVyhicP3Bl7V8CwKvruS2kuEqiamoic4pribTqau5pcnfFoVVSia3Z6Y/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=15)

### 传统LLM系统的知识都藏在模型参数里，普通用户没法访问、没法修改、没法复用。

想让模型学会新技能？传统做法：收集数据 → 设置集群 → 参数微调（LoRA/全量）→ 部署新版本。

知识被100%完全锁在神经网络的权重矩阵中。

**过去：修改模型行为 = 修改参数 = 需要训练 = 需要 GPU 集群 + 训练数据 + 专业知识**

**现在skill 的出现：修改模型行为 = 修改 SKILL.md = 编辑文本文件 = 任何人都可以做**

这就像给 base model 外挂了一个可热插拔的 LoRA 权重，但用户不需要对模型本身进行任何参数训练。

传统的微调是 **离线学习** ：收集数据→训练→部署→使用。 Skills 是 **在线学习** ：运行时按需加载知识，立即生效。

**这就是知识外化的力量：把需要训练才能编码的知识，变成任何人都能编辑的文档。**

  

## Skills的本质是知识包，而不是工具

在 AI Agent快速发展的今天，面临的挑战： **如何让 AI 代理高效地学习和使用新技能？传统做法是将所有指令塞进系统提示词，但这会导致：**

- 上下文爆炸：提示词过长，成本飙升
- 维护困难：修改一个功能需要重构整个提示词
- 无法复用：不同代理之间无法共享能力
- 扩展受限：添加新功能需要重新设计架构

**为什么不直接把所有知识写进系统提示词？**

因为上下文是稀缺资源。一个 Skill 可能有 2000 词的详细指南，如果你有 20 个 Skills，启动时就要注入 40000 词——模型的注意力会被稀释到几乎无效。

工具是能力，技能是知识。工具执行动作，技能指导决策。

Skills 更像是给 Claude 的一本 “操作手册”，它告诉模型完成某项任务的具体步骤、最佳实践和注意事项。 它关注的是过程和方法。

Skills 的设计极其注重 Token 效率。 初始加载时，每个 Skill 只占用几十个 Token 来存储其元数据。 只有在被触发时，Skill 的详细指令才会进入上下文窗口。 这种按需加载的机制意味着您可以安装大量的 Skills，而不会因为上下文窗口被占满而影响模型性能。 对于更复杂的 Skill，还可以将不同的指令拆分到多个文件中，Claude 只会读取当前任务所需的部分，进一步节省了 Token。

  

### 渐进式披露

### Agent Skills 最核心的创新是渐进式披露（Progressive Disclosure）机制。这种机制将技能信息分为三个层次，智能体按需逐步加载，既确保必要时不遗漏细节，又避免一次性将过多内容塞入上下文窗口。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/KT8diaTkiaUgxsibkicdnibHEeVUUdeD28qgMMgxf9rE0zFth4erYZpziaErLxB9XY72QrKEWufQDDibhbuqn2LSNPBqXhfjnRUI3eyiauUZ3AqfncQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=16)

**1）Level 1（元数据，始终加载）：**

SKILL.md 文档内的元数据，包含名称与用途描述。长度约 100 tokens。

Agent 启动时，就在 Context Window 中加载 Skill 元数据，将其包含在系统提示中。

AI 通过理解用户消息与 Skills 元数据的匹配情况，判断是否需要自动使用技能。

默认只加载元数据 → 意味着可以给一个 Agent 同时安装很多 Skills 但不影响上下文性能。

**2）Level 2（指令，触发时加载）：**

SKILL.md 文档内的正文内容，也就是主要技能指令，一般包含工作流程、最佳实践和指导。

建议少于 5000 tokens。

当用户发出的消息与Skill 元数据的描述匹配，需要调用 Skill 时，Agent 才会用 bash 读取文档正文 。读取时文档内容加载到 Context Window 中。

**3）Level 3（子技能指令 / 资源 / 代码，按需动态加载）：**

由子技能文档、代码脚本、参考文档、可用资源等文件构成。

也有 Agent Skill 规范文档将它们统称为「Resource」。相对来讲，Level 3 结构要求没那么严谨。

- Sub-SKILL.md 子技能文档：相对独立、复杂的子技能指令，单独放在 Level3 拆分加载
- 随着一个 Skill 的复杂度提升，可能因为技能知识的上下文过长，或者有些知识仅在特定场景使用，而不适合放入单个SKILL.md，可被分拆为独立指令文档，仅在必要时加载。
- Scripts 代码脚本：视作“Agent 的可执行资源”，而不算 tool use（tool use 是 Agent 外部调用的独立服务）
- Agent 在 Agent 电脑（虚拟机）中直接调用脚本，脚本代码本身不进 Context Window，只有脚本运行完成后的输出会进 Agent 的 Context。
- Reference 参考文档、Assets 可用资源，当然都是 Level 3，仅在必需时动态读取加载。

---

  

○工具集与Bash

Bash is All You Need

Claude Code 的工具箱极其精简，但每一个都切中要害。

如果只保留一个工具，那就是 **Bash** 。  

Unix 哲学告诉我们：一切皆文件，一切皆可管道。而 bash 是这个哲学的入口：

- 它能跑脚本、能运行测试、能安装依赖、甚至能重启服务。
- 它是 Agent 与数字世界交互的通用接口。
- 最重要的是，LLM 训练数据里有海量的 Bash 语料，模型天生就是 Bash 高手。

  

**Claude Code 中的工具：**

工具系统使Claude Code能够与外部环境交互，包含四类工具：

**文件工具：读取、写入、搜索文件**

**执行工具：运行shell命令、执行代码**

**分析工具：代码分析、依赖检查等**

**元工具：复合工具，可执行更复杂的任务**

Claude Code内置16个工具，实现和提示词都值得学习：

- Task任务
- Bash
- Glob 全局匹配
- Grep
- LS
- ExitPlanMode-退出计划模式
- Read-读取
- Edit-编辑
- MultiEdit-多重编辑
- Write-写作
- NotebookEdit-笔记本编辑
- WebFetch-网页抓取
- TodoWrite-待办写入
- WebSearch-网络搜索
- mcp\_\_ide\_\_getDiagnostics
- mcp\_\_ide\_\_executeCode

  

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyumwzkzAKJgFfGMXapQZgib2EWXib4EfGTzhAcQRDx30MxCmFb0ZWIlzzADbllUDkPwLXJb89cPyZMQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=17)

用户即驱动力-Cowork的诞生

2024 年底，Boris 发布 Claude Code 内测版，功能还很弱，自己只当记事本用。第二天同事 Robert 就已经用它写代码、操作 git 了。

几个月后,Anthropic 的工程师们已经日常使用 Claude Code。有一天 Boris 走进办公室,看到数据科学家的电脑上也开着 Claude Code 终端。他问"你也在试这个?",结果发现对方不是在试用,而是在干活——写 SQL 查询、做数据分析、画 matplotlib 图表,甚至用 ASCII 字符在终端里画简易图表。

Claude Code 是给工程师做的,数据科学家却拿它来工作。一周后,整排数据科学家的屏幕上都是 Claude Code。

随后几个月,同样的事情反复上演。设计师用它做原型和改文案,财务用它建模型、做预测,销售用它分析 Salesforce 和 BigQuery 数据,用户研究员用它处理问卷结果。

到现在,用户用 Claude Code 做的事情已远超编程范畴:控制烤箱、从坏掉的硬盘里恢复婚礼照片、分析自己的 DNA 和医疗记录、跟客服讨价还价。

所以有了 Cowork

Boris 说,到某个时刻,这些事情就不再让他惊讶了。"我们应该让那些想用 Claude agent 做非编程事情的人更容易上手"——这变得显而易见。于是就有了今天发布的 Cowork。

他在推文里还说:"产品还早期,还不够完美,但人们已经发现它在各种意想不到的场景下极其好用。"

这话听着像自谦,其实是 Anthropic 做产品的一贯风格:先发布、让用户玩起来、再根据反馈迭代。Claude Code 就是这么长大的。

AI agent 正在从程序员玩具变成通用工具

Claude Code 最初只是给工程师用的命令行工具,但它的本质是自然语言交互——你告诉它要做什么,它帮你执行。这个能力跟你会不会写代码没关系。数据科学家能用,财务能用,设计师也能用,只是原来的界面对他们不够友好。

Cowork 做的事情,就是把这个能力包装成更多人能接受的形态。

Anthropic 的产品嗅觉:不是先想"我们要做一个面向非程序员的产品",而是观察到用户已经在这么用了,然后顺势而为。用户行为是最好的产品经理。

  

○Cowork背后的架构

"Cowork" 并非孤立的产品，而是 Claude Code 这一底层通用引擎的图形用户界面（GUI）表现形式。它 **授予 Claude 访问特定文件夹的权限** ，实现文件的读取、编辑和创建，专注于日常任务。相比 Claude Code 的开发者导向，Cowork 通过 macOS 桌面应用降低使用门槛，成为 **文件工作流的"数字同事"** 。

核心能力包括：

- 任务代理与规划：用户设定目标后，Claude 自动拆解步骤、执行并反馈。例如整理下载文件夹、从截图提取费用生成表格，或整合笔记起草报告。这源于 Claude Code 的规划模式，但更注重易用性。
- 并行处理：支持任务队列，模拟"留言给同事"的协作方式，无需实时交互。
- 集成扩展：与Claude连接器联动，处理外部数据；初始技能支持文档和演示；Chrome扩展实现浏览器任务。
- 安全机制：操作前确认、检查点回滚（继承自 Claude Code）。虽有文件删除风险，但强调用户监督。

要理解 Cowork的强大与局限，我们必须剥开其Electron应用的表层，深入其操作系统层面的实现。

在企业级环境或个人设备上运行 Agent，核心风险在于 **“不可控的副作用”** 。

一个拥有文件读写权限和 Shell 执行能力的 AI，如果缺乏严格的约束，可能因幻觉或提示注入（Prompt Injection）导致灾难性的后果（如误删关键文件、泄露敏感数据）。

![图片](https://mmbiz.qpic.cn/mmbiz_png/KT8diaTkiaUgxxO6OzxJZM7FpajhxfFB0NwRibg1EBlbWf6tHjW7dVNGOKfRjl6Atib5TpzporfPlFrwcZscPOWObrgwjryIlW564A6iaMy7QFII/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=18)

核心是两层隔离:第一层 **macOS 通过 Apple 虚拟化框架启动 ARM64 Ubuntu 22.04 虚拟机** (需 Apple Silicon);第二层在虚拟机内用 **bubblewrap + seccomp** 限制进程权限和系统调用。

网络访问统一走本地代理(HTTP/SOCKS),便于管理和控制。

文件分临时和持久两类:多数为一次性环境,但输出、上传、配置等目录可挂载留存。Cowork 提供隔离的代码执行、文件读写和受控联网环境,降低宿主风险;但可访问目录中的内容可能被任务读取和发送,敏感数据需谨慎处理。

  

○Cowork的沙盒机制

Claude Cowork 并不是在本地电脑上直接跑脚本，而是在一台Mac本地的 Linux 虚拟机里执行任务，并且在虚拟机内部又再加了一层“更小的Sanbox”，限制权限和能力的安全使用。架构图如下：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/KT8diaTkiaUgwFs2U7wstcAXC3oZWO0KMnDDJmsE86wnorZBNy0KQt76iaaick8f1iaxZDaWGME5icNgLPhdLuPrctPmuGYnIEKWaG7nzDdwNT05s/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=19)

启动 Cowork 会话时：

1. 下载一个约 2GB 的 Linux 根文件系统（或从热缓存中“提升”）。
2. VZVirtualMachine 启动虚拟机，并分配 8GB 内存。
3. Claude Code CLI 安装在虚拟机内部。
4. 用户的文件夹通过 VirtioFS 挂载。
5. 所有操作都在带有 seccomp 过滤器的 bubblewrap 沙箱中运行。

**Cowork 利用 Apple 的 VZVirtualMachine 框架启动定制 Linux 根文件系统。**

**为何需要虚拟化？：主要还是为了安全而创建沙箱。用户授权的文件夹挂载到 Linux 虚拟机中，所有工具执行都在虚拟机内部进行。即便代理失控或生成恶意脚本，也被限制在虚拟机内，保护宿主系统。**

**Cowork 不仅生成文本，更在"使用计算机"。它拥有虚拟化桌面环境,可运行浏览器、打开文件并操作数据，完全镜像人类工作方式。**

  

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyumwzkzAKJgFfGMXapQZgib2UXiaw08TBojic59rtvrnnywkZ6VIlVpq0S4dXLgkQfFZabTcz1pMzY1g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=20)

给AI团队一些结语和使用指南

> 王兴说：当我们第一次学骑自行车时，大家都有点害怕，所以眼睛盯着车轱辘或脚下，但实际上应该把眼光放在朝前看。不只关心脚下，要朝前看，你就会知道在什么地方应该执行、怎么做，才能有协调性。在公司发展上，在个人成长上，也是类似。

○Claude Code团队内部使用指南

上周公司年会，芯片领导正式宣布面向研发部门推出每人200美刀起的coding工具套餐，同时算法部门需要帮助各业务部门创建管理各种Skill提高内部工作效率，这基本意味着：今年AI企业的业务核心流程已经在大幅度重构。

下面来自Claude Code创建者的实战经验分享，揭示Anthropic团队如何使用AI编程助手。

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyumwzkzAKJgFfGMXapQZgib2lxRCs7h7uiaP7xG2YzChYVx1MH5FUsaEJUgbJM1V4R7pq0nNcjiaTtbA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=21)

  

---

  

○我们拿着最强大的工具,却还在优化十年前的产品

**上周产品评审会上,我们讨论了如何让 AI 生成的文案更精准、摘要功能更智能、客服机器人更像真人。**

然后boss突然问:"所以,我们到底在解决什么 **新问题**?"

## 技术在狂飙，产品却在打转。

**最近越来越明显地感受到:做 AI 产品的"无力感"正在超过"兴奋感"。**

**技术侧每个月都有突破——上下文窗口从 128K 扩展到 256K、图片生成越来越精细、AI 能分析金融行业的数据和研报。**

**但产品侧还是那些老问题:用 AI 写文案、用 AI 做图(以前用 PS)、用 AI 总结文章。**

**效率在提升,但产品创新的范式没变。**

**我们只是在用更强大的 AI 满足十年前就存在的需求。**

**这就像拿到了内燃机,却只想着造更快的马车。**

  

## 用错了思维模式

过去产品经理太熟悉那套"经典方法论"了：定义问题 → 拆解流程 → 数据驱动 → 小步快跑。

这套方法在移动互联网时代是制胜关键,因为那时的游戏规则是： **在已知地图上优化路径** 。

需求明确,赛道清晰,竞争的是执行效率。

**但现在,游戏规则变了。**

大模型不是"已知地图上某条路的升级",它是直接给了我们一整套"地质勘探和地形改造"的工具。

**地图本身要重画，而我们还在用"优化路径"的思维，面对一片未知大陆。**

  

## 真正的转变:从"优化"到"定义"

那些真正脱颖而出的 AI 产品，都完成了一个根本转变:

**从设计用户流程转向定义上下文的交互框架。范式转变：AI native产品设计从"面向流程设计"变成"面向context设计"——你得先知道模型需要什么上下文，再倒推用户流程。**

换一种思考,你会问完全不同的问题:

- 用户需要的是"生成内容"还是"思考的对话伙伴"?
- AI 应该直接给答案还是引导用户找答案?
- 什么时候 AI 该主动,什么时候该等待?
- 人机协作的权限边界在哪里?

**这些问题的答案,会产生完全不同的产品。**

## 新能力:技术体感+人性洞察

完成这个转变，产品团队需要一种新的混合能力:

**对技术的"体感":不是看技术文档就能懂。你需要真正去用、去感受不同模型的“性格”和边界，理解它能做什么、不能做什么、在什么情况下会“涌现”出惊喜。**

同时，你又必须超越技术逻辑，从人的真实处境和潜在渴望出发，去倒推应该构建什么样的产品。

这种能力，很难从过去的成功案例中直接复制。

你必须回答:用户真正的痛点是什么?AI 介入后人的角色如何变化?哪些环节必须由人完成?

**这种能力,无法从过去的成功案例中复制**

## 话语权转移:谁能定义新框架,谁可能就能赢

当技术可能性变得模糊而广阔,当没有标准答案—谁能提出一个逻辑自洽、能被团队和市场理解的"新故事",谁就掌握主动权。

这个"故事"要回答三个问题:

1. 我们要解决什么 **新问题**?(不是把旧问题解决得更好)
2. AI 在其中扮演什么角色?(具体的交互框架,不是模糊的"助手")
3. 人机协作的边界在哪里?(什么必须由人决策)

## 新旧范式的分水岭

**现在正在发生的"话语权转移"，转移的其实是对未来人机协作基本形态的"定义权"和"解释权"。**

**当技术可能性变得模糊而广阔，谁能提出一个逻辑自洽、能被团队和市场理解的"新故事"，谁就掌握了主动权。这个"故事"不是虚构的愿景，而是基于技术现实和用户洞察推演出的可信产品蓝图。**

**这个位置并不好坐。它意味着你必须在"技术可能性"和"用户可接受度"之间持续做高难度的权衡。你提出的每一个新框架，都在挑战旧习惯，都需要用快速实验去验证和调整。**

**但它的价值也在于此：在范式转型期，最大的贡献往往不是做出完美的功能，而是为行业探索并验证出可行的新思路。**

**说旧范式已死或许为时过早，但它确实已触及天花板。**

**新范式的核心，或许就在于我们能否放弃对"优化已知"的路径依赖，转而培养"定义未知"的思考和勇气。**

**这个过程注定会淘汰一批旧地图的忠实信徒，也会让一批新地图的绘制者走到舞台中央。**

  

引用：

1.深入探讨虚拟机隔离与 Linux 的可能性：https://aaddrick.com/blog/reverse-engineering-claude-desktops-cowork-mode-a-deep-dive-into-vm-isolation-and-linux-possibilities

2.容器环境：https://gist.github.com/simonw/35732f187edbe4fbd0bf976d013f22c8
  

![图片](https://mmbiz.qpic.cn/mmbiz_png/y8swr5NkbyugoGdF4YFTMiccYdibWmRN7dX4epVuzxh48ttdSfp52qkI6vNzRwczWTnc8MibjXxsFMx29dU2XCbvQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=23)

