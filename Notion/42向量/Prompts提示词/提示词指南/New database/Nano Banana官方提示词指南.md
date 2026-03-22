---
notion-id: 27ed6148-f202-80b7-97bd-f2b88918e3a2
base: "[[New database.base]]"
标签: Google
链接: https://developers.googleblog.com/en/how-to-prompt-gemini-2-5-flash-image-generation-for-the-best-results/
介绍: ""
---
## **🚀 TLDR 快速指南**

**核心原则：** 描述场景，不要只列出关键词。用叙述性段落而非词汇列表。

**文本生成图像的6大场景：**

1. **📸 照片级真实** - 像摄影师思考：`A photorealistic [类型] of [主体], [动作], set in [环境]. Captured with [镜头]...`
2. **🎨 风格化贴纸** - 明确风格+白背景：`A [风格] sticker of [主体], featuring [特征]. Background must be white.`
3. **📝 文本渲染** - 精确文字：`Create a [类型] with text "[具体文字]" in [字体风格]...`
4. **📷 产品摄影** - 专业布光：`A studio-lit product photograph of [产品] on [背景]. Lighting is [布光]...`
5. **🎯 极简背景** - 留白设计：`A minimalist composition with [元素] positioned [位置], empty [颜色] background...`
6. **📚 漫画面板** - 故事叙述：`A comic panel in [风格], [前景角色], [背景], caption "[文字]"...`

**图像编辑的3大技巧：**

- **编辑元素：**`Using the image of [主体], please add/remove [元素]...`
- **局部重绘：**`Change only the [具体元素] to [新元素], keep everything else same...`
- **风格转换：**`Transform into [艺术家]'s style, preserve composition but render with [风格元素]...`

**多图合成：**`Take [元素1] from image 1 and place with [元素2] from image 2...`

**关键提示：** 超级具体化、迭代精炼、控制相机角度、提供背景意图

> [!note] 📌
> 
> ## **📚 目录**
> 
> - 🚀 TLDR 快速指南
> - 📚 目录
> - 详细指南
> - 从文本创建图像
>     - 照片级真实场景
>     - 风格化插图和贴纸
>     - 图像中的准确文本
>     - 产品样机和商业摄影
>     - 极简主义和负空间设计
>     - 连续艺术（漫画面板/故事板）
> - 使用文本编辑图像
>     - 图像编辑：添加和删除元素
>     - 局部重绘：编辑特定区域
>     - 风格转换
> - 多图像合成
> - 额外提示
> - 限制
> - 玩转生图：实战演练生图场景
>     - 场景一：照片级真实场景批量生成
>     - 场景二：贴纸表情包批量生成
>     - 场景三：公众号物料批量生产
>     - Lovart 高效使用技巧总结

# **详细指南**

Gemini 2.5 Flash Image 是 Google 团队最新、最快、最高效的原生多模态模型。Gemini 2.5 Flash 的独特之处在于其原生多模态架构。它从头开始训练，在单一统一步骤中处理文本和图像。这使得它具备了超越简单图像生成的强大功能，例如对话式编辑、多图像合成和对图像内容的逻辑推理。

以下是你可以执行的关键功能：

- **文本到图像：** 从简单或复杂的文本描述生成高质量图像。
- **图像 + 文本到图像（编辑）：** 提供图像并使用文本提示来添加、删除或修改元素，改变风格或调整颜色。
- **多图像到图像（合成和风格转换）：** 使用多个输入图像合成新场景或将一个图像的风格转换到另一个图像。
- **迭代精炼：** 通过对话在多个回合中逐步精炼图像，进行小幅调整。
- **文本渲染：** 生成包含清晰且位置合适的文本的图像，非常适合制作标志、图表和海报。

本指南将教你如何编写提示词和提供指令，以从 Gemini 2.5 Flash 获得更好的结果。一切都始于一个基本原则：

> [!note] 📌
> ***描述场景，不要只列出关键词。****模型的核心优势在于其深度语言理解能力。叙述性、描述性的段落几乎总是比简单的不连贯词汇列表产生更好、更连贯的图像。*

## **从文本创建图像**

生成图像最常见的方式是描述你想要看到的内容。

