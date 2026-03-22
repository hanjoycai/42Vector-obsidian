---
base: "[[大模型-强化学习.base]]"
属于名称: 奖励函数模型 Reward Model
描述: 强化学习中的奖励模型（Reward Model）是其核心组成部分之一，主要任务是根据给定的输入和反馈来预测奖励值，从而指导学习算法的方向。在强化学习过程中，智能体通过不断地与环境进行交互，收集并分析来自环境的奖励信号，以优化其行为策略。
AIGC领域:
  - 模型
---
### 简介

Reward Model（奖励模型）是强化学习过程中一个关键的组成部分。它的主要任务是根据给定的输入和反馈来预测奖励值，从而指导学习算法的方向。在RLHF（Reinforcement Learning from Human Feedback）中，Reward Model 通过整合人类反馈，帮助强化学习算法更有效地优化策略。

在大语言模型训练中，Reward Model 通常指的是偏好模型（Preference Model）。通过在训练时提供相同提示词的好与坏（chosen&rejected）的回复来拟合人类的偏好，并在推理时预测出一个奖励值，以指导 RLHF 过程中 Actor 模型的优化过程。

Reward Model的应用场景包括但不限于：

- **RLHF训练**：在使用 Proximal Policy Optimization（PPO）算法进行 RLHF 训练时，Reward Model提供奖励信号，指导模型优化策略，提高生成内容的质量并使其更贴近人类偏好。
- **BoN采样**：在 Best-of-N（BoN）采样过程中，用户可以使用 Reward Model 对同一个提示词的多条回复进行打分，并选择奖励得分最高的生成结果，从而提升模型的输出效果。
- **数据构造**：Reward Model 可以用于评估和过滤训练数据，或者也可以使用 Reward Model 替代人工标注来构造 DPO 训练数据。

### **关于RLHF **

RLHF 是一项涉及多个模型和不同训练阶段的复杂概念，根据OpenAI的思路，RLHF分为三步：

收集人类反馈，并根据人工标注数据（prompt-completions pairs），预训练/微调一个语言模型
用多个模型（可以是初始模型、finetune模型、人工等等）给出同一个问题的多个回答，然后人工给这些问答对按一些标准（可读性、无害、正确性blabla）进行排序，聚合问答数据并训练一个奖励模型（Reward Model，RM）来进行打分

**用强化学习 (RL) 方式微调 Pretrain LM，得到一个SFT-LM**

![[Untitled 341.png]]

### **为什么需要奖励模型**

奖励模型的作用是评估LLM生成文本的质量，并提供相应的奖动信号。通过将奖励信号反馈给LLM，可以逐步调整模型的参数，使其生成的内容更加优秀。

1.模型输出可能不符合人类偏好
上一篇讲的SFT只是将预训练模型中的知识给引导出来的一种手段，而在SFT 数据有限的情况下，我们对模型的引导能力就是有限的。这将导致预训练模型中原先错误或有害的知识没能在 SFT 数据中被纠正，从而出现「有害性」或「幻觉」的问题。

2.需要利用强化学习优化模型
一些让模型脱离昂贵标注数据，自我进行迭代的方法被提出，比如：RLHF，DPO，RLHF是直接告诉模型当前样本的（好坏）得分，DPO 是同时给模型一条好的样本和一条坏的样本。最终目的是告知模型什么是好的数据，什么是不好的数据，将大模型训练地更加符合人类偏好。

3.设计有效的奖励模型是强化学习的关键一步
设计有效的奖励模型是 RLHF 的关键一步，因为没有简单的数学或逻辑公式可以切实地定义人类的主观价值。

![[Untitled 342.png]]


在进行RLHF时，需要奖励模型来评估语言大模型（actor model）回答的是好是坏，这个奖励模型通常比被评估的语言模型小一些（deepspeed的示例中，语言大模型66B，奖励模型只有350M）。奖励模型的输入是prompt+answer的形式，让模型学会对prompt+answer进行打分。
奖励模型的目标是构建一个文本质量对比模型，对于同一个提示词，SFT 模型给出的多个不同输出结果的质量进行排序。


### RM模型组成

RM模型主要分为两个部分：训练数据获取和模型训练部分。流程如下图所示

![[Untitled 343.png]]

**构建 reward model 的挑战**
Amount of feedback data（反馈数据量）：生成足够准确的奖励模型所需的数量和种类的人类反馈数据具有挑战性。
Feedback distribution（反馈分布）：理想情况下，我们希望奖励模型不仅能准确预测模型所见数据的奖励，还能准确预测训练数据分布 (OOD) 之外的数据的奖励。
Reward gaming（奖励博弈）：如果奖励函数中存在多个循环黑洞，在 RL 期间，代理可以利用它们获得更多奖励，而不会收敛到预期值。


### **奖励建模的实现步骤**

奖励建模通常涉及以下步骤：

1. 从Base LLM（例如GTP-3.5、LLaMA、通义千问）开始，收集提示（prompts）和响应回答（completions）
2. 通过人工反馈，给每个prompt的不同completions进行两两比较排名，表明人类人对不同响应回答（completions）的偏好，并通过ELO等算法将两两排序转化为不同completions对应的score分值
3. 训练一个RM模型（一般情况下也是一个LLM），输入”prompt-completions pair with score labels数据集“继续训练，训练得到的RM模型，具备输出给定prompt-completions pair的score分值的能力
4. 策略模型训练

