// 模拟工具数据
// 实际应用中，这应该从后端 API 获取
export const allTools = [
    // AI 工具集
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      description: 'OpenAI 开发的领先的对话式 AI 模型。',
      icon: 'src/assets/icons/chatgpt.jpg', // 替换为实际图标路径
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
      icon: 'src/assets/icons/claude.jpg',
      url: 'https://claude.ai/',
      category: 'AI Tools',
      tags: ['ai', 'chatbot', 'anthropic', '对话', '常用'],
      isHot: true,
      isFeatured: false,
    },
     {
      id: 'doubao',
      name: '豆包',
      description: '字节跳动出品的智能助手，提供聊天、写作、问答等功能。',
      icon: '/src/assets/images/tool-icon-placeholder.png',
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
      icon: '/src/assets/images/tool-icon-placeholder.png',
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
      icon: '/src/assets/images/tool-icon-placeholder.png',
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
      icon: '/src/assets/images/tool-icon-placeholder.png',
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
      icon: '/src/assets/images/tool-icon-placeholder.png',
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
      icon: '/src/assets/images/tool-icon-placeholder.png',
      url: 'https://tusiart.com/',
      category: 'Image Tools', // 归类到图片或AI工具
      tags: ['ai', '图片', '社区', '模型', '常用'],
      isHot: true,
      isFeatured: false,
    },
    // 办公工具
    {
      id: 'notionai',
      name: 'Notion AI',
      description: '集成在 Notion 笔记应用中的 AI 功能，辅助写作、总结、头脑风暴。',
      icon: '/src/assets/images/tool-icon-placeholder.png',
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
      icon: '/src/assets/images/tool-icon-placeholder.png',
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
      icon: '/src/assets/images/tool-icon-placeholder.png',
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
      icon: '/src/assets/images/tool-icon-placeholder.png',
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
      icon: '/src/assets/images/tool-icon-placeholder.png',
      url: 'https://www.airbnb.com/',
      category: 'Life',
      tags: ['生活', '旅行', '住宿'],
      isHot: false,
      isFeatured: false,
    },
    // 特色推荐/横幅
    {
      id: 'alibaba-design',
      name: 'Alibaba Design',
      description: '阿里巴巴集团的设计语言和资源库。',
      icon: '/src/assets/images/tool-icon-placeholder.png',
      url: 'https://design.alibaba.com/',
      category: 'Featured', // 特殊分类用于横幅
      tags: ['设计', '阿里巴巴', '资源'],
      isHot: false,
      isFeatured: true, // 标记为特色推荐
    },
    {
      id: 'ali-ai-ecommerce',
      name: '阿里官方 AI 电商工具',
      description: '由阿里巴巴推出的，面向电商场景的 AI 工具集合。',
      icon: '/src/assets/images/tool-icon-placeholder.png',
      url: 'https://www.aliyun.com/product/ai/ecommerce', // 假设 URL
      category: 'Featured',
      tags: ['ai', '电商', '阿里巴巴', '办公'],
      isHot: false,
      isFeatured: true, // 标记为特色推荐
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
      { id: 'news', name: '每日 AI 快讯', icon: 'DataLine', url: '#' }, // 使用 # 作为示例链接
      { id: 'chatgroup', name: 'AI 交流群', icon: 'Promotion', url: '#' },
      { id: 'hottopics', name: '热门工具', icon: 'HotWater', url: '#' }, // 可以链接到下方热门工具区域
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
  
  // 快速搜索链接
  export const quickSearchLinks = [
      { name: 'Bing', url: 'https://www.bing.com/search?q=' },
      { name: 'Google', url: 'https://www.google.com/search?q=' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai/search?q=' },
      { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  ];