### **1. 照片级真实场景**

对于真实图像，请**像摄影师一样思考**。**提及相机角度、镜头类型、光线和精细细节**将引导模型产生照片级真实的结果。

**模板：**

这个模板帮助你构建照片级真实的图像提示词。只需要替换方括号中的内容：拍摄类型、主体、动作表情、环境设置、光线描述、情绪氛围、相机镜头细节、重点纹理和宽高比。

```plain text
A photorealistic [shot type] of [subject], [action or expression], set in [environment]. The scene is illuminated by [lighting description], creating a [mood] atmosphere. Captured with a [camera/lens details], emphasizing [key textures and details]. The image should be in a [aspect ratio] format.
```

**示例提示词：**

```plain text
A photorealistic close-up portrait of an elderly Japanese ceramicist with deep, sun-etched wrinkles and a warm, knowing smile. He is carefully inspecting a freshly glazed tea bowl. The setting is his rustic, sun-drenched workshop. The scene is illuminated by soft, golden hour light streaming through a window, highlighting the fine texture of the clay. Captured with an 85mm portrait lens, resulting in a soft, blurred background (bokeh). The overall mood is serene and masterful. Vertical portrait orientation.
```

**示例输出：**

![[image 6.png]]

Example photorealistic portrait of elderly Japanese ceramicist**
**

### **2. 风格化插图和贴纸**

要为你的项目创建贴纸、图标或素材，请**明确说明风格**，如果需要白色背景，**记得在提示中要求**。

**模板：**

这个模板专门用于创建贴纸和图标。描述风格、主体、关键特征、色彩搭配、线条风格和阴影效果。记住要求白色背景以便后期使用。

```plain text
A [style] sticker of a [subject], featuring [key characteristics] and a [color palette]. The design should have [line style] and [shading style]. The background must be white.
```

**示例提示词：**

```plain text
A kawaii-style sticker of a happy red panda wearing a tiny bamboo hat. It's munching on a green bamboo leaf. The design features bold, clean outlines, simple cel-shading, and a vibrant color palette. The background must be white.
```

**示例输出：**

![[image 7.png]]

Example kawaii red panda sticker

### **3. 图像中的准确文本**

Gemini 2.5 Flash Image 可以在图像中渲染文本。**明确说明你想要的确切文本**，**描述字体风格**，并**设定整体设计**。

**模板：**

这个模板用于创建包含文字的图像，如标志、海报等。指定图像类型、品牌概念、要渲染的具体文字、字体风格、设计描述和配色方案。

```plain text
Create a [image type] for [brand/concept] with the text "[text to render]" in a [font style]. The design should be [style description], with a [color scheme].
```

**示例提示词：**

```plain text
Create a modern, minimalist logo for a coffee shop called 'The Daily Grind'. The text should be in a clean, bold, sans-serif font. The design should feature a simple, stylized icon of a coffee bean seamlessly integrated with the text. The color scheme is black and white.
```

**示例输出：**

![[image 8.png]]

Example coffee shop logo with text

### **4. 产品样机和商业摄影**

为电子商务、广告或品牌推广创建**干净、专业**的产品拍摄。

**模板：**

这个模板用于创建专业的产品摄影图像。描述产品、背景表面、光线设置和用途、相机角度、要突出的特征、焦点细节和宽高比。

```plain text
A high-resolution, studio-lit product photograph of a [product description] on a [background surface/description]. The lighting is a [lighting setup, e.g., three-point softbox setup] to [lighting purpose]. The camera angle is a [angle type] to showcase [specific feature]. Ultra-realistic, with sharp focus on [key detail]. [Aspect ratio].
```

**示例提示词：**

```plain text
A high-resolution, studio-lit product photograph of a minimalist ceramic coffee mug in matte black, presented on a polished concrete surface. The lighting is a three-point softbox setup designed to create soft, diffused highlights and eliminate harsh shadows. The camera angle is a slightly elevated 45-degree shot to showcase its clean lines. Ultra-realistic, with sharp focus on the steam rising from the coffee. Square image.
```

**示例输出：**

![[image 9.png]]

Example product photography of ceramic coffee mug

### **5. 极简主义和负空间设计**

