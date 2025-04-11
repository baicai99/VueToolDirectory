// 模拟工具数据
// 实际应用中，这应该从后端 API 获取
export const allTools = [
  // AI 工具集
  {
    id: 'gemini', // 使用小写 id
    name: 'Gemini', // 工具名称
    description: 'Google 开发的先进多模态 AI 模型。', // 简短描述
    longDescription: `Gemini 是由 Google DeepMind (Google AI) 开发的一系列功能强大的多模态人工智能模型。\n\n与许多专注于单一模态的 AI 不同，Gemini 从一开始就被设计为原生多模态，能够无缝地理解、操作和结合不同类型的信息：\n* **多模态理解与生成：** 可以同时处理和理解文本、代码、音频、图像和视频。\n* **高级推理能力：** 在复杂推理任务（如数学、物理、逻辑等）上展现出卓越性能。\n* **强大的编码能力：** 精通多种编程语言，可用于代码生成、解释和调试。\n* **不同规模模型：** 提供 Ultra（能力最强）、Pro（性能与扩展性平衡）和 Nano（高效端侧设备）等版本以适应不同场景。\n* **广泛集成：** 已被整合到众多 Google 产品和服务中，如 Google 搜索、Google Workspace、Vertex AI 以及安卓系统等。\n\nGemini 旨在成为一个更有帮助、更负责任的 AI，代表了 Google 在 AI 领域的最新进展。`, // 详细描述
    icon: 'src/assets/icons/gemini.jpg', // 示例图标路径，请替换为实际文件并确认格式
    url: 'https://gemini.google.com/', // Gemini 的官方访问地址
    category: 'AI Tools', // 分类
    tags: ['ai', 'chatbot', 'google', 'multimodal', 'llm', '对话', '常用', '图片', '视频', '代码'], // 相关标签
    isHot: true, // 是否热门
    isFeatured: true, // 是否特色推荐
  },
  {
    id: 'hidreamai', // 使用小写 id
    name: 'HiDream AI', // 工具名称
    description: '一个 AI 驱动的图像生成与创作探索平台。', // 简短描述
    longDescription: `HiDream AI 是一个专注于 AI 图像生成和创意设计的在线平台。Explore 页面是你发现和探索 AI 艺术创作无限可能的入口。\n\n该平台通常具备以下特性：\n* **AI 图像生成：** 用户可以通过文本描述（Text-to-Image）快速生成独特的图像，或利用其他 AI 技术（如 Image-to-Image）进行创作。\n* **风格多样：** 可能提供多种预设模型或风格，让用户可以创作出不同艺术流派或特定效果的图片。\n* **社区分享与发现：** Explore 页面通常用于展示平台上的热门作品、最新创作或特色模型，用户可以在这里浏览他人的作品获取灵感。\n* **创作工具集：** 除了基础生成，可能还包含一些图像编辑、优化或扩展的功能。\n\n无论你是设计师、艺术家、内容创作者，还是仅仅对 AI 生成艺术感到好奇，都可以在 HiDream AI Explore 页面找到灵感和工具，创作出令人惊叹的视觉效果。它旨在降低 AI 艺术创作的门槛，激发用户的创造力。`, // 详细描述
    icon: 'src/assets/icons/hidream.png', // 示例图标路径，请替换为实际文件并确认格式 (例如 .png, .jpg, .svg)
    url: 'https://hidreamai.com/explore', // HiDream AI Explore 页面的访问地址
    category: 'AI Tools', // 分类 (或 'Image Generation', 'Creative Tools')
    tags: ['ai', '常用', 'image generation', 'text to image', 'art', 'creative', 'design', '图像生成', '人工智能', '设计', '创意', '艺术', '灵感'], // 相关标签
    isHot: false, // 是否热门 (根据实际情况调整)
    isFeatured: false, // 是否特色推荐 (根据实际情况调整)
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI 开发的领先的对话式 AI 模型。',
    longDescription: `ChatGPT 是由 OpenAI 公司训练和开发的一种先进的大型语言模型 (LLM)，基于强大的 GPT (Generative Pre-trained Transformer) 架构。\n\n主要功能与特点：\n* 能够理解和生成极其自然的、类似人类书写的文本。\n* 可应用于广泛的场景，包括但不限于：\n    * 智能问答与对话\n    * 内容创作（文章、邮件、代码、诗歌等）\n    * 文本摘要与信息提取\n    * 语言翻译\n    * 学习辅导与头脑风暴\n* 提供不同版本的模型（如 GPT-3.5 和 GPT-4），具有不同的能力和性能。\n\n请注意遵守 OpenAI 的使用政策。`,
    icon: 'src/assets/icons/chatgpt.jpg', // 示例路径，确保文件存在
    url: 'https://chat.openai.com/',
    category: 'AI Tools',
    tags: ['ai', 'chatbot', 'openai', '对话', '常用'],
    isHot: true,
    isFeatured: false,
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic 公司开发的大型语言模型，注重安全和伦理。',
    longDescription: `Claude 是由 Anthropic PBC 公司开发的一系列大型语言模型。与许多其他 AI 不同，Claude 的设计特别强调了 AI 的安全性、诚实性和有益性，旨在成为一个有用、无害且诚实的 AI 助手。\n\n关键优势：\n* 在处理长上下文窗口方面表现出色，能够理解和处理非常长的文档或对话。\n* 在创意写作、编码和复杂推理任务上具有强大的能力。\n* 致力于减少生成有害、不道德或有偏见内容的风险。\n* 通过 Constitutional AI 等技术进行训练，使其行为与预设的原则保持一致。`,
    icon: 'src/assets/icons/claude.jpg', // 示例路径
    url: 'https://claude.ai/',
    category: 'AI Tools',
    tags: ['ai', 'chatbot', 'anthropic', '对话', '常用'],
    isHot: true,
    isFeatured: false,
  },
  {
    id: 'remove-photos', // 基于 URL 创建一个 id
    name: 'Remove Photos', // 使用网站名称
    description: '免费在线 AI 工具，快速移除图片背景。', // 简短描述
    longDescription: `Remove Photos 是一个由 Imagga Technologies 提供的在线工具，致力于使用人工智能技术快速、轻松地移除图片背景。\n\n主要特点：\n* **一键操作：** 只需上传图片，AI 会自动识别并移除背景，通常无需复杂的手动编辑。\n* **免费使用：** 提供免费的处理额度或基础功能，适合快速处理少量图片或进行试用。\n* **无需注册（可能）：** 许多在线工具力求简化流程，可能允许用户在不注册的情况下使用基本功能。\n* **应用场景：** 非常适合需要制作透明背景图（例如 Logo、产品图、个人照片处理等）的设计师、电商卖家、营销人员或普通用户。\n\n该工具专注于背景移除这一核心功能，提供了一个便捷、高效的在线解决方案。`, // 详细描述
    icon: 'src/assets/icons/remove-photos.png', // 示例图标路径，请替换为实际文件
    url: 'https://remove.photos/', // 网站 URL
    category: 'Image Tools', // 分类为图片工具
    tags: ['图片', '背景移除', '抠图', '免费', 'ai', '在线工具', 'image processing', '常用'], // 相关标签
    isHot: false, // 是否热门 (可自行调整)
    isFeatured: false, // 是否特色推荐
  },
  {
    id: 'doubao',
    name: '豆包',
    description: '字节跳动出品的智能助手，提供聊天、写作、问答等功能。',
    longDescription: `豆包是由字节跳动公司推出的一款功能丰富的 AI 智能助手应用。\n\n它不仅能进行自然流畅的对话，还能在多种场景下提供帮助：\n* **创意写作：** 生成文章、故事、邮件、文案等。\n* **信息问答：** 回答各种领域的问题，提供知识科普。\n* **学习辅助：** 解释概念、翻译语言、检查语法等。\n* **生活娱乐：** 聊天解闷、提供建议、玩文字游戏等。\n\n豆包旨在成为用户日常生活和工作中的得力伙伴，界面友好，交互简单。`,
    icon: 'src/assets/icons/doubao.png', // 示例路径
    url: 'https://www.doubao.com/',
    category: 'AI Tools',
    tags: ['ai', 'chatbot', '字节跳动', '对话', '常用', '生活'],
    isHot: true,
    isFeatured: false,
  },
  {
    id: 'coze',
    name: 'Coze (扣子)',
    description: '字节跳动推出的 AI Bot 开发平台，快速创建、调试和部署 AI 应用。',
    longDescription: `Coze（中文名：扣子）是字节跳动旗下的新一代 AI Bot 开发平台。\n\n无论你是否有编程基础，都可以通过 Coze 快速创建、调试和发布各种类型的 AI 聊天机器人（Bots），并将它们部署到不同的社交平台和消息应用上（如飞书、微信公众号、豆包等）。\n\n核心特性：\n* **可视化编排：** 通过拖拽和配置即可组合大语言模型、插件、工作流等。\n* **丰富的插件：** 集成了大量预置插件（如搜索、资讯、图片生成等），也可创建自定义插件。\n* **知识库与数据库：** 可以让 Bot 拥有专属知识，或与业务数据交互。\n* **多平台部署：** 一次创建，轻松发布到多个主流平台。`,
    icon: 'src/assets/icons/coze.png', // 示例路径
    url: 'https://www.coze.cn/',
    category: 'AI Tools',
    tags: ['ai', '开发平台', '字节跳动', '机器人', '常用'],
    isHot: true,
    isFeatured: false,
  },
  // 文本工具
  {
    id: 'quillbot',
    name: 'QuillBot',
    description: '强大的在线写作助手，提供改写、语法检查、摘要等功能。',
    longDescription: `QuillBot 是一款广受欢迎的在线 AI 写作增强工具，旨在帮助用户提高写作质量和效率。\n\n主要功能包括：\n* **Paraphraser (改写器):** 提供多种模式（标准、流畅、正式、创意等）对句子或段落进行改写，以改善清晰度、改变语气或避免重复。\n* **Grammar Checker (语法检查):** 检测并修正文本中的语法、拼写和标点错误。\n* **Summarizer (摘要器):** 快速将长篇文章或文档压缩成关键要点或段落摘要。\n* **Citation Generator (引文生成):** 自动生成 APA, MLA, Chicago 等多种格式的参考文献。\n* **Co-Writer:** 一个集成了所有工具的综合写作空间。\n\n它特别受学生、学者、内容创作者和需要进行大量英文写作的专业人士的青睐。`,
    icon: 'src/assets/icons/quillbot.png', // 示例路径
    url: 'https://quillbot.com/',
    category: 'Text Tools',
    tags: ['文本', '写作', '改写', '语法', '办公', '常用'],
    isHot: false,
    isFeatured: false,
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    description: '流行的英语语法、拼写、风格检查工具。',
    longDescription: `Grammarly 是一款全球知名的 AI 驱动的写作助手，专注于提升英语写作的准确性和专业性。\n\n它提供：\n* **全面的语法和拼写检查：** 实时捕捉并修正从基础到高级的语法错误。\n* **风格和清晰度建议：** 改进句子结构、词语选择，使表达更清晰、更具影响力。\n* **语调检测：** 分析文本的语调（如正式、自信、友好等），并提供调整建议。\n* **抄袭检测（付费功能）：** 对比数十亿网页检查文本的原创性。\n\nGrammarly 通过浏览器扩展、桌面应用、移动键盘等多种形式提供服务，是学生、职场人士以及任何需要进行英文沟通用户的常用工具。`,
    icon: 'src/assets/icons/grammarly.png', // 示例路径
    url: 'https://www.grammarly.com/',
    category: 'Text Tools',
    tags: ['文本', '写作', '语法', '英语', '办公'],
    isHot: false,
    isFeatured: false,
  },
  // 视频工具
  {
    id: 'runwayml',
    name: 'RunwayML',
    description: 'AI 驱动的视频编辑和创作平台，提供多种魔法工具。',
    longDescription: `Runway (RunwayML) 是一个面向创意专业人士和艺术家的 AI 视频创作与编辑平台，以其创新的 "AI Magic Tools" 而闻名。\n\n亮点功能：\n* **Gen-1 & Gen-2:** 开创性的视频生成模型，可以根据文本描述、图片或现有视频生成全新的视频内容或风格转换。\n* **Text to Video:** 输入文本提示即可生成视频片段。\n* **Video Editing Suite:** 提供基于时间线的视频编辑功能，并集成了各种 AI 工具。\n* **Background Removal:** 智能移除视频背景。\n* **Inpainting:** 移除视频中的不需要的对象。\n* **Text to Image, Image to Image:** 强大的图像生成能力。\n\nRunway 大大降低了高级视频特效和 AI 内容生成的门槛，是探索下一代视频创作的领先平台。`,
    icon: 'src/assets/icons/runwayml.png', // 示例路径
    url: 'https://runwayml.com/',
    category: 'Video Tools',
    tags: ['视频', '编辑', 'ai', '创作', '图片'],
    isHot: false,
    isFeatured: false,
  },
  {
    id: 'tusi',
    name: '吐司 AI',
    description: '专注于 AI 图片创作和模型分享的社区平台。',
    longDescription: `吐司 AI (tusiart.com) 是一个活跃的 AI 艺术创作与分享社区平台，特别在中国用户中有较高知名度。\n\n平台特色：\n* **在线图片生成：** 用户可以直接在网页上使用各种流行的 AI 绘图模型（如 Stable Diffusion 的各种变体）进行创作。\n* **模型分享：** 社区成员可以分享和下载训练好的模型（特别是 LoRA 等微调模型），用于生成特定风格或角色的图片。\n* **作品展示与交流：** 用户可以发布自己的 AI 作品，与其他创作者交流心得和技巧。\n* **教程与资源：** 提供相关的 AI 绘图教程和资源。\n\n吐司 AI 为 AI 绘画爱好者提供了一个集创作、学习、分享于一体的便捷平台。`,
    icon: 'src/assets/icons/tusi.png', // 示例路径
    url: 'https://tusiart.com/',
    category: 'Image Tools',
    tags: ['ai', '图片', '社区', '模型', '常用'],
    isHot: true,
    isFeatured: false,
  },
  // 办公工具
  {
    id: 'notionai',
    name: 'Notion AI',
    description: '集成在 Notion 笔记应用中的 AI 功能，辅助写作、总结、头脑风暴。',
    longDescription: `Notion AI 是深度集成在知名生产力工具 Notion 中的人工智能助手功能。\n\n它并非一个独立的应用，而是作为 Notion 编辑器的一部分，可以在你处理笔记、文档、项目管理时提供即时帮助：\n* **写作与编辑：** 撰写初稿、改写内容、检查语法、改变语气、缩写或扩展文本。\n* **总结与提炼：** 快速从长篇内容中提取要点或生成摘要。\n* **头脑风暴：** 生成想法列表、创建大纲、提出不同角度的观点。\n* **表格处理：** 从非结构化文本中提取信息填充表格。\n* **任务自动化：** 根据内容自动生成待办事项。\n\nNotion AI 极大地增强了 Notion 作为信息管理和知识创作平台的效率，让 AI 能力无缝融入工作流。`,
    icon: 'src/assets/icons/notionai.png', // 示例路径
    url: 'https://www.notion.so/product/ai',
    category: 'Office Tools',
    tags: ['办公', '笔记', 'ai', '写作', '常用'],
    isHot: false,
    isFeatured: false,
  },
  {
    id: 'feishudocs',
    name: '飞书文档',
    description: '飞书套件中的在线协作文档工具，支持多人实时编辑。',
    longDescription: `飞书文档是字节跳动旗下企业协作平台“飞书”套件中的核心组件之一，提供强大的在线文档协作能力。\n\n主要特点：\n* **多人实时协同编辑：** 支持多位用户同时在同一份文档上编辑，修改实时可见，并能看到协作者的光标位置。\n* **丰富的表达元素：** 除了基础的文本编辑，还支持插入图片、表格、任务列表、代码块、流程图、思维导图、看板等多种模块。\n* **便捷的评论与互动：** 可以针对文档具体内容进行评论和 @ 提及同事，方便讨论和反馈。\n* **与飞书生态深度整合：** 可轻松分享到飞书群聊、与日历、任务等打通。\n* **云端存储与版本管理：** 文档自动保存在云端，并保留历史版本记录，方便追溯。\n\n飞书文档是现代企业和团队进行知识沉淀、信息同步和项目协作的高效工具。`,
    icon: 'src/assets/icons/feishudocs.png', // 示例路径
    url: 'https://www.feishu.cn/product/docs',
    category: 'Office Tools',
    tags: ['办公', '协作', '文档', '常用'],
    isHot: false,
    isFeatured: false,
  },
  // 图片工具
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '高质量的 AI 图像生成工具，通过 Discord 进行交互。',
    longDescription: `Midjourney 是一款以生成高质量、富有艺术感的图像而闻名的 AI 工具。\n\n与其他许多 AI 绘图工具不同，Midjourney 主要通过即时通讯软件 Discord 进行交互：\n* **独特的交互方式：** 用户通过在 Discord 的特定频道内输入 /imagine 命令加上文本提示（Prompt）来生成图片。\n* **艺术风格突出：** 生成的图片通常具有非常鲜明的艺术风格和视觉效果，深受设计师和艺术家的喜爱。\n* **社区驱动：** Discord 服务器本身就是一个庞大的社区，用户可以分享作品、交流 Prompt 技巧。\n* **不断进化：** Midjourney 的模型版本（V4, V5, V6等）持续更新，图像质量和对提示的理解能力不断提升。\n\n虽然使用 Discord 交互对新手可能需要适应，但其出色的图像质量使其成为 AI 艺术领域的标杆之一。`,
    icon: 'src/assets/icons/midjourney.png', // 示例路径
    url: 'https://www.midjourney.com/',
    category: 'Image Tools',
    tags: ['ai', '图片', '生成', '艺术', '常用'],
    isHot: true,
    isFeatured: false,
  },
  {
    id: 'stablediffusion',
    name: 'Stable Diffusion',
    description: '开源的文本到图像生成模型，可本地部署或在线使用。',
    longDescription: `Stable Diffusion 是一个强大的、革命性的开源文本到图像生成模型，由 Stability AI 公司发起并得到社区的广泛支持。\n\n核心特点：\n* **开源与可访问：** 模型代码和权重（部分版本）是公开的，允许研究人员和开发者自由使用、修改和部署。\n* **灵活性高：** 可以通过各种用户界面（如 AUTOMATIC1111 WebUI, ComfyUI 等）在本地计算机上运行（需要合适的显卡），也可以通过众多在线服务使用。\n* **可控性强：** 支持通过文本提示、负面提示、图像到图像（img2img）、ControlNet 等多种方式精确控制生成结果。\n* **庞大的社区生态：** 存在大量由社区训练和分享的定制模型（Checkpoints）、LoRA、Embeddings 等，极大地扩展了其生成能力和风格多样性。\n\nStable Diffusion 的开源特性使其成为 AI 图像生成领域最具活力和发展潜力的模型之一。`,
    icon: 'src/assets/icons/stablediffusion.png', // 示例路径
    url: 'https://stablediffusionweb.com/', // 在线示例
    category: 'Image Tools',
    tags: ['ai', '图片', '生成', '开源', '社区'],
    isHot: false,
    isFeatured: false,
  },
  // 生活
  {
    id: 'airbnb',
    name: 'Airbnb',
    description: '全球民宿、短租公寓在线预订平台。',
    longDescription: `Airbnb (爱彼迎) 是一个连接旅行者与全球各地房东的在线市场平台，提供多样化的住宿选择，从公寓、别墅到城堡、树屋等。\n\n主要服务：\n* **住宿预订：** 用户可以根据目的地、日期、价格、房屋类型等条件搜索和预订独特的短期住宿。\n* **体验活动：** 除了住宿，平台还提供由当地达人带领的各种特色体验活动，如烹饪课程、城市导览、手工艺制作等。\n* **房东服务：** 为拥有闲置房源的个人或商家提供发布房源、管理预订、与房客沟通的平台。\n\nAirbnb 改变了许多人的旅行方式，让旅行者能更深入地体验当地文化，同时也为房东创造了收入机会。`,
    icon: 'src/assets/icons/airbnb.png', // 示例路径
    url: 'https://www.airbnb.com/',
    category: 'Life',
    tags: ['生活', '旅行', '住宿'],
    isHot: false,
    isFeatured: false,
  },
  // 特色推荐/横幅 - 横幅通常不需要很长的描述，保持现有即可，或略作补充
  {
    id: 'alibaba-design',
    name: 'Alibaba Design',
    description: '阿里巴巴集团的设计语言和资源库。',
    longDescription: `Alibaba Design 是阿里巴巴集团官方对外展示其设计体系、理念和实践的平台。\n\n它不仅包含了阿里巴巴内部广泛使用的设计语言规范，还提供了丰富的设计资源，如图标库 (Iconfont)、设计模式、前端组件库 (如 Fusion Design, Ant Design - 虽然 Ant Design 源自蚂蚁集团，但与阿里体系关联紧密) 等。\n\n此平台旨在促进设计一致性，提升产品体验，并向社区分享阿里巴巴在设计领域的思考和沉淀，是设计师和前端开发者了解大型互联网公司设计体系的重要窗口。`,
    icon: 'src/assets/icons/alibaba-design.png', // 示例路径
    url: 'https://design.alibaba.com/',
    category: 'Featured',
    tags: ['设计', '阿里巴巴', '资源'],
    isHot: false,
    isFeatured: false,
  },
  {
    id: 'ali-ai-ecommerce',
    name: '阿里官方 AI 电商工具',
    description: '由阿里巴巴推出的，面向电商场景的 AI 工具集合。',
    longDescription: `这是阿里巴巴集团利用其在人工智能和电商领域的深厚积累，为电商商家和从业者打造的一系列 AI 赋能工具。\n\n这些工具可能涵盖：\n* **智能商品文案生成：** 根据商品信息自动生成吸引人的标题和描述。\n* **AI 商品图优化：** 提升图片质量、更换背景、生成模特试穿图等。\n* **智能客服机器人：** 自动回答常见客户咨询，提升服务效率。\n* **数据分析与洞察：** 利用 AI 分析销售数据，提供运营建议。\n* **个性化营销：** 基于 AI 的用户画像进行精准营销内容推送。\n\n这些工具旨在帮助电商商家降本增效，提升转化率和用户体验。(具体工具集可能在阿里云、淘宝商家平台等处提供)`,
    icon: 'src/assets/icons/ali-ai-ecommerce.png', // 示例路径
    url: 'https://www.aliyun.com/product/ai/ecommerce',
    category: 'Featured',
    tags: ['ai', '电商', '阿里巴巴', '办公'],
    isHot: false,
    isFeatured: false,
  },
];

