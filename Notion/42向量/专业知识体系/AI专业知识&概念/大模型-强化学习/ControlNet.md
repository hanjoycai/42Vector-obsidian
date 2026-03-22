---
base: "[[大模型-强化学习.base]]"
属于名称: ControlNet
描述: ControlNet 是一种神经网络，可通过添加额外条件来改进稳定扩散中的图像生成。这样，用户就可以对生成的图像进行更多控制。ControlNet 模型让用户只需一个提示就能生成一致的图像，而无需尝试不同的提示。
AIGC领域:
  - 模型
---
### 简介

ControlNet是一种通过添加额外条件来控制扩散模型的神经网络结构。它提供了一种增强稳定扩散的方法，在文本到图像生成过程中使用条件输入，如涂鸦、边缘映射、分割映射、pose关键点等。可以让生成的图像将更接近输入图像，这比传统的图像到图像生成方法有了很大的改进。

ControlNet 的革命性之处在于它解决了空间一致性问题。以前，没有有效的方法告诉 AI 模型保留输入图像的哪些部分。ControlNet 通过引入一种方法，使 Stable Diffusion 模型能够使用额外的输入条件，告诉模型确切地做什么。

有许多类型的调节输入（可视边缘、用户素描、人体姿态、深度等）可以提供一个扩散模型，以便对图像生成进行更多控制。

ControlNet 如何控制扩散模型的一些示例：

- 通过提供特定的人体姿势，就能生成模仿相同姿势的图像。
- 使输出结果与另一张图片的风格一致。
- 将涂鸦变成高质量图像
- 使用参考图像生成类似图像。
- 为图像缺失部分上色

![[Untitled 352.png]]


### **ControlNet 有哪些功能？**

- ControNet 的初始版本带有以下预训练权重：
- Canny edge一黑色背景上带有白色边缘的单色图像。
- Depth/Shallow areas— 灰度图像，黑色代表深区域，白色代表浅区域。
- Normal map一法线贴图图像。
- Semantic segmentation map——ADE20K 的分割图像。
- HEDedge— 黑色背景上带有白色软边缘的单色图像。
- Scribbles一黑色背景上带有白色轮廓的手绘单色涂鸦图像。
- openPose（姿势关键点）一 OpenPose 骨骼图像。
- M-LSD一仅由黑色背景上的白色直线组成的单色图像。

![[Untitled 353.png]]


## 内部架构

Stable Diffusion (UNet) 中的所有参数都被锁定并克隆到 ControlNet 端的可训练副本中。然后使用外部条件向量训练该副本。

![[Untitled 354.png]]

> 创建原始权重的副本而不是直接训练原始权重是为了防止数据集较小时出现过拟合，并保持已经训练好的大模型的高质量，这些大模型在数十亿图像上训练得到，并可以直接部署到生产环境使用。

### **前馈部分**

![[Untitled 355.png]]

*x*,*y*：神经网络中的深层特征

*c*：额外条件

+ : 特征相加

Z(⋅;⋅)：零卷积运算（权重和偏差都用零初始化的 1 x 1 卷积层）

F(⋅;⋅)：神经网络块操作（例如 “resnet” 块、“conv-bn-relu” 块等）

Θ_z1 : 第一个零卷积层的参数

Θ_z2 : 第二零卷积层的参数

Θ_c : 可训练副本的参数

ControlNet 的第一个训练步骤

在第一个训练步骤中，由于零卷积层的权重和偏置被初始化为零，因此前馈过程与没有 ControlNet 的过程完全相同。

经过反向传播后，ControlNet 中的零卷积层会变成非零，并影响输出。

> 换句话说，在进行任何优化之前，将 ControlNet 应用于某些神经网络块时，它不会对深度神经特征造成任何影响。

![[Untitled 356.png]]

**反向传播**

![[Untitled 357.png]]

反向传播更新 ControlNet 中的可训练副本和零卷积层，使零卷积权重在学习过程中逐渐过渡到优化值。


### **与 Stable Diffusion 相结合**

由于稳定扩散的 UNet 接受潜特征（64×64）而不是原始图像，我们还必须将基于图像的条件转换为 64×64 的特征空间，以匹配卷积大小。

$$
\begin{equation}c_{\mathrm{f}}=\mathcal{E}\left(c_{\mathrm{i}}\right)\end{equation}
$$

可以使用网络 *ε *将输入条件 (c_i) 编码为特征图 (c_f)。

![[Untitled 358.png]]

**整体架构**

下图展示了 Stable Diffusion 中 ControlNet 和 UNet 在一个去噪步骤中的输入和输出。

![[Untitled 359.png]]

此外，下图从整体上说明了 ControlNet 和 Stable Diffusion 如何在反向扩散过程（采样）中协同工作。

![[Untitled 360.png]]


### **输入条件示例**

**Canny 边缘图**

![[Untitled 361.png]]

**线条图**

![[Untitled 362.png]]

**涂鸦**

![[Untitled 363.png]]

**霍夫线
**

![[Untitled 364.png]]

**语义分割**

![[Untitled 365.png]]

**深度图**

![[Untitled 366.png]]

法线图

![[Untitled 367.png]]

姿势

![[Untitled 368.png]]

### 参考链接

[https://stablediffusionwiki.com/index.php/ControlNet](https://stablediffusionwiki.com/index.php/ControlNet)

[https://stable-diffusion-art.com/controlnet/](https://stable-diffusion-art.com/controlnet/)

[https://arxiv.org/abs/2302.05543](https://arxiv.org/abs/2302.05543)