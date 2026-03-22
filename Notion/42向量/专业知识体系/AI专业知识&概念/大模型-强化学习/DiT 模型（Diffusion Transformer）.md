---
base: "[[大模型-强化学习.base]]"
属于名称: DiT 模型（Diffusion Transformer）
描述: DiT（Diffusion Transformer）模型是一种结合了扩散模型和Transformer架构的新型生成模型，主要用于图像和视频生成任务。其核心思想是利用Transformer作为骨干网络，取代传统的卷积神经网络（如U-Net），以更高效地捕获数据中的长距离依赖关系。
AIGC领域:
  - 模型
---
## **前置知识**

### U-Net

U-Net是一种用于图像分割任务的深度学习架构，它的名字来源于其U形状的网络结构。U-Net在医学影像分割等领域取得了很大成功，也被广泛用于其他图像分割任务。

![[Untitled 501.png]]

U-Net的结构包含两部分：编码器（Encoder）和解码器（Decoder）。整体结构如同一个U字形，因此得名U-Net。具体工作流程如下：

编码器（Encoder）： 编码器由一系列卷积层和池化层组成，用于提取输入图像的特征并逐步减小特征图的尺寸。
跳跃连接（Skip Connections）： 在每一层的编码器中，将特征图与对应层的解码器中的特征图进行连接，这种连接保留了高分辨率的特征信息。
解码器（Decoder）： 解码器由一系列卷积层和上采样（或反卷积）层组成，用于将编码器提取的特征映射恢复为与输入图像相同大小的分割结果。
输出层： 最后一层经过适当的激活函数（如sigmoid或softmax）产生最终的分割结果。

### 关于扩散模型

**Diffusion Models是一种新型的、先进的生成模型，用于生成与训练数据相似的数据，可以生成各种高分辨率图像。**

![[Untitled 502.png]]

**Diffusion Models是一种受到非平衡热力学启发的生成模型，其核心思想是通过模拟扩散过程来逐步添加噪声到数据中，并随后学习反转这个过程以从噪声中构建出所需的数据样本。**

![[Untitled 503.png]]

1. 初始化： 从一个简单的初始分布开始，例如高斯分布。
2. 扩散过程： 在每个迭代步骤中，模型会通过引入逐渐增加的噪声来扩散数据分布。这个噪声可以是随机的，也可以是通过模型生成的。
3. 反向过程： 每个迭代步骤之后，模型将尝试逆向这个扩散过程，使得扩散后的数据逼近目标数据分布
4. 训练目标： 模型的训练目标通常是最小化生成数据与真实数据分布之间的差异，例如通过最大似然估计或其他损失函数进行优化。

### 关于**ViT**

Vision Transformer是一种基于Transformer架构的深度学习模型，专门用于处理计算机视觉任务。他的1出现给以往CNN base的图像工作带来了很多新的可能性

ViT的核心思想是将图像分割成均匀的图像块，然后将这些图像块转换为序列，并将序列输入Transformer模型进行处理。这使得ViT可以利用Transformer模型强大的序列建模能力来处理图像数据，避免了传统CNN需要手工设计、调整网络层次结构的缺点。ViT的工作流程大致如下：

输入图像被分割成固定大小的图像块。
每个图像块通过一个可学习的线性投影（projection）映射到特征空间，并与位置编码（position embeddings）结合，形成Transformer模型所需的输入序列。
将这些输入序列输入到Transformer编码器中进行处理。
最终，通过Transformer的输出进行任务相关的预测。


![[Untitled 504.png]]


### DiT 模型简介

