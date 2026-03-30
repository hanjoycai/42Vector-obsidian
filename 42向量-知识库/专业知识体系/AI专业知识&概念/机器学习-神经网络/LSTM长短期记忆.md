---
base: "[[机器学习-神经网络.base]]"
属于名称: 长短期记忆
描述: 长短期记忆(英语：Long Short-Term Memory， LSTM)是一种时间循环神经网络(RNN) 论文首次发表于1997年。由于独特的设计结构，LSTM适合于处理和预测时间序列中间隔和延迟非常长的重要事件。
AIGC领域:
  - 神经网络
---
### LSTM简介

短期记忆网络——通常被称为 LSTM，是一种特殊的 [RNN](https://easyai.tech/ai-definition/rnn/)，能够学习长期依赖性。由 Hochreiter 和 Schmidhuber（1997）提出的，并且在接下来的工作中被许多人改进和推广。LSTM 在各种各样的问题上表现非常出色，现在被广泛使用。

LSTM 也具有这种类似的链式结构，但重复模块具有不同的结构。不是一个单独的神经网络层，而是四个，并且以非常特殊的方式进行交互。

![[Untitled 277.png]]

![[Untitled 278.png]]

LSTM 和 GRU 是作为短时记忆的解决方案而诞生的。它们拥有名为 "门 "的内部机制，可以调节信息流。这些门可以了解序列中哪些数据需要保留或丢弃。这样，它就能将相关信息顺着长长的序列链传递下去，从而做出预测。几乎所有基于递归神经网络的最新成果都是通过这两种网络实现的。LSTM 和 GRU 可用于语音识别、语音合成和文本生成。你甚至可以用它们为视频生成字幕。

### ***LSTM的核心思路***

**RNN 面临问题 ： RNN（递归神经网络）在处理长序列时面临的主要问题：短时记忆和梯度消失/梯度爆炸。**

![](https://p6-volc-community-sign.byteimg.com/tos-cn-i-tlddhu82om/6b2563a589f64e66a002717fa9c1ecb6~tplv-tlddhu82om-image.image?=&rk3s=8031ce6d&x-expires=1719198994&x-signature=fHUiz8eGLNHZWrx57RyPjqjWDFc%3D)

梯度更新规则

- 短时记忆
- 问题描述：RNN在处理长序列时，由于信息的传递是通过隐藏状态进行的，随着时间的推移，较早时间步的信息可能会在传递到后面的时间步时逐渐消失或被覆盖。
- 影响：这导致RNN难以捕捉和利用序列中的长期依赖关系，从而限制了其在处理复杂任务时的性能。
- 梯度消失/梯度爆炸
- 问题描述：在RNN的反向传播过程中，梯度会随着时间步的推移而逐渐消失（变得非常小）或爆炸（变得非常大）。
- 影响：梯度消失使得RNN在训练时难以学习到长期依赖关系，因为较早时间步的梯度信息在反向传播到初始层时几乎为零。梯度爆炸则可能导致训练过程不稳定，权重更新过大，甚至导致数值溢出。

**LSTM解决问题** **：** **大脑和LSTM在处理信息时都选择性地保留重要信息，忽略不相关细节，并据此进行后续处理。这种机制使它们能够高效地处理和输出关键信息，解决了 RNN（递归神经网络）在处理长序列时面临的问题。**

![](https://p6-volc-community-sign.byteimg.com/tos-cn-i-tlddhu82om/80ebcf35024b4b7591758b4f8f231450~tplv-tlddhu82om-image.image?=&rk3s=8031ce6d&x-expires=1719198994&x-signature=1KQ%2ByH%2BRzVSdBUZx56H%2FjozTVpE%3D)

**大脑记忆机制**

- **大脑记忆机制：** 当浏览评论时，大脑倾向于记住 **重要的关键词** 。无关紧要的词汇和内容容易被忽略。 **回忆时，大脑提取并表达主要观点，忽略细节** 。
- LSTM门控机制：LSTM通过输入门、遗忘门和输出门选择性地保留或忘记信息，使用保留的相关信息来进行预测，类似于大脑提取并表达主要观点。

### ***LSTM 的原理***

**RNN 工作原理 ： 第一个词被转换成了机器可读的向量，然后 RNN 逐个处理向量序列。**

![[893b68f0dc1a437aa79e4449ddf2bb23tplv-tlddhu82om-image.gif]]

**逐一处理矢量序列**

- 隐藏状态的传递
- 过程描述：在处理序列数据时，RNN将前一时间步的隐藏状态传递给下一个时间步。
- 作用：隐藏状态充当了神经网络的“记忆”，它包含了网络之前所见过的数据的相关信息。
- 重要性：这种传递机制使得RNN能够捕捉序列中的时序依赖关系。

![[e357b6ce70fe4cffa8af534663c93e7dtplv-tlddhu82om-image.gif]]

**将隐藏状态传递给下一个时间步**

- 隐藏状态的计算
- 细胞结构：RNN的一个细胞接收当前时间步的输入和前一时间步的隐藏状态。
- 组合方式：当前输入和先前隐藏状态被组合成一个向量，这个向量融合了当前和先前的信息。
- 激活函数：组合后的向量经过一个tanh激活函数的处理，输出新的隐藏状态。这个新的隐藏状态既包含了当前输入的信息，也包含了之前所有输入的历史信息。

![[Untitled 279.png]]

**tanh 激活函数 （区间-1～1）**

- 输出：新的隐藏状态被输出，并被传递给下一个时间步，继续参与序列的处理过程。

![[f425d06e5cdc4c36a201f21869def3batplv-tlddhu82om-image.gif]]

**RNN 的细胞结构和运算**

**LSTM工作原理 ：**

![[Untitled 280.png]]

**LSTM的细胞结构和运算**

- 输入门
- 作用：决定哪些新信息应该被添加到记忆单元中。
- 组成：输入门由一个sigmoid激活函数和一个tanh激活函数组成。sigmoid函数决定哪些信息是重要的，而tanh函数则生成新的候选信息。
- 运算：输入门的输出与候选信息相乘，得到的结果将在记忆单元更新时被考虑。

![[398c26278df744a8b2601fb4e1484602tplv-tlddhu82om-image.gif]]

- **输入门（sigmoid激活函数 + t anh激活函数 ）**
- 遗忘门
- 作用：决定哪些旧信息应该从记忆单元中遗忘或移除。
- 组成：遗忘门仅由一个sigmoid激活函数组成。

![[cc8acc0d2d1445f586ddb78d883bcc36tplv-tlddhu82om-image.gif]]

**sigmoid 激活函数 （区间0～1）**

- 运算：sigmoid函数的输出直接与记忆单元的当前状态相乘，用于决定哪些信息应该被保留，哪些应该被遗忘。输出值越接近1的信息将被保留，而输出值越接近0的信息将被遗忘。

![[de94e85235d74034b09428236a9d3795tplv-tlddhu82om-image.gif]]

- **遗忘门（sigmoid激活函数）**
- 输出门
- 作用：决定记忆单元中的哪些信息应该被输出到当前时间步的隐藏状态中。
- 组成：输出门同样由一个sigmoid激活函数和一个tanh激活函数组成。sigmoid函数决定哪些信息应该被输出，而tanh函数则处理记忆单元的状态以准备输出。
- 运算：sigmoid函数的输出与经过tanh函数处理的记忆单元状态相乘，得到的结果即为当前时间步的隐藏状态。

![](https://p6-volc-community-sign.byteimg.com/tos-cn-i-tlddhu82om/a749711e414a4a718b94dccd0462fe7d~tplv-tlddhu82om-image.image?=&rk3s=8031ce6d&x-expires=1719198994&x-signature=gpno%2Fubmn%2BGmcuA1JOG6ruqN3so%3D)

- **输出门（ sigmoid激活函数 + tanh激活函数 ）**

### ***LSTM 的应用***

**机器翻译：**

![](https://p6-volc-community-sign.byteimg.com/tos-cn-i-tlddhu82om/27806f548be84a359922dade816964e0~tplv-tlddhu82om-image.image?=&rk3s=8031ce6d&x-expires=1719198994&x-signature=03lTk9ftBc9iy5OtsssUBK2V8mg%3D)

**应用描述：LSTM在机器翻译中用于将源语言句子自动翻译成目标语言句子。**

关键组件：

- 编码器（Encoder）：一个LSTM网络，负责接收源语言句子并将其编码成一个固定长度的上下文向量。
- 解码器（Decoder）：另一个LSTM网络，根据上下文向量生成目标语言的翻译句子。

流程：

1. 源语言输入：将源语言句子分词并转换为词向量序列。
2. 编码：使用编码器LSTM处理源语言词向量序列，输出上下文向量。
3. 初始化解码器：将上下文向量作为解码器LSTM的初始隐藏状态。
4. 解码：解码器LSTM逐步生成目标语言的词序列，直到生成完整的翻译句子。
5. 目标语言输出：将解码器生成的词序列转换为目标语言句子。

优化： 通过比较生成的翻译句子与真实目标句子，使用反向传播算法优化LSTM模型的参数，以提高翻译质量。

**情感分析：**

![](https://p6-volc-community-sign.byteimg.com/tos-cn-i-tlddhu82om/f7c529e13d414f7b948b3d9fbe923667~tplv-tlddhu82om-image.image?=&rk3s=8031ce6d&x-expires=1719198994&x-signature=IQAy7vGxoLxLDLq%2FNM6KNd1KPfQ%3D)

**应用描述：LSTM用于对文本进行情感分析，判断其情感倾向（积极、消极或中立）。**

关键组件：

- LSTM网络：接收文本序列并提取情感特征。
- 分类层：根据LSTM提取的特征进行情感分类。

流程：

6. 文本预处理：将文本分词、去除停用词等预处理操作。
7. 文本表示：将预处理后的文本转换为词向量序列。
8. 特征提取：使用LSTM网络处理词向量序列，提取文本中的情感特征。
9. 情感分类：将LSTM提取的特征输入到分类层进行分类，得到情感倾向。
10. 输出：输出文本的情感倾向（积极、消极或中立）。

优化：通过比较预测的情感倾向与真实标签，使用反向传播算法优化LSTM模型的参数，以提高情感分析的准确性。

### 参考链接：

<!-- Column 1 -->
[https://zh.wikipedia.org/wiki/長短期記憶](https://zh.wikipedia.org/wiki/長短期記憶)

<!-- Column 2 -->
[https://towardsdatascience.com/illustrated-guide-to-lstms-and-gru-s-a-step-by-step-explanation-44e9eb85bf21](https://towardsdatascience.com/illustrated-guide-to-lstms-and-gru-s-a-step-by-step-explanation-44e9eb85bf21)

[https://www.geeksforgeeks.org/deep-learning-introduction-to-long-short-term-memory/](https://www.geeksforgeeks.org/deep-learning-introduction-to-long-short-term-memory/)