---
base: "[[大模型-强化学习.base]]"
属于名称: 隐式扩散模型
描述: Stable Diffusion是一个的文本条件隐式扩散模型(text-conditioned latent diffusion model)，可以根据文字描述生成效果极好的图像。
AIGC领域:
  - 模型
---

### **Stable Diffusion简介**

2021年12月提出了隐式扩散模型（Latent Diffusion Models，LDMs）的text-to-image模型。这

个研究使得用扩散模型进行文字生成图片任务可以在普通显卡上执行，并且耗时较短。为一年后现象级的稳

定扩散（Stable Diffusion）诞生奠定了基础。

Stable Diffusion是2022年发布的深度学习文本到图像生成模型。它主要用于根据文本的描述产生详细

图像，尽管它也可以应用于其他任务，如内补绘制、外补绘制，以及在提示词指导下产生图生图的转变。

它是一种潜在扩散模型，由慕尼黑大学的Compvis研究团体开发的各种生成性人工神经网络之一。它是由初

创公司StabilityAI、CompVis与Runway合作开发，并得到EleutherAI和LAION的支持。截至2022

年10月， StabilityAI筹集了1.01亿美元的资金。

### **Stable Diffusion发展**

一、早期发展（2010s）

Stable Diffusion 的早期发展始于 2010 年代，当时的研究主要集中在基于概率论的生成模型上。

2014 年，DeepMind 的研究人员提出了基于 Variational Autoencoder（VAE）的生成模型，该模

型能够生成高质量的图像。

二、改进和扩展（2015-2018）

2015 年到 2018 年，Stable Diffusion 模型得到了进一步的改进和扩展。研究人员提出了新的损失

函数和优化算法，提高了模型的生成质量。2017 年，Google 的研究人员提出了基于 Generative 

Adversarial Networks（GAN）的生成模型，该模型能够生成更加逼真的图像。

三、应用和推广（2019-现在）

2019 年以来，Stable Diffusion 模型得到了广泛的应用和推广。该模型被应用于图像和视频生成、数

据增强、风格转换等领域。2020 年，Facebook 的研究人员提出了基于 Stable Diffusion 的视频

生成模型，该模型能够生成高质量的视频。

版本迭代进展

| 模型版本 | 发布日期 | Release by | 链接 |
| --- | --- | --- | --- |
| Latent Diffusion | July 2022 | CompVis | https://github.com/CompVis/latent-diffusion |
| Stable Diffusion 1.1 | August 2022 | CompVis | https://huggingface.co/CompVis/stable-diffusion-v1-1 |
| Stable Diffusion 1.2 | August 2022 | CompVis | https://huggingface.co/CompVis/stable-diffusion-v1-2 |
| Stable Diffusion 1.3 | August 2022 | CompVis | https://huggingface.co/CompVis/stable-diffusion-v1-3 |
| Stable Diffusion 1.4 | August 2022 | CompVis | https://huggingface.co/CompVis/stable-diffusion-v1-4 |
| Stable Diffusion 1.5 | October 2022 | RunwayML | https://huggingface.co/runwayml/stable-diffusion-v1-5 |
| Stable Diffusion 1.6 | November 2023 | Stability AI | https://platform.stability.ai/docs/api-reference#tag/Text-to-Image |
| Stable Diffusion 2.0 | November 2022 | Stability AI | https://huggingface.co/stabilityai/stable-diffusion-2 |
| Stable Diffusion 2.1 | November 2022 | Stability AI | https://huggingface.co/stabilityai/stable-diffusion-2-1 |
| Stable Diffusion XL 0.9 | June 2023 | Stability AI | https://huggingface.co/stabilityai/stable-diffusion-xl-base-0.9 |
| Stable Diffusion XL 1.0 | July 2023 | Stability AI | https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0 |
| Stable Diffusion XL beta 2.2.2 | November 2023 | Stability AI | https://platform.stability.ai/docs/api-reference#tag/Text-to-Image/operation/textToImage |
| Stable Image Core | March 2024 | Stability AI | https://platform.stability.ai/docs/api-reference#tag/Generate/paths/~1v2beta~1stable-image~1generate~1core/post |
| Stable Diffusion XL Turbo | November 2023 | Stability AI | https://huggingface.co/stabilityai/sdxl-turbo |
| Stable Diffusion Turbo | November 2023 | Stability AI | https://huggingface.co/stabilityai/sd-turbo/tree/main |
| Stable Video Diffusion | November 2023 | Stability AI | https://huggingface.co/stabilityai/stable-video-diffusion-img2vid |
| Stable Video Diffusion XT | November 2023 | Stability AI | https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt |
| Stable Zero123 | December 2023 | Stability AI | https://huggingface.co/stabilityai/stable-zero123 |
| Stable Diffusion Cascade | February 2024 | Stability AI | https://huggingface.co/stabilityai/stable-cascade |
| SDXL Lightning | February 2024 | ByteDance | https://huggingface.co/ByteDance/SDXL-Lightning |
| Stable Diffusion 3 | February 2024 | Stability AI | https://platform.stability.ai/docs/api-reference#tag/Generate/paths/~1v2beta~1stable-image~1generate~1sd3/post |
| Stable Diffusion 3 Turbo | February 2024 | Stability AI | https://platform.stability.ai/docs/api-reference#tag/Generate/paths/~1v2beta~1stable-image~1generate~1sd3/post |
| Stable Video 3D | March 2024 | Stability AI | https://huggingface.co/ByteDance/SDXL-Lightning |
| Cos Stable Diffusion XL 1.0 | April 2024 | Stability AI | https://huggingface.co/stabilityai/cosxl |
| Cos Stable Diffusion XL 1.0 Edit | April 2024 | Stability AI | https://huggingface.co/stabilityai/cosxl |

