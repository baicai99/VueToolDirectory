// src/components/ContentArea.vue
<template>
  <el-main class="content-area-main">
    <el-tabs v-model="activeContentTab" class="content-tabs" @tab-click="handleTabClick">
      <el-tab-pane v-for="tab in contentTabs" :key="tab.tag" :label="tab.name" :name="tab.tag" />
      <el-tab-pane label="全部" name="all-tags"></el-tab-pane>
    </el-tabs>

    <div v-if="featuredTools.length > 0" class="featured-banner-container" style="margin-top: 20px;">
      <div v-for="tool in featuredTools" :key="tool.id" class="banner-recommendation" @click="openToolDetail(tool)"
        style="cursor: pointer;">
        <span class="banner-content">
          <el-icon>
            <Promotion />
          </el-icon> {{ tool.name }} - {{ tool.description }}
        </span>
        <el-button type="primary" link>查看详情 <el-icon>
            <ArrowRight />
          </el-icon></el-button>
      </div>
    </div>

    <el-divider v-if="featuredTools.length > 0" class="section-divider" />

    <el-row :gutter="20" class="tools-grid">
      <el-col v-for="tool in filteredTools" :key="tool.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <ToolCard :tool="tool" @open-detail="openToolDetail" />
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
        <ToolCard :tool="tool" @open-detail="openToolDetail" />
      </el-col>
      <el-col v-if="hotTools.length === 0" class="empty-state">
        <el-empty description="暂无热门工具" />
      </el-col>
    </el-row>

    <!-- 弹出式工具详情组件 -->
    <ToolDetail v-if="selectedTool" :tool="selectedTool" @close="closeToolDetail" />
  </el-main>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import { useRouter } from 'vue-router';
import ToolCard from '../tools/ToolCard.vue';
import ToolDetail from '../tools/ToolDetail.vue';
import { Promotion, ArrowRight, HotWater } from '@element-plus/icons-vue';

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
const activeContentTab = ref('常用'); // 初始值仍然可以是 '常用'
const selectedTool = ref(null); // 当前选中的工具，用于显示详情

// --- Helper Functions ---
const filterToolsByQuery = (tools, query) => {
  // ... (此函数不变) ...
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return tools;
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(normalizedQuery) ||
    tool.description.toLowerCase().includes(normalizedQuery) ||
    (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)))
  );
};

// --- Computed Properties ---
const toolsFilteredBySidebar = computed(() => {
  let tools = props.allToolsData.filter(tool => !tool.isFeatured);
  if (props.selectedSidebarCategory !== 'all') {
    tools = tools.filter(tool => tool.category === props.selectedSidebarCategory);
  }
  tools = filterToolsByQuery(tools, props.sidebarSearchQuery);
  return tools;
});

const filteredTools = computed(() => {
  let tools = toolsFilteredBySidebar.value;
  if (activeContentTab.value !== 'all-tags') {
    const currentTag = activeContentTab.value;
    tools = tools.filter(tool => tool.tags && tool.tags.includes(currentTag));
  }
  return tools;
});

const featuredTools = computed(() => {
  return props.allToolsData.filter(tool => tool.isFeatured === true);
});

const hotTools = computed(() => {
  return props.allToolsData.filter(tool => tool.isHot === true && !tool.isFeatured);
});

// --- Methods ---
// 打开工具详情弹窗
const openToolDetail = (tool) => {
  selectedTool.value = tool;
  document.body.style.overflow = 'hidden'; // 防止背景滚动
};

// 关闭工具详情弹窗
const closeToolDetail = () => {
  selectedTool.value = null;
  document.body.style.overflow = ''; // 恢复背景滚动
};

const handleTabClick = (tab) => {
  // console.log('Tab clicked:', tab.props.name);
};

// --- Watchers ---
watch(() => props.selectedSidebarCategory, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // 根据新选择的侧边栏分类 ID (newVal) 来设置内容区的 Tab
    if (newVal === 'all') { // 'all' 是 "所有工具" 分类的 ID
      activeContentTab.value = '常用'; // 选中 "常用" Tab
    } else { // 其他任何分类
      activeContentTab.value = 'all-tags'; // 选中 "全部" Tab
    }
  }
});

// 监听侧边栏搜索变化的 Watcher 保持不变 (或者按需调整)
watch(() => props.sidebarSearchQuery, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // 当在侧边栏搜索时，内容区Tab通常设为"全部"以显示所有匹配项
    activeContentTab.value = 'all-tags';
  }
});

</script>

<style lang="less" scoped>
/* 主内容区域基础样式 */
.content-area-main {
  padding: 20px;
  box-sizing: border-box;
  /* 修改滚动区域设置 */
  overflow-y: visible;
  /* 更改为visible，让内容溢出到父容器 */
  height: auto;
  /* 高度自适应 */
  min-height: 100%;
  /* 保证至少占满容器 */
  background-color: #f0f2f5;
  /* 设置触摸操作允许滚动 */
  touch-action: pan-x pan-y;
  /* 添加overscroll-behavior阻止滚动链 */
  overscroll-behavior: none;
  /* 确保没有内部边距限制内容 */
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

/* 移动端适配样式 */
@media (max-width: 768px) {
  .content-area-main {
    padding: 10px;
    padding-top: 30px;
    /* 为顶部移动菜单留出空间 */
    height: auto !important;
    /* 强制使用自动高度 */
    min-height: calc(100vh - 60px);
    /* 视口高度减去头部高度 */
    overflow-y: visible !important;
    /* 确保内容可以溢出 */
    overscroll-behavior: none !important;
    /* 移动端也确保阻止滚动链 */
  }

  .content-tabs {
    :deep(.el-tabs__nav-wrap) {
      padding: 0 5px;
    }

    :deep(.el-tabs__item) {
      padding: 0 10px;
    }
  }

  .banner-recommendation {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;

    .banner-content {
      margin-bottom: 10px;
      width: 100%;
    }
  }

  .tools-grid,
  .hot-tools-grid {

    /* 在移动设备上减小卡片之间的间距 */
    .el-row {
      margin-left: -5px !important;
      margin-right: -5px !important;
    }

    .el-col {
      padding-left: 5px !important;
      padding-right: 5px !important;
    }
  }
}
</style>