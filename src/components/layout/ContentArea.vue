// src/components/ContentArea.vue
<template>

    <!-- 内容分类标签 -->
    <el-tabs v-model="activeContentTab" class="content-tabs" @tab-click="handleTabClick">
      <el-tab-pane v-for="tab in contentTabs" :key="tab.tag" :label="tab.name" :name="tab.tag" />
      <el-tab-pane label="全部" name="all-tags"></el-tab-pane>
    </el-tabs>

    <!-- 特色工具组件 -->
    <FeaturedTools :featured-tools="featuredTools" @open-detail="openToolDetail" v-if="featuredTools.length > 0" />

    <el-divider v-if="featuredTools.length > 0" class="section-divider" />

    <!-- 过滤后的工具列表 -->
    <ToolsGrid :tools="filteredTools" @open-detail="openToolDetail" />

    <!-- 热门工具组件 -->
    <HotTools :hot-tools="hotTools" @open-detail="openToolDetail" />

    <!-- 工具详情弹窗 -->
    <ToolDetail v-if="selectedTool" :tool="selectedTool" @close="closeToolDetail" />

</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import { useRouter } from 'vue-router';
import ToolDetail from '../tools/ToolDetail.vue';
import FeaturedTools from '../tools/FeaturedTools.vue';
import HotTools from '../tools/HotTools.vue';
import ToolsGrid from '../tools/ToolsGrid.vue';

// --- Props Definition ---
const props = defineProps({
  allToolsData: { type: Array, required: true },
  selectedSidebarCategory: { type: String, default: 'all' },
  sidebarSearchQuery: { type: String, default: '' },
  contentTabs: { type: Array, required: true }
});

// --- Router Instance ---
const router = useRouter();

// --- Internal State ---
const activeContentTab = ref('常用'); // 默认选中"常用"标签
const selectedTool = ref(null); // 当前选中的工具，用于显示详情

// --- Helper Functions ---
/**
 * 按搜索关键词过滤工具列表
 * @param {Array} tools - 待过滤的工具列表
 * @param {string} query - 搜索关键词
 * @returns {Array} 过滤后的工具列表
 */
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
/**
 * 按侧边栏分类和搜索关键词过滤的工具列表
 */
const toolsFilteredBySidebar = computed(() => {
  // 首先排除特色工具
  let tools = props.allToolsData.filter(tool => !tool.isFeatured);

  // 按分类过滤
  if (props.selectedSidebarCategory !== 'all') {
    tools = tools.filter(tool => tool.category === props.selectedSidebarCategory);
  }

  // 按搜索关键词过滤
  tools = filterToolsByQuery(tools, props.sidebarSearchQuery);

  return tools;
});

/**
 * 按内容标签进一步过滤的工具列表
 */
const filteredTools = computed(() => {
  let tools = toolsFilteredBySidebar.value;

  // 按内容标签过滤
  if (activeContentTab.value !== 'all-tags') {
    const currentTag = activeContentTab.value;
    tools = tools.filter(tool => tool.tags && tool.tags.includes(currentTag));
  }

  return tools;
});

/**
 * 特色工具列表
 */
const featuredTools = computed(() => {
  return props.allToolsData.filter(tool => tool.isFeatured === true);
});

/**
 * 热门工具列表
 */
const hotTools = computed(() => {
  return props.allToolsData.filter(tool => tool.isHot === true && !tool.isFeatured);
});

// --- Methods ---
/**
 * 打开工具详情弹窗
 * @param {Object} tool - 选中的工具对象
 */
const openToolDetail = (tool) => {
  selectedTool.value = tool;
  document.body.style.overflow = 'hidden'; // 防止背景滚动
};

/**
 * 关闭工具详情弹窗
 */
const closeToolDetail = () => {
  selectedTool.value = null;
  document.body.style.overflow = ''; // 恢复背景滚动
};

/**
 * 处理标签页点击事件
 */
const handleTabClick = (tab) => {
  // 这里可以添加额外的逻辑，如记录用户行为等
};

// --- Watchers ---
// 监听侧边栏分类变化
watch(() => props.selectedSidebarCategory, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // 根据新选择的侧边栏分类设置内容区的标签页
    if (newVal === 'all') {
      activeContentTab.value = '常用'; // 选中"常用"标签
    } else {
      activeContentTab.value = 'all-tags'; // 选中"全部"标签
    }
  }
});

// 监听侧边栏搜索关键词变化
watch(() => props.sidebarSearchQuery, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // 当在侧边栏搜索时，内容区标签页通常设为"全部"以显示所有匹配项
    activeContentTab.value = 'all-tags';
  }
});
</script>

<style lang="less" scoped>
/* 主内容区域基础样式 */
.content-area-main {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: visible;
  height: auto;
  min-height: 100%;
  background-color: #f0f2f5;
  touch-action: pan-x pan-y;
  overscroll-behavior: none;
}

/* 内容区标签页 */
.content-tabs {
  margin-bottom: 15px;
  background-color: #fff;
  padding: 0 15px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

/* 分割线通用样式 */
.section-divider {
  margin-top: 30px;
  margin-bottom: 25px;
}

/* 移动端适配样式 */
@media (max-width: 768px) {
  .content-area-main {
    padding: 10px;
    padding-top: 30px;
    height: auto !important;
    min-height: calc(100vh - 60px);
    overflow-y: visible !important;
    overscroll-behavior: none !important;
  }

  .content-tabs {
    :deep(.el-tabs__nav-wrap) {
      padding: 0 5px;
    }

    :deep(.el-tabs__item) {
      padding: 0 10px;
    }
  }
}
</style>