### **Stable Diffusion结构**

Stable Diffusion 的核心思想是，由于每张图片满足一定规律分布，利用文本中包含的这些分布信息作

为指导，把一张纯噪声的图片逐步去噪，生成一张跟文本信息匹配的图片。

它其实是一个比较组合的系统，里面包含了多个模型子模块，接下来把黑盒进行一步步拆解。stable 

diffusion 最直接的问题是，如何把人类输入的文字串转换成机器能理解的数宇信息。

![[25b8daf0-4660-41cb-a28e-90ca717c328c.png]]


Stable Diffusion整体架构图

![[Untitled 515.png]]


**主要包括三个部分：**

**ClipText 文本编码器：用于解析提示词的 Clip 模型**

为了导入提示词，我们首先需要为文本创建数值表示形式。

为此，Stable Diffusion使用了一个名为CLIP的预训练Transformer模型。

CLIP的文本编码器会**将文本描述转换为特征向量，该特征向量可用于与图像特征向量进行相似度比较。**

![[Untitled 516.png]]

因此，CLIP非常适合从文本描述中为图像创建有用的表征信息。输入的文本提示语首先会被分词（也就是基于一个很大的词汇库，将句子中的词语或短语转换为一个一个的token），然后被输入CLIP的文本编码器，从而为每个token（分词）产生一个768维（针对Stable Diffusion 1.x版本）或1024维（针对Stable Diffusion 2.x版本）的向量。


**Diffusion 扩散模型：用于生成图像的 U-Net 和 Scheduler**

文本向量输入Unet

文本提示词转换为向量后将被输入扩散模型，用于引导图像的生成，这里使用的扩散模型是Unet网络。

文本向量如何输入UNet进行预测？

**交叉注意力(cross-attention)机制**


交叉注意力层贯穿了整个UNet结构，UNet中的每个空间位置都可以“注意”到文字条件中不同的token，以便从文本提示语中获取不同位置的相互关联信息。

下图展示了UNet不同层之间信息的传递


![[Untitled 517.png]]


**UNet的原理**

在预测过程中，通过反复调用UNet迭代降噪，将UNet预测输出的noise slice从原有的噪声中去除，从

而生成高质量图像。

对于给定的“带噪”图像，可以使模型基于提示信息来预测“去噪”后的图像。在推理阶段，我们可以输入期望

