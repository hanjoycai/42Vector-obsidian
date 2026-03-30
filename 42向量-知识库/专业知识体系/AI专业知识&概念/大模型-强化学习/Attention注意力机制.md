---
base: "[[大模型-强化学习.base]]"
属于名称: 注意力机制
描述: 在神经网络的上下文中，注意力机制有助于模型在生成输出时专注于输入的相关部分。
AIGC领域:
  - 大模型
---
## ***Attention 的本质***

> Attention（注意力）机制如果浅层的理解，跟他的名字非常匹配。他的核心逻辑就是「**从关注全部到关注重点**」。

Attention 机制很像人类看图片的逻辑，当我们看一张图片的时候，我们并没有看清图片的全部内

容，而是将注意力集中在了图片的焦点上。

<!-- Column 1 -->
![[Untitled 431.png]]

<!-- Column 2 -->
![[Untitled 432.png]]

我们的视觉系统就是一种 Attention机制，

**将有限的注意力集中在重点信息上，从而节省资源，快速获得最有效的信息。**

视觉注意力机制是人类视觉所特有的大脑信号处理机制。

人类视觉通过快速扫描全局图像，获得需要重点关注的目标区域，也就是一般所说的注意力焦点，而

后对这一区域投入更多注意力资源，以获取更多所需要关注目标的细节信息，而抑制其他无用信息。

视觉注意力机制是人类从大量信息中快速筛选出高价值信息的手段，是人类在长期进化中形成的一种

生存机制，人类视觉注意力机制极大地提高了视觉信息处理的效率与准确性。