为网站、演示文稿或营销材料创建背景，你计划在其上**叠加文本**。

**模板：**

这个模板创建极简风格的背景图像，适合添加文字内容。指定单一主体、位置、背景颜色，营造大量留白空间。

```plain text
A minimalist composition featuring a single [subject] positioned in the [bottom-right/top-left/etc.] of the frame. The background is a vast, empty [color] canvas, creating significant negative space. Soft, subtle lighting. [Aspect ratio].
```

**示例提示词：**

```plain text
A minimalist composition featuring a single, delicate red maple leaf positioned in the bottom-right of the frame. The background is a vast, empty off-white canvas, creating significant negative space for text. Soft, diffused lighting from the top left. Square image.
```

**示例输出：**

![[image 10.png]]

Example minimalist composition with red maple leaf

### **6. 连续艺术（漫画面板/故事板）**

创建引人入胜的视觉叙事，一帧一帧地展现，通过专注于清晰的场景描述，非常适合开发故事板、连环漫画或任何形式的连续艺术。

**模板：**

这个模板用于创建漫画面板或故事板。描述艺术风格、前景中的角色和动作、背景设置、对话框内容、光线营造的情绪和画面比例。

```plain text
A single comic book panel in a [art style] style. In the foreground, [character description and action]. In the background, [setting details]. The panel has a [dialogue/caption box] with the text "[Text]". The lighting creates a [mood] mood. [Aspect ratio].
```

**示例提示词：**

```plain text
A single comic book panel in a gritty, noir art style with high-contrast black and white inks. In the foreground, a detective in a trench coat stands under a flickering streetlamp, rain soaking his shoulders. In the background, the neon sign of a desolate bar reflects in a puddle. A caption box at the top reads "The city was a tough place to keep secrets." The lighting is harsh, creating a dramatic, somber mood. Landscape.
```

**示例输出：**

![[image 11.png]]

Example noir style comic panel with detective

## **使用文本编辑图像**

这是 Gemini 2.5 Flash Image 多模态能力真正闪耀的地方。你可以提供一个或多个图像以及文本提示进行编辑、合成和风格转换。

### **1. 图像编辑：添加和删除元素**

**提供图像并简单描述你想要的更改**。模型将**分析原始图像的风格、光线和透视**，使编辑看起来自然，并在一系列图像中**保持角色一致性**。

**模板：**

这个模板用于编辑现有图像，添加、删除或修改元素。指定图像主体、要执行的操作、具体元素，并说明如何自然地融合变化。

```plain text
Using the provided image of [subject], please [add/remove/modify] [element] to/from the scene. Ensure the change is [description of how the change should integrate].
```

**示例提示词：**

```plain text
Using the provided image of my cat, please add a small, knitted wizard hat on its head. Make it look like it's sitting comfortably and matches the soft lighting of the photo.
```

**示例输出：**

![[image 12.png]]

Example image editing - cat with wizard hat**
**

### **2. 局部重绘：编辑特定区域**

你可以**对话式地告诉** Gemini 2.5 Flash Image **只编辑图像的一部分**，而**保持其余部分完全不变**。

**模板：**

这个模板用于局部重绘，只改变图像中的特定区域。明确指出要改变的元素和替换内容，强调保持其他部分不变。

```plain text
Using the provided image, change only the [specific element] to [new element/description]. Keep everything else in the image exactly the same, preserving the original style, lighting, and composition.

```

**示例提示词：**

```plain text
Using the provided image of a living room, change only the blue sofa to be a vintage, brown leather chesterfield sofa. Keep the rest of the room, including the pillows on the sofa and the lighting, unchanged.

```

**示例输出：**

![[image 13.png]]

Example inpainting - sofa replacement

### **3. 风格转换**

**提供照片**并要求模型以**特定风格或艺术运动**重新创建其内容。

**模板：**

这个模板用于风格转换，将照片转换成特定艺术风格。指定原图主体、目标艺术家或风格，并描述风格化的具体元素。

```plain text
Transform the provided photograph of [subject] into the artistic style of [artist/art style]. Preserve the original composition but render it with [description of stylistic elements].
```

**示例提示词：**

