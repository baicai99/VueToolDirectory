<template>
  <el-card shadow="hover" class="tool-card" @click="showToolDetail">
    <img :src="resolvedIconUrl" :alt="tool.name" class="tool-card-icon" @error="handleImageError" />
    <div class="tool-card-content">
      <div class="tool-card-name">{{ tool.name }}</div>
      <div class="tool-card-desc">{{ tool.description }}</div>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { defaultToolIcon } from '../../data/allCategories.js';

const props = defineProps({
  tool: {
    type: Object,
    required: true,
  },
});

const defaultIcon = defaultToolIcon; // 使用从 allCategories.js 导入的默认图标常量

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

// 图片加载错误处理
const handleImageError = (event) => {
  console.warn(`Failed to load image: ${event.target.src}. Falling back to default.`);
  // 避免无限循环：如果 defaultIcon 自身也加载失败，不再尝试设置
  if (event.target.src !== defaultIcon) {
    event.target.src = defaultIcon;
  }
};
</script>

<style lang="less" scoped>
/* 样式部分保持不变 */
.tool-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  /* 添加固定高度 */
  height: 100px;

  // 只在桌面端应用hover效果
  @media (min-width: 769px) {
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  :deep(.el-card__body) {
    padding: 15px;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    /* 确保el-card__body有固定高度 */
    height: 100%;
    min-height: 100px;
  }

  .tool-card-icon {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    object-fit: contain;
    flex-shrink: 0;
    border-radius: 15%;
  }

  .tool-card-content {
    flex-grow: 1;
    overflow: hidden;
    /* 确保内容区域高度固定 */
    height: 70px;
    display: flex;
    flex-direction: column;

    .tool-card-name {
      font-weight: bold;
      font-size: 1em;
      margin-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tool-card-desc {
      font-size: 0.85em;
      color: #606266;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5;
      /* 设置固定高度而不是最大/最小高度 */
      height: 3em;
      flex-grow: 1;
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .tool-card {
    margin-bottom: 16px;
    /* 为移动端也设置固定高度 */
    height: 90px;

    // 移动端禁用hover效果
    &:hover {
      transform: none;
      box-shadow: var(--el-box-shadow-light);
    }

    :deep(.el-card__body) {
      padding: 12px;
      /* 确保移动端卡片body也有固定高度 */
      height: 100%;
      min-height: 90px;
    }

    .tool-card-icon {
      width: 34px;
      height: 34px;
      margin-right: 12px;
    }

    .tool-card-content {
      /* 确保移动端内容区域也有固定高度 */
      height: 66px;
      display: flex;
      flex-direction: column;

      .tool-card-name {
        font-size: 0.95em;
        margin-bottom: 3px;
      }

      .tool-card-desc {
        font-size: 0.8em;
        line-height: 1.4;
        /* 设置固定高度 */
        height: 2.8em;
        flex-grow: 1;
      }
    }
  }
}
</style>