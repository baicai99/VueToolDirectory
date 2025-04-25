import { ref } from 'vue';

/**
 * 导航处理器 - 处理应用中与导航相关的所有交互和状态变更
 * @param {Object} appState - 应用全局状态
 * @param {Object} layoutState - 布局状态
 * @param {Object} router - Vue Router实例
 * @returns {Object} 导航处理方法和状态恢复函数
 */
export function useNavigationHandler(appState, layoutState, router) {
    /**
     * 更新侧边栏分类
     * @param {string} categoryId - 分类ID
     */
    const updateSidebarCategory = (categoryId) => {
        appState.currentSidebarCategory = categoryId;

        // 更新URL查询参数以反映当前选择
        const currentQuery = { ...router.currentRoute.value.query };
        if (categoryId === 'all') {
            // 如果选择"全部"分类，从URL中移除分类参数
            delete currentQuery.category;
        } else {
            // 否则更新URL中的分类参数
            currentQuery.category = categoryId;
        }

        // 如果路由路径不是首页，需要导航到首页
        if (router.currentRoute.value.path !== '/') {
            router.push({ path: '/', query: currentQuery });
        } else {
            // 仅更新查询参数
            router.replace({ query: currentQuery });
        }

        // 移动端下自动收起侧边栏
        if (window.innerWidth <= 768) {
            layoutState.isSidebarCollapsed = true;
        }
    };

    /**
     * 更新搜索关键词
     * @param {string} searchQuery - 搜索关键词
     */
    const updateSidebarSearch = (searchQuery) => {
        appState.currentSidebarSearch = searchQuery;

        // 更新URL查询参数以反映搜索条件
        const currentQuery = { ...router.currentRoute.value.query };
        if (!searchQuery) {
            // 如果搜索词为空，从URL中移除搜索参数
            delete currentQuery.search;
        } else {
            // 否则更新URL中的搜索参数
            currentQuery.search = searchQuery;
        }

        // 仅更新查询参数
        router.replace({ query: currentQuery });

        // 移动端下自动收起侧边栏
        if (window.innerWidth <= 768 && searchQuery) {
            layoutState.isSidebarCollapsed = true;
        }
    };

    /**
     * 处理底部链接点击
     * @param {Object} link - 链接对象
     */
    const handleBottomLinkClick = (link) => {
        console.log("底部链接点击:", link); // 添加调试日志

        try {
            if (link.route) {
                // 如果有指定路由，导航到该路由
                // 检查route是否为对象或字符串
                if (typeof link.route === 'object') {
                    // 如果是对象，直接使用该对象进行导航
                    console.log("使用对象路由:", link.route);
                    router.push(link.route);
                } else {
                    // 如果是字符串，作为路由名称使用
                    console.log("使用字符串路由名称:", link.route);
                    router.push({ name: link.route });
                }
            } else if (link.url) {
                // 处理普通URL（可能是外部链接）
                if (link.url.startsWith('http')) {
                    // 是外部链接，打开新窗口
                    console.log("打开外部链接:", link.url);
                    window.open(link.url, '_blank');
                } else {
                    // 是内部路径，使用router
                    console.log("导航到内部路径:", link.url);
                    router.push(link.url);
                }
            } else if (link.externalUrl) {
                // 如果有外部URL，使用ExternalPageView处理
                console.log("使用ExternalPageView显示外部URL:", link.externalUrl);
                router.push({
                    name: 'external-page',
                    params: { url: encodeURIComponent(link.externalUrl) }
                });
            } else {
                console.warn("链接没有定义route、url或externalUrl:", link);
            }
        } catch (error) {
            console.error("导航错误:", error);
        }

        // 移动端下自动收起侧边栏
        if (window.innerWidth <= 768) {
            layoutState.isSidebarCollapsed = true;
        }
    };

    /**
     * 处理侧边栏折叠状态变化
     * @param {boolean} collapsed - 是否折叠
     */
    const handleSidebarCollapse = (collapsed) => {
        layoutState.isSidebarCollapsed = collapsed;
    };

    /**
     * 同步路由与当前选择的分类
     * @param {string} categoryId - 分类ID
     */
    const syncRouteWithCategory = (categoryId) => {
        // 更新URL查询参数以反映当前选择的分类
        const currentQuery = { ...router.currentRoute.value.query };

        if (categoryId === 'all') {
            delete currentQuery.category;
        } else {
            currentQuery.category = categoryId;
        }

        // 如果路由路径不是首页，需要导航到首页
        if (router.currentRoute.value.path !== '/') {
            router.push({ path: '/', query: currentQuery });
        } else {
            // 仅更新查询参数
            router.replace({ query: currentQuery });
        }
    };

    /**
     * 从URL参数恢复应用状态
     */
    const restoreStateFromRoute = () => {
        const query = router.currentRoute.value.query;

        // 恢复分类选择
        if (query.category) {
            appState.currentSidebarCategory = query.category;
        }

        // 恢复搜索条件
        if (query.search) {
            appState.currentSidebarSearch = query.search;
        }
    };

    // 返回所有导航处理方法和状态恢复函数
    return {
        navHandler: {
            updateSidebarCategory,
            updateSidebarSearch,
            handleBottomLinkClick,
            handleSidebarCollapse,
            syncRouteWithCategory
        },
        restoreStateFromRoute
    };
}