```plain text
Transform the provided photograph of a modern city street at night into the artistic style of Vincent van Gogh's 'Starry Night'. Preserve the original composition of buildings and cars, but render all elements with swirling, impasto brushstrokes and a dramatic palette of deep blues and bright yellows.
```

**示例输出：**

![[image 14.png]]

Example style transfer - Van Gogh street scene

## **多图像合成**

**提供多个图像作为上下文**来创建全新的合成场景。这非常适合**产品样机或创意拼贴**。

**模板：**

这个模板用于多图像合成，将不同图像的元素组合成新场景。指定要从每张图片中提取的元素、如何组合它们，并描述最终的理想效果。

```plain text
Create a new image by combining the elements from the provided images. Take the [element from image 1] and place it with/on the [element from image 2]. The final image should be a [description of the final scene].
```

**示例提示词：**

```plain text
Create a professional e-commerce fashion photo. Take the blue floral dress from the first image and let the woman from the second image wear it. Generate a realistic, full-body shot of the woman wearing the dress, with the lighting and shadows adjusted to match an outdoor environment.
```

**示例输出：**

![[image 15.png]]

Example multi-image composition - fashion photo**
**

## **额外提示**

As you build, here are more tips for working with image generation:

在你创作过程中，以下是使用图像生成的更多提示：

- **Be hyper-specific:** The more detail you provide, the more control you have. Instead of "fantasy armor," describe it: "ornate elven plate armor, etched with silver leaf patterns, with a high collar and pauldrons shaped like falcon wings."
- **超级具体化：** 你提供的细节越多，控制力就越强。不要说"幻想盔甲"，而要描述它："华丽的精灵板甲，蚀刻着银叶图案，高领和猎鹰翅膀形状的护肩。"
- **Fix character consistency drifts:** If you notice a character's features begin to drift after many iterative edits, you can restart a new conversation with a detailed description to retain consistency.
- **修复角色一致性偏移：** 如果你注意到角色特征在多次迭代编辑后开始偏移，你可以用详细描述重新开始新对话以保持一致性。
- **Provide context and intent:** Explain the *purpose* of the image. For example, "Create a logo for a high-end, minimalist skincare brand" will yield better results than just "Create a logo."
- **提供背景和意图：** 解释图像的_目的_。例如，"为高端极简护肤品牌创建标志"比仅仅说"创建标志"会产生更好的结果。
- **Iterate and refine:** Don't expect a perfect image on the first try. Use the conversational nature of the model to make small changes. Follow up with prompts like, "That's great, but can you make the lighting a bit warmer?" or "Keep everything the same, but change the character's expression to be more serious."
- **迭代和精炼：** 不要期望第一次就能得到完美的图像。利用模型的对话特性进行小幅更改。跟进提示如："很棒，但你能让光线更温暖一些吗？"或"保持一切不变，但将角色的表情改得更严肃一些。"
- **Use "semantic negative prompts":** Instead of saying "no cars," describe the desired scene positively: "an empty, deserted street with no signs of traffic."
- **使用"语义否定提示"：** 不要说"没有汽车"，而要积极地描述所需场景："一条空旷、荒凉的街道，没有交通迹象。"
- **Aspect ratios:** When editing, Gemini 2.5 Flash Image generally preserves the input image's aspect ratio. If it doesn't, be explicit in your prompt: `"Update the input image... Do not change the input aspect ratio."` If you upload multiple images with different aspect ratios, the model will adopt the aspect ratio of the *last* image provided. If you need a specific ratio for a new image and prompting doesn't produce it, the best practice is to provide a reference image with the correct dimensions as part of your prompt.
- **宽高比：** 编辑时，Gemini 2.5 Flash Image 通常会保持输入图像的宽高比。如果没有，请在提示中明确说明：`"更新输入图像...不要改变输入宽高比。"` 如果你上传多个不同宽高比的图像，模型将采用_最后_提供的图像的宽高比。如果你需要新图像的特定比例但提示无法产生，最佳做法是提供具有正确尺寸的参考图像作为提示的一部分。
- **Control the camera:** Use photographic and cinematic language to control the composition. Terms like `wide-angle shot`, `macro shot`, `low-angle perspective`, `85mm portrait lens`, and `Dutch angle` give you precise control over the final image.
- **控制相机：** 使用摄影和电影语言来控制构图。像`广角镜头`、`微距镜头`、`低角度透视`、`85mm 人像镜头`和`荷兰角度`这样的术语让你对最终图像有精确的控制。

