<template>
    <el-card shadow="hover" class="tool-card" @click="goToUrl">
      <img :src="tool.icon || defaultIcon" alt="Tool Icon" class="tool-card-icon" @error="handleImageError"/>
      <div class="tool-card-content">
        <div class="tool-card-name">{{ tool.name }}</div>
        <div class="tool-card-desc">{{ tool.description }}</div>
      </div>
    </el-card>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import defaultIconPath from '../assets/icons/tool-icon-placeholder.png'; // 引入默认图标
  
  const props = defineProps({
    tool: {
      type: Object,
      required: true,
    },
  });
  
  const defaultIcon = defaultIconPath;
  
  const goToUrl = () => {
    if (props.tool.url) {
      window.open(props.tool.url, '_blank'); // 在新标签页打开链接
    }
  };
  
  // 处理图片加载失败，显示默认图标
  const handleImageError = (event) => {
    event.target.src = defaultIcon;
  };
  </script>
  
  <style lang="less" scoped>
.tool-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover { // 悬停效果
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  // 穿透 Element Plus 内部样式
  :deep(.el-card__body) {
    padding: 15px;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  // 图标样式 (嵌套在 .tool-card 下)
  .tool-card-icon {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    object-fit: contain;
    flex-shrink: 0;
    border-radius: 15%; // 圆角样式移到这里更合适
  }

  // 文字内容容器样式 (嵌套在 .tool-card 下)
  .tool-card-content {
    flex-grow: 1;
    overflow: hidden;

    // 名称样式 (嵌套在 .tool-card-content 下)
    .tool-card-name {
      font-weight: bold;
      font-size: 1em;
      margin-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    // 描述样式 (嵌套在 .tool-card-content 下)
    .tool-card-desc {
      font-size: 0.85em;
      color: #606266;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5;
      max-height: calc(1.5em * 2);
      min-height: 2.5em;
    }
  }
}
</style>