- 首先将微调任务表述为 RL 问题。首先，该 策略 (policy) 是一个接受提示并返回一系列文本 (或文本的概率分布) 的 LM。这个策略的 行动空间 (action space) 是 LM 的词表对应的所有词元 (一般在 50k 数量级) ，观察空间 (observation space) 是可能的输入词元序列，也比较大 (词汇量 ^ 输入标记的数量) 。奖励函数 是偏好模型和策略转变约束 (Policy shift constraint) 的结合。

- PPO 算法确定的奖励函数具体计算如下：


将提示 x 输入初始 LM 和当前微调的 LM，分别得到了输出文本 y1, yw


将来自当前策略的文本传递给 RM 得到一个标量的奖励


最后根据 PPO 算法，我们按当前批次数据的奖励指标进行优化 (来自 PPO 算法 on-policy 的特性) 。PPO 算法是一种信赖域优化 (Trust Region Optimization，TRO) 算法，它使用梯度约束确保更新步骤不会破坏学习过程的稳定性。DeepMind 对 Gopher 使用了类似的奖励设置，但是使用 A2C ( synchronous advantage actor-critic) 算法来优化梯度


最后得到一个符合人类偏好的RM神经网络，接下去就可以利用 RM 输出的奖励（对不同completions的打分），自动化筛选出更符合人类偏好的completions，以此不断微调优化 SFT-LM


**Reward Modeling训练**

关于训练奖励数值方面，这里需要人工对 SFT-LM 生成的回答进行打分，

直接对文本标注分数来训练 RM，但是由于标注者的价值观不同导致这些分数未经过校准并且充满噪音。
另一种想法是通过排名，比较多个模型对同一个prompt的completions输出并，然后使用  Elo 系统建立一个完整的排名。这些不同的排名结果将被归一化为用于训练的标量奖励值。
关于刻画文本质量的标量数字，用公式表示如下：


$$
\begin{equation}\operatorname{loss}\left(r_\theta\right)=-E_{\left(x, y_0, y_1, i\right) \sim D}\left[\log \left(\sigma\left(r_\theta\left(x, y_i\right)-r_\theta\left(x, y_{1-i}\right)\right)\right)\right]\end{equation}
$$

- x 表示 prompt
- y 表示 completions
- rθ 表示参数为 θ 的奖励模型的打分值scores
- σ 表示sigmoid函数

![[Untitled 344.png]]

奖励模型接收一系列文本（good or bad prompt-completions pair）并返回一个标量奖励（scores），数值上对应人的偏好。

这个过程中一个有趣的产物是目前成功的 RLHF 系统使用了和生成模型具有 不同 大小的 LM，例如

OpenAI 使用了 175B 的 LM 和 6B 的 RM
Anthropic 使用的 LM 和 RM 从 10B 到 52B 大小不等
DeepMind 使用了 70B 的 Chinchilla 模型分别作为 LM 和 RM


![[Untitled 345.png]]


**策略模型训练**
首先将初始语言模型的微调任务建模为强化学习（RL）问题，因此需要定义策略（policy）、动作空间（action space）和奖励函数（reward function）等基本要素。

策略就是基于该语言模型，接收prompt作为输入，然后输出一系列文本（或文本的概率分布）
动作空间就是词表所有token在所有输出位置的排列组合（单个位置通常有50k左右的token候选）
观察空间则是可能的输入token序列（即prompt），显然也相当大，为词表所有token在所有输入位置的排列组合
奖励函数（reward）则是基于之前我们训好的RM模型计算得到初始reward，再叠加上一个约束项来


![[Untitled 346.png]]

对于强化学习的算法，常见的可行方案是使用策略梯度强化学习 (Policy Gradient RL) 算法、近端策略优化 (Proximal Policy Optimization，PPO) 微调初始 LM 的部分或全部参数。 

PPO 算法优化奖励函数计算步骤如下：

将prompt x输入初始 LM 和当前微调的 LM，分别得到了输出文本 y1，y2，将来自当前策略的文本传递给 RM 得到一个标量的奖励 rθ
将两个模型的生成文本进行比较，计算差异的惩罚项，通常设计为输出词分布序列之间的Kullback–Leibler (KL) 散度的缩放，即，其中
这一项被用于惩罚 RL 策略在每个训练批次中生成大幅偏离初始模型，以确保模型输出合理连贯的文本。如果去掉这一惩罚项可能导致模型在优化中生成乱码文本来愚弄奖励模型提供高奖励值。


![[Untitled 347.png]]

最后根据 PPO 算法，我们按当前批次数据的奖励指标进行优化 (来自 PPO 算法 on-policy 的特性) 。PPO 算法是一种信赖域优化 (Trust Region Optimization，TRO) 算法，它使用梯度约束确保更新步骤不会破坏学习过程的稳定性，另外也可以使用 A2C (synchronous advantage actor-critic) 算法来优化梯度。

### 参考链接

[https://zh.wikipedia.org/wiki/基于人类反馈的强化学习](https://zh.wikipedia.org/wiki/基于人类反馈的强化学习)