## **限制**

随着 Google 团队继续开发和改进模型，Google 团队相信在需要改进的领域保持透明。

虽然 Gemini 2.5 Flash Image 是一个强大且多功能的工具，但对于高度细致的请求，第一次尝试就达到完美可能需要一些迭代。你可能会发现，生成复杂排版或在多个图像中保持角色特征的绝对一致性有时需要通过后续提示进行完善。

Google 团队正在积极改进这些领域，感谢你的创造力，与 Google 团队一起构建下一代图像工具。

## **玩转生图：实战演练生图场景**

在掌握了 Gemini 2.5 Flash 的提示词技巧后，让我们看看如何用 **Lovart** 等工具将这些技巧应用到实际的批量生图工作流中。以下是各个场景的实战演练：

### **场景一：照片级真实场景批量生成**

**批量生成提示词：**

```plain text
help me generate one by one

A photorealistic close-up portrait of a meticulous Swiss watchmaker, adjusting a tiny balance spring with tweezers, setin a sunlit wooden atelier. The scene is illuminated by soft north-window light with gentle bounce, creating a focused, contemplative atmosphere. Captured with a 100mm macro lens at f/4, emphasizing brushed steel, minute gear teeth, and natural skin pores. The image should be in a 4:5 vertical format.

A photorealistic full-body environmental portrait of a contemporary dancer mid-leap, dust rising from the floor, set on an empty theater stage. The scene is illuminated by crisp stage spotlights with a rim light, creating a dramatic, kinetic atmosphere. Captured with a 35mm wide-angle lens at f/1.8, emphasizing tulle fabric motion, suspended chalk dust, and muscle definition. The image should be in a 16:9 landscape format.

A photorealistic medium shot of a barista pouring a rosetta, steady hands and steady stream, setin a cozy café of warm wood and brass. The scene is illuminated by morning window light and subtle practicals, creating a warm, inviting atmosphere. Captured with a 50mm standard lens at f/1.4, emphasizing glossy microfoam, ceramic glaze, and wisps of steam. The image should be in a 4:5 vertical format.

A photorealistic macro shot of a dewdrop-laden spiderweb with a ladybug paused on a strand, setin a meadow at dawn. The scene is illuminated by backlit golden-hour sun, creating a delicate, ethereal atmosphere. Captured with a 100mm macro lens, emphasizing spherical dewdrops, tiny leg hairs, and bokeh highlights. The image should be in a 3:2 landscape format.

A photorealistic architectural exterior shot of a minimalist concrete house as interior lights switch on, set on a grass-covered hillside at blue hour. The scene is illuminated by cool ambient twilight and warm tungsten from within, creating a tranquil, refined atmosphere. Captured with a 24mm tilt-shift lens, emphasizing board-formed concrete texture, glass reflections, and crisp edges. The image should be in a 2.39:1 cinematic format.

A photorealistic product hero shot of a matte-black smartphone struck by water droplets mid-splash, set on a glossy black surface. The scene is illuminated by high-contrast strobes and controlled specular highlights, creating a sleek, high-tech atmosphere. Captured with an 85mm lens at f/8, emphasizing crisp droplet spheres, anodized aluminum edges, and micro-textured glass. The image should be in a 1:1 square format.

A photorealistic overhead food shot of a rustic sourdough loaf being dusted with flour, set on a worn wooden table with a linen cloth. The scene is illuminated by a soft side light with gentle falloff, creating an artisanal, cozy atmosphere. Captured with a 35mm lens top-down, emphasizing blistered crust, airborne flour, and knife scoring. The image should be in a 4:3 landscape format.

A photorealistic telephoto wildlife shot of a snow leopard prowling along a rocky ridge, tail curled for balance, setin a high-altitude tundra. The scene is illuminated by diffuse overcast light, creating a tense, elusive atmosphere. Captured with a 400mm lens, emphasizing rosette fur patterns, cold breath vapor, and granite lichen. The image should be in a 3:2 landscape format.

A photorealistic wide underwater shot of a freediver gliding above a coral reef, fins barely moving, setin clear tropical waters. The scene is illuminated by sunbeams piercing the surface, creating a serene, awe-inspiring atmosphere. Captured with a 24mm rectilinear lens in an underwater housing, emphasizing air bubbles, coral textures, and caustic light patterns. The image should be in a 16:9 landscape format.

A photorealistic candid street shot of an elderly tailor hand-stitching beneath a flickering neon sign in light rain, setin a narrow alley of wet cobblestones. The scene is illuminated by neon reflections and a distant shop lamp, creating a nostalgic, cinematic atmosphere. Captured with a 35mm lens at f/2, emphasizing raindrop ripples, thread tension, and timeworn hands. The image should be in a 3:2 landscape format.

A photorealistic sports close-up of a sprinter coiled in the starting blocks, sinews taut, set on a stadium track at dusk. The scene is illuminated by stadium lights with crisp rim light, creating an explosive, anticipatory atmosphere. Captured with a 135mm telephoto lens, emphasizing beads of sweat, track granules, and fabric stretch. The image should be in a 16:9 landscape format.

A photorealistic fashion half-body portrait of a model in a sculptural white suit, chin slightly raised, set against a seamless light-gray backdrop. The scene is illuminated by a large overhead softbox (butterfly lighting), creating a minimalist, sophisticated atmosphere. Captured with an 85mm portrait lens at f/5.6, emphasizing fabric weave, crisp lapel edges, and cheekbone highlights. The image should be in a 4:5 vertical format.

A photorealistic laboratory medium shot of a semiconductor engineer examining a silicon wafer, tilting it to catch iridescence, setin a cleanroom. The scene is illuminated by cool, even fluorescent panels, creating a clinical, precise atmosphere. Captured with a 50mm lens, emphasizing wafer micro-patterns, anti-static suit texture, and nitrile glove wrinkles. The image should be in a 3:2 landscape format.

A photorealistic long-exposure landscape of a waterfall veiling over basalt columns, mist swirling at the base, setin a mossy gorge. The scene is illuminated by soft overcast light, creating a meditative, timeless atmosphere. Captured with a 24mm lens and ND filter, emphasizing silky water flow, wet rock sheen, and vivid moss. The image should be in a 3:2 landscape format.

A photorealistic night-sky panorama of the Milky Way arching over a saguaro cactus, saguaros silhouetted against starlight, setin the Sonoran Desert. The scene is illuminated by starlight and faint airglow, creating a vast, contemplative atmosphere. Captured with a 14mm ultra-wide lens at f/2.0, emphasizing dense dust lanes, cactus spines, and subtle horizon glow. The image should be in a 2:1 panoramic format.

A photorealistic pet portrait of a Shiba Inu in a red bandana, ears perked and eyes bright, setin a tatami room with shoji screens. The scene is illuminated by soft window light and gentle fill, creating a cheerful, cozy atmosphere. Captured with a 50mm lens at f/2, emphasizing plush fur texture, catchlights, and woven tatami patterns. The image should be in a 4:5 vertical format.

```

