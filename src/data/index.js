<<<<<<< HEAD
// 存放所有工具数据
// 按工具类别分组导出
import { allTools } from './toolsData';
import { sidebarCategories, contentTabs } from './categoriesData';
import { sidebarBottomLinks } from './navigationData';
import { contests, getUpdatedContests } from './contests';

// 导出所有数据
export {
    allTools,
    sidebarCategories,
    contentTabs,
    sidebarBottomLinks,
    contests,
    getUpdatedContests
=======
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
>>>>>>> 90a77d083112ea7c8141bc42e51f40ae9cb776f8
};