---
base: "[[机器学习-神经网络.base]]"
属于名称: 超网络 HyperNetworks
描述: 超网络 (HyperNetworks) 是一种神经网络结构，其与传统的神经网络相比，在模型参数化方面有一些不同之处。 Google Brain 于 2016 年发表的论文「HyperNetworks」表示，在 HyperNetworks 中，一个神经网络被用来生成另一个神经网络的权重或其他参数。这个生成网络被称为超网络 (HyperNetwork)，而被它生成的网络被称为目标网络 (Target network）。
AIGC领域:
  - 神经网络
---
### 简介

hypernetwork，中文名为超网络，是一种神经网络架构,它允许动态生成神经网络的参数(权重)。简而言之,hypernetwork可以生成其他神经网络。
在Stable Diffusion中,hypernetwork被用于动态生成分类器的参数，为Stable Diffusion模型添加了随机性,减少了参数量,并能够引入side information来辅助特定任务,这使得该模型具有更强的通用性和概括能力。


在深度学习中，神经网络以其高性能而著称，但也以其参数数量庞大而闻名。这会导致过度拟合，使网络训练变得困难。超网络是一种可以解决这一问题的技术，它通过引入一个较小的网络来生成一个更大网络的权重。这样，整个模型中的参数就会减少，同时仍能保持其表现力。

超网络提供了一种与自然界相似的抽象：基因型（超网络）与表型（主网络）之间的关系。 这项工作的重点是使超网络对深度卷积网络和长循环网络有效。在这些网络中，超网络可以看作是跨层共享权的轻松形式。 主要结果是超网络可以为LSTM生成非共享的权重，并在各种序列建模任务（包括字符级语言建模，手写体生成和神经机器翻译）上获得近乎SOTA的结果。

应用于卷积网络的超网络仍然可以在图像识别任务上获得可观的结果，同时所需的可学习参数更少


![[Untitled 31.png]]

![[Untitled 32.png]]

[https://github.com/Johswald/awesome-hypernetworks](https://github.com/Johswald/awesome-hypernetworks)