---
base: "[[New database.base]]"
适用平台:
  - ChatGPT
职业角色:
  - 设计师
所属场景:
  - 设计/视频
---
> [!tip] 💡
> 点击下方代码块右上角拷贝按钮可直接复制使用
> 
> ```javascript
> - author: 山雨
> # Midjourney提示词设计指南
> 
> ## 一、设计目标
> 根据用户输入的图像主题、艺术风格、参考艺术家等要素,融合高阶prompt优化技巧,遵循严谨的思维链设计流程,生成一个高质量、富创意、可直接用于Midjourney生图的提示词。在撰写过程中,动态参考对话历史,不断迭代优化,力求输出一份指南性和可操作性兼备的提示词设计教程。
> 
> ## 二、设计背景
> Midjourney是一个强大的AI绘画工具,但要充分发挥其生成能力,关键在于设计出优质的文字提示词。然而提示词设计涉及艺术理论、构图技巧、色彩搭配等诸多专业知识,非专业用户往往不知从何下手。因此,需要一份提示词设计指南,手把手教用户如何根据自己的创作意图,设计出一个高质量、富创意、可直接用于Midjourney生图的提示词。
> 
> ## 三、设计资源
> - 大量优质的Midjourney提示词案例,涵盖多种图像主题、艺术风格、构图方式 
> - 权威的艺术流派、美学思潮介绍及视觉语汇解析
> - 知名艺术家、摄影师代表作的赏析与技法总结
> - 构图、色彩、光影等艺术理论基础知识
> - prompt工程领域的前沿研究成果与实践案例
> - Midjourney官方提示词撰写规范和范例
> - Blender, Maya, 3ds Max, Cinema4D等三维建模与动画软件的功能、工具、流程指南
> - V-Ray, Arnold, Redshift, Octane Render等高级渲染引擎的参数设置与优化策略
> 
> ## 四、设计约束
> - 生成的提示词必须严格遵循Midjourney的语法规则,符合其独特的关键词逻辑
> - 提示词要体现prompt工程的各项优化技巧,如角色扮演、任务分解、多轮迭代等
> - 提示词的总字数应控制在60个单词以内,注重凝练、避免冗余
> - 提示词要聚焦用户输入的关键元素,切忌偏题、跑偏
> - 提示词中不得包含任何色情、暴力、政治敏感内容
> - 恰当平衡艺术与技术术语,做到专业性与通俗性兼具,便于用户理解
> 
> ## 五、设计流程
> ### 第一步:明确设计目标
> - 精准把握用户输入的图像主题(`{subject}`)、艺术风格(`{style}`)、情感基调(`{mood}`)等关键元素
> - 在用户输入的基础上,再次明确提示词要表达的核心创意,确保不偏离主题
> - 运用"五W一H"(What, Who, When, Where, Why, How)分析法,全面审视主题要素,挖掘更多灵感
> - 思考如何将抽象的情感基调转化为具象的视觉元素,如色彩、光影、构图等
> 
> ### 第二步:提炼视觉元素
> - 参考用户喜好的艺术家(`{artist_1}, {artist_2}`),分析其代表作的独特视觉语言,提炼关键词
> - 深入了解每位艺术家的创作理念、美学追求,揣摩其作品的情感基调
> - 细致分析每位艺术家惯用的视觉元素,如色彩搭配、构图方式、细节刻画等
> - 模仿每位艺术家的行文风格,设计几组简洁有力的关键词,精准提炼画面要义
> - 运用角色扮演,代入艺术家视角,思考如何用简洁传神的词汇描绘心中画面
> 
> ### 第三步:丰富画面细节
> - 参考对话历史,针对性补充与主题相关的构图(`{composition}`)、色彩(`{colors}`)、光影(`{lighting}`)等视觉元素关键词
> - 根据主题特点,遴选2-3种经典构图方式,用摄影/电影术语精准描述,如`rule of thirds`, `symmetrical composition`等
> - 选取3-5个与情感基调匹配的色彩词,体现出色彩管理的专业性,如`cinematic color grading`, `Cyan-Orange color scheme`等
> - 巧用光影对比,点明主体光源的方向、强度、色温等,营造电影般的氛围感,可用`Rembrandt lighting`, `chiaroscuro`等术语
> - 参考Blender, Maya, 3ds Max, C4D等软件的建模工具,刻画场景中的硬表面模型,如`polygon modeling`, `NURBS modeling`等
> - 学习Blender, Maya, 3ds Max动画基本原理,为场景中的角色、物体、镜头等添加动感,如`keyframe animation`, `rigging`, `motion blur`等
> - 善用3D软件术语,引导AI生成细节丰富、立体感强的画面
> - 不断审视每个视觉元素词是否准确、生动、简洁,必要时重选词汇,力臻完美
> 
> ### 第四步:设计思维链
> - 灵活运用电影分镜头脚本的逻辑,先定格关键画面,再丰富各细节。做到环环相扣,脉络清晰
> - 运用"总-分-总"的结构,先概括画面的整体印象,再逐一描摹细部,最后点明画面的意境升华
> - 参考电影分镜头脚本,先描述最能体现主题的关键画面,再依次细化各具象元素,如场景、人物、道具等  
> - 适时穿插自问自答,如"这个元素想表达什么?""还有哪些细节可以呼应主题?"推进思路不断深入
> - 在描述具象元素之后,提炼画面的抽象意念,如"孤独感"、"未来感"等,引导AI生成意境深远的画面
> - 每一环节都紧扣上一环节的逻辑,做到承上启下、自然过渡,避免思维跳跃
> - 从画面整体到局部,从具象到抽象,层层深入,确保思维链环环相扣、脉络清晰
> 
> ### 第五步:润色画面意境
> - 充分运用意象、隐喻等多种修辞手法,用生动形象的词汇勾勒画面细节(`{detail_1}, {detail_2}, {detail_3}`),烘托意境
> - 根据画面情感基调,选取相应的意象,如"百合花"象征纯洁、"残阳如血"暗示悲凉  
> - 大胆跨界,用"音乐"比喻色彩的和谐、用"诗歌"比喻构图的韵律,制造新奇联想
> - 善用跨感官联想,从触觉、嗅觉、听觉等角度丰富画面 
> - 通感描写,如"丝绒般柔软的月光"、"醇厚如酒的色调",在视觉之外探求更多感官愉悦
> - 在细节刻画中融入三维软件的贴图、材质、光照等术语,如`procedural texture`, `subsurface scattering`, `global illumination`等
> 
> ### 第六步:优化渲染参数  
> - 巧用渲染引擎术语,把控画面的整体质感和氛围
> - 参考V-Ray, Arnold, Redshift, Octane等渲染引擎的功能特点,选取最能渲染画面质感的关键词,如`photoreal`, `physically based rendering`, `unbiased rendering`等
> - 根据画面主题,设置恰当的渲染参数,如`volumetric lighting`, `caustics`, `ambient occlusion`等,营造电影级视觉效果
> - 适时穿插图像质量参数(`{quality_1}, {quality_2}`)如分辨率、采样率等,以表现对细节的精益求精,同时又不失提示词的简洁性
> - 适当穿插图像质量参数,如`8K resolution`, `32-bit color depth`, `high sampling rate`等,彰显对细节品质的追求
> - 参数设置要与画面整体风格呼应,如童话风格选用柔和的参数,写实风格选用清晰锐利的参数
> - 参数词与画面描述词交错穿插,形成疏密有致的节奏,避免参数堆砌
> - 参数词的排列顺序依照机器识别的优先级,如"8k 高清"置于"32位色深"之前
> 
> ### 第七步:分解与重组
> - 结合prompt工程的任务分解技巧,将提示词中的关键元素分而治之,每个部分都力求表达准确、无二义性
> - 按主题、风格、构图、色彩、光影、材质、细节、意境、参数等维度拆分提示词,逐一优化
> - 每个部分都设身处地站在AI模型的角度思考"这样表述是否准确无歧义""这个参数设置是否合理" 
> - 将各部分"串珠成链",调整衔接顺序,确保前后呼应、逻辑自洽 
> - 相加组合后浑然一体、互为映衬,形成一个有机统一的整体
> 
> ### 第八步:审视与打磨
> - 反复审读提示词,剔除语义重复、表达臃肿的词句,力求简洁凝练
> - 找出画面表达的薄弱环节,针对性补充细节,增强提示词的丰富度
> - 评判提示词能否唤起用户共情、能否激发艺术灵感,把握提示词的感染力  
> - 再次对照用户需求,评估提示词的精准度、完整性、创意度
> - 必要时请用户反馈意见,持续打磨,力臻完美
> 
> ### 第九步:精简与提炼
> - 将优化后的提示词整合提炼,组织成逻辑清晰、表达流畅的语句
> - 调整词序,使相近词义相互呼应,远距词义形成对比,力求表达顺畅
> - 精简词藻,删繁就简,直抒胸臆,确保每个词都直击画面本质
> - 反复压缩字数,去芜存菁,确保在60词的长度限制内传递最丰富的信息量
> - 最后检查提示词是否遵循Midjourney语法,是否包含禁用词,确保无误后方可定稿
> 
> ### 第十步:测试与优化
> - 在Midjourney中测试生成的提示词,观察输出图像效果 
> - 仔细审视生成图像的构图、色彩、光影、材质、细节等,评判与预期的契合程度
> - 微调物体材质、参数设置等,使画面更富质感,如将`matte`改为`glossy`,增加`reflection`值等
> - 调整词语搭配,反复测试,找出最佳的提示词组合方案
> - 对词句进一步斟酌调整,力求最佳的视觉呈现
> - 邀请用户评判生成图像,收集反馈,持续打磨提示词,直至双方均满意为止
> 
> ## 六、预期成果
> - 获得一个精准表达画面主题、巧妙融合艺术元素、极富想象张力的高质量Midjourney提示词
> - 掌握一套科学、严谨、行之有效的提示词优化流程,为今后自主设计Midjourney提示词打下坚实基础
> - 将朦胧的创作灵感转化为清晰的视觉蓝图,彰显出色的创意策划和执行能力
> - 借助Midjourney的强大生成能力,将天马行空的奇思妙想转化为栩栩如生的视觉奇观
> - 深入理解三维建模、动画、渲染等领域的专业术语与工作流程,为将来进一步学习CG艺术打开思路
> 
> ## 七、示例演示
> 
> **用户输入:**
> - 主题: 赛博朋克风格的未来城市夜景
> - 风格: 写实插画
> - 艺术家: Josan Gonzalez, Nivanh Chanthara 
> - 情感基调: 暗黑、神秘、科技感
> 
> **第一步: 分析主题、风格、情感基调**
> - "赛博朋克风格的未来城市夜景"主题体现了科幻、黑暗、未来主义等元素
> - 写实插画风格要求画面精细逼真,光影对比强烈
> - 暗黑、神秘的情感基调可用冷色调、朦胧光效、复杂构图来表现
> 
> **第二步: 提炼艺术家画风元素**
> - Josan Gonzalez: 细节丰富、色彩鲜明、透视精准。关键词: `intricate details`, `vibrant colors`, `accurate perspective` 
> - Nivanh Chanthara: 光影对比强烈、氛围渲染到位。关键词: `high contrast`, `atmospheric`, `cinematic`
> 
> **第三步: 丰富画面细节**
> - 构图: 俯瞰视角,展现城市全貌。关键词: `bird's eye view`, `sprawling cityscape`
> - 色彩: 深蓝、靛紫为主,点缀荧光色。关键词: `neon blue`, `indigo`, `fluorescent accents`  
> - 光影: 强烈人造光,激光,霓虹灯。关键词: `hard lighting`, `laser beams`, `neon signs`
> - 材质: 金属、玻璃质感。关键词: `metallic`, `glossy`, `reflective surfaces`
> - 细节: 高科技元素,如全息投影,机械义肢。关键词: `holographic display`, `cybernetic implants`
> 
> **第四步: 设计思维链**
> - 整体印象: 夜幕下的赛博朋克城市,科技与黑暗交织
> - 分解要素: 摩天大楼、飞行器、霓虹广告牌、复杂管线  
> - 意境升华: 人工智能统治下的未来都市,个体挣扎求存
> 
> **第五步: 润色意境细节**
> - 巨型广告牌投射全息影像,虚拟偶像歌唱。关键词: `colossal holographic idol`  
> - 穿梭飞行器流光溢彩,汇入车流。关键词: `iridescent flying vehicles`
> - 雾气蒸腾,笼罩城市上空。关键词: `misty aerial view`
> 
> **第六步: 优化渲染与摄影参数**
> - 画面整体色调偏冷,科幻感强。关键词: `futuristic color grading` 
> - 16K 超高分辨率,展现精细质感。关键词: `16K resolution` 
> - 长焦端拍摄,突出画面纵深。关键词: `telephoto lens`
> - 大光圈虚化背景,主体突出。关键词: `large aperture`, `shallow depth of field` 
> - 曝光偏低,黑暗氛围渲染。关键词: `underexposed`
> - 后期色彩调整,突出科幻氛围。关键词: `color grading`
> 
> **第七步: 任务分解与优化**
> - 主题描述: `cyberpunk cityscape at night`
> - 风格描述: `realistic digital illustration`
> - 构图描述: `bird's eye view`, `sprawling cityscape`
> - 色彩描述: `neon blue`, `indigo`, `fluorescent accents` 
> - 光影描述: `hard lighting`, `laser beams`, `neon signs`
> - 材质描述: `metallic`, `glossy`, `reflective surfaces`
> - 细节描述: `colossal holographic idol`, `iridescent flying vehicles`, `misty aerial view`  
> - 意境描述: `AI-controlled future city`, `individuals struggling to survive`
> - 渲染、摄影参数: `16K resolution`, `telephoto lens`, `large aperture`, `underexposed`
> 
> **第八步: 审视与打磨** 
> - 主题聚焦"赛博朋克未来城市夜景",科幻感和未来感突出
> - 写实插画风格体现充分,画面精细逼真,细节丰富
> - Josan Gonzalez 和 Nivanh Chanthara 的画风神韵融合得当
> - 俯瞰构图展现城市规模,冷色调渲染黑暗氛围,光影对比鲜明
> - 意象隐喻诉诸人工智能统治和个体挣扎的未来 
> - 渲染和摄影参数细化画面质感,强化科幻感
> - 语言精炼凝练,逻辑清晰,呼应前后
> 
> **第九步: 精简与提炼**
> ```
> /imagine prompt: Cyberpunk cityscape at night, realistic digital illustration, bird's eye view, sprawling cityscape, neon blue, indigo, fluorescent accents, hard lighting, laser beams, neon signs, metallic, glossy, reflective surfaces, colossal holographic idol, iridescent flying vehicles, misty aerial view, AI-controlled future city, individuals struggling to survive. 16K resolution, telephoto lens, large aperture, underexposed, color grading, Josan Gonzalez, Nivanh Chanthara 
> ```
> 
> **第十步: 测试与迭代优化**
> - 测试生成多张高质量图像,整体效果写实沉浸,细节丰富,意境深远
> - 根据生成结果微调光影对比度,在关键词中加入 `chiaroscuro`
> - 补充关键细节,如 `towering skyscrapers`, `dense power lines`, `flickering display panels`
> - 收集用户反馈,持续打磨优化
> 
> **终版提示词**
> ```
> /imagine prompt: Cyberpunk cityscape at night, realistic digital illustration, bird's eye view, sprawling cityscape, neon blue, indigo, fluorescent accents, hard lighting, chiaroscuro, laser beams, neon signs, metallic, glossy, reflective surfaces, towering skyscrapers, dense power lines, flickering display panels, colossal holographic idol, iridescent flying vehicles, misty aerial view, AI-controlled future city, individuals struggling to survive. 16K resolution, telephoto lens, large aperture, underexposed, color grading, Josan Gonzalez, Nivanh Chanthara --v 6
> ```
> 