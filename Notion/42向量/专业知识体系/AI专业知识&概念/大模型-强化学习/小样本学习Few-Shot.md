---
base: "[[大模型-强化学习.base]]"
属于名称: 小样本学习
描述: 小样本学习也叫做少样本学习(Few-Shot Learning，FSL)，其目标是从少量样本中学习到解決问题的方法 ．与小样本学习相关的概念还有零样本学习(zero-shot learning)等．零样本学习是指在没有训练数据的情况下，利用类别的厲性等信息训练模型，从而识别新类别。
AIGC领域:
  - 推理优化
---
### 简介

**小样本学习（Few-Shot Learning，FSL）是机器学习领域中的一种重要技术，其目标是在仅使用少量样本（例如50个或更少）的情况下，设计出能够高效学习和准确预测的机器学习模型。**这种技术在许多应用领域都具有重要的实际意义，例如在数据标注成本较高的场景中，或者在面对快速变化的任务时。应用包括图像分类、情感分类和对象识别。

![[Untitled 348.png]]


少样本学习（Few-Shot Learning，FSL）的理论基础有三个角度：**贝叶斯、信息论和优化。**

从贝叶斯的角度来看，它涉及到利用先验知识来提高学习性能。在FSL中，这意味着将关于任务或领域的先验知识纳入模型中，以帮助模型更好地从一个小数据集中泛化。贝叶斯方法还可以帮助进行模型选择和超参数调整。

从信息论的角度来看，它关注量化从小数据集中学习所需的信息量。在FSL中，这意味着找到从一个小数据集中提取最有用信息的方法来提高学习性能。信息论还可以帮助设计更好的数据增强技术和选择最有信息量的样本进行训练。

从优化的角度来看，它涉及到找到可以最小化损失函数的最佳模型参数。在FSL中，这意味着找到能够从小数据集中泛化良好的最佳模型。优化方法还可以帮助设计更好的元学习算法和选择最适合FSL的优化算法。

### **相关学习问题**

少样本学习方法主要可以分为三类：基于非情景的方法、基于元学习的方法和基于度量学习的方法。

**基于非情景的方法（Non-Metric Methods）**

这种方法主要依赖于从大量未标记的数据中提取信息，并利用这些信息对新的样本进行分类或回归等任务，依赖于整个数据集的统计性质，而非依赖于特定的样本。它通常包括k近邻（k-NN）方法和贝叶斯方法等。在非情景的方法中，模型并不关注特定样本的信息，而是更关注整个数据集的信息。这种方法通常利用一些常见的统计方法，例如聚类、主成分分析等来从大量未标记的数据中提取有用的信息，然后利用这些信息来完成新的样本的分类或回归等任务。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=82206&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9leWliRjZrSkJqVHN1S0lFSG5MSFE3Q0wyTlRJMUR2SWV3Z1ZXVXpvT3drbTNuUjlvczFpYVJaRDZjcnpjR1BpYlNIdjh0RGg0bTloTFdBM2ZZd1RmdlhGdy82NDA/d3hfZm10PXBuZw==)

图1 基于非情景的方法

**基于元学习的方法（Meta-Learning）**

元学习是一种特殊类型的机器学习方法，它的目标是使得模型能够在接触到新的任务时快速学习和适应。因此，元学习可以被认为是一种在学习如何学习的过程中进行学习的机器学习方法。其中，模型学习通常被分为两个阶段：元训练阶段和元测试阶段。在元训练阶段，模型会接触到大量不同的学习任务，并学习如何快速适应这些任务；在元测试阶段，模型会接触到新的任务，并利用在元训练阶段学到的知识来快速适应这些新任务。元学习的主要目标是在接触到新的任务时，通过利用之前学到的知识和经验来快速适应和学习新的任务。这种方法通常利用一些常见的算法和技术，例如神经网络、强化学习等来学习如何快速适应和学习新的任务。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=82206&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9leWliRjZrSkJqVHN1S0lFSG5MSFE3Q0wyTlRJMUR2SWVEbVlwbllFOFFwT0tick1MbGhBWjhLMnU5amRSUEhueE45YXI1dnNhM01kdVJyRlVRWHhYUmcvNjQwP3d4X2ZtdD1wbmc=)

