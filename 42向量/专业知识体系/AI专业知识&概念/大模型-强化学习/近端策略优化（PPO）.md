---
base: "[[大模型-强化学习.base]]"
属于名称: 近端策略优化（PPO）
描述: 近端策略优化（Proximal Policy Optimization，PPO）是一种在强化学习领域广泛应用的算法，由John Schulman等人于2017年提出。PPO的核心思想是通过限制新旧策略之间的差异来提高学习的稳定性和效率。
AIGC领域:
  - 大模型
---

> OpenAI：我们正在发布一类新的强化学习算法--近端策略优化（Proximal Policy Optimization，PPO），其性能可与最先进的方法媲美，甚至更好，同时在实现和调整方面也要简单得多。PPO 因其易用性和良好的性能，已成为 OpenAI 的默认强化学习算法。

![[Untitled 455.png]]

### 简介

> 近端策略优化是一种强化学习技术，可用于训练语言模型以生成连贯且上下文相关的文本，使其在自然语言处理和理解任务中具有价值。

> [!note] 🧾
> 语言模型对齐奠定基础的算法，**LLM对齐的关键 —— **近端策略优化 (PPO) 

![[Untitled 456.png]]

### **大白话近端策略优化 (PPO)：**

PPO 或近端策略优化是一种智能技术，用于通过 `**trial**` 和 `**error**` 解决与计算机教学相关的问题。可以将其视为训练机器理解和生成类人文本的一种有用方法。

工作原理如下：想象一下，你正在训练一个计算机程序，就像一个虚拟学生，让它写出越来越好的作文。PPO 帮助这个虚拟学生逐步提高他们的论文写作技巧。

PPO 鼓励循序渐进的微小改进，而不是一下子做出大的改变。这样，虚拟学生的写作不会从一篇文章到下一篇文章发生巨大变化。这就好比在不完全改变其风格的情况下，一点一点地提高他们的写作技巧。

这种谨慎的方法有一个特别的名字：近端策略优化。"近端 "是指贴近原始风格，而 "策略优化 "是指找到更好的策略。通过贴近原始风格，虚拟学生的进步会更加稳定和持续。

现在，让我们将其应用于大型语言模型 (LLMs)，即能够理解和生成类似人类语言的高级计算机程序。PPO 通过对这些模型的语言生成技能进行微小调整，帮助它们学习。

将 LLM 想象成一位正在学习如何编写更吸引人的故事的作家。PPO 不会突然改变它的写作方式，而是引导它稍作改进。这将确保新故事与以前的故事相似，只是更好一些。

最终目标是教会 LLM 创作出能获得读者最佳反响的故事。这就好比帮助LLM成为一个熟练的讲故事人，知道如何抓住人们的兴趣和想象力。

因此，PPO 就像一位耐心的老师，帮助计算机稳定可靠地提高技能。这是一种强大的技术，尤其是在训练大型语言模型以更好地理解和生成类人语言时。


### PPO 原理和工作阶段

PPO 对于语言模型的工作原理：

1. **策略和价值函数**： PPO 涉及两个关键组成部分：策略函数（通常由神经网络表示）和价值函数。策略函数根据输入数据定义模型的操作或决策，而价值函数则估计遵循特定策略的预期累积奖励。
2. **策略迭代**： PPO遵循策略迭代方法。它从初始策略开始，并迭代地完善它以提高性能。在每次迭代期间，模型通过与环境交互来收集数据。对于语言模型，这种交互可能涉及根据输入提示生成文本。
3. **目标函数**： PPO旨在通过最大化目标函数来优化策略。该函数结合了两个关键术语：代理目标和正则化项。替代目标使用当前迭代期间收集的数据来衡量新策略与旧策略相比的执行情况。正规化术语阻止政策发生太大变化。
4. **裁剪**： PPO 的显着特点之一是使用裁剪来确保策略更新不会过于极端。裁剪将策略更新限制在一定范围内，防止策略发生较大变化而导致训练过程中的不稳定。
5. 多个 Epoch： PPO 通常在每次迭代期间进行多个优化 epoch。在每个时期，它使用收集的数据来更新策略。重复此过程直到找到令人满意的策略。
6. **策略评估**： 价值函数在策略评估中起着至关重要的作用。它估计了遵循当前策略的预期回报。这一估计有助于评估策略的质量并指导其完善。
7. **稳定性和样品效率**： PPO因其稳定性和样品效率而受到青睐。与其他一些强化学习算法相比，它往往提供更平滑的策略更新，使其适合训练文本生成质量至关重要的语言模型。

