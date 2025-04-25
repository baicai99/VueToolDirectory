import { reactive, watch, onMounted } from 'vue';

/**
 * 布局管理器 - 处理应用的布局状态和响应式行为
 * @returns {Object} 包含布局状态和更新方法的对象
 */
export function useLayoutManager() {
    // 布局状态
    const layoutState = reactive({
        isSidebarCollapsed: window.innerWidth <= 768, // 移动端默认折叠侧边栏
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
    });

    // 屏幕尺寸变化时的处理函数
    const handleResize = () => {
        // 更新视口尺寸
        layoutState.viewportWidth = window.innerWidth;
        layoutState.viewportHeight = window.innerHeight;

        // 根据屏幕宽度自动调整侧边栏状态
        if (window.innerWidth <= 768 && !layoutState.isSidebarCollapsed) {
            layoutState.isSidebarCollapsed = true;
        }

        // 更新CSS变量，解决某些移动设备上的视口高度问题
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 处理滚动行为，防止页面弹跳
    const setupScrollBehavior = () => {
        document.body.addEventListener('touchmove', (e) => {
            // 只允许在可滚动区域内滚动
            if (e.target && !e.target.closest('.scrollable-area')) {
                e.preventDefault();
            }
        }, { passive: false });
    };

    // 初始化视口大小
    onMounted(() => {
        // 设置CSS变量以处理移动设备视口高度问题
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // 添加窗口尺寸变化事件监听器
        window.addEventListener('resize', handleResize);

        // 设置滚动行为
        setupScrollBehavior();
    });

    // 清理函数（在组件卸载时调用）
    const cleanup = () => {
        window.removeEventListener('resize', handleResize);
        document.body.removeEventListener('touchmove', null);
    };

    return {
        ...layoutState,
        cleanup
    };
}