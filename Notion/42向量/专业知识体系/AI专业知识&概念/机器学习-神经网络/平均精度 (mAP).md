---
base: "[[机器学习-神经网络.base]]"
属于名称: 平均精度均值（mean Average Precision，简称mAP）
描述: 平均精度均值（mean Average Precision，简称mAP）是目标检测任务中常用的性能评估指标。它通过考虑精确度（Precision）和召回率（Recall），对模型准确检测对象的性能进行全面评估
AIGC领域:
  - 数据指标
---
### 数据指标基础

为了理解mAP的含义，先列出这几个目标检测的基本指标：

- *TP：IoU>IoU_Threshold的真值检测框数量。*
- *FP：IoU≤IoU_Threshold的检测框数量，或者是检测到同一个真值框的多余检测框的数量。*
- *FN：没有检测到的真值框的数量。*
- *Precision(精确率)：TP/（TP+FP）*
- *Recall（召回率）：TP/（TP+FN）*
- *F1-Score：2×（presicion×recall）/（presicion+recall） 用于衡量precision和recall间的大小关系*

> **mAP**是目标检测模型中常用的评价指标，它的英文全称是(**Mean Average Precision**)，翻译过来就是平均精确率的平均。

首先我们需要知道精确率(Precision)和召回率(Recall)，也称为查准率和查全率的定义

**Precision**衡量你的预测有多准确。也就是说，你的预测正确的百分比。

**Recall**衡量您发现所有正例的能力。 例如，我们可以在前K个预测中找到80％的正例。

![[Untitled 234.png]]

交并比**IoU(Intersection over union)**

**IoU**度量两个边界之间的重叠。我们使用它来度量我们的预测边界与ground truth(实际对象边界)的重叠程度。在一些数据集中，我们预先定义了一个IoU阈值(比如0.5)来分类预测是真阳性还是假阳性。


### **AP**

AP指标（Average Percision）就是对精度的平均，通常用PR曲线下面积AUC（Area Under Curve）来表示。

通过举例说明，在本例中，整个数据集仅包含5个苹果。我们收集了所有图片中所有对苹果的预测，并根据预测的置信度按降序排列。第二列表示预测是否正确。在本例中，如果I o U ≥ 0.5 IoU\geq 0.5*IoU*≥0.5，则预测是正确的。

$$
\begin{array}{|l|l|l|l|}\hline \text { Rank } & \text { Correct? } & \text { Precision } & \text { Recall } \\\hline 1 & \text { True } & 1.0 & 0.2 \\\hline 2 & \text { True } & 1.0 & 0.4 \\\hline 3 & \text { False } & 0.67 & 0.4 \\\hline 4 & \text { False } & 0.5 & 0.4 \\\hline 5 & \text { False } & 0.4 & 0.4 \\\hline \mathbf{6} & \text { True } & 0.5 & 0.6 \\\hline \mathbf{7} & \text { True } & 0.57 & 0.8 \\\hline \mathbf{9} & \text { False } & 0.5 & 0.8 \\\hline 10 & \text { False } & 0.44 & 0.8 \\\hline\end{array}
$$

以SSD模型为例，输入一张图片进行预测，模型最后的输出的形状是(锚框数，6)，6代表着每个锚框对应的**类别标签+置信度+锚框的四个坐标**。

上表数据集当中只有5个苹果，但是在对数据集的预测过程中，一共得到了10个类别标签是苹果的锚框。那么我们我们怎么去获取该锚框的真实label，或称真实值，也就是它实际上是不是一个苹果？

方法是计算模型预测出来的锚框和人工标注的锚框(我们称之为Groud truth，真实值)的交并比，如果交并比超过0.5，那么认为该预测是正确的，即实际上该锚框框起来的是一个苹果。但是在实际预测当中，经常会出现多个预测锚框跟同一个GT(Groud Truth)的IoU值都大于0.5， 这个时候只将这些预测框中置信度最大的算是一个苹果，其他不算苹果。