**第一步：采样**

**采样就是学生回答问题的过程，是模型根据提示（prompt）输出回答（response）的过程，或者说是模型自行生产训练数据的过程。**

例如：

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pwiaLjrFXeFmmWmdjhgpibiaRmp5hEAcfSNQNgZ2IBqPmDXuPptibYy6MJw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

PPO 在这一部分做了什么呢？

**先明确一个概念——策略（policy），它就是 RLHF 中的“学生”。policy 由两个模型组成，一个叫做演员模型（Actor），另一个叫做评论家模型（Critic）。它们就像是学生大脑中的两种意识，一个负责决策，一个负责总结得失。**

其中演员就是我们想要训练出来的大模型。在用 PPO 训练它之前，它就是 RLHF 的第一步训练出来的 SFT (Supervised Fine-Tuning) model。输入一段上下文，它将输出下一个 token 的概率分布  context 。评论家是强化学习的辅助模型，输入一段上下文，它将输出下一个 token 的“收益"。

什么是“收益”呢？简单来说就是从下一个 token 开始，模型能够获得的总奖励（浮点数标量）。这里说的奖励包括 Reward Model 给出的奖励。奖励是怎么给的，以及收益有什么用，这些内容我们后面会详细介绍。

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pcQYnJQfQTyXentx5yX3D66k35JtG3FPzohL0RBDRsj1grfQiaNVvzPg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

▲ policy模型结构

从实现上说，评论家就是将演员模型的倒数第二层连接到一个新的全连接层上。除了这个全连接层之外，演员和评论家的参数都是共享的（如上图）。

**上面提到的模型结构是较早期的版本，后续不共享参数的实现方式也有很多。**

现在我们来看看 PPO 的采样过程中有哪些模型和变量。如下图，矩形表示模型，椭圆表示变量。

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pbaHX0OgGeJ5vcGOlO8uyJ3m3TcZDP4VdwwwBeXrc6UAQm8mg0BvHHQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

▲ 采样流程

图中的“old_policy”矩形就是刚刚说的 policy（为啥有个“old”前缀呢？后面我会详细解释）。

**采样指的是 old_policy 从 prompt 池中抽出 M 个 prompt 后，对每个 prompt 进行语言模型的 token 采样：**

- 计算 response 的第 1 个 token 的概率分布，然后从概率分布中采样出第 1 个 token
- 根据第 1 个 token，计算 response 的第 2 个 token 的概率分布，然后从概率分布中采样出第 2 个 token
- ……
- 根据前 N-1 个 token，计算 response 的第 N 个 token 的概率分布，然后从概率分布中采样出第 N 个 token

![[640_(1) 1.gif]]

▲ 语言模型的token采样

然后就得到了三个输出。假设对每个 prompt，policy 生成的 token 的个数为 N，那么这三个输出分别是：

- response：M 个字符串，每个字符串包含 N 个 token
- old_log_probs：演员输出的 M × N 的张量，包含了 response 中 token 的对数概率 log(p(token|context))
- old_values：评论家输出的 M × N 的张量，包含了每次生成 token 时评论家预估的收益

得到这三个输出后，采样阶段就就结束了。这三个输出都是后续阶段重要的输入数据。

**第二步：反馈**

**反馈就是老师检查答案的过程，是奖励模型（Reward Model）给 response 打分的过程，或者说是奖励模型给训练数据 X 标上 Y 值的过程。**

打出的分数衡量了 response 的正确性，它也可以被视为 prompt 和 response 的匹配程度。

例如：

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pl6lCKgXOujbh825BqssT55NJsyoW7U7OcqU5GAk3nnibVlicmhAPbNPg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

Reward Model 可以被比作班级里成绩最好的学生，他能够辅助老师批改作业。就像老师先教会这个学生如何批改作业，之后这个学生就能独立完成作业批改一样，Reward Model 通过学习和训练，也能够独立地完成任务并给出正确的答案。

