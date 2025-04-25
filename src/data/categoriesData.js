// 存放分类相关数据
// 提取侧边栏导航分类
export const sidebarCategories = [
    { id: 'all', name: '所有工具', icon: 'Grid' }, // 添加"所有工具"选项
    { id: 'AI Tools', name: 'AI 工具集', icon: 'Cpu' },
    { id: 'Text Tools', name: '文本工具', icon: 'Document' },
    { id: 'Video Tools', name: '视频工具', icon: 'VideoCamera' },
    { id: 'Image Tools', name: '图片工具', icon: 'Picture' },
    { id: 'Office Tools', name: '办公工具', icon: 'Briefcase' },
    { id: 'Life', name: '生活常用', icon: 'Umbrella' }, // 新增生活分类
    { id: 'Community', name: '社区资源', icon: 'ChatDotRound' }, // 新增社区分类
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