DiT (Diffusion Transformers）是一种新型的扩散模型，由William Peebles (Sora的研发负责人之一）与纽约大学助理教授谢赛宁提出，结合了去噪扩散概率模型 (DDPMs) 和Transformer架构。扩散模型是一种生成模型，通过模拟数据的逐步去噪过程来生成新的样本。DiT的核心思想是使用Transformer作为扩散模型的骨千网络，而不是传统的卷积神经网络（如U-Net)，以处理图像的潜在表示。近期伴随OpenAl视频生成模型Sora的大热，DT被视为Sora背后的技术基础之一而广受关注。

基于Vision Transformer（ViT）中的Transformer图像分类模型结构，替代扩散模型中的U-Net，得到DiT模型，实现了更优的生成效果。

在输入部分，基本采用了和ViT相同的方法。对输入的图像分成多个patch，并转换成一个token序列，每个token拼接上相应的position embedding。这个底层的embedding序列作为后续DiT模块的输入。

![[Untitled 505.png]]

> [!note] 🧾
> **Diffusion Transformer是一种新型的扩散模型，结合了去噪扩散概率模型(DDPM)和Transformer架构。**

![[Untitled 506.png]]

> [!note] 🧾
> **Diffusion Transformer的核心思想是使用Transformer作为扩散模型的骨干网络，而不是传统的卷积神经网络(如U-Net)，以处理图像的潜在表示。**

![[Untitled 507.png]]

### DiT 架构

在扩散模型中，Transformer除了像ViT那样输入图像patch token序列，往往还要输入一些额外的信息，包括扩散模型中当前的生成时间步、文本信息的输入等，如何将这些信息输入到DiT中，文中尝试了几种方案。最简单的方法是将这些额外的embedding直接拼接到原始的序列上。第二种是将外部的embedding单独拼接成一个序列，和原始的图像patch序列额外做一个cross attention。第三种方法是修改Transformer中的layer normalization模块，将其替换成adaptive layer normalization，LN的均值和方差由外部embedding的加和生成。第四种是在第三种的基础上，引入了基于外部embedding生成的缩放因子，对multi-head attention的输出进行缩放。

在经过多层的DiT模型后，需要将预测的噪声结果还原出来，这里使用一个MLP作为Decoder，将DiT生成的结果映射到噪声预测结果。

**DiT架构基于Latent Diffusion Model（LDM）框架，采用Vision Transformer（ViT）作为主干网络，并通过调整ViT的归一化来构建可扩展的扩散模型。如下图所示：**

![[Untitled 508.png]]

**DiT的核心组件：DiT有三种变种形式，分别与In-Context Conditioning、Cross-Attention、adaLN-Zero相组合。**

![[Untitled 509.png]]

**对应Diffusion Transformer模型架构图中由右到左的顺序：**

5. **上下文条件（In-context conditioning）：这是模型处理输入数据的一种方式，允许模型根据给定的上下文信息生成输出。**
6. **交叉注意力块（Cross-Attention）：该模块允许模型在生成过程中关注输入数据中的特定部分，从而提高生成的准确性。**
7. **自适应层归一化块（Adaptive Layer Normalization, AdaLN）：这是一个归一化技术，有助于加速模型的训练并提高性能。**

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7TWRhh4xickmUtQ1MkMRgDoiaPw1sFMOjUTTaJrAcxE07UvBROdE8ar9ZxIzrwLjAbdD3OicQeb1Xo776yerbqfkA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

从实验对比中可以看出，DiT的生成效果是超过基于U-Net等之前的SOTA模型的。

![[Untitled 510.png]]

### DiT 原理

**通过引入噪声并训练神经网络来逆转噪声增加的过程，结合Transformer模型，实现图像或视频的生成与变换。这个过程涉及数据预处理、噪声引入、模型训练以及最终的图像或视频生成。**

![[Untitled 511.png]]

8. **数据预处理：**将输入的图像或视频数据转换为模型可以处理的格式，如将图像切分成固定大小的patches（小块），然后将这些patches转换为特征向量。
9. **噪声引入：**在数据预处理后的特征向量上逐步引入噪声，形成一个噪声增加的扩散过程。这个过程可以视为从原始数据到噪声数据的转换。
10. **模型训练：**使用引入了噪声的特征向量作为输入，训练Diffusion Transformer模型。模型的目标是学习如何逆转噪声增加的过程，即从噪声数据恢复出原始数据。
11. **图像或视频生成：**在模型训练完成后，可以通过输入噪声数据（或随机生成的噪声）到模型中，经过模型的处理后生成新的图像或视频。这个生成过程利用了模型学习到的从噪声到原始数据的映射关系。

**评估指标**

DiT 输出的质量是根据弗雷谢特截取距离（FID）来评估的，FID 衡量生成的图像版本的分布与原始图像分布的比较（越低越好）。

FID 的提高取决于处理预算。在 256 x 256 像素的 ImageNet 图像上，计算能力为 6 gigaflops 的小型 DiT 实现了 68.4 FID，计算能力为 80.7 gigaflops 的大型 DiT 实现了 23.3 FID，计算能力为 119 gigaflops 的最大 DiT 实现了 9.62 FID。使用 U-Net（104 gigaflops）的潜在扩散模型实现了 10.56 FID。

### DiT 应用

**Sora模型是一种先进的视觉技术模型，以其独特的方式生成视频，通过逐步去除噪声来形成最终画面，使得生成的场景更加细致，并具备学习复杂动态的能力。**

![[Untitled 512.png]]

**Sora的核心组件：Sora模型的核心组成包括Diffusion Transformer（DiT）、Variational Autoencoder（VAE）和Vision Transformer（ViT）。**

**DiT负责从噪声数据中恢复出原始的视频数据，VAE用于将视频数据压缩为潜在表示，而ViT则用于将视频帧转换为特征向量以供DiT处理。**

12. **Diffusion Transformer（DiT）：**DiT结合了扩散模型和Transformer架构的优势，通过模拟从噪声到数据的扩散过程，DiT能够生成高质量、逼真的视频内容。**在Sora模型中，DiT负责从噪声数据中恢复出原始的视频数据。**
13. **Variational Autoencoder（VAE）：**VAE是一个生成模型，它能够将输入的图像或视频数据压缩为低维度的潜在表示（latent representation），并通过解码器将这些潜在表示还原为原始数据。**在Sora模型中，VAE被用作编码器，将输入的视频数据压缩为DiT的输入，从而指导DiT生成与输入视频相似的视频内容。**
14. **Vision Transformer（ViT）：**ViT是一种基于Transformer的图像处理模型，它将图像视为一系列的patches（小块），并将这些patches转换为特征向量作为Transformer的输入。**在Sora模型中，ViT可能被用作预处理步骤或作为模型的一个组件。**

### 参考链接

[https://www.wpeebles.com/DiT](https://www.wpeebles.com/DiT)

[https://arxiv.org/abs/2212.09748?source=post_page-----e603c4770f7e--------------------------------](https://arxiv.org/abs/2212.09748?source=post_page-----e603c4770f7e--------------------------------)





