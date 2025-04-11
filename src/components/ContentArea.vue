<template>
  <el-main class="content-area-main">
    <el-input v-model="contentSearchTerm" placeholder="在当前分类下搜索工具..." :prefix-icon="Search" clearable
      class="search-input" />

    <div class="quick-search-container">
      <el-button v-for="link in quickLinks" :key="link.name" type="primary" plain size="small"
        @click="quickSearch(link.url)">
        {{ link.name }} 搜索
      </el-button>
    </div>

    <el-tabs v-model="activeContentTab" class="content-tabs" @tab-click="handleTabClick">
      <el-tab-pane v-for="tab in contentTabs" :key="tab.tag" :label="tab.name" :name="tab.tag" />
      <el-tab-pane label="全部" name="all-tags"></el-tab-pane>
    </el-tabs>

    <div v-if="featuredTools.length > 0" class="featured-banner-container">
      <a v-for="tool in featuredTools" :key="tool.id" :href="tool.url" target="_blank" class="banner-link">
        <div class="banner-recommendation">
          <span class="banner-content">
            <el-icon>
              <Promotion />
            </el-icon> {{ tool.name }} - {{ tool.description }}
          </span>
          <el-button type="primary" link>查看详情 <el-icon>
              <ArrowRight />
            </el-icon></el-button>
        </div>
      </a>
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
import ToolCard from './ToolCard.vue';
import { Search, Promotion, ArrowRight, HotWater } from '@element-plus/icons-vue';

// --- Props Definition ---
const props = defineProps({
  allToolsData: { // 所有工具数据
    type: Array,
    required: true,
  },
  selectedSidebarCategory: { // 侧边栏选中的分类 (来自父组件)
    type: String,
    default: 'all',
  },
  sidebarSearchQuery: { // 侧边栏的搜索词 (来自父组件)
    type: String,
    default: '',
  },
  quickLinks: { // 快速搜索链接
    type: Array,
    required: true,
  },
  contentTabs: { // 内容区标签页定义
    type: Array,
    required: true,
  }
});

// --- Internal State ---
const contentSearchTerm = ref(''); // 内容区搜索框绑定值
const activeContentTab = ref('常用'); // 当前激活的内容区标签页

// --- Helper Functions ---

/**
 * 根据查询字符串过滤工具列表 (搜索名称、描述、标签)
 * @param {Array} tools - 需要过滤的工具数组
 * @param {string} query - 搜索查询字符串
 * @returns {Array} 过滤后的工具数组
 */
const filterToolsByQuery = (tools, query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return tools; // 如果查询为空，返回原数组
  }
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(normalizedQuery) ||
    tool.description.toLowerCase().includes(normalizedQuery) ||
    (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)))
  );
};

// --- Computed Properties ---

// 1. 基于侧边栏分类和搜索过滤的工具 (不含特色推荐)
const toolsFilteredBySidebar = computed(() => {
  let tools = props.allToolsData.filter(tool => !tool.isFeatured);

  // 按侧边栏分类过滤
  if (props.selectedSidebarCategory !== 'all') {
    tools = tools.filter(tool => tool.category === props.selectedSidebarCategory);
  }

  // 按侧边栏搜索过滤
  tools = filterToolsByQuery(tools, props.sidebarSearchQuery);

  return tools;
});

// 2. 基于内容区Tab和内容区搜索过滤的最终显示工具
const filteredTools = computed(() => {
  let tools = toolsFilteredBySidebar.value; // 从侧边栏过滤结果开始

  // 按内容区Tab标签过滤
  if (activeContentTab.value !== 'all-tags') {
    const currentTag = activeContentTab.value;
    tools = tools.filter(tool => tool.tags && tool.tags.includes(currentTag));
  }

  // 按内容区搜索过滤
  tools = filterToolsByQuery(tools, contentSearchTerm.value);

  return tools;
});

// 3. 特色推荐工具 (不受侧边栏和内容区过滤影响)
const featuredTools = computed(() => {
  return props.allToolsData.filter(tool => tool.isFeatured === true);
});

// 4. 热门工具 (不受当前过滤影响, 且不应是特色推荐)
const hotTools = computed(() => {
  return props.allToolsData.filter(tool => tool.isHot === true && !tool.isFeatured);
});

// --- Methods ---

// 执行快速搜索
const quickSearch = (baseUrl) => {
  const query = contentSearchTerm.value.trim();
  if (query) {
    const encodedQuery = encodeURIComponent(query);
    window.open(`${baseUrl}${encodedQuery}`, '_blank');
  } else {
    // 如果搜索词为空，尝试打开搜索引擎主页
    try {
      const url = new URL(baseUrl);
      window.open(url.origin, '_blank');
    } catch (e) {
      // 如果 baseUrl 格式不正确，或者不含查询参数部分，直接打开原始 baseUrl
      window.open(baseUrl.split('?')[0], '_blank');
    }
  }
};

// 点击内容区Tab时的处理 (可根据需要添加逻辑)
const handleTabClick = (tab) => {
  // console.log('Tab clicked:', tab.props.name);
  // 切换Tab时可以清空内容区搜索框，如果需要的话:
  // contentSearchTerm.value = '';
};

// --- Watchers ---

// 监听侧边栏分类变化，重置内容区状态
watch(() => props.selectedSidebarCategory, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    activeContentTab.value = '常用'; // 重置Tab到'常用' (或 'all-tags')
    contentSearchTerm.value = ''; // 清空内容区搜索
  }
});

// 监听侧边栏搜索变化，重置内容区状态
watch(() => props.sidebarSearchQuery, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // 当侧边栏有搜索时，内容区通常显示所有标签下的匹配结果
    activeContentTab.value = 'all-tags';
    contentSearchTerm.value = ''; // 清空内容区搜索
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

/* 内容区搜索框 */
.search-input {
  margin-bottom: 20px;
}

/* 快速搜索按钮容器 */
.quick-search-container {
  margin-bottom: 20px;

  .el-button {
    margin-right: 10px;
    margin-bottom: 10px; /* 处理换行时的底部间距 */
  }
}

/* 内容区标签页 */
.content-tabs {
  margin-bottom: 15px; /* tab 和下方内容的间距 */
  background-color: #fff; /* 给 tabs 一个白色背景 */
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
  margin-bottom: 20px; /* 每个横幅之间的间距 */
  border: 1px solid #ebeef5;
  padding: 15px;
  border-radius: 4px;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .banner-content {
    /* 左侧内容 */
    font-size: 1.1em;
    font-weight: 500;
    display: flex;
    align-items: center;
    color: #303133; /* 确保文字颜色 */

    .el-icon {
      margin-right: 8px;
    }
  }

  /* 右侧按钮（el-button type="primary" link）由 Element Plus 控制样式 */
}

/* 包裹横幅的链接 */
.banner-link {
  text-decoration: none;
  color: inherit; /* 继承父元素颜色，覆盖默认链接颜色 */
  display: block; /* 使整个区域可点击，并让 margin-bottom 生效 */
}


/* 分割线通用样式 */
.section-divider {
  margin-top: 30px;
  margin-bottom: 25px;

  /* 针对带文字的分割线标题样式 */
  :deep(.el-divider__text) {
    display: flex;
    align-items: center;
    gap: 5px; /* 图标和文字间距 */
    font-size: 1.1em;
    color: #303133;
    font-weight: 500;
  }
}

/* 工具卡片网格 和 热门工具卡片网格 (合并了相同的 margin-top) */
.tools-grid,
.hot-tools-grid {
  margin-top: 20px; /* 网格与上方元素的间距 */
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  color: #909399;
  width: 100%;
  padding: 40px 0;
}
</style>