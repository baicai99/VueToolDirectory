import { ref } from 'vue';

/**
 * 路由状态同步器 - 负责在路由变化时同步应用状态
 * @param {Object} appState - 应用全局状态
 * @param {Object} router - Vue Router实例
 * @returns {Object} 路由监听设置和移除方法
 */
export function useRouteStateSync(appState, router) {
    // 存储路由监听卸载函数
    const unwatch = ref(null);

    /**
     * 设置路由变化监听器
     */
    const setupRouteListener = () => {
        // 移除可能存在的旧监听器
        if (unwatch.value) {
            unwatch.value();
        }

        // 设置新的路由监听器
        unwatch.value = router.afterEach((to) => {
            // 当路由变化时，同步应用状态
            const { query } = to;

            // 同步分类状态
            if (query.category) {
                appState.currentSidebarCategory = query.category;
            } else if (to.path === '/') {
                // 如果是首页且没有指定分类，则默认为"全部"
                appState.currentSidebarCategory = 'all';
            }

            // 同步搜索状态
            if (query.search !== undefined) {
                appState.currentSidebarSearch = query.search || '';
            }
        });
    };

    /**
     * 移除路由监听器
     */
    const removeRouteListener = () => {
        if (unwatch.value) {
            unwatch.value();
            unwatch.value = null;
        }
    };

    return {
        setupRouteListener,
        removeRouteListener
    };
}