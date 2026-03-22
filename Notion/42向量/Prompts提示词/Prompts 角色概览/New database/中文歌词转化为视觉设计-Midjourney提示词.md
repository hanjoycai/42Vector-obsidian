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
> <OptimizedInstructions>
> <Task>将任意中文歌词逐句转化为视觉设计和Midjourney提示词</Task>
> 
> <InputVariables>
> {$CHINESE_LYRICS}
> {$SONG_TITLE}
> {$ARTIST}
> </InputVariables>
> 
> <StepByStepInstructions>
> 1. 仔细阅读整首{$CHINESE_LYRICS}，识别主要主题、风格和情感线索。考虑{$SONG_TITLE}和{$ARTIST}可能提供的额外上下文。
> 
> 2. 基于歌词内容，确定歌曲的大致年代背景或时代特征（如果有）。
> 
> 3. 绘制一个简单的情感曲线，反映歌曲从开始到结束的情感变化。
> 
> 4. 将歌词分割成独立的句子或有意义的短语。
> 
> 5. 对每一句歌词执行以下步骤：
>    a. 设计一个具有视觉冲击力的画面：
>       - 确保画面与歌词内容紧密相关
>       - 考虑色彩、构图、情感和氛围，反映情感曲线的相应阶段
>       - 如果适用，融入相关的时代或文化元素
>       - 保持描述简洁，不超过20字
>       - 注意与前后画面的连贯性
>    
>    b. 将画面描述转换为Midjourney提示词：
>       - 遵循Midjourney提示词的最佳实践和语法规则
>       - 包含关键视觉元素、风格、氛围和技术参数
>       - 每个提示词控制在70-80字符之间
>       - 使用英语编写提示词
>       - 在每个提示词中加入一个适合歌曲风格的艺术风格或特殊效果
>       - 根据情感曲线，调整色彩和氛围描述
>       - 在每个提示词末尾添加 "--ar 16:9" 以保持一致的宽高比
> 
> 6. 识别歌词中反复出现的关键意象或符号，确保在多个场景中重复使用这些元素，以增强主题一致性。
> 
> 7. 如果歌词暗示特定的时代或文化背景，适当添加相关的服饰、物品或场景细节，以增强真实感。
> 
> 8. 完成所有场景后，回顾整体输出，调整以确保场景之间的视觉和情感连贯性。
> 
> 9. 如果处理完所有歌词后，Midjourney提示词总字数超过600字，执行以下步骤：
>    a. 找出最关键、最有代表性的歌词句子（如副歌部分或情感高潮）
>    b. 保留这些关键句子的视觉设计和提示词
>    c. 合并相似的场景，确保故事的关键转折点都被保留
> 
> 10. 最后检查确保每句关键歌词都有对应的画面描述和Midjourney提示词，整体结构清晰，并且叙事连贯。
> </StepByStepInstructions>
> 
> <ErrorHandling>
> - 如果歌词不完整或难以理解，返回："错误：歌词不完整或难以理解，请提供完整清晰的歌词。"
> - 如果无法为某句歌词创建合适的画面，返回："错误：无法为以下歌词创建画面：[具体歌词]。请提供更多上下文或解释。"
> - 如果Midjourney提示词总字数超过600且无法通过删减达到要求，返回："错误：即使删减后，提示词总字数仍超过600字限制。请考虑减少歌词数量或允许更长的输出。"
> </ErrorHandling>
> 
> <OutputFormat>
> <LyricsVisualisation>
>   <SongInfo>
>     <Title>{$SONG_TITLE}</Title>
>     <Artist>{$ARTIST}</Artist>
>   </SongInfo>
>   <LyricSegment>
>     <OriginalLyric>{中文歌词，单句或短语}</OriginalLyric>
>     <VisualDescription>{画面描述，≤20字}</VisualDescription>
>     <MidjourneyPrompt>{英文提示词，70-80字符} --ar 16:9</MidjourneyPrompt>
>   </LyricSegment>
>   <!-- 为每一句关键歌词重复LyricSegment -->
> </LyricsVisualisation>
> </OutputFormat>
> 
> <Example>
> 输入:
> {$SONG_TITLE="夜空中最亮的星"}
> {$ARTIST="逃跑计划"}
> {$CHINESE_LYRICS="夜空中最亮的星 能否听清 那仰望的人 心底的孤独和叹息 ..."}
> 
> 预期输出:
> <LyricsVisualisation>
>   <SongInfo>
>     <Title>夜空中最亮的星</Title>
>     <Artist>逃跑计划</Artist>
>   </SongInfo>
>   <LyricSegment>
>     <OriginalLyric>夜空中最亮的星 能否听清</OriginalLyric>
>     <VisualDescription>璀璨星空下的凝视者</VisualDescription>
>     <MidjourneyPrompt>Person gazing at bright star, night sky, cosmic wonder, low angle shot --ar 16:9</MidjourneyPrompt>
>   </LyricSegment>
>   <LyricSegment>
>     <OriginalLyric>那仰望的人 心底的孤独和叹息</OriginalLyric>
>     <VisualDescription>孤独身影，星光映照</VisualDescription>
>     <MidjourneyPrompt>Silhouette under starry sky, loneliness, ethereal atmosphere, soft focus --ar 16:9</MidjourneyPrompt>
>   </LyricSegment>
>   <!-- 更多LyricSegment将根据歌词继续 -->
> </LyricsVisualisation>
> </Example>
> </OptimizedInstructions>
> ```
> 