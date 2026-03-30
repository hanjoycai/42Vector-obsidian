---
base: "[[大模型-强化学习.base]]"
属于名称: ""
描述: ""
AIGC领域: []
---
### LangChain 是什么？

**浪链 (LangChain) 是一个开源框架，用于构建基于大型语言模型 (LLM) 的应用程序。**

 LLM 是在大量数据上预先训练的大型深度学习模型，可以生成对用户查询的响应，例如，回答问题或根据

基于文本的提示创建图像。 LangChain 提供工具和抽象来提高模型生成信息的定制性、准确性和相关

性。例如，开发人员可以使用 LangChain 组件构建新的提示链或自定义现有模板。 LangChain 还允许 

LLMs 无需重新训练即可使用新数据集的组件。

第一、它是上下文相关的，为 LLM 应用程序开发的整体生命周期提供全流程的框架支持。

第二、使用 LLM 大模型的推理能力为 LangChain 开发的 LLM 应用程序提供规划能力（Planning）。

第三、LangChain 围绕开发 LLM 应用程序的整体流程提供 Model I/O（Prompt 输入、Embedding 向量化、LLM 大模型适配以及大模型回答适配等）、Retriieval（数据源加载、转换、向量化、存入向量数据库、检索以及向量相识度计算等）、Chains（用于完成特定更高级别任务的组件组装）、Memory（短期记忆、长期记忆）、Agents（LLM APP）、Callbacks（提供向外部回调的功能）。

第四、LangChain 框架的顶层架构设计如下图所示。


![[Untitled 498.png]]

### LangChain 的优势

- **重新利用语言模型**：借助 LangChain，组织可以将 LLMs 重新用于特定领域的应用程序，而无需重新训练或微调。开发团队可以构建引用专有信息的复杂应用程序以增强模型响应。例如，可以使用 LangChain 构建从存储的内部文档中读取数据并将其汇总为对话响应的应用程序。
- **简化人工智能开发**：LangChain 通过抽象数据源集成的复杂性简化了人工智能 (AI) 开发。开发人员可以自定义序列，快速构建复杂的应用程序。软件团队可以修改 LangChain 提供的模板和库来减少开发时间。
- **开发者支持**：LangChain 为 AI 开发者提供了连接语言模型和外部数据源的工具。它是开源并得到活跃社区的支持的。组织可以免费使用 LangChain，并获得其他精通该框架的开发人员的支持。


### LangChain**特性**

- **模块化设计**：LangChain采用了模块化的设计，可以自由组合不同的模块实现自定义的AI应用。比如可以选择不同的语言模型、提示模板、回调函数等。
- **链式调用**：LangChain支持将多个语言模型链式调用，一个模型的输出可以作为另一个模型的输入，实现更复杂的功能。
- **记忆机制**：LangChain有记忆机制来存储信息，在不同的提示调用之间共享上下文。
- **流式处理**：LangChain支持流式处理，可以实时获取语言模型生成的文本。
- **Python友好**：LangChain提供了Python式的API，使用装饰器将普通函数转换为调用语言模型的函数。
- **可扩展性**：LangChain具有很好的可扩展性，可以轻松集成不同的语言模型、提示模板等。
- **高级功能**：LangChain内置了诸如输出解析、可选参数渲染等高级功能来简化开发。
- **开源**：LangChain是一个开源项目，社区活跃，便于进行定制化开发。

### LangChain**核心概念**

**1. Components and Chains**

在 LangChain 中，Component 是一种模块化的构建块，可以相互组合以构建强大的应用程序。而 Chain 则是由一系列 Components 或其他 Chains 组合而成的，用于完成特定的任务。例如，一个 Chain 可能包括一个 Prompt 模板、一个语言模型和一个输出解析器，它们协同工作以处理用户输入、生成响应并处理输出。

**2. Prompt Templates and Values**

PromptTemplate 是一个负责创建 PromptValue 的模板，它将用户输入和其他动态信息转换为适合语言模型的格式。PromptValues 是一个具有方法的类，这些方法可以将用户输入转换为各种模型类型所期望的确切输入类型，如文本或聊天消息。通过使用 PromptTemplate 和 PromptValues，可以使用户输入与语言模型之间的交互更加流畅和有效。

**3. Example Selectors**

使用 Example Selectors 在 Prompts 中动态包含示例可以提高其灵活性和针对性。它们能够接受用户输入并返回相应的示例列表，从而更好地适应特定的上下文需求。

**4. Output Parsers**

Output Parsers 是一种能够将语言模型的响应转化为更有用格式的技术。它们通过实现两种主要方法来实现这一目标，一种方法用于提供格式化指令，另一种方法用于将语言模型的响应解析为结构化格式。这使得在应用程序中处理输出数据变得更加容易。

