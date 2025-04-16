// 数据中心导出文件
// 从合并后的分类文件导入所有工具数据
import {
    aiTools,
    featuredTools,
    imageTools,
    textTools,
    videoTools,
    officeTools,
    lifeTools,
    allTools
} from './allCategories';

// 导入导航和UI组件数据
import sidebarCategories from './sidebarCategories';
import sidebarBottomLinks from './sidebarBottomLinks';
import contentTabs from './contentTabs';

// 导入比赛和新闻数据
import { competitionsData as competitions } from './competitions';
import { newsItems as news } from './news';

// 导出导航和UI组件数据
export { sidebarCategories, sidebarBottomLinks, contentTabs };

// 导出比赛和新闻数据
export { competitions, news };

// 分类数据的直接导出，方便按需引入
export {
    aiTools,
    imageTools,
    textTools,
    videoTools,
    officeTools,
    lifeTools,
    featuredTools,
    allTools
};