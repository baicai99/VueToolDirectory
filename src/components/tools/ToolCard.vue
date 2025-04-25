<template>
  <ItemCard :item="{
    name: tool.name,
    icon: resolvedIconUrl,
    description: tool.description
  }" :defaultIcon="defaultIcon" @click="showToolDetail" class="tool-card" />
</template>

<script setup>
import { defineProps, computed } from 'vue';
<<<<<<< HEAD
import ItemCard from '../base/ItemCard.vue';
import defaultIconPath from '../../assets/icons/tool-icon-placeholder.png';

// --- 使用 import.meta.glob 获取所有可能的图标 ---
// 注意路径：'/src/assets/icons/...' - 这个路径模式需要匹配 tools.js 中的格式
// { eager: true } 表示立即加载所有模块信息，而不是返回一个异步函数
// 包含常用图片格式
const imageModules = import.meta.glob('/src/assets/icons/*.{png,jpg,jpeg,gif,svg,ico}', { eager: true });
=======
import { defaultToolIcon } from '../../data/allCategories.js';
>>>>>>> 90a77d083112ea7c8141bc42e51f40ae9cb776f8

const props = defineProps({
  tool: {
    type: Object,
    required: true,
  },
});

<<<<<<< HEAD
const defaultIcon = defaultIconPath; // 默认图标路径
=======
const defaultIcon = defaultToolIcon; // 使用从 allCategories.js 导入的默认图标常量
>>>>>>> 90a77d083112ea7c8141bc42e51f40ae9cb776f8

// 向父组件发送事件
const emit = defineEmits(['open-detail']);

// 计算属性：直接使用图标路径，不使用动态导入
const resolvedIconUrl = computed(() => {
  const iconPathInData = props.tool?.icon; // 获取 data.js 中的路径字符串

  if (!iconPathInData) {
    return defaultIcon; // 如果 tool.icon 为空，使用默认图标
  }

  // 直接返回图标路径
  return iconPathInData;
});

// 修改为显示工具详情的函数
const showToolDetail = () => {
  if (props.tool) {
    emit('open-detail', props.tool);
  }
};
<<<<<<< HEAD
=======

// 图片加载错误处理
const handleImageError = (event) => {
  console.warn(`Failed to load image: ${event.target.src}. Falling back to default.`);
  // 避免无限循环：如果 defaultIcon 自身也加载失败，不再尝试设置
  if (event.target.src !== defaultIcon) {
    event.target.src = defaultIcon;
  }
};
>>>>>>> 90a77d083112ea7c8141bc42e51f40ae9cb776f8
</script>

<style lang="less" scoped>
.tool-card {
  margin-bottom: 20px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  /* 自定义 ItemCard 的样式变量 */
  :deep(.item-card) {
    height: 100px;

    /* 覆盖基础组件的CSS变量 */
    --icon-size: 40px;
    --icon-radius: 15%;
    --title-font-size: 1em;
    --desc-font-size: 0.85em;
    --desc-lines: 2;
    --desc-color: #606266;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;

    :deep(.item-card) {
      height: 90px;

      /* 移动端样式调整 */
      --icon-size: 34px;
      --title-font-size: 0.95em;
      --desc-font-size: 0.8em;
      --desc-lines: 2;
    }
  }
}
</style>