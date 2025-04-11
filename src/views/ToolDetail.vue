// src/views/ToolDetail.vue
<template>
  <el-main class="tool-detail-main">
    <div v-if="tool">
      <el-page-header @back="goBack" title="返回" :content="tool.name || '工具详情'">
      </el-page-header>
      <el-divider />

      <el-row class="detail-content">
        <el-col :xs="24" :sm="8" :md="6">
          <img :src="resolvedIconUrl" :alt="tool.name" class="detail-icon" @error="handleImageError" />
        </el-col>

        <el-col :xs="24" :sm="16" :md="18">
          <h1 class="detail-name">{{ tool.name }}</h1>

          <div class="detail-tags" v-if="tool.tags && tool.tags.length > 0">
            <el-tag
              v-for="tag in tool.tags"
              :key="tag"
              type="info"
              size="small"
              style="margin-right: 5px; margin-bottom: 5px;"
            >
              {{ tag }}
            </el-tag>
          </div>

          <div class="detail-link" v-if="tool.url">
            <el-link type="primary" :href="tool.url" target="_blank">
              访问官网 <el-icon><Link /></el-icon>
            </el-link>
          </div>
        </el-col>
      </el-row>

      <el-card shadow="never" class="detail-description">
         <template #header>
           <div class="card-header">
             <span>工具描述</span>
           </div>
         </template>
         <p style="white-space: pre-wrap; line-height: 1.8;">{{ tool.longDescription || tool.description || '暂无详细描述。' }}</p>
         </el-card>

    </div>
    <el-empty v-else description="未找到该工具的信息" />
  </el-main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { allTools } from '../data/tools.js'; // 导入工具数据源
import defaultIconPath from '../assets/icons/tool-icon-placeholder.png';

// 使用 import.meta.glob 动态导入 src/assets/icons 下的所有图片资源
// eager: true 表示同步加载，返回模块对象
// 支持多种常见图片格式
const imageModules = import.meta.glob('/src/assets/icons/*.{png,jpg,jpeg,gif,svg,ico}', { eager: true });

// 定义 props，接收从路由传递过来的 id
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter(); // 获取 router 实例
const tool = ref(null); // 用于存储找到的工具数据，初始为 null
const defaultIcon = defaultIconPath; // 设置默认图标路径

// 组件挂载后执行：根据 id 查找工具数据
onMounted(() => {
  tool.value = allTools.find(t => t.id === props.id);
});

// 计算属性：动态解析最终要显示的图标 URL
const resolvedIconUrl = computed(() => {
  const currentTool = tool.value; // 获取当前工具数据
  if (!currentTool) {
    return defaultIcon; // 如果工具数据还没加载好，返回默认图标
  }

  const iconPathInData = currentTool.icon; // 获取 data.js 中记录的路径字符串

  if (!iconPathInData) {
    return defaultIcon; // 如果数据中没有 icon 路径，返回默认图标
  }

  // 构建 import.meta.glob 需要的 key (格式需要完全匹配，包括开头的 '/')
  const moduleKey = '/' + iconPathInData;
  const module = imageModules[moduleKey]; // 在 glob 结果中查找

  if (module && module.default) {
    // 如果找到了模块，返回 Vite 处理后的 URL (通常在 .default 属性)
    return module.default;
  } else {
    // 如果没找到匹配的模块 (可能文件丢失或路径/格式不符)
    console.warn(`Icon module not found for key: ${moduleKey}. Using default icon for tool ${currentTool.name}.`);
    return defaultIcon; // 返回默认图标作为最终的回退
  }
});

// 图片加载失败时的处理函数
const handleImageError = (event) => {
  // 避免因默认图标也加载失败导致无限循环
  if (event.target.src !== defaultIcon) {
      console.warn(`Failed to load image: ${event.target.src}. Falling back to default.`);
      event.target.src = defaultIcon;
  }
};

// 返回上一页的函数
const goBack = () => {
  router.go(-1);
};
</script>

<style lang="less" scoped>
// 样式部分与之前保持一致，以实现所需布局
.tool-detail-main {
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #f8f9fa;

  .el-page-header {
    margin-bottom: 20px;
  }

  .detail-content {
    margin-bottom: 30px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.05);
  }

  .detail-icon {
    width: 100%;
    max-width: 200px;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    display: block;
    margin: 0 auto 15px auto;
     @media (min-width: 640px) {
        margin: 0; // 在较大屏幕上靠左
     }
  }

  .detail-name {
    font-size: 1.8em;
    margin-top: 0;
    margin-bottom: 15px;
  }

  .detail-tags {
    margin-bottom: 15px;
  }

  .detail-link {
    margin-bottom: 15px;
    .el-icon {
        margin-left: 4px;
        vertical-align: middle;
    }
  }

  .detail-description {
    .card-header {
      font-weight: bold;
    }
    p {
      margin: 0;
      color: #606266;
      // white-space: pre-wrap; // 已内联设置
      // line-height: 1.8;  // 已内联设置
    }
  }
}
</style>