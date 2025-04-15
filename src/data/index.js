// 数据中心导出文件
// 导入各个分类的工具数据
import { aiTools } from './categories/aiTools';
import { imageTools } from './categories/imageTools';
import { textTools } from './categories/textTools';
import { videoTools } from './categories/videoTools';
import { officeTools } from './categories/officeTools';
import { lifeTools } from './categories/lifeTools';
import { featuredTools } from './categories/featuredTools';

// 合并所有工具数据
export const allTools = [
    ...aiTools,
    ...imageTools,
    ...textTools,
    ...videoTools,
    ...officeTools,
    ...lifeTools,
    ...featuredTools
];

// 导出侧边栏导航分类
export const sidebarCategories = [
    { id: 'all', name: '所有工具', icon: 'Grid' },
    { id: 'AI Tools', name: 'AI 工具集', icon: 'Cpu' },
    { id: 'Text Tools', name: '文本工具', icon: 'Document' },
    { id: 'Video Tools', name: '视频工具', icon: 'VideoCamera' },
    { id: 'Image Tools', name: '图片工具', icon: 'Picture' },
    { id: 'Office Tools', name: '办公工具', icon: 'Briefcase' },
    { id: 'Life', name: '生活常用', icon: 'Umbrella' },
    { id: 'Community', name: '社区资源', icon: 'ChatDotRound' },
];

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
    {
        id: 'ai-competition',
        name: 'AI竞赛',
        icon: 'Trophy',
        route: { name: 'AICompetition' }
    },
    {
        id: 'news',
        name: '每周 AI 快讯',
        icon: 'DataLine',
        route: { name: 'News' }
    },
    {
        id: 'chatgroup',
        name: 'AI 交流群',
        icon: 'Promotion',
        url: 'https://www.zhengjiyuan.top'
    },
    {
        id: 'hottopics',
        name: '热门工具',
        icon: 'HotWater',
        route: { name: 'HotTools' }
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
];

// 分类数据的直接导出，方便按需引入
export {
    aiTools,
    imageTools,
    textTools,
    videoTools,
    officeTools,
    lifeTools,
    featuredTools
};