图2 基于元学习的方法

**基于度量学习的方法（Metric Learning）**

度量学习方法是一种通过学习数据间的相似性关系来进行学习的机器学习方法。它的目标是学习一个度量空间，这个度量空间可以对输入数据的相似性进行准确的衡量。常用的度量学习方法包括Siamese网络、对比学习和三元组损失等。Siamese网络是一种通过学习一个共享的嵌入空间来对输入数据进行表示的方法。这个嵌入空间可以将输入数据映射到同一个向量空间中，使得同类样本的向量距离更近，而异类样本的向量距离更远。对比学习是一种通过最大化两个样本之间的相似性或者最小化两个样本之间的不相似性来进行学习的学习方法。三元组损失是一种通过最小化一个样本与同类样本之间的距离和与异类样本之间的距离之差来进行学习的学习方法。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=82206&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9leWliRjZrSkJqVHN1S0lFSG5MSFE3Q0wyTlRJMUR2SWVESlE0NjdQN0tNNHphNHcxV2NJQ09UVG9Cd1dxOWpxbTJUeGtpY2tldGpVY2V4VzZqTE13bER3LzY0MD93eF9mbXQ9cG5n)

图3 基于度量学习的方法

总的来说，少样本学习方法在面对只有少量数据标注的情况下具有非常重要的作用，它能够有效地利用未标注数据进行训练，从而提高模型的泛化能力和预测准确性。

### **分类**

FSL的核心问题是经验风险最小化器并不可。基于如何使用先验知识来处理这一核心问题，我们将FSL方法从三个角度进行分类：(a) 数据，增强了FSL的监督经验；(b) 模型，将FSL的假设空间限制为更小；(c) 算法，则改变了在给定假设空间中寻找最佳假设的搜索策略。如图1，2所示：

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=82206&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9leWliRjZrSkJqVHN1S0lFSG5MSFE3Q0wyTlRJMUR2SWVkUVBKU1Uwa2ZXeDRpYVpza2I2aWNPaGRVWW53WXIwRExFOWZ1d3JPOFZlM1hkMmhGZElTcDlSUS82NDA/d3hfZm10PXBuZw==)

图1 关于FSL方法如何解决少样本问题的不同分类

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=82206&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9leWliRjZrSkJqVHN1S0lFSG5MSFE3Q0wyTlRJMUR2SWVEdlVIOU80VVd6bk9WVWdJMUhVSDZhQnVyaWNwT3ppY0FpYlZDcW9aZWVaNm8yclNHYzBLMFpIU1EvNjQwP3d4X2ZtdD1wbmc=)

图2 基于每种方法重点的FSL方分类


### **小样本学习如何运作？**

传统 Few-Shot 框架的主要目标是学习一个相似性函数，以映射支持集和查询集中类别之间的相似性。相似性函数通常会输出一个相似性概率值。

在下图中，当比较两张猫的图像（I1 和 I2）时，完美的相似度函数应该输出 1.0 的值。而在其他两种情况下，将猫的图像与猫鼬的图像进行比较时，相似度输出值应该为 0.0。然而，这只是一种理想情况。实际上，I1 和 I2 的相似度值可能是 0.95，而其他两种情况的相似度值可能小于 0（如 0.02 和 0.03）。

![[Untitled 349.png]]

![[Untitled 350.png]]

使用大规模标注数据集来训练这种相似性函数的参数。以监督方式预训练深度模型所使用的训练集可用于此目的。一旦训练好了相似性函数的参数，就可以在 "少量学习 "阶段利用支持集信息来确定查询集上的相似性概率。然后，对于每个查询集样本，Few-Shot 模型将从支持集中推断出相似度最高的类别作为类别标签预测。上图就是这样一个例子。

### 参考链接

[https://en.wikipedia.org/wiki/Few-shot_learning](https://en.wikipedia.org/wiki/Few-shot_learning)