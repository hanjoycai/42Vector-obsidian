---
base: "[[大模型-强化学习.base]]"
属于名称: 微调
描述: 微调是迁移学习的一种常用技术。目标模型复制了源模型上除掉了输出层外的所有模型设计及其参数，并基于目标数据集微调这些参数。微调在自然语言处理(NLP)中很常见，尤其是在语言建模领域。像OpenAl的GPT这样的大型语言模型可以在下游 NLP 任务上进行微调，以产生比预训练模型通常可以达到的更好的结果。
AIGC领域:
  - 微调方法
---
### 什么是 Fine-tuning（微调）？

LLM (大型语言模型) 微调是近年来 NLP (自然语言处理) 领域发展迅猛的一项技术，通过在预训练模型的基础上进行进一步训练，使模型能够学习特定领域或任务相关的知识，从而显著提升其在该领域或任务上的性能。

LLM 微调的核心思想是利用预训练模型的参数，将其作为新任务的起点，并通过少量特定领域或任务的数据进行“塑造”，从而使得模型尽可能快速适应新的任务或数据集。


**微调（Fine-tuning）：迁移学习的一种具体实现方式，对预训练模型的参数进行进一步的调整和优化，以适应新的任务。**

![[Untitled 480.png]]

在实际的业务场景中，微调的主要目的通常包括如下几点:

```plain text
 1. 领域适配

 LLM 通常是在跨领域的通用数据上训练，但在应用到特定领域时，如金融、医疗、法律等场景，性能可能会大打折扣。通过微调，可以将预训练模型调整适配到目标领域，使其更好地捕捉特定领域的语言特点和语义关系，从而提高在该领域下的性能表现。

 2. 任务定制

 即使在同一领域，不同的具体任务也可能有差异化的需求。比如文本分类、问答、命名实体识别等 NLP 任务，都会对语言理解和生成能力提出不同的要求。通过微调，可以根据下游任务的具体需求，优化模型在特定任务上的性能指标，如准确率、Recall、F1值等。

 3. 性能提升

 即使在某个特定任务上，预训练模型也可能存在准确率、速度等方面的瓶颈。通过微调，我们可以进一步提升模型在该任务上的性能表现。比如，针对推理速度要求很高的实时应用场景，可以对模型进行压缩优化；对于要求更高准确率的关键任务，也可以通过微调进一步提升模型的判断能力。
```

### **为什么需要微调？**

> **减少对新数据的需求和降低训练成本。**

**微调的价值：可以帮助我们更好地利用预训练模型的知识，加速和优化新任务的训练过程，同时减少对新数据的需求和降低训练成本。**

- **减少对新数据的需求：从头开始训练一个大型神经网络通常需要大量的数据和计算资源，而在实际应用中，我们可能只有有限的数据集。**通过微调预训练模型，我们可以利用预训练模型已经学到的知识，**减少对新数据的需求，从而在小数据集上获得更好的性能。**
- **降低训练成本：由于我们只需要调整预训练模型的部分参数，而不是从头开始训练整个模型，因此可以大大减少训练时间和所需的计算资源。**这使得微调成为一种**高效且经济的解决方案，尤其适用于资源有限的环境。**

![[Untitled 481.png]]


### Fine-tuning 步骤：

选择预训练模型：首先需要选择一个在大规模数据集上预训练过的模型，例如 BERT、GPT 等。这些模型在通用任务上已经表现出色，可以作为 Fine-tuning 的基础模型。

冻结部分网络层：在 Fine-tuning 过程中，通常会冻结模型的一部分网络层，即保持它们的权重不变，只对部分层进行参数更新。这样可以避免在新任务上过度拟合。

定义新任务：确定要在新数据集或任务上解决的问题，并根据问题定义相应的输出层和损失函数。

调整模型参数：通过在新数据集上反向传播误差，更新模型参数以适应新任务。在训练过程中，可以逐步解冻更多的网络层进行微调。

调整超参数：在 Fine-tuning 过程中，可能需要调整学习率、优化器类型等超参数，以获得更好的性能。

评估和验证：在 Fine-tuning 完成后，需要对模型在验证集或测试集上进行评估，以确保模型在新任务上的性能符合预期。


## 微调的原理

**微调的原理：利用已知的网络结构和已知的网络参数，修改output层为我们自己的层，微调最后一层前的若干层的参数。**

**这样可以有效利用深度神经网络强大的泛化能力，又免去了设计复杂的模型以及耗时良久的训练。因此，Fine-tuning是当数据量不足时的一个比较合适的选择。**

预训练模型： 首先，选择一个已经在大规模数据集上预训练过的模型，如在ImageNet上预训练的图像识别

模型或在海量文本数据上预训练的自然语言模型（如BERT、GPT系列）。这些模型在预训练过程中学习到了

丰富的特征表示和模式。

模型结构调整： 对于新任务，可能需要根据具体情况调整模型结构。例如，在图像分类任务中，可能需要替

换掉预训练模型的最后一层（即输出层），以匹配新任务所需的类别数目；在NLP任务中，可能需要添加特

殊的“提示”（prompt）或适配器（adapter）模块。

参数冻结与微调：

1. 标准微调：所有可训练层都参与训练，根据新任务的数据重新调整所有权重。
2. 部分层微调：仅对模型的顶层或部分层进行训练，底层特征提取层保持冻结，以利用预训练模型学习到的通用特征表示。
3. Adapter微调：在模型层间插入小型可训练模块，这些模块不影响原始模型参数，但能适应新任务。
4. 其他轻量级微调技术：如LoRA、BitFit等，仅调整一小部分参数，如偏置项或低秩矩阵。


训练过程： 使用新任务的数据集对模型进行进一步训练。训练时通常采用较小的学习率，防止对预训练模型

的优良特征表示产生过大的扰动。

目的： 微调的主要目的是使预训练模型能够适应新任务，通过保留预训练模型学习到的通用特征，同时针对

新任务调整模型的特定部分，从而达到在新数据集上取得更好性能的效果。

![[Untitled 482.png]]



### **参数高效微调PEFT：**

**Parameter-Efficient Fine-Tuning是一种高效的迁移学习技术，它旨在通过最小化微调过程中需要更新的参数数量来降低计算复杂度和提高训练效率。**

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=80059&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy83VFdSaGg0eGlja25ERFJuOFVicGVVRDdLOEt5czR5dHNXSFBRbUZjUWd6NnhvVGNZS3FpY05rVFpSZkNDTE1lMnpUWEM2MUMwWXJ3UFFzanNxckNwZzlnLzY0MD93eF9mbXQ9cG5nJmFtcA==;from=appmsg)

PEFT仅针对部分参数进行微调，从而显著减少了训练时间和成本，尤其适用于数据量有限或计算资源受限的场景。

PEFT包含了多种不同的技术，例如Prefix Tuning、Prompt Tuning、Adapter Tuning和LoRA等，每种技术都有其独特的方法和特点，可以根据具体的任务和模型需求灵活选择。

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=80059&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy83VFdSaGg0eGlja25ERFJuOFVicGVVRDdLOEt5czR5dHNySTlxMDFpY3psSmhxeHB4VERpYWljbGxzazlyY0dmQW1pY3UwUkZWR1NqU3V1dWI5UFJNalpKVHR3LzY0MD93eF9mbXQ9cG5nJmFtcA==;from=appmsg)


### **Prefix Tuning：**

通过在模型的输入前添加可学习的虚拟令牌（virtual tokens）作为前缀来实现微调。**在训练过程中，仅更新这些前缀参数，而模型的其余部分保持不变。这种方法减少了需要更新的参数数量，从而提高了训练效率。**

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=80059&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X2pwZy83VFdSaGg0eGlja25ERFJuOFVicGVVRDdLOEt5czR5dHNvcHlaZ1F6QnRZYllvbWs5T1dQMUt2eW9RMFMzRm9qR0lPQ2lhU2sxNkhNTjA5RlVrbUNXQU53LzY0MD93eF9mbXQ9anBlZw==)


### **Prompt Tuning：**

在输入层加入prompt tokens，可以看作是Prefix Tuning的简化版，它不需要额外的多层感知机（MLP）调整。**随着模型规模的增大，Prompt Tuning的效果逐渐接近全量微调。**

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=80059&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X2pwZy83VFdSaGg0eGlja25ERFJuOFVicGVVRDdLOEt5czR5dHNld1dnWUNJUWVISnowTHVEQkQyYWNDVDhiT1BsZVdqVEhTcXA3ZzBWUTZZVHZaRVRzNWpVTFEvNjQwP3d4X2ZtdD1qcGVnJmFtcA==;from=appmsg)


### **Adapter Tuning：**

则是通过在模型中设计并嵌入Adapter结构来进行微调。这些Adapter结构通常是小型网络模块，可以添加到模型的特定层中。**在训练过程中，仅对这些新增的Adapter结构进行微调，而原模型的参数保持不变。这种方法保持了模型的高效性，同时引入的额外参数数量相对较少。**

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=80059&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy83VFdSaGg0eGlja25ERFJuOFVicGVVRDdLOEt5czR5dHNOOHZBaWJ4UlN6aWJpY3dFdHdnaWI0YXM1MGxlc29yTnZIYmt0aWJ3NEhXRGljWEV3RmlhNUVwaWJPbUVyZy82NDA/d3hfZm10PXBuZyZhbXA=;from=appmsg)


### **LoRA（Low-Rank Adaptation）：**

通过在模型的矩阵相乘模块中引入低秩矩阵来模拟全量微调的效果。**它主要更新语言模型中的关键低秩维度，从而实现高效的参数调整并降低计算复杂度。**

![](https://api.ibos.cn/v4/weapparticle/accesswximg?aid=80059&url=aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy83VFdSaGg0eGlja25ERFJuOFVicGVVRDdLOEt5czR5dHNKMW5pYWJ4UzZJVWpyOENKRVVmdG1MSzdINmpUVHZ2Q3lDYTFuTG9ORWljR1duY2FRM25TN29kQS82NDA/d3hfZm10PXBuZyZhbXA=;from=appmsg)



### 微调预训练模型的应用：

**1.常规的基于特征的方法和微调方法**：

![](https://segmentfault.com/img/remote/1460000043961678)

2.**轻量化微调(Parameter-Efficient Fine-Tuning)**

轻量化微调让我们能够重复使用预训练的模型，同时最大限度地减少算力和资源的占用。总体来说，轻量化微调具有以下五个优点：

**1. 能够降低计算成本（需要更少的GPU和GPU运行时间）；**

**2. 拥有更快的训练时间（更快地完成训练）；**

**3. 具备更低的硬件要求（适用于较小显存的GPU和较小的内存）；**

**4. 具有更好的模型性能（降低过拟合）；**

**5. 需要更少的存储空间（大部分weights可以在不同任务（tasks）之间共享）。**

这些年来，研究人员们开发了几种技术（Lialin等人[6]）来微调LLM，使其只需要训练少量的参数，也能具有较高的模型性能。这些方法通常被称为参数高效微调技术（parameter-efficient finetuning techniques，PEFT，本文亦译作轻量化微调）。

一些目前最受欢迎的PEFT技术在下图中可见。

![](https://segmentfault.com/img/remote/1460000043961681)

简单来说，都涉及到引入少量额外的参数进行微调（而不是像我们在上面的微调方法 II中那样对所有层进行微调）。从某种意义上说，微调方法 I（只微调最后一层）也可以被认为是一种轻量化微调（PEFT）技术。然而，**像前缀微调（prefix tuning）、adapters和Low-Rank Adaptation (LoRA,低秩自适应))等技术，它们都“修改”了多个层（layers），以极低的成本实现了更好的预测性能（predictive performance）。**

3.**基于人类反馈的强化学习（Reinforcement Learning with Human Feedback）**

基于人类反馈的强化学习（Reinforcement Learning with Human Feedback，RLHF）中，使用一种结合了监督学习（supervised learning）和强化学习（reinforcement learning）的方法对预训练模型进行微调——这一方法被 ChatGPT 使用而得到大力推广，而 ChatGPT 又是基于InstructGPT（Ouyang等人[7]）的。

在RLHF中，通过让人类对不同的模型输出进行排序或评分来收集人类反馈，从而提供**奖励信号（reward signal）** 。收集到的**奖励标签（reward labels）** 可以用来训练**奖励模型（reward model）**，进而反过来指导LLM（Language Model）适应人类的喜好。

奖励模型本身是通过监督学习（supervised learning）来学习的（通常使用预训练的LLM作为基础模型）。接下来，使用奖励模型来更新预训练的LLM，使其适应人类偏好——训练过程使用一种被称为**近端策略优化**（proximal policy optimization，Schulman等人[8]）的强化学习方法。

![](https://segmentfault.com/img/remote/1460000043961682)

InstructGPT相关论文的截图，概述了RLHF的过程

为什么要使用奖励模型而不是直接在人类反馈的基础上训练预训练模型？这是因为让人类参与模型的学习过程会产生瓶颈（bottleneck），因为我们无法实时获取反馈。

4.**Transformer block with adapters：一种有效的参数高效微调技术，它通过在预训练的 Transformer 模型的主干网络中添加额外的适配器（adapters）或残差块，来实现对特定任务的微调。这些适配器通常是可训练的参数，而模型的其他部分则保持固定。**

![[Untitled 483.png]]

**Transformer block with adapters 的微调方法通常包括以下步骤：**

5. **加载预训练模型**：首先，加载已经在大规模语料库上预训练好的 Transformer 模型。
6. **添加适配器**：**在模型的主干网络中，为每个 Transformer 层添加适配器。这些适配器可以是简单的线性层或更复杂的结构，具体取决于任务的需求。**
7. **初始化适配器参数**：为添加的适配器设置初始参数。这些参数通常是随机初始化的，也可以采用其他初始化策略。
8. **进行微调**：使用特定任务的数据集对模型进行微调。**在微调过程中，仅更新适配器的参数，而保持模型的其他部分不变。**
9. **评估性能**：在微调完成后，使用验证集评估模型的性能。根据评估结果，可以进一步调整适配器的结构或参数，以优化模型的性能。


### 参考链接：