**实战输出效果：**

![[image 16.png]]

### **场景二：贴纸表情包批量生成**

用自己的照片加表情提示词批量生产一套自己的表情包

**批量生成提示词：**

```plain text
generate one by one

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring a big open-mouthed grin with sparkling eyes and raised arms, and a soft pastel color palette (blush pink, mint green, sky blue, lemon yellow) that harmonizes with colors in the reference. The design should have bold, clean outlines and simple cel-shading with soft highlights; strictly match identity, face shape, hairstyle, and any glasses/beard from the reference image. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring eyes squeezed shut, mouth wide in laughter, and two teardrops of joy, and a soft pastel color palette tuned to the reference image. The design should have bold, clean outlines and simple cel-shading with soft highlights; preserve exact facial features and hairstyle from the reference. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring heart-shaped eyes, a tiny smile, and floating mini hearts, and a soft pastel color palette echoing the reference. The design should have bold, clean outlines and simple cel-shading; keep identity, hair color, and accessories consistent with the reference. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring a cheeky wink and a big thumbs-up, and a soft pastel color palette derived from the reference. The design should have bold, clean outlines and simple cel-shading; match face proportions and hairstyle exactly to the reference. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring glossy puppy-dog eyes, clasped hands, and a tiny pleading mouth, and a soft pastel color palette aligned with the reference. The design should have bold, clean outlines and simple cel-shading; ensure identity consistency (eyes, brows, hair silhouette). The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring furrowed brows, puffed cheeks, and little steam puffs above the head, and a soft pastel color palette tuned to the reference. The design should have bold, clean outlines and simple cel-shading; keep facial geometry and hairstyle from the reference. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring a downturned mouth, teardrops streaming, and shaky motion lines, and a soft pastel color palette complementing the reference. The design should have bold, clean outlines and simple cel-shading; preserve identity, hair parting, and any eyewear from the reference. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring wide circular eyes, an “O”-shaped mouth, and a floating exclamation mark, and a soft pastel color palette matching the reference. The design should have bold, clean outlines and simple cel-shading; keep exact face shape and hair volume from the reference. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring a tilted head, puzzled brows, and a floating question mark, and a soft pastel color palette referencing the photo. The design should have bold, clean outlines and simple cel-shading; match identity, hair texture, and any facial hair. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring one hand on the chin with narrowed thinking eyes and a tiny thought bubble, and a soft pastel color palette informed by the reference. The design should have bold, clean outlines and simple cel-shading; maintain exact facial landmarks and hairstyle. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring closed crescent eyes, a soft smile, and “Z” sleep marks above a tiny blanket, and a soft pastel color palette harmonized with the reference. The design should have bold, clean outlines and simple cel-shading; keep identity, hair silhouette, and accessories consistent. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring a facepalm with one hand, embarrassed blush lines, and a tiny sweat drop, and a soft pastel color palette linked to the reference. The design should have bold, clean outlines and simple cel-shading; strictly match face shape, eyebrows, and hairstyle from the reference. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring a confident smirk, lowered eyelids, and cool sunglasses (use sunglasses only if present or plausible for the character), and a soft pastel color palette echoing the reference. The design should have bold, clean outlines and simple cel-shading; maintain identity, hairline, and proportions. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring a party cone hat, confetti bursts, and a blowing party horn, and a soft pastel color palette that complements the reference. The design should have bold, clean outlines and simple cel-shading; keep facial features and hairstyle consistent with the reference. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring a thermometer in the mouth, droopy eyes, and a cozy scarf, and a soft pastel color palette coordinated with the reference. The design should have bold, clean outlines and simple cel-shading; preserve identity, skin tone, and hair from the reference. The background must be white.

A kawaii-style sticker of a chibi version of the person from the attached reference image, featuring a red headband, clenched tiny fists, and determined eyes with speed lines, and a soft pastel color palette balanced with the reference. The design should have bold, clean outlines and simple cel-shading; maintain exact facial structure and hairstyle fidelity. The background must be white.

```

