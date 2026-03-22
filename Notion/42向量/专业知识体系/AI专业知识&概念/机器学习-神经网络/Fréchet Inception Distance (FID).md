---
base: "[[机器学习-神经网络.base]]"
属于名称: ""
描述: Fréchet 初始距离 FID 是一种性能指标，它由 Heusel 等人于 2017 年提出，用于计算真实图像的特征向量与假图像的特征向量（由生成器生成）之间的距离。 FID 分数越低代表生成器生成的图像质量越高并且与真实图像相似。 FID 基于图像的特征向量。
AIGC领域:
  - 数据指标
---
### 简介

**Fréchet Inception Distance (FID) 是一种改进的 IS 评估指标，它主要解决了 IS 没有考虑真**

**实数据的问题。**与 IS 不同的是，FID 将图像嵌入到特征空间中，并在特定的层停止，即丢弃了一些网络

的最终层。然后假设特征向量服从高斯分布，计算真实和生成数据的分布之间的 Fréchet 距离。

FID 可以通过计算真实数据分布和生成数据分布之间的距离来评估生成数据的逼真程度。显然，**FID 的值**

**越低，说明生成的数据与真实数据越相似，逼真程度越高。**

![[Untitled 39.png]]

通过计算图像的均值和协方差，将激活函数的输出归纳为一个多变量高斯分布。然后将这些统计量用于计算

真实图像和生成图像集合中的激活函数。然后使用 Frechet 距离（又称 Wasserstein-2 距离）计算

这两个分布之间的距离。


FID 越低，图像质量越好；并且FID具有很好的抗失真能力。下图可以看到失真程度越低FID分数越高。

![[Untitled 40.png]]


### 计算过程

### **特征提取**

FID（Fréchet Inception Distance）分数的计算是通过首先加载一个预训练的Inception v3模型来完成的。

该模型的输出层被移除，输出来自最后一个池化层的激活值，即全局空间池化层的激活值。这个输出层有2,048个激活值，因此，每个图像被预测为2,048个激活特征。这被称为图像的编码向量或特征向量。然后，为问题领域中的一组真实图像预测一个2,048维的特征向量，以提供真实图像的表示参考。然后可以计算合成图像的特征向量。

结果是分别使用真实图像和生成图像获得的两组2,048维特征向量。

FID的计算公式如下:

$$
\mathrm{FID}=\left\|\mu-\mu_w\right\|_2^2+\operatorname{tr}\left(\Sigma+\Sigma_w-2\left(\Sigma^{1 / 2} \Sigma_w \Sigma^{1 / 2}\right)^{1 / 2}\right)
$$

### 参考链接

[https://en.wikipedia.org/wiki/Fréchet_inception_distance](https://en.wikipedia.org/wiki/Fréchet_inception_distance)

[https://strikingloo.github.io/wiki/fid](https://strikingloo.github.io/wiki/fid)