上面的过程是获取锚框的真实label，因为目标检测和普通的分类任务不一样，锚框是模型生成的，而非人工输入，我们只有一个groud truth，所以只能用groud truth去获取锚框的真实label。

接下来就是锚框的预测值，上面我们得到了10个锚框，它们都说自己是苹果，但是我们知道置信度很低我们很难相信它就是一个苹果，所以需要设定一个阈值，大于等于该阈值的我们把该锚框设为是苹果，低于该阈值的我们把该锚框设为不是苹果。(模型的目的是生成一些预测值高的锚框，同时它们确实是该类别的锚框，也就是跟GT的交并比很高）。

然后回到上面关于苹果那张表，首先我们把阈值就设定为rank1的置信度，会得到下面这张表：

| **Rank** | **预测值** | **真实值** |
| --- | --- | --- |
| 1 | 是苹果 | 是苹果 |
| 2 | 不是苹果 | 是苹果 |
| 3 | 不是苹果 | 不是苹果 |
| 4 | 不是苹果 | 不是苹果 |
| 5 | 不是苹果 | 不是苹果 |
| 6 | 不是苹果 | 是苹果 |
| 7 | 不是苹果 | 是苹果 |
| 8 | 不是苹果 | 不是苹果 |
| 9 | 不是苹果 | 不是苹果 |
| 10 | 不是苹果 | 是苹果 |

$$
\begin{gathered}T P=1, F P=0, F N=4 \\\text { Precision }=\frac{T P}{T P+F P}=1, \quad \text { Recall }=\frac{T P}{T P+F N}=0.2\end{gathered}
$$

这里TP+FP=计算集合的大小，FN=整个数据集中没有被识别出来的Groud Truth。

同理，我们可以计算包括了rank1，rank2，rank3的集合的PR值。

$$
\begin{gathered}T P=2, F P=1, F N=2 \\\text { Precision }=\frac{T P}{T P+F P}=0.667, \quad \text { Recall }=\frac{T P}{T P+F N}=0.4\end{gathered}
$$

通过计算每一步，我们得到了下面的PR曲线。

![[Untitled 235.png]]

平均精度(AP)的广义定义是找到上面的PR曲线下的面积。

$$
A P=\int_0^1 p(r) d r
$$

精确度和召回率总是在0到1之间。因此，AP也在0和1之间。在计算用于目标检测的AP之前,通常先将锯齿状的图形平滑化。

![[Untitled 236.png]]

在每个召回率上，我们将它的精确率替换为该召回率右侧的所有召回率对应的精确率的最大值。因此，橙色的线被转换成绿色的线，曲线会单调地减少，而不是之字形。这时因为一般来讲PR曲线的变化情形都是下面这样的，进行平滑是为了让其符合一般化规律。

![[Untitled 237.png]]




### **mAP**

mAP指标（mean Average Percision）就是基于类别对AP值进行平均，假设边界框总共 𝐶 个类别，对于第 𝑐*c*个类别，我们可以在固定的IOU阈值 𝛼 下，计算出对应的AP值，记为 𝐴𝑃𝑐，则mAP定义为

$$
m A P=\frac{1}{C} \sum_{c=1}^C A P_c
$$

如下图所示，左图表示全部的AUC曲线下面积，右图表示使用11个插值点计算得到的估计值。（值得注意的是，曲线下面积是每个点的右侧最高值进行估计得到的，所以算出的结果比真实曲线下面积更大一些）

<!-- Column 1 -->
![[Untitled 238.png]]

<!-- Column 2 -->
![[Untitled 239.png]]

$$
A P=A 1+A 2+A 3+A 4
$$


### 参考链接

<!-- Column 1 -->
[https://encord.com/glossary/mean-average-precision/](https://encord.com/glossary/mean-average-precision/)

<!-- Column 2 -->
[https://medium.com/@jonathan_hui/map-mean-average-precision-for-object-detection-45c121a31173](https://medium.com/@jonathan_hui/map-mean-average-precision-for-object-detection-45c121a31173)

[https://github.com/rafaelpadilla/Object-Detection-Metrics](https://github.com/rafaelpadilla/Object-Detection-Metrics)
