// src/data/contests.js
// AIGC比赛数据

// 获取当前日期，用于判断比赛状态
const now = new Date();

// 比赛数据
export const contests = [
    {
        id: "lumi-ai-chuangxiangjia-2024",
        title: "剪映x炉米Lumi-AI创想家培养计划｜让想象力成为热点",
        description: "剪映与炉米Lumi联合发起的AI创想家培养计划，旨在将高质量AI作品转化为AI特效，帮助创作者面向更广泛的用户市场，解决算力成本和技术问题，并提供符合市场需求的创作灵感。通过每月命题精选优秀作品，并根据市场表现力奖励创作者。",
        startDate: "2024-11-11",
        endDate: "2024-11-22",
        registrationDeadline: "2024-11-11",
        status: "ended",
        officialUrl: null,
        organizer: "剪映, 炉米Lumi",
        imageUrl: "src/assets/activity/lumi-ai-chuangxiangjia-2024.png",
        tags: ["AI特效", "创意", "剪映", "炉米Lumi", "用户市场", "模型", "AIGC"]
    },
    {
        id: "liblibai-tongyi-wanxiang-2025",
        title: "【世间·万相】LiblibAI x 通义万相 创意模型征集大赛",
        description: "光影交汇，想象无界！基于通义万相视频微调的创意模型征集大赛，鼓励开发者创作天马行空的虚拟场景和震撼眼球的视觉冲击。聚焦创意特效和灵动画风两大主题。",
        startDate: "2025-03-31",
        endDate: "2025-04-30",
        registrationDeadline: "2025-04-30",
        status: "ended",
        officialUrl: "https://liblibai.com/topic/wxyc",
        organizer: "LiblibAI, 通义万相",
        imageUrl: "src/assets/activity/liblibai-tongyi-wanxiang-2025.webp",
        tags: ["AI模型", "视频生成", "创意特效", "灵动画风"]
    },
    {
        id: "liblibai-f1-inspiration-2025",
        title: "万物重构｜LiblibAI F.1元素灵感大师挑战赛",
        description: "LiblibAI F.1元素灵感大师挑战赛，旨在鼓励会员创作应用于电商和海报场景的写实与创意风格模型，创作方向涵盖自然元素、生活空间、户外场景和灵感创意。",
        startDate: "2025-03-17",
        endDate: "2025-04-25",
        registrationDeadline: "2025-04-25",
        status: "ended",
        officialUrl: null,
        organizer: "LiblibAI",
        imageUrl: "src/assets/activity/liblibai-f1-inspiration-2025.webp",
        tags: ["AI模型", "电商", "海报", "写实", "创意", "自然元素", "生活空间", "户外场景", "灵感创意"]
    },
    {
        id: "contest-1",
        title: "AI 绘画创新大赛 2025",
        description: "探索AI生成艺术的无限可能，展示您使用最新AI绘画工具创作的艺术作品。参赛作品将由专业艺术家和AI专家组成的评审团评判。",
        startDate: "2025-03-01",
        endDate: "2025-05-30",
        registrationDeadline: "2025-04-20",
        status: "ongoing",
        officialUrl: "https://example.com/ai-art-contest",
        organizer: "创新AI艺术协会",
        imageUrl: null,
        tags: ["图像生成", "艺术创作", "绘画"]
    },
    {
        id: "contest-2",
        title: "大语言模型应用挑战赛",
        description: "使用最先进的大语言模型开发创新应用，解决实际问题。提供多个赛道：教育、医疗、金融和客户服务。",
        startDate: "2025-05-01",
        endDate: "2025-07-15",
        registrationDeadline: "2025-05-20",
        status: "upcoming",
        officialUrl: "https://example.com/llm-challenge",
        organizer: "全球AI创新基金会",
        imageUrl: null,
        tags: ["大语言模型", "应用开发", "AI解决方案"]
    },
    {
        id: "contest-3",
        title: "AI音乐创作马拉松",
        description: "48小时内使用AI音乐生成工具创作原创音乐作品。参赛者将获得高级AI音乐工具的访问权限，最终作品将由音乐产业专家评估。",
        startDate: "2025-02-10",
        endDate: "2025-02-12",
        registrationDeadline: "2025-02-08",
        status: "ended",
        officialUrl: "https://example.com/ai-music-marathon",
        organizer: "数字音乐实验室",
        imageUrl: null,
        tags: ["音乐生成", "创意", "马拉松"]
    },
    {
        id: "contest-4",
        title: "AIGC 商业应用全球挑战赛",
        description: "寻找最具商业潜力的AIGC应用。参赛者需提交一个使用生成式AI的商业解决方案，并提供商业计划和演示。",
        startDate: "2025-04-01",
        endDate: "2025-06-30",
        registrationDeadline: "2025-05-15",
        status: "ongoing",
        officialUrl: "https://example.com/aigc-business-challenge",
        organizer: "全球科技创投联盟",
        imageUrl: null,
        tags: ["商业应用", "创业", "投资"]
    },
    {
        id: "contest-5",
        title: "AI代码助手优化比赛",
        description: "开发或改进AI代码助手工具，提高其在各种编程任务中的性能。参赛作品将在准确性、效率和用户体验方面进行评估。",
        startDate: "2025-05-20",
        endDate: "2025-08-10",
        registrationDeadline: "2025-06-15",
        status: "upcoming",
        officialUrl: "https://example.com/ai-coding-assistant-contest",
        organizer: "开发者社区联盟",
        imageUrl: null,
        tags: ["编程工具", "代码生成", "开发者体验"]
    },
    {
        id: "contest-6",
        title: "AI视频内容创作大赛",
        description: "利用最新的AI视频生成和编辑工具，创作短视频或动画内容。作品将根据创意性、技术实现和观众反响进行评判。",
        startDate: "2025-01-15",
        endDate: "2025-03-15",
        registrationDeadline: "2025-02-28",
        status: "ended",
        officialUrl: "https://example.com/ai-video-contest",
        organizer: "数字媒体创新中心",
        imageUrl: null,
        tags: ["视频生成", "内容创作", "动画"]
    },
    {
        id: "contest-7",
        title: "教育领域AIGC应用大赛",
        description: "设计和开发针对教育领域的AIGC应用，解决学习、教学或教育管理中的实际问题。特别关注个性化学习和教育资源生成。",
        startDate: "2025-03-20",
        endDate: "2025-06-20",
        registrationDeadline: "2025-04-30",
        status: "ongoing",
        officialUrl: "https://example.com/aigc-education-contest",
        organizer: "教育创新联盟",
        imageUrl: null,
        tags: ["教育科技", "个性化学习", "教育资源"]
    },
    {
        id: "contest-8",
        title: "多模态AI系统挑战赛",
        description: "开发结合文本、图像、音频等多种模态的AI系统，解决复杂的实际问题。重点关注模态间的无缝集成和交互体验。",
        startDate: "2025-06-01",
        endDate: "2025-09-30",
        registrationDeadline: "2025-07-15",
        status: "upcoming",
        officialUrl: "https://example.com/multimodal-ai-challenge",
        organizer: "前沿AI研究联盟",
        imageUrl: null,
        tags: ["多模态", "系统集成", "用户体验"]
    },
];

// 动态更新比赛状态的函数（实际项目中可能通过API获取最新状态）
export function updateContestStatus(contest) {
    const today = new Date();
    const startDate = new Date(contest.startDate);
    const endDate = new Date(contest.endDate);

    if (today < startDate) {
        return { ...contest, status: 'upcoming' };
    } else if (today > endDate) {
        return { ...contest, status: 'ended' };
    } else {
        return { ...contest, status: 'ongoing' };
    }
}

// 获取动态更新状态后的比赛列表
export function getUpdatedContests() {
    return contests.map(updateContestStatus);
}