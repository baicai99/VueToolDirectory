// src/components/ContentArea.vue
<template>
  <el-main class="content-area-main">
    <el-tabs v-model="activeContentTab" class="content-tabs" @tab-click="handleTabClick">
      <el-tab-pane v-for="tab in contentTabs" :key="tab.tag" :label="tab.name" :name="tab.tag" />
      <el-tab-pane label="全部" name="all-tags"></el-tab-pane>
    </el-tabs>

    <div v-if="featuredTools.length > 0" class="featured-banner-container" style="margin-top: 20px;">
       <div
          v-for="tool in featuredTools"
          :key="tool.id"
          class="banner-recommendation"
          @click="goToDetail(tool.id)"
          style="cursor: pointer;"
       >
           <span class="banner-content">
             <el-icon><Promotion /></el-icon> {{ tool.name }} - {{ tool.description }}
           </span>
           <el-button type="primary" link>查看详情 <el-icon><ArrowRight /></el-icon></el-button>
       </div>
    </div>

    <el-divider v-if="featuredTools.length > 0" class="section-divider" />

    <el-row :gutter="20" class="tools-grid">
      <el-col v-for="tool in filteredTools" :key="tool.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <ToolCard :tool="tool" />
      </el-col>
      <el-col v-if="filteredTools.length === 0" class="empty-state">
        <el-empty description="没有找到匹配的工具" />
      </el-col>
    </el-row>

    <el-divider content-position="left" class="section-divider hot-tools-divider"><el-icon>
        <HotWater />
      </el-icon> 热门工具</el-divider>
    <el-row :gutter="20" class="hot-tools-grid">
      <el-col v-for="tool in hotTools" :key="'hot-' + tool.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <ToolCard :tool="tool" />
      </el-col>
      <el-col v-if="hotTools.length === 0" class="empty-state">
        <el-empty description="暂无热门工具" />
      </el-col>
    </el-row>

  </el-main>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import { useRouter } from 'vue-router';
import ToolCard from './ToolCard.vue';
// 移除了未使用的 Search 图标导入，保留了其他需要的图标
import { Promotion, ArrowRight, HotWater, Link } from '@element-plus/icons-vue';

// --- Props Definition ---
const props = defineProps({
  allToolsData: { type: Array, required: true },
  selectedSidebarCategory: { type: String, default: 'all' },
  sidebarSearchQuery: { type: String, default: '' },
  // 移除了不再使用的 quickLinks prop
  // quickLinks: { type: Array, required: true },
  contentTabs: { type: Array, required: true }
});

// --- Router Instance ---
const router = useRouter();

// --- Internal State ---
// 移除了不再使用的 contentSearchTerm ref
// const contentSearchTerm = ref('');
const activeContentTab = ref('常用'); // 保留 Tab 状态

// --- Helper Functions ---
// filterToolsByQuery 仍然被侧边栏搜索使用，所以保留
const filterToolsByQuery = (tools, query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return tools;
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(normalizedQuery) ||
    tool.description.toLowerCase().includes(normalizedQuery) ||
    (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)))
  );
};

// --- Computed Properties ---
// toolsFilteredBySidebar 仍然需要根据侧边栏分类和侧边栏搜索过滤
const toolsFilteredBySidebar = computed(() => {
  let tools = props.allToolsData.filter(tool => !tool.isFeatured);
  if (props.selectedSidebarCategory !== 'all') {
    tools = tools.filter(tool => tool.category === props.selectedSidebarCategory);
  }
  // 仍然使用 filterToolsByQuery 来处理侧边栏搜索
  tools = filterToolsByQuery(tools, props.sidebarSearchQuery);
  return tools;
});

// filteredTools 现在只根据侧边栏结果和内容区 Tab 过滤
const filteredTools = computed(() => {
  let tools = toolsFilteredBySidebar.value;
  if (activeContentTab.value !== 'all-tags') {
    const currentTag = activeContentTab.value;
    tools = tools.filter(tool => tool.tags && tool.tags.includes(currentTag));
  }
  // 移除了根据 contentSearchTerm 的过滤步骤
  // tools = filterToolsByQuery(tools, contentSearchTerm.value);
  return tools;
});

// featuredTools 和 hotTools 计算属性保持不变
const featuredTools = computed(() => {
  return props.allToolsData.filter(tool => tool.isFeatured === true);
});

const hotTools = computed(() => {
  return props.allToolsData.filter(tool => tool.isHot === true && !tool.isFeatured);
});

// --- Methods ---

// goToDetail 方法保留，用于横幅推荐点击
const goToDetail = (toolId) => {
  if (toolId) {
    router.push({ name: 'ToolDetail', params: { id: toolId } });
  } else {
    console.error('Featured tool ID is missing, cannot navigate.');
  }
};

// 移除了不再使用的 quickSearch 方法
// const quickSearch = (baseUrl) => { ... };

// handleTabClick 方法目前为空，如果不需要可以移除，暂时保留
const handleTabClick = (tab) => {
  // console.log('Tab clicked:', tab.props.name);
};

// --- Watchers ---
// Watchers 仍然有用，用于在侧边栏变化时重置内容区 Tab
watch(() => props.selectedSidebarCategory, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    activeContentTab.value = '常用';
    // contentSearchTerm.value = ''; // 因为 contentSearchTerm 已移除，这行也不需要了
  }
});

watch(() => props.sidebarSearchQuery, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    activeContentTab.value = 'all-tags';
    // contentSearchTerm.value = ''; // 因为 contentSearchTerm 已移除，这行也不需要了
  }
});

</script>

<style lang="less" scoped>
/* 主内容区域基础样式 */
.content-area-main {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; /* 内容区独立滚动 */
  height: 100vh; /* 确保内容区高度占满视口 */
  background-color: #f0f2f5; /* 内容区背景色 */
}

/* 移除了 .search-input 和 .quick-search-container 的样式 */

/* 内容区标签页 */
.content-tabs {
  margin-bottom: 15px;
  background-color: #fff;
  padding: 0 15px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

/* 特色推荐横幅容器 */
.featured-banner-container {
  margin-top: 20px;
}

/* 单个特色推荐横幅 */
.banner-recommendation {
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  padding: 15px;
  border-radius: 4px;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: box-shadow 0.2s ease-in-out;
  // cursor: pointer; // 已通过内联 style 添加

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .banner-content {
    font-size: 1.1em;
    font-weight: 500;
    display: flex;
    align-items: center;
    color: #303133;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .el-icon {
      margin-right: 8px;
      flex-shrink: 0;
    }
  }

  .el-button {
     flex-shrink: 0;
  }
}

/* 分割线通用样式 */
.section-divider {
  margin-top: 30px;
  margin-bottom: 25px;

  :deep(.el-divider__text) {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.1em;
    color: #303133;
    font-weight: 500;
  }
}

/* 工具卡片网格 和 热门工具卡片网格 */
.tools-grid,
.hot-tools-grid {
  margin-top: 20px;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  color: #909399;
  width: 100%;
  padding: 40px 0;
}
</style>