图像的文本描述，并将纯噪声数据作为起点，然后模型便开始全力对噪声输入进行“去噪”，从而生成能够匹

配文本描述的图像。

具体到Stable Diffusion模型中，在推理阶段，我们可以输入期望图像的文本描述，并将纯噪声数据作

为起点，然后模型便开始全力对噪声输入进行“去噪”，从而生成能够匹配文本描述的图像。


![[Untitled 518.png]]

文本编码过程：将输入的文本提示语转换为一系列的文本嵌入（即图中的ENCODER_HIDDEN_STATES），然后输入UNet作为生成条件。


**VAE 模型：用于压缩和恢复的图像解码器**

由Latent Diffusion提出

当输入图像尺寸变大时，生成图片所需的计算能力也会随之增加。这种现象在自注意力(self-attention)机制下的影响尤为突出，因为操作数会随着输入量的增加以平方关系增加。

例如：一张128×128像素的正方形图片拥有的像素数量是一张64×64像素的正方形图片的4倍，因此在自注意力层就需要16倍(42)于后者的内存和计算量。


> 这是高分辨率图像生成任务存在的普遍问题

为了解决这个问题，隐式扩散(Latent Diffusion)使用了一个独立的模型——**VAE**来压缩图片到一个更小的空间维度，VAE全称是 Variational Auto Encoder **变分自动编码器**

![[Untitled 519.png]]

SD对VAE的应用

Stable Diffusion中的VAE能够接收一张三通道图片作为输入，从而生成一个4通道的隐式表征，同时每一个空间维度都将减少为原来的八分之一。

例如，一张512×512像素的正方形图片将被压缩到一个4×64×64的隐式表征上。

通过在隐式表征（而不是完整图像）上进行扩散，我们可以在使用更少的内存的同时减少UNet层数并加速图片的生成。与此同时，我们仍能把结果输入VAE的解码器，从而解码得到高分辨率图像。隐式表征极大降低了训练和推理成本。


### **Stable Diffusion训练过程**

Diffusion模型能够生成高质量图片，其核心原因在于我们现在有着极其强大的计算机视觉模型。只要数据集够大，模型就能学习到任何复杂的操作。

那具体diffusion里面让unet学习了怎样一个操作呢？简单来说，就是“**去噪**”。

那如何为去噪的任务设计数据集呢？很简单，我们只要**向普通的照片里添加噪声**，不就有了加噪的图片了嘛。假定我们现在有一张金字塔的图片，我们用random函数生成从强到弱各个强度的噪声，比如下图中0~3共计4个强度的噪声。现在我们**选定个某个强度**的噪声，比如下图中选了噪声1，并且把这个噪声添加到图片里：

![[Untitled 520.png]]

> [!note] 🧾
> 训练集如何制作：1，选张图片 2，生成从强到弱各个强度的噪声 3，从中选个噪声（比如强度1） 4，加到图片里

实际上我们可以更细腻地划分噪声的等级，将其分为几十个甚至上百个档位，这样就可以创建出成千上万个训练集。比如我们现在噪声设置成100个档位，下面就展示了利用不同的档位结合不同的图片创建6张训练集的过程：

![[Untitled 521.png]]

这样的话，一组训练集包括了三样东西：**噪声强度**(上图数字)，**加噪后的图片**(上图左列图片)，以及**噪声图**（上图右列图片）就可以了。训练的时候我们的unet只要在已知噪声强度的条件下，学习如何从加噪后的图片中计算出**噪声图**就可以了。注意，我们并不直接输出无噪声的原图，而是让unet去**预测原图上所加过的噪声**。当需要生成图片的时候，我们用加噪图**减掉**噪声就能恢复出原图了。

具体的一个训练过程就如下图所示，一共分四步走：

1. 从训练集中选取一张加噪过的图片和噪声强度，比如下面的加噪街道图和噪声强度3。
2. 输入unet，让unet预测**噪声图**，比如下图的unet prediction。
3. 计算和真正的噪声图之间的误差
4. 通过反向传播更新unet的参数。

