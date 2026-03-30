---
base: "[[大模型-强化学习.base]]"
属于名称: 思维链提示
描述: 思维链提示(CoT， Chain-of-thought) 通过提示 LLM 生成一系列中间步骤来提高 LLM 的推理能力，这些中间步骤会导致多步骤问题的最终答案。该技术由谷歌研究人员于 2022 年首次提出。
AIGC领域:
  - 大模型
---
### **诞生背景**

2020年，OpenAI 就在论文 [Language Models are Few-Shot Learners](https://link.zhihu.com/?target=https%3A%2F%2Farxiv.org%2Fpdf%2F2005.14165.pdf) 中提出了如何使用 prompt learning 提升大模型的推理能力。

论文中提出了 Zero-shot、One-shot、Few-shot 三种不同的 prompt 方法，如下图所示。

![](https://pic1.zhimg.com/80/v2-98b084fa12e763992fc5842c8c4fd1c8_1440w.jpg)

图1: zero-shot、one-shot、few-shot和微调方法的对比

- **Few-Shot（FS）**是指模型在推理时给予少量样本，但不允许进行权重更新。对于一个典型数据集，

Few-shot 有上下文和样例（例如英语句子和它的法语翻译）。Few-shot 的工作方式是提供 K 个样

本，然后期望模型生成对应的结果。通常将 K 设置在 10 到 100 的范围内，因为这是可以适应模型上下

文窗口的示例数量（nctx = 2048）。

- **One-Shot（1S）**与 Few-Shot 类似，只允许一个样本（除了任务的自然语言描述外）。将 One-
- Shot 与 Few-Shot、Zero-Shot 区分开的原因是它最接近某些任务与人类沟通的方式。相比之
- 下，如果没有示例，有时很难传达任务的内容或格式。

- **Zero-Shot（0S）**和 One-shot 类似，但不允许提供样本，只给出描述任务的自然语言指令。该方
- 法提供了最大的方便性、稳健性以及避免虚假相关的可能性，但也是最具挑战性的设置。在某些情况下，即使是人类，在没有例子的情况下，也可能难以理解任务的格式。

但是，即使是 Few-Shot，这种方法还是有比较大的缺陷的。

如果你的问题相对简单，不需要什么逻辑推理，可能靠大模型背答案就能做得不错，但是对于一些需要推理

的问题，都不用太难，就一些简单的算术应用题，大模型就大概率不太 work。

于是，思维链（Chain-of-Thought，CoT）很自然地被提出了。


### 什么是思维链CoT？

Chain-of-Thought(CoT)是一种改进的Prompt技术，目的在于提升大模型LLMs在复杂推理任务上的表

现，对于复杂问题尤其是复杂的数学题大模型很难直接给出正确答案。

如算术推理（arithmetic reasoning）、常识推理（commonsense reasoning）、符号推理

（symbolic reasoning）。

COT通过要求模型在输出最终答案之前，显式输出中间逐步的推理步骤这一方法来增强大模型的算数、常识

和推理能力。简单，但有效。


思维链 (Chain-of-thought，CoT) 的概念是在 Google 的论文 “Chain-of-Thought 

Prompting Elicits Reasoning in Large Language Models” 中被首次提出。

思维链（CoT）是一种改进的提示策略，用于提高 LLM 在复杂推理任务中的性能，如算术推理、常识推理和符号推理。

CoT 没有像 ICL 那样简单地用输入输出对构建提示，而是结合了中间推理步骤，这些步骤可以将最终输出

引入提示。简单来说，思维链是一种离散式提示学习，更具体地，大模型下的上下文学习（即不进行训练，

将例子添加到当前样本输入的前面，让模型一次输入这些文本进行输出完成任务），相比于之前传统的上下

文学习（即通过x1,y1,x2,y2,....xtest作为输入来让大模型补全输出ytest），思维链多了中间的中

间的推导提示，以下图为例：

![[Untitled 514.png]]

这篇文章是现任谷歌大脑研究员的Jason Wei在22年1月放到arxiv上面的文章，在上文所说的大背景下提

出了思维链这个概念。简单来说，思维链是一种离散式提示学习，更具体地，大模型下的上下文学习（即不

进行训练，将例子添加到当前样本输入的前面，让模型一次输入这些文本进行输出完成任务），相比于之前

传统的上下文学习，即通过x1,y1,x2,y2,....x_test作为输入来让大模型补全输出y_test，思维链多

了中间的一些闲言碎语絮絮叨叨。

花式调戏大语言模型，有一句非常神奇的咒语，能让LLM的回答结果大不一样，那就是——

“Let’s think step by step”。

此前很多用户就发现，一旦在问题中加上“Let’s think step by step”，ChatGPT就好像被施了魔

法，原本做错的数学题，突然就会做了；原本的胡说八道，突然就有理有据了。这就是思维链的魔力。


### 参考链接

<!-- Column 1 -->
[https://en.wikipedia.org/wiki/Prompt_engineering#Chain-of-thought](https://en.wikipedia.org/wiki/Prompt_engineering#Chain-of-thought)

<!-- Column 2 -->
[http://www.jasonwei.net/](http://www.jasonwei.net/)