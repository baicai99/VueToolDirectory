<template>
  <ItemCard :item="{
    name: tool.name,
    icon: resolvedIconUrl,
    description: tool.description
  }" :defaultIcon="defaultIcon" @click="showToolDetail" class="tool-card" />
</template>

<script setup>
import { defineProps, computed } from 'vue';
import ItemCard from '../base/ItemCard.vue';
import defaultIconPath from '../../assets/icons/tool-icon-placeholder.png';

// --- 使用 import.meta.glob 获取所有可能的图标 ---
// 注意路径：'/src/assets/icons/...' - 这个路径模式需要匹配 tools.js 中的格式
// { eager: true } 表示立即加载所有模块信息，而不是返回一个异步函数
// 包含常用图片格式
const imageModules = import.meta.glob('/src/assets/icons/*.{png,jpg,jpeg,gif,svg,ico}', { eager: true });

const props = defineProps({
  tool: {
    type: Object,
    required: true,
  },
});

const defaultIcon = defaultIconPath; // 默认图标路径

// 向父组件发送事件
const emit = defineEmits(['open-detail']);

// --- 计算属性：根据 tool.icon 解析正确的 URL ---
const resolvedIconUrl = computed(() => {
  const iconPathInData = props.tool?.icon; // 获取 data.js 中的路径字符串, e.g., 'src/assets/icons/chatgpt.jpg'

  if (!iconPathInData) {
    return defaultIcon; // 如果 tool.icon 为空，使用默认图标
  }

  // 构建 import.meta.glob 使用的 key (需要加上开头的 '/')
  const moduleKey = '/' + iconPathInData;

  const module = imageModules[moduleKey];

  if (module && module.default) {
    // 如果在 glob 结果中找到了匹配的模块，返回它处理后的 URL (通常在 .default 中)
    return module.default;
  } else {
    // 如果在 glob 结果中没找到 (可能文件不存在或路径/格式不匹配)
    console.warn(`Icon module not found for key: ${moduleKey}. Using default icon for tool ${props.tool?.name}.`);
    return defaultIcon; // 使用默认图标作为回退
  }
});

// 修改为显示工具详情的函数
const showToolDetail = () => {
  if (props.tool) {
    emit('open-detail', props.tool);
  }
};
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