网上有很多资料介绍 Reward Model 的训练过程，这也不是本文的重点，我就不再赘述了。

PPO 拿训练好的 Reward Mode 做了什么呢？我们接着看图说话：

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pKJHe9JicPPOpqzuHyXZ4LdsPz8JgtyF5abrEjH8cFpVCdIvnGMEX6vA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

▲ 奖励流程

从图中我们可以看出，左上角的绿色矩形 reward model 拿到 prompt 和 response，然后输出了分数 score。实际上发生的事情是，prompt 和 response 被拼接成一个字符串，接着被送入到 reward model 中，最后 reward model 计算出了匹配分数。

你也许发现了，在图中，score 并不是最终的奖励。它和最终的奖励 rewards 之间还隔着一个 reward function 函数。

**这是因为 score 只能衡量结果的对错，不能衡量过程的合理性。怎么衡量过程的合理性呢？一种简单粗暴的方法是：循规蹈矩，即为合理。**

**语言模型在我们给予最终奖励之前，最好也对它的“标新立异”给予少量的惩罚。**

我们给它立一个规矩，只要它按照这个规矩来，就能获得少量奖励。而这个规矩就是我们在 SFT 阶段已经训练好的语言模型 ref_policy（图中右下角的绿色矩形），或者说是完全还没经过强化学习训练的语言模型。

过程合理性奖励的计算方式是这样的。ref_policy 拿到 prompt，然后给 old_policy 生成的 response 的每个 token 计算对数概率，得到一个张量 ref_log_prob。现在假设 old_policy 的演员模型生成了第 i 个 token，此时它应该获得的奖励为：

![[Untitled 457.png]]

式子：

- ref_log_prob[i] 越高，ref_policy 越认可 old_policy 的输出，说明 old_policy 更守规矩，因此应该获得更高的奖励；
- old_log_prob[i] 越高，old_policy 获得的奖励反而更低。old_log_prob[i] 作为正则项，可以保证概率分布的多样性。

有了这两个直觉上的解释，我们说式 (1) 是比较合理的。顺便说一句，熟悉信息论的人也许注意到了，式 (1) 是 KL 散度的简化版本。实际上式 (1) 完全可以改成计算两个 token 的概率分布的 KL 散度。这是另一个话题，就不延伸了。

**最终，我们将过程合理性奖励和结果正确性奖励合并起来，就得到了最终奖励的计算方式。**

注意，我们只在最后一个 token 上应用结果正确性奖励（reward_model 的输出）。也就是说，第 i 个 token 的奖励的计算方式为：

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pXZ0tFlmWo8xQGyHw0nzV4pgF7GtbSwiaQibdfrXEicQEVL7oFwQyH261w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

式 (2) 就是图中“reward function”的计算内容。

**通俗来说，整个 reward function 的计算逻辑是典型的霸总逻辑：除非你能拿到好的结果，否则你就得给我守规矩。**

注意，我们只对 response 计算奖励。另外在整个反馈阶段，reward_model 和 ref_policy 是不更新参数的。

这就像是老师在检查学生的答案并给出评价后，学生们就可以了解他们的表现如何，并从中学习和进步。然而，获得反馈并不是结束，而是新的开始。正如学生需要用这些反馈来进行复习和改进一样，模型也需要通过学习阶段来优化其性能和预测能力。


**第四步：学习**

**“学习”就是学生根据反馈总结得失并自我改进的过程，或者说是强化优势动作的过程。**

如果说前两步分别是在收集数据 X，以及给数据打上标签 Y。那么这一步就是在利用数据 (X, Y) 训练模型。

"强化优势动作"是 PPO 学习阶段的焦点。在深入探讨之前，我们首先要明确一个关键概念——优势。

**此处，我们将优势定义为“实际获得的收益超出预期的程度”。**

为了解释这个概念，请允许我举一个例子。假设一个高中生小明，他在高一时数学考试的平均分为 100 分，在此之后，大家对他的数学成绩的预期就是 100 分了。到了高二，他的数学平均分提升到了 130 分。在这个学期，小明的数学成绩显然是超出大家的预期的。

