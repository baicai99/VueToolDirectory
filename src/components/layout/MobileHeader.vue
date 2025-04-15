<template>
    <div class="mobile-header">
        <el-button class="mobile-header__menu-toggle" :icon="Menu" type="default" :aria-expanded="!isSidebarCollapsed"
            :aria-controls="sidebarId" aria-label="切换侧边栏" @click="requestSidebarOpen" />
        <h3 class="mobile-header__title">{{ title }}</h3>
    </div>
</template>

<script setup>
import { Menu } from '@element-plus/icons-vue';

// --- Props ---
const props = defineProps({
    /**
     * 在移动端头部显示的标题
     */
    title: {
        type: String,
        default: '智搜导航'
    },
    /**
     * 指示侧边栏当前是否处于折叠状态。
     * 用于设置 aria-expanded 属性。
     */
    isSidebarCollapsed: {
        type: Boolean,
        required: true
    },
    /**
     * 关联的侧边栏元素的 ID，用于 aria-controls。
     */
    sidebarId: {
        type: String,
        required: true // 为了 A11y，建议设为必传
    }
});

// --- Emits ---
const emit = defineEmits([
    /**
     * 当用户点击菜单按钮请求改变侧边栏状态时触发。
     * @param {boolean} collapsed - 请求将侧边栏设置的状态 (在此组件中总是 false，即请求展开)。
     */
    'sidebarCollapse'
]);

/**
 * 处理菜单按钮点击事件。
 * 向父组件发出请求，要求展开侧边栏 (设置 collapsed 状态为 false)。
 */
const requestSidebarOpen = () => {
    emit('sidebarCollapse', false);
};
</script>

<style lang="less" scoped>
.mobile-header {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    h3{
        margin: 0;
    }

    .mobile-header__menu-toggle {
        margin-right: 10px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
}
</style>