Attention 机制最早是在计算机视觉里应用的，随后在 NLP 领域也开始应用了，真正发扬光大是在 NLP 领域，因为 2018 年 [BERT](https://easyai.tech/ai-definition/bert/) 和 GPT 的效果出奇的好，进而走红。

而 [Transformer](https://easyai.tech/ai-definition/transformer/) 和 Attention 这些核心开始被大家重点关注。

如果用图来表达 Attention 的位置大致是下面的样子：

![[Untitled 433.png]]

### 为什么要用 Attention

2014年, Seq2Seq模型正式提出, 并以其优异的表现席卷了机器翻译领域，但是Seq2Seq模型还是有一些问题：

1. 信息有很多损失：Encoder 和 Decoder 之间只通过一个固定长度的语义向量 C 来唯一联系。也就是说，Encoder 把输入的整个序列的信息都压缩进一个固定长度的向量中，存在两个弊端：一是语义向量 C 可能无法完全表示整个序列的信息；二是先输入的信息容易被后输入的信息覆盖掉，输入的序列越长，该现象就越严重。
2. 没有侧重点：我们知道的是每一句话都有其侧重点，那翻译当然也应该注意其侧重点，不应该是每一个词在一个句子中都具有同等地位。

> [!note] 🧾
> **解决信息过长时信息丢失的问题**

![[Untitled 434.png]]

**1.参数少**

模型复杂度跟 [CNN](https://easyai.tech/ai-definition/cnn/)、[RNN](https://easyai.tech/ai-definition/rnn/) 相比，复杂度更小，参数也更少。所以对算力的要求也就更小。

**2.速度快**

Attention 解决了 RNN 不能并行计算的问题。Attention机制每一步计算不依赖于上一步的计算结果，因此可以和CNN一样并行处理。

**3.效果好**

在 Attention 机制引入之前，有一个问题大家一直很苦恼：长距离的信息会被弱化，就好像记忆能力弱的人，记不住过去的事情是一样的。

Attention 是挑重点，就算文本比较长，也能从中间抓住重点，不丢失重要的信息。下图红色的预期就是被挑出来的重点。


### **attention的结构和全过程**

![[Untitled 435.png]]

![[Untitled 436.png]]

> [!note] 🧾
> 本质上是由于里面有个softmax，**各时序的score通过softmax输出的权重不一样，加权求和**后，就有种“注意力”功能了。

### ***Attention 的原理***

下面的动图演示了attention 引入 Encoder-Decoder 框架下，完成机器翻译任务的大致流程。

![[1ab35-2019-11-13-attention-encoderdecoder.gif]]





> 从上面的建模，我们可以大致感受到 Attention 的思路简单，**四个字“带权求和”就可以高度概括**，大道至简。
> 做个不太恰当的类比，人类学习一门新语言基本经历四个阶段：死记硬背（通过阅读背诵学习语法练习语感）->提纲挈领（简单对话靠听懂句子中的关键词汇准确理解核心意思）->融会贯通（复杂对话懂得上下文指代、语言背后的联系，具备了举一反三的学习能力）->登峰造极（沉浸地大量练习）。



## **Transformer中的三种注意力机制**

![[Untitled 437.png]]

### ***一、Self Attention***

**Self Attention（自注意力）：对同一个序列，通过缩放点积注意力计算注意力分数，最终对值向量进行加权求和，从而得到输入序列中每个位置的加权表示。**

**表达的是一种注意力机制，如何使用缩放点积注意力对同一个序列计算注意力分数，从而得到同一序列中每个位置的注意力权重。**

![[Untitled 438.png]]


**Scaled Dot-Product Attention、Self Attention、Multi-Head Attention**

![[Untitled 439.png]]

**Scaled Dot-Product Attention（缩放点积注意力）：输入包括维度为dk的查询（queries）和键（keys），以及维度为dv的值（values）。我们计算查询与所有键的点积，每个点积结果都除以√dk，然后应用softmax函数，以得到注意力分数。**

**体现如何计算注意力分数，关注Q、K、V计算公式。**

![[Untitled 440.png]]

**Scaled Dot-Product Attention（缩放点积注意力）**

**Multi-Head Attention（多头注意力）：多个注意力头并行运行，每个头都会独立地计算注意力权重和输出，然后将所有头的输出拼接起来得到最终的输出。**

**强调的是一种实操方法，实际操作中我们并不会使用单个维度来执行单一的注意力函数，而是通过h=8个头分别计算，然后加权平均。这样为了避免单个计算的误差。**

![[Untitled 441.png]]

**Multi-Head Attention（多头注意力）**

**Scaled Dot-Product Attention、Self Attention、Multi-Head Attention实际上说的是同一件事，从不同维度解答如何获取同一个序列中每个位置的注意力权重。图上标注Multi-Head Attention强调需要多个头计算注意力权重。**

**Transformer第一个注意力（Self Attention）更严谨的描述应该为：编码器输入序列通过Multi-Head Self Attention（多头自注意力）计算注意力权重。**

### **二、Cross Attention**

**Cross Attention（交叉注意力）：输入来自两个不同的序列，一个序列用作查询（Q），另一个序列提供键（K）和值（V），实现跨序列的交互。**

![[Untitled 442.png]]

**Cross Attention与Self Attention的区别：**

- **输入来源：**
- **Cross Attention：来自两个不同的序列，一个来自编码器，一个来自解码器**
- **Self Attention：来自编码器的同一序列**
- **实现目标：**
- **Cross Attention：解码器序列用作查询（Q），编码器序列提供键（K）和值（V），用于在编码器-解码器两个不同序列之间进行注意力转移。**
- **Self Attention：查询（Q）、键（K）和值（V）均来自编码器同一序列，实现编码器序列内部的注意力计算。**

**Cross Attention、Multi-Head Attention实际上说的是也同一件事，从不同维度解答两个不同序列之间如何进行注意力转移。图上标注Multi-Head Attention强调需要多个头进行注意力转移计算。**

**Transformer第二个注意力（Cross Attention）更严谨的描述应该为：编码器-解码器两个序列通过Multi-Head Cross Attention（多头交叉注意力）进行注意力转移。**

### **三、Causal Attention**

**Predict The Next Word（预测下一个词）：模型通常需要基于已经生成的词来预测下一个词。这种特性要求模型在预测时不能“看到”未来的信息，以避免预测受到未来信息的影响。**

![[640_(1).gif]]

**预测下一个词**


**Masked Language Model（掩码语言模型）：遮盖一些词语来让模型学习预测被遮盖的词语，从而帮助模型学习语言规律。**

![[Untitled 443.png]]

**掩码语言模型**

**Autoregressive（自回归）：在生成序列的某个词时，解码器会考虑已经生成的所有词，包括当前正在生成的这个词本身。为了保持自回归属性，即模型在生成序列时只能基于已经生成的信息进行预测，我们需要防止解码器中的信息向左流动。换句话说，当解码器在生成第t个词时，它不应该看到未来（即第t+1, t+2,...等位置）的信息。**

![[Untitled 444.png]]

**自回归**

**Causal Attention（因果注意力）：为了确保模型在生成序列时，只依赖于之前的输入信息，而不会受到未来信息的影响。Causal Attention通过掩盖（mask）未来的位置来实现这一点，使得模型在预测某个位置的输出时，只能看到该位置及其之前的输入。**

![[Untitled 445.png]]

**Causal Attention、Mask Multi-Head Attention实际上说的是也同一件事，解码器中Self Attention如何结合Causal Attention来保持自回归属性。**

**Mask Multi-Head Attention强调使用了多个独立的注意力头，每个头都可以学习不同的注意力权重，从而增强模型的表示能力。而Causal Attention则强调了模型在预测时只能依赖于已经生成的信息，不能看到未来的信息。**

**Transformer第三个注意力（Causal Attention）更严谨的描述应该为：解码器的单个序列通过Multi-Head Causal Self Attention（多头因果自注意力）进行注意力计算。**




### 参考链接：

<!-- Column 1 -->
[https://towardsdatascience.com/attn-illustrated-attention-5ec4ad276ee3](https://towardsdatascience.com/attn-illustrated-attention-5ec4ad276ee3)

<!-- Column 2 -->
[https://towardsdatascience.com/illustrated-self-attention-2d627e33b20a](https://towardsdatascience.com/illustrated-self-attention-2d627e33b20a)

[https://blog.csdn.net/ARPOSPF/article/details/126968710](https://blog.csdn.net/ARPOSPF/article/details/126968710)