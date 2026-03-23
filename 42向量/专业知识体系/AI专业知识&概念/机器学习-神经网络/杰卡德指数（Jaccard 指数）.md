---
base: "[[机器学习-神经网络.base]]"
属于名称: 杰卡德指数（Jaccard Index）
描述: 杰卡德指数（Jaccard Index），也称为杰卡德相似系数，是一种用于衡量两个集合之间相似度的统计量。它定义为两个集合交集的元素个数除以并集的元素个数
AIGC领域:
  - 数据指标
---
### 简介

杰卡德相似系数（Jaccard Similarity Coefficient）是用来衡量两个集合之间相似度的指标。它定义为两个集合交集大小与并集大小之比。

![[Untitled 117.png]]

计算公式

$$
J(A, B)=\frac{|A \bigcap B|}{|A|+|B|-|A \bigcap B|}
$$

Jaccard相似度的定义很简单，两个句子词汇的交集size除以两个句子词汇的并集size。举个例子来说：

- 01： Al is our friend and it has been friendly。
- 02： Al and humans have always been friendly。

为了计算Jaccard相似度，我们首先使用英文nlp中常用的技术Lemmatization，用词根替换那些具有相同词根的词汇。在上面的例子中，friend和friendly具有相同的词根，have和has具有相同的词根。我们可以面出两个句子词汇的交集与并集情况，如图所示：

![[Untitled 118.png]]

对于上面两个句子，其Jaccard相似度为5/(5+3+2)=0.5，即两个句子词汇的交集5个词汇，并集10个词汇

### **Jaccard 距离**

与Jaccard 系数相关的指标叫做Jaccard 距离，用于描述集合之间的不相似度。Jaccard 距离越大，样本相似度越低。

$$
d_j(A, B)=1-\frac{|A \bigcap B|}{|A|+|B|-|A \bigcap B|}
$$

### 应用场景

1. 推荐系统

Jaccard 系数既可以应用于基于物品的协同过滤（Item-based Collaborative Filtering，ItemCF），也可以应用于基于用户的协同过滤（User-based Collaborative Filtering，UserCF）。

在 ItemCF 中，我们利用 Jaccard 系数计算不同物品之间的相似度，然后**根据物品相似度生成推荐**。而在 UserCF 中，我们可以利用 Jaccard 系数计算不同用户之间的相似度，然后**根据用户相似度将邻居用户喜欢的推荐给当前用户**。

2. 文本相似度计算

在自然语言处理中，可以使用 Jaccard 相似系数来衡量两个文本的相似度。将文本转化为词汇集合，然后计算它们的 Jaccard 相似系数。这在搜索引擎中常被用来寻找相似的文档或推荐相关内容。

3. 数据去重

可以用 Jaccard 距离比较数据记录之间的相似度，找出重复或近似的记录。例如电商网站可以用它来对产品目录进行数据清洗，标识出重复数据。

4. 社交网络分析

在社交网络中，Jaccard 相似系数可以用来分析两个用户之间的关系强度。如果两个用户共同关注了很多相同的人或页面，他们的 Jaccard 相似系数会较高，可能表示他们有较强的社交关系。

5. 生物信息学

可以应用 Jaccard 距离对基因组序列或蛋白质序列进行比较，判断它们的相似性。这可以用于功能预测或分类。

在基因组学研究中，Jaccard 相似系数可以用来比较不同个体的基因组。基因集合的交集表示共有的基因，而基因集合的并集表示所有存在的基因，从而可以用 Jaccard 相似系数衡量基因组之间的相似度。

6. 图像处理

可以提取图像的特征向量，然后用 Jaccard 距离计算两张图片的相似度，用于图像搜索、分类等。

在图像处理领域，Jaccard 相似系数可以用来比较两个图像的区域重叠情况。这在物体检测和分割任务中常被用来评估算法的性能。

7. 指纹识别

可以用 Jaccard 距离对比两枚指纹的明暗图形,判断它们是否来自同一个人。

8. 语音识别

可以用 Jaccard 距离比较语音频谱图，判断说话者是否为同一人。


### 参考链接：

[https://zh.wikipedia.org/wiki/雅卡尔指数](https://zh.wikipedia.org/wiki/雅卡尔指数)