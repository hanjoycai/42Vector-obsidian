---
base: "[[大模型-强化学习.base]]"
属于名称: 旋转位置编码 RoPE (Rotary Position Embedding)
描述: 它是目前大模型中广泛使用的一种位置编码，包括但不限于 Llama 、 Baichuan 、 ChatGLM 、 Qwen 等。由于计算资源限制，目前的大模型大多在较小的上下文长度中进行训练，在推理中，若超出预训练的长度，模型的性能将会显著降低。于是涌现出了许多基于 RoPE 的长度外推的工作，旨在让大模型能够在预训练长度之外，取得更好的效果。所以弄清楚 RoPE 的底层原理，对于 RoPE-base 模型进行长度外推至关重要。
AIGC领域:
  - 大模型
---

### 简介

旋转位置编码RoPE（Rotary Position Embedding）是一种Transformer模型中的位置编码策略，它广泛应用于LLama，ChatGLM等大模型，本篇先介绍RoPE的实现步骤和源码，再深入讲解RoPE涉及到的数学原理，力求做到从易到难，学习曲线平滑。

![[Untitled 459.png]]

### 位置编码知识准备

由于Transformer的Self Attention具有排列不变性，因此需要通过引入位置编码来让模型感知到输入序列中每个单词的位置信息，位置编码分为绝对位置编码和相对位置编码。

绝对位置编码根据`单个单词`的绝对位置来定义位置编码，每个位置都会分配一个位置编码，将位置编码的表征和单词本身的表征进行融合，再输入给Self Attention，相当于在输入层就把位置信息给弥补上去。绝对位置编码从实现方式上又分为固定式和可学习式，固定式形如原生的Transformer所采用的三角sin-cos位置编码，所谓固定指的是根据一个无参的固定公式就可以推演出位置编码，而可学习式没有固定的位置编码公式，通过初始化位置向量让模型根据上下文数据自适应地学习出来，Bert和GPT采用的可学习式。

![[Untitled 460.png]]

Bert的可学习式绝对位置编码和原始输入相加

相对位置编码对`两个单词之间`的相对位置进行建模，并且将相对位置信息加入到Self Attention模型结构中，形如Transformer-XL，DeBERTa等采用的就是相对位置编码。Self Attention的本质是两个单词信息的内积操作，相对位置编码的思想是对内积的计算方式进行改进，在内积中注入两个单词的相对位置因素。

![[Untitled 461.png]]

词和词之间的相对位置


### **旋转位置编码的本质和计算流程**

旋转位置编码RoPE是一种`固定式`的`绝对位置编码`策略，但是它的绝对位置编码配合Transformer的Attention内积注意力机制能达到`相对位置编码`的效果。RoPE的本质是对两个token形成的`Query和Key向量做一个变换`，使得变换后的Query和Key带有位置信息，进一步使得`Attention的内积操作不需要做任何更改`就能自动感知到相对位置信息。换句话说，RoPR的出发点和策略用的相对位置编码思想，但是实现方式的确用的是绝对位置编码。


固定式表明RoPE没有额外需要模型自适应学习的参数，因此RoPE是一种高效的编码方式。绝对位置编码表明RoPE给文本的每个位置单词都分配了一个位置表征，和三角sin-cos位置编码一样，RoPE通过token在句子中的位置，token embedding中每个元素的位置，这两个要素一起确定位置编码的表达，先给出

RoPE的公式如下

$$
\begin{equation}\left(\begin{array}{c}q_0 \\q_1 \\q_2 \\q_3 \\\vdots \\q_{d-2} \\q_{d-1}\end{array}\right) \otimes\left(\begin{array}{c}\operatorname{cosm} \theta_0 \\\operatorname{cosm} \theta_0 \\\operatorname{cosm} \theta_1 \\\operatorname{cosm} \theta_1 \\\cdot \\\cdot \\\operatorname{cosm} \theta_{d / 2-1} \\\operatorname{cosm} \theta_{d / 2-1}\end{array}\right)+\left(\begin{array}{c}-q_1 \\q_0 \\-q_3 \\q_2 \\\vdots \\-q_{d-1} \\q_{d-2}\end{array}\right) \otimes\left(\begin{array}{c}\operatorname{sinm} \theta_0 \\\operatorname{sinm} \theta_0 \\\operatorname{sinm} \theta_1 \\\operatorname{sinm} \theta_1 \\\cdot \\\dot{s} \\\operatorname{sinm} \theta_{d / 2-1} \\\operatorname{sinm} \theta_{d / 2-1}\end{array}\right)\end{equation}
$$

