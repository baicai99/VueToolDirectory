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
import { defineProps, computed, ref } from 'vue';
import ToolDetail from './ToolDetail.vue';
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
const showDetail = ref(false); // 控制详情组件的显示

// 向父组件发送事件
const emit = defineEmits(['open-detail']);

// --- 计算属性：根据 tool.icon 解析正确的 URL ---
const resolvedIconUrl = computed(() => {
  const iconPathInData = props.tool?.icon; // 获取 data.js 中的路径字符串, e.g., 'src/assets/icons/chatgpt.jpg'

  if (!iconPathInData) {
    // console.log(`Tool ${props.tool?.name} has no icon path, using default.`);
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

// handleImageError 仍然可以作为最终的保险丝，
// 比如网络问题导致解析后的 URL 依然加载失败
const handleImageError = (event) => {
  console.warn(`Failed to load image (even after resolving): ${event.target.src}. Falling back to default.`);
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
      max-height: calc(1.5em * 2);
      min-height: 2.5em;
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .tool-card {
    margin-bottom: 16px;

    // 移动端禁用hover效果
    &:hover {
      transform: none;
      box-shadow: var(--el-box-shadow-light);
    }

    :deep(.el-card__body) {
      padding: 12px;
    }

    .tool-card-icon {
      width: 34px;
      height: 34px;
      margin-right: 12px;
    }

    .tool-card-content {
      .tool-card-name {
        font-size: 0.95em;
        margin-bottom: 3px;
      }

      .tool-card-desc {
        font-size: 0.8em;
        line-height: 1.4;
        max-height: calc(1.4em * 2);
      }
    }
  }
}
</style>