表现是可用分数量化的，故表现超出预期的程度也是可以用分数差来量化的。我们可以认为，在高二阶段，小明超出预期的程度为 30 分（130 - 100）。根据优势的定义我们可以说，在高二阶段，小明相对于预期获得了 30 分的优势。

**在这个例子中，实际已经给出了 PPO 计算优势的方法：优势 = 实际收益 - 预期收益。**

对于语言模型而言，生成第 i 个 token 的实际收益就是：从生成第 i 个 token 开始到生成第 N 个 token 为止，所能获得的所有奖励的总和。我们用 return 来表示实际收益，它的计算方式如下：

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pkxrrJAWHCneEKHkkMtHzgxBicwD31az6wEpUGDpsrMArQh6XZww79zQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- 写给熟悉 RL 的人：简单起见，在这里我们**既不考虑贴现也不计算广义优势估计 GAE**

预期收益又该如何计算呢? 记得我们在“采样”阶段提到过，policy 包含演员模型和评论家模型，其中后者是用来预估收益的。其实，当时说的收益 old_values 就是现在我们想要计算的预期收益。评论家会为 response 中的每个 token 计算一个预期收益，第  个预期收益记为 values[i] (它预估的是刚才提到的 )。

现在，我们可以这样计算生成第 i 个 token 的优势 a（这里我们使用采样阶段计算出来的 old_values）：

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pDXcnrLASy9CEDDtdmTzy0vKdPlKJkdDYm59OpgkariaT3eEZ18P1GUw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**所谓“强化优势动作”，即强化那些展现出显著优势的动作。**

在上面的小明的例子中，这意味着在高三阶段，小明应该持续使用高二的学习方法，因为在高二阶段，他的学习策略展示出了显著的优势。

在语言模型中，根据上下文生成一个 token 就是所谓的“动作”。"强化优势动作"表示：如果在上下文（context）中生成了某个 token，并且这个动作的优势很高，那么我们应该增加生成该 token 的概率，即增加 p(token|context) 的值。

由于 policy 中的演员模型建模了 p(token|context)，所以我们可以给演员模型设计一个损失函数，通过优化损失函数来实现“强化优势动作”：

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pERIVWv1zmVvA7wemYv0EdoCS6c8MVb8agpJDd5ZibiaUlcOhS3zD3KzA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

其中：

- 当优势大于 0 时，概率越大，loss 越小；因此优化器会通过增大概率（即强化优势动作）来减小 loss
- 当优势小于 0 时，概率越小，loss 越小；因此优化器会通过减小概率（即弱化劣势动作）来减小 loss

这很像巴浦洛夫的狗不是吗？

![](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgksDRlv9aVWr2PL8E6rz87pFcOCaNCvAAibuR8UvXabbia78TiaQpjMrHEyyrhyYwV4HR0cRCcaS58rw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

▲ 巴浦洛夫的狗

另外还有两个点值得注意：

- 优势的绝对值越大，loss 的绝对值也就越大
- 优势是不接收梯度回传的

### **PPO 在 RLHF 中的作用**

![[Untitled 458.png]]

尽管 PPO 在主流 RL 研究中是一个有益的进步，但该算法也对语言建模领域产生了巨大影响。更具体地说，InstructGPT [6] - ChatGPT 的前身 - 是通过一个由三部分组成的框架（如上图所示）进行对齐的（即通过训练产生与人类期望一致的输出），该框架包括监督微调（SFT）和来自人类反馈的强化学习（RLHF）。虽然这种方法以前曾在文本摘要任务中进行过探索[7]，但 InstructGPT 将这一框架推广到了语言基础模型的训练中，从而被用于创建各种流行的语言模型，如 ChatGPT、GPT-4、LLaMA-2 和 Sparrow。

这与 PPO 有什么关系？由于 PPO 易于使用，InstructGPT 最初选择它作为 RLHF 的 RL 算法。后来，InstructGPT 使用的对齐策略被标准化，尽管人们一直在探索替代方案，但 PPO 至今仍是 RLHF 的首选。因此，PPO 是语言模型配准的一个关键方面，任何有兴趣了解或实施配准过程的人工智能从业人员都会从对 PPO 的实际了解中受益。