RoPE有一定数学推导环节，但是最终的公式并不复杂，因此本篇先从RoPE公式入手介绍RoPE在做什么，该公式是将一个原始的token向量改造为一个注入位置信息之后的新向量的过程。
其中第一项代表某个位置为m的token的原始Query向量，0~d-1代表向量每个位置的元素，d代表向量的维度，第二项为一个同样长度是d的带有cos三角函数的向量，它和Query向量逐位相乘，第三项由原始Query变换而来，第四项和第二项类似区别是将cos替换为sin。
该公式的目的是将原始Query向量改造成一个带有位置信息的新向量，位置信息由参数m和θ进行表征，其中m为token在句子中的位置，θ的下标和向量中各元素的位置直接相关，公式如下

$$
\begin{equation}\theta_i=\frac{1}{10000^{\frac{2 i}{d}}}\end{equation}
$$

因此只要给到某个token的输入Query向量，知道token在上下文窗口下处于第几位，就可以将它的Query向量通过RoPE的公式改造为一个新的向量形式，新形成的向量和原向量维度完全一致。以“我爱你”这句话中的第二个词“爱”为例，设词向量的维度d=4，词向量表征为[0.2, 0.1, -0.3, 0.7]，则经过RoPE变化的计算示意图如下

![[Untitled 462.png]]

RoPE计算示意图

公式中的第三项由原始向量变换而来，对于原始输入向量，将`前后两个元素位置构成一对`，交换两者的位置，并且对于偶数位取了相反数，因此每个元素位的注入位置信息的过程，可以看成是该元素和它相邻的元素，分别经过sin，cos三角函数加权求和的结果，比如q0的RoPE结果是q0和q1这一对元素经过三角函数变换的结果。在下文的源码分析中，我们会介绍此处的`相邻条件并不是必须的`，而是`任意不重复的一对都满足这个变换性质`。

在Transformer原生的三角sin-cos位置编码中，采用相加的形式将位置编码融入到词向量中，而在RoPE中采用的是类似哈达马积的乘积形式，读者可以将以上RoPE公式做的事情类比于Transformer中原始向量表征和sin-cos位置编码相加的过程。

### 旋转位置编码如何表达相对位置信息

在之前介绍的sin-cos位置编码中[Transformer系列：快速通俗理解Transformer的位置编码](https://www.jianshu.com/p/f7fad8fbbd4c)，我们知道sin-cos位置编码因为三角函数的性质，使得它可以表达相对位置信息，具体而言是：给定距离，任意位置的位置编码都可以表达为一个已知位置的位置编码的关于距离的线性组合，而RoPE的位置编码也是同样的思路，采用绝对位置编码实现相对距离的表达，区别如下

- **实现相对位置能力的途径不同**：sin-cos位置编码由于三角函数的性质，导致它本身就具备表达相对距离的能力，而RoPE位置编码本身不能表达相对距离，需要结合Attention的内积才能激发相对距离的表达能力
- **和原输入的融合计算方式不同**：sin-cos位置编码直接和原始输入相加，RoPE位置编码采用类似哈达马积相乘的形式

在知识准备模块我们介绍的相对位置编码，其主要的思想是原始输入不变，将相对位置信息注入Attention模块，采用对Attention的网络结构进行修改方式，将位置表征因素也额外的加入Attention计算，使得Attention模块能够把输入层丢失的位置信息弥补回来。

RoPE参考相对位置编码的思想，它也是在Attention模块让模型感知到相对位置，但是它是`不改变Attention的结构`，反而像绝对位置编码一样在输入层做文章，对输入向量做改造，改造后Attention模块能够重新感知到相对位置，同样能把位置信息弥补回来，因此`RoPE可是说是使用绝对位置编码的方式实现了相对位置编码，是两者的融合`。

至于为什么RoPE可以通过Attention来激发相对位置信息，原因是带有RoPE位置编码两个token，它们形成的Quey向量和Key向量进入Self Attention层之后，`Attention内积的结果可以恒等转化一个函数，该函数只和Quey向量，Key向量，以及两个token位置之差有关`，细节推导将在下文的进行介绍，读者先对这个结论有个初步印象。

![[Untitled 463.png]]

![](//upload-images.jianshu.io/upload_images/22206660-184f25df3eaf2350.png?imageMogr2/auto-orient/strip|imageView2/2/w/846/format/webp)

RoPE配合内积感知相对位置信息


### 参考链接

[https://kexue.fm/archives/8265](https://kexue.fm/archives/8265)