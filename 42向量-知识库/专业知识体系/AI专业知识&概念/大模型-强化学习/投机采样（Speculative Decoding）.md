---
base: "[[大模型-强化学习.base]]"
属于名称: 投机采样（Speculative Decoding）
描述: 投机采样（Speculative Decoding）是一种用于加速大型语言模型（LLM）推理的技术，通过使用小模型生成草稿并由大模型验证和筛选来实现。这种方法在不影响生成质量的前提下显著提高了解码速度。
AIGC领域:
  - 数据训练
---
> [!note] 🧾
> 推测解码是一种“先推测后验证” (*Draft-then-Verify*) 的解码算法：在每个解码步，该算法首先**高效地“推测”**target LLM未来多个解码步的结果，然后用target LLM**同时进行验证**，以加速推理。

### 背景

随着LLM (Large Language Model) 规模的逐渐增大（200M->7B->175B），LLM的推理加速技术正逐步引起NLP学界的广泛关注。尤其是像ChatGPT[1]，Bard[2]这种线上实时交互的应用，LLM的inference latency（推理耗时）极大程度地影响了用户的使用体验。那么，LLM的Latency主要来自哪里呢？

相关研究表明，LLM推理主要是受内存带宽限制的（memory-bandwidth bound）[3][4]-- LLM每个解码步所用的推理时间大部分并不是用于模型的前向计算，而是消耗在了将LLM巨量的参数从GPU显存（High-Bandwidth Memory，HBM）迁移到高速缓存（cache）上（以进行运算操作）。也就是说，LLM推理下的GPU并不是一个合格的打工人：他把每天大多数的时间都耗费在了早晚高峰堵车上，在公司没干啥实事儿（可不就是我摸鱼仙人:P）。

这个问题随着LLM规模的增大愈发严重。并且，如下左图所示，目前LLM常用的自回归解码（autoregressive decoding）在每个解码步只能生成一个token。这导致GPU计算资源利用率低下（->每个token的生成都需要重复读写LLM的巨量参数），并且序列的生成时间随着序列长度的增加而线性增加。

![[Untitled 421.png]]


2022年11月，Google在《Fast Inference from Transformers via Speculative Decoding》里提出投机解码的策略；DeepMind稍晚一点，在2023年初的《Accelerating Large Language Model Decoding with Speculative Sampling》也提出了一样的解码策略。（以这两家的关系，很可能私底下就沟通过这个idea了）Google的论文相比DeepMind的，做了更多的实验和分析，更为详尽一些。

![[Untitled 422.png]]

在speculative decoding之前，研究人员已经在模型推理加速这个方向做了不少工作：

- 模型蒸馏：以Hinton的《Distilling the Knowledge in a Neural Network》为代表，以及后面衍生出的各种蒸馏方法（参考《Knowledge Distillation: A Survey》），可以把规模更大的、性能更强的模型的能力，部分迁移到规模较小的模型上，在效果上相比直接训练小模型有一定的提升。transformer上蒸馏相关的经典工作有《TinyBERT: Distilling BERT for Natural Language Understanding》和《DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter》等。
- 模型量化：如《Quantized Neural Networks: Training Neural Networks with Low Precision Weights and Activations》、《LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale》、《Zeroquant: Efficient and affordable post-training quantization for large-scale transformers》等，把模型参数量化到int8、int4以及更低的精度，在减少空间需求的同时，最大化地保持模型的推理效果。
- 高效模型结构设计：如使用稀疏层的《Sparse is Enough in Scaling Transformers》，减少KV缓存需求的MQA《Fast Transformer Decoding: One Write-Head is All You Need》、GQA《《GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints》》以及最近DeepSeek-V2中的MLA等，还有通过进化算法进行高效架构搜索的工作《Primer: Searching for Efficient Transformers for Language Modeling》。

以上这些做法对不同的输入一视同仁，采用一个全局来看有收益的方案来统一处理，达到推理加速的目的。

相对地，也有一些其他的方案，认为不是每一步推理都适合一样处理：某些推理step需要大模型，而另一些step只需要高效的小模型，从而根据输入，动态地决定模型参与计算的参数，相关工作有：

- 《Dynamic Neural Networks: A Survey》
- 《Adaptive Attention Span in Transformers》
- 《Consistent Accelerated Inference via Confident Adaptive Transformers》
- 《Why should we add early exits to neural networks?》
- 《Controlling Computation versus Quality for Neural Sequence Models》
- 《The Right Tool for the Job: Matching Model and Instance Complexities》
- 《Depth-Adaptive Transformer》
- 等

MoE也属于动态激活的方案之一。

而《Training compute-optimal large language models》的scaling law则指出模型规模没有原先预想的影响那么大，可以通过增加训练数据等方法让小模型逼近大模型的效果。

以上这些方案虽然可以在一定程度上提升推理效率，但是要么需要重新训练模型，要么对模型的效果有损害。

也有一些方案在解码的方法上进行优化，比如《Blockwise Parallel Decoding for Deep Autoregressive Models》和《Lossless Acceleration for Seq2seq Generation with Aggressive Decoding》。

speculative decoding也是一个在解码策略上进行优化的方法。投机解码可以在不用训练原模型的基础上，提升2x-3x的推理速度，并且保证结果和原模型完全一致，没有任何效果损失。