![[Untitled 522.png]]


### **Diffusion怎么生成图片**

假设我们现在已经按照上面的步骤训练好了一个unet，这就意味着它就**可以成功从一个加噪的图片中推断出噪声了**。如下图中，知道噪声强度的情况下，给unet输入一张有噪图，unet就输出有噪图上面加过的噪声：

![[Untitled 523.png]]

只要知道噪声强度，训练好的unet就可以成功推断出噪声

既然现在噪声图能够被推断出来，我们只要把加噪后的图片减去这个噪声图，就可以轻松得到一张略微去噪的图片了：

![[Untitled 524.png]]

重复这个过程，预测噪声图，再减去噪声图，进行第二步去噪：

![[Untitled 525.png]]

不断地重复这个过程，不断的去除一张噪声图片的噪声，最终我们就可以得到一张很棒的图片。这个图片是接近训练集分布的，它和训练集保有相同的像素规律。比如你用一个艺术家数据集去训练，它就会遵循美学的颜色分布，你用真实世界的训练集去训练，它的结果就会尽量遵循真实世界的规律。


### **Stable Diffusion应用**

**1. 文生图(txt2img)**

文生图任务是指将一段文本输入到SD模型中，经过一定的迭代次数，SD模型输出一张符合输入文本描述的图片。

> [!note] 🧾
> 步骤一： 使用CLIP Text Encode模型将输入的人类文本信息进行编码，生成与文本信息对应的Text Embeddings特征矩阵；
步骤二： 输入文本信息，再用random函数生成一个高斯噪声矩阵 作为Latent Feature(隐空间特征)的“替代” 输入到SD模型的 “图像优化模块” 中；
步骤三： 首先图像优化模块是由U-Net网络和Schedule算法 组成，将图像优化模块进行优化迭代后的Latent Feature输入到 图像解码器 （VAE Decoder） 中，将Latent Feature重建成像素级图。

![[Untitled 526.png]]

**2. 图生图**

图生图任务在输入本文的基础上，再输入一张图片，SD模型将根据文本的提示，将输入图片进行重绘以更加符合文本的描述。

> [!note] 🧾
> 步骤一： 使用 CLIP Text Encode 模型将输入的人类文本信息进行编码，生成与文本信息对应的Text Embeddings特征矩阵；同时，将原图片通过图像编码器（VAE Encoder）生成Latent Feature（隐空间特征）
步骤二： 将上述信息输入到图像优化模块；
步骤三： 将图像优化模块进行优化迭代后的Latent Feature输入到 图像解码器 （VAE Decoder） 中，将Latent Feature重建成像素级图。

![[Untitled 527.png]]



### **Stable Diffusion原理可视化**

**Diffusion Explainer** 是一个**可交互**的可视化网站，**展示了 Stable Diffusion 的组成架构 & 文生图的运行流程**，即文本是如何一步一步生成为高品质图像的。

![[640_(3).gif]]

详情可点击下面链接

[https://poloclub.github.io/diffusion-explainer/](https://poloclub.github.io/diffusion-explainer/)


### 参考链接

<!-- Column 1 -->
[https://jalammar.github.io/illustrated-stable-diffusion/](https://jalammar.github.io/illustrated-stable-diffusion/)

<!-- Column 2 -->
[https://zh.wikipedia.org/wiki/Stable_Diffusion](https://zh.wikipedia.org/wiki/Stable_Diffusion)

[https://mp.weixin.qq.com/s?__biz=MzAxNDMxMzQyNg==&mid=2650003177&idx=1&sn=716543a52c4f30ccf6cebf3b85c26088&scene=21#wechat_redirect](https://mp.weixin.qq.com/s?__biz=MzAxNDMxMzQyNg==&mid=2650003177&idx=1&sn=716543a52c4f30ccf6cebf3b85c26088&scene=21#wechat_redirect)

[https://github.com/CompVis/stable-diffusion](https://github.com/CompVis/stable-diffusion)

[https://www.stablediffusion.cn/](https://www.stablediffusion.cn/)