// 提取侧边栏导航分类
export const sidebarCategories = [
  { id: 'all', name: '所有工具', icon: 'Grid' }, // 添加“所有工具”选项
  { id: 'AI Tools', name: 'AI 工具集', icon: 'Cpu' },
  { id: 'Text Tools', name: '文本工具', icon: 'Document' },
  { id: 'Video Tools', name: '视频工具', icon: 'VideoCamera' },
  { id: 'Image Tools', name: '图片工具', icon: 'Picture' },
  { id: 'Office Tools', name: '办公工具', icon: 'Briefcase' },
  { id: 'Life', name: '生活常用', icon: 'Umbrella' }, // 新增生活分类
  { id: 'Community', name: '社区资源', icon: 'ChatDotRound' }, // 新增社区分类

];

// 侧边栏底部链接
export const sidebarBottomLinks = [
  {
    id: 'llm-ranking',
    name: 'LLM 排行榜',
    icon: 'DataLine',
    route: { name: 'Ranking' }
  },
  // 示例：假设 "每日 AI 快讯" 是一个内部页面，使用 route 对象
  {
    id: 'news',
    name: '每日 AI 快讯',
    icon: 'DataLine',
    route: { name: 'News' } // 指向名为 'News' 的路由
  },
  // 示例：假设 "AI 交流群" 是一个外部链接，保留 url
  {
    id: 'chatgroup',
    name: 'AI 交流群',
    icon: 'Promotion',
    url: 'https://www.zhengjiyuan.top' // 保留外部链接
  },
  // 示例：假设 "热门工具" 也是一个内部页面
  {
    id: 'hottopics',
    name: '热门工具',
    icon: 'HotWater',
    route: { name: 'HotTools' } // 指向名为 'HotTools' 的路由
  },
];

// 右侧内容区顶部导航分类
export const contentTabs = [
  { name: '常用', tag: '常用' },
  { name: '社区', tag: '社区' },
  { name: '图片', tag: '图片' },
  { name: '生活', tag: '生活' },
  { name: '办公', tag: '办公' },
  { name: '视频', tag: '视频' },
  // 可以根据需要添加更多
];