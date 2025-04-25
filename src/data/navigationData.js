// 存放导航相关数据
// 侧边栏底部链接
export const sidebarBottomLinks = [
    {
        id: 'mywebsite',
        name: '我的个人网页',
        icon: 'User',
        route: { name: 'MyWebsite' }
    },
    {
        id: 'chatwithme',
        name: '与我对话',
        icon: 'User',
        route: { name: 'ChatWithMe' }
    },
    {
        id: 'llm-ranking',
        name: 'LLM 排行榜',
        icon: 'DataLine',
        route: { name: 'Ranking' }
    },
    // 新增AIGC比赛信息入口
    {
        id: 'contests',
        name: 'AIGC比赛信息',
        icon: 'Trophy',
        route: { name: 'Contests' }
    },
    // 示例：假设 "每日 AI 快讯" 是一个内部页面，使用 route 对象
    {
        id: 'news',
        name: '每周 AI 快讯',
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