---
base: "[[大模型-强化学习.base]]"
属于名称: 混合专家系统
描述: ""
AIGC领域:
  - 大模型
---
### **什么是混合专家模型？**

模型规模是提升模型性能的关键因素之一。在有限的计算资源预算下，用更少的训练步数训练一个更大的模

型，往往比用更多的步数训练一个较小的模型效果更佳。

混合专家模型 (MoE) 的一个显著优势是它们能够在远少于稠密模型所需的计算资源下进行有效的预训练。

这意味着在相同的计算预算条件下，您可以显著扩大模型或数据集的规模。特别是在预训练阶段，与稠密模

型相比，混合专家模型通常能够更快地达到相同的质量水平。

混合专家（Mixture of Experts，简称MoE）是一种集成学习方法，它通过将多个专业化的子模型

（即“专家”）组合起来，形成一个整体模型，每一个“专家”都在其擅长的领域内做出贡献。而决定哪个“专

家”参与解答特定问题的，是一个称为“门控网络”的机制。每个专家模型可以专注于解决特定的子问题，而

整体模型则能够在复杂的任务中获得更好的性能。


### MOE 发展历史

合专家模型 (MoE) 的理念起源于 1991 年的论文 [Adaptive Mixture of Local Experts](https://www.cs.toronto.edu/~hinton/absps/jjnh91.pdf)。这个概念与集成学习方法相似，旨在为由多个单独网络组成的系统建立一个监管机制。在这种系统中，每个网络 (被称为“专家”) 处理训练样本的不同子集，专注于输入空间的特定区域。那么，如何选择哪个专家来处理特定的输入呢？这就是门控网络发挥作用的地方，它决定了分配给每个专家的权重。在训练过程中，这些专家和门控网络都同时接受训练，以优化它们的性能和决策能力。

在 2010 至 2015 年间，两个独立的研究领域为混合专家模型 (MoE) 的后续发展做出了显著贡献:

1. **组件专家**: 在传统的 MoE 设置中，整个系统由一个门控网络和多个专家组成。在支持向量机 (SVMs) 、高斯过程和其他方法的研究中，MoE 通常被视为整个模型的一部分。然而，[Eigen、Ranzato 和 Ilya 的研究](https://arxiv.org/abs/1312.4314) 探索了将 MoE 作为更深层网络的一个组件。这种方法允许将 MoE 嵌入到多层网络中的某一层，使得模型既大又高效。
2. **条件计算**: 传统的神经网络通过每一层处理所有输入数据。在这一时期，Yoshua Bengio 等研究人员开始探索基于输入令牌动态激活或停用网络组件的方法。

这些研究的融合促进了在自然语言处理 (NLP) 领域对混合专家模型的探索。特别是在 2017 年，[Shazeer 等人](https://arxiv.org/abs/1701.06538) (团队包括 Geoffrey Hinton 和 Jeff Dean，后者有时被戏称为 [“谷歌的 Chuck Norris”](https://www.informatika.bg/jeffdean)) 将这一概念应用于 137B 的 LSTM (当时被广泛应用于 NLP 的架构，由 Schmidhuber 提出)。通过引入稀疏性，这项工作在保持极高规模的同时实现了快速的推理速度。这项工作主要集中在翻译领域，但面临着如高通信成本和训练不稳定性等多种挑战。

![[Untitled 378.png]]


### MOE 原理机制

MoE是大模型架构的一种，其核心工作设计思路是**“术业有专攻”**，即将任务分门别类，然后分给多个“专家”进行解决。

与MoE相对应的概念是**稠密（Dense）模型**，可以理解为它是一个“通才”模型。

一个通才能够处理多个不同的任务，但一群专家能够更高效、更专业地解决多个问题。

混合专家模型（MoE）是一种稀疏门控制的深度学习模型，由两个关键组成部分构成：

- **稀疏 MoE 层**: 这些层代替了传统 Transformer 模型中的前馈网络 (FFN) 层。MoE 层包含若干“专家”(例如 8 个)，每个专家本身是一个独立的神经网络。在实际应用中，这些专家通常是前馈网络 (FFN)，但它们也可以是更复杂的网络结构，甚至可以是 MoE 层本身，从而形成层级式的 MoE 结构。
- **门控网络或路由**: 这个部分用于决定哪些令牌 (token) 被发送到哪个专家。例如，在下图中，“More”这个令牌可能被发送到第二个专家，而“Parameters”这个令牌被发送到第一个专家。有时，一个令牌甚至可以被发送到多个专家。令牌的路由方式是 MoE 使用中的一个关键点，因为路由器由学习的参数组成，并且与网络的其他部分一同进行预训练。




![[Untitled 379.png]]

左侧图为传统大模型架构，右图为MoE大模型架构。与传统大模型架构相比，MoE架构在数据流转过程中集成了一个**专家网络层**（红框部分）。

![[Untitled 380.png]]

专家网络层的核心由门控网络（Gating Network）和一组专家模型（Experts）构成，其工作流程大致如下：

1、数据首先会被分割多个区块（Token），每组数据进入专家网络层时，首先会进入**门控网络**；

2、门控网络将每组数据分配给一个或多个专家，每个专家模型可以专注于处理该部分数据，**“让专业的人做专业的事”**；

3、最终，所有专家的输出结果汇总，**系统进行加权融合**，得到最终输出。


![[Untitled 381.png]]


### **开源混合专家模型**

目前，下面这些开源项目可以用于训练混合专家模型 (MoE):

- Megablocks: [https://github.com/stanford-futuredata/megablocks](https://github.com/stanford-futuredata/megablocks)
- Fairseq: [https://github.com/facebookresearch/fairseq/tree/main/examples/moe_lm](https://github.com/facebookresearch/fairseq/tree/main/examples/moe_lm)
- OpenMoE: [https://github.com/XueFuzhao/OpenMoE](https://github.com/XueFuzhao/OpenMoE)

对于开源的混合专家模型 (MoE)，你可以关注下面这些:

- [Switch Transformers (Google)](https://huggingface.co/collections/google/switch-transformers-release-6548c35c6507968374b56d1f): 基于 T5 的 MoE 集合，专家数量从 8 名到 2048 名。最大的模型有 1.6 万亿个参数。
- [NLLB MoE (Meta)](https://huggingface.co/facebook/nllb-moe-54b): NLLB 翻译模型的一个 MoE 变体。
- [OpenMoE](https://huggingface.co/fuzhao): 社区对基于 Llama 的模型的 MoE 尝试。
- [Mixtral 8x7B (Mistral)](https://huggingface.co/mistralai): 一个性能超越了 Llama 2 70B 的高质量混合专家模型，并且具有更快的推理速度。此外，还发布了一个经过指令微调的模型。有关更多信息，可以在 Mistral 的 [公告博客文章](https://mistral.ai/news/mixtral-of-experts/) 中了解。


### 参考链接

[https://huggingface.co/blog/zh/moe](https://huggingface.co/blog/zh/moe)