**实战输出效果：**

![[image 17.png]]

![[image 18.png]]

### **场景三：公众号物料批量生产**

试着为我的公众号批量做了一批物料：

**批量生成提示词：**

```plain text
Generate one by one

Create a primary logo for HaoDaTalk with the text "HaoDaTalk"in a bold geometric sans-serif. The design should be minimalist and grid-aligned with a subtle speech-bubble accent integrated into the letterforms, with a color scheme of electric indigo (#5E5CE6) and black on white.

Create a secondary wordmark for HaoDaTalk with the text "HaoDaTalk"in a clean condensed grotesque sans-serif. The design should be modern and balanced with tight tracking and optical kerning, with a color scheme of black and white with a small neon lime accent (#B5FF00).

Create a social avatar for HaoDaTalk with the text "HDT"in a heavy rounded sans-serif. The design should be bold and high-contrast with a perfect circle boundary and a micro drop shadow, with a color scheme of white text on electric indigo (#5E5CE6).

Create a series banner for HaoDaTalk with the text "HaoDaTalk | AI | Product | Design"in a wide sans-serif. The design should be Swiss-style with a strong baseline grid and asymmetric layout, with a color scheme of black, white, and electric indigo (#5E5CE6).

Create a poster for HaoDaTalk with the text "HaoDaTalk LIVE"in a variable-width sans-serif. The design should be kinetic-typography style with diagonal rhythm and subtle halftone texture, with a color scheme of black and white with accents of electric indigo (#5E5CE6).

Create a sticker sheet title for HaoDaTalk with the text "HaoDaTalk Stickers"in a playful rounded sans-serif. The design should be minimal with a small chat-bubble icon aligned to the x-height, with a color scheme of black on white with electric indigo (#5E5CE6) accents.

Create a tote bag printfor HaoDaTalk with the text "Listen. Think. Build. — HaoDaTalk"in a monospaced font. The design should be ultra minimal with left-aligned text blocks and generous margins, with a color scheme of black ink on natural canvas (simulate off-white).

Create a hoodie front printfor HaoDaTalk with the text "HaoDaTalk"in a bold sans-serif. The design should be clean with a small chest placement and a tiny wave-line motif under the baseline, with a color scheme of white print on electric indigo (#5E5CE6) fabric.

Create a hoodie back printfor HaoDaTalk with the text "AI | Product | Design"in a condensed grotesque sans-serif. The design should be typographic-only with stacked lines and a small "HaoDaTalk" tag at the bottom, with a color scheme of white on black.

Create a mug wrap for HaoDaTalk with the text "HaoDaTalk" repeated as a seamless pattern in a light sans-serif. The design should be modular with equal spacing and one larger hero lockup, with a color scheme of electric indigo (#5E5CE6) and white.

Create a laptop sticker for HaoDaTalk with the text "#HaoDaTalk"in a bold italic sans-serif. The design should be die-cut friendly with a thick white stroke outline, with a color scheme of black text on electric indigo (#5E5CE6) with a white border.

Create an article cover for HaoDaTalk with the text "This Week on HaoDaTalk"in a modern sans-serif. The design should be minimalist editorial with a large title, a small caption row, and clear negative space, with a color scheme of black and white with an electric indigo (#5E5CE6) bar.

Create an event banner for HaoDaTalk with the text "HaoDaTalk Meetup"in a bold grotesque sans-serif. The design should be clean and highly legible with left-right anchor blocks and a subtle grid, with a color scheme of white text on electric indigo (#5E5CE6).

Create a QR flyer footer for HaoDaTalk with the text "Follow HaoDaTalk"in a geometric sans-serif. The design should be simple with a reserved QR area and alignment guides, with a color scheme of black on white with a thin electric indigo (#5E5CE6) underline.

Create a slide cover for HaoDaTalk with the text "HaoDaTalk Deck"in a wide sans-serif. The design should be presentation-ready with a bold title area and a small subtitle line, with a color scheme of black, white, and electric indigo (#5E5CE6).

Create a notebook cover for HaoDaTalk with the text "HaoDaTalk — Notes"in a clean sans-serif. The design should be minimal and grid-based with tiny corner crop marks as a motif, with a color scheme of white on electric indigo (#5E5CE6).

```

**实战输出效果：**

![[image 19.png]]

![[image 20.png]]

## **下一步？开始创作！**

你现在已经掌握了使用 Gemini 2.5 Flash 创建和编辑令人惊叹图像的基础技能。提高的最佳方式是练习。以下是一些帮助你学习的资源：

- **在 Google AI Studio 中探索 Gemini**[3]：开始尝试本指南中技术的最简单方法是使用 Google 团队的基于网络的工具 AI studio。
- **使用 Lovart 批量生图**[4]：如果你想要批量生成图像，也可以使用 Lovart，一款可以批量生图的 agent 工具。它能帮你将本指南中的提示词技巧应用到大规模的图像生产工作流中，实现真正的工业化 AI 内容创作。
- **阅读官方文档**[2]：为想要将 Gemini 2.5 Flash 的图像生成功能集成到自己应用程序中的开发者提供。
- **查看定价**[5]：了解在你的项目中使用 Gemini API 的 Gemini 2.5 Flash 图像生成相关的成本。