**5. Indexes and Retrievers**

Index 是一种用于组织文档的方式，它有助于语言模型更好地与文档进行交互。而检索器则是一个用于获取相关文档并将其与语言模型相结合的接口。LangChain 提供了多种工具和功能，例如矢量[数据库](https://cloud.tencent.com/solution/database?from_column=20065&from=20065)和文本拆分器，以便处理不同类型的索引和检索器。

**6. Chat Message History**

LangChain 主要是通过聊天界面与语言模型进行交互的。它的一个重要组成部分是 ChatMessageHistory 类，它负责记录所有以前的聊天交互数据。这些交互数据可以被传递回模型，以汇总或以其他方式组合，以便更好地维护对话上下文并提高模型对对话的理解。

**7. Agents and Toolkits**

在 LangChain 中，Agent 是一个推动决策制定的实体，他们可以使用一套工具，根据用户输入来决定调用哪个工具。Tookits 是一组工具，当它们一起使用时，可以完成特定的任务。代理执行器负责使用适当的工具运行代理。

### LangChain**模块概览**

![](https://developer.qcloudimg.com/http-save/yehe-1055266/6e9dc2ddc0d8d5ddc4d8832896422f3e.png)

### LangChain**应用场景**

- 自然语言生成：生成各种文本，比如新闻文章、小说、代码等。通过fine-tuning，可以让模型生成符合特定风格或主题的文本。
- [对话系统](https://cloud.tencent.com/product/tbp?from_column=20065&from=20065)：构建[对话机器人](https://cloud.tencent.com/product/icr?from_column=20065&from=20065)，可以进行闲聊、提供客户服务、完成特定任务等。通过训练，可以让对话更加逻辑自洽和符合角色。
- 问答系统：构建问答系统，自动回答用户的问题。可以训练模型针对特定领域的知识库来提高问答的质量。
- 总结与翻译：用来自动总结文本，或者在不同语言之间进行翻译。这可以大大提高工作效率。
- 语义搜索：将用户查询映射到相关文档、产品等，实现语义搜索。这可以提高搜索引擎的智能化程度。
- 数据抽取：从非结构化文本中抽取结构化数据，比如从合同中提取关键信息等。
- 智能写作：辅助人类进行创作，比如自动创作、文本润色、文本纠错、简化内容、扩写内容、创作风格等。这可以提高创作效率。
- 知识抽取：从文本中提取关键实体、事件、关系等知识。这可以构建知识图谱。
- 代码理解和生成：可以自动生成代码框架、注释、优化代码等，还支持从代码库中读取理解代码，并基于代码库进行问答，辅助程序员开发。
- 自定义扩展：可以自定义接口或者函数集，并结合组件实现模型能力的增强。
- 自动化流程：通过组件增强企业业务流程能力，同时自动化部分重复性的工作，为企业降本增效。


### **LangChain、LLM、AI Agents 区别和联系？**

AI 智能时代新的应用程序形态是 AI Agent，三者的区别和联系有以下四点：

第一、AI 智能时代新应用程序形态是 AI Agents。

第二、LangChain 是 AI Agents 的一种应用开发框架。

第三、LLM 大模型给 AI Agents 提供推理支持。

第四、LangChain + LLM 大模型 + 向量数据库构建 AI 智能时代新的应用形态 AI Agents。

![[Untitled 499.png]]

第五、Fine-tuning （微调）是为了增强 LLM 大模型的综合能力（理解、生成、逻辑、记忆）。

第六、Vector Database（向量数据库）为 AI Agents 提供数据存储介质。

第七、AI Agents 通过 LLMOps 实现自动运维和智能服务治理。

第八、大模型算力层（比如：NVIDIA A100）提供基础设施算力支持。


### 应用实例

基于 LangChain 使用检索增强（RAG）构建聊天机器人

用户的咨询将被转换为嵌入式向量并保存在一个向量存储中：例如如果用户询问「商品信息」，查询会被转换为嵌入式向量，然后执行近似最近邻搜索以找到与嵌入式查询相似商品信息，然后将其作为附加上下文提供给 ChatGPT，再由 ChatGPT 显示给用户。这种方法通常被称为检索增强生成（Retrieval Augmented Generation）。使用检索增强生成的聊天机器人的架构设计如下：

![[Untitled 500.png]]


### 参考链接

[https://python.langchain.com/v0.2/docs/introduction/](https://python.langchain.com/v0.2/docs/introduction/)

[https://docs.langchain.com.cn/docs/introduction/](https://docs.langchain.com.cn/docs/introduction/)