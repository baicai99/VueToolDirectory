<template>
  <div class="content-area">
    <el-tabs v-model="activeContentTab" class="content-tabs" @tab-click="handleTabClick">
      <el-tab-pane v-for="tab in contentTabs" :key="tab.tag" :label="tab.name" :name="tab.tag" />
      <el-tab-pane label="全部" name="all-tags"></el-tab-pane>
    </el-tabs>

    <section v-if="featuredTools.length > 0" class="featured-section">
      <div v-for="tool in featuredTools" :key="tool.id" class="featured-banner" @click="openToolDetail(tool)"
        role="button" tabindex="0" @keydown.enter="openToolDetail(tool)" @keydown.space.prevent="openToolDetail(tool)">
        <span class="banner-content">
          <el-icon :size="18">
            <Promotion />
          </el-icon>
          <span>{{ tool.name }} - {{ tool.description }}</span>
        </span>
        <el-button type="primary" link class="banner-action">
          查看详情 <el-icon>
            <ArrowRight />
          </el-icon>
        </el-button>
      </div>
    </section>

    <el-divider v-if="featuredTools.length > 0" class="section-divider" />

    <section class="tools-section">
      <el-row :gutter="20" class="tools-grid">
        <el-col v-for="tool in filteredTools" :key="tool.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <ToolCard :tool="tool" @open-detail="openToolDetail" />
        </el-col>
        <el-col v-if="filteredTools.length === 0" :span="24" class="empty-state">
          <el-empty description="没有找到匹配的工具" />
        </el-col>
      </el-row>
    </section>

    <section class="hot-tools-section">
      <el-divider content-position="left" class="section-divider">
        <el-icon>
          <HotWater />
        </el-icon> 热门工具
      </el-divider>
      <el-row :gutter="20" class="tools-grid">
        <el-col v-for="tool in hotTools" :key="'hot-' + tool.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <ToolCard :tool="tool" @open-detail="openToolDetail" />
        </el-col>
        <el-col v-if="hotTools.length === 0" :span="24" class="empty-state">
          <el-empty description="暂无热门工具" />
        </el-col>
      </el-row>
    </section>

    <ToolDetail v-if="selectedTool" :tool="selectedTool" :allTools="props.allToolsData" @close="closeToolDetail"
      @viewRelated="viewRelatedTool" />
  </div>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useScrollLock } from '@vueuse/core'; // 引入 useScrollLock
import ToolCard from '../tools/ToolCard.vue';
import ToolDetail from '../tools/ToolDetail.vue';
import { Promotion, ArrowRight, HotWater } from '@element-plus/icons-vue';

// --- Props ---
const props = defineProps({
  allToolsData: { type: Array, required: true },
  selectedSidebarCategory: { type: String, default: 'all' },
  sidebarSearchQuery: { type: String, default: '' },
  contentTabs: { type: Array, required: true }
});

// --- Router ---
const router = useRouter();

// --- State ---
const activeContentTab = ref(props.contentTabs.length > 0 ? props.contentTabs[0].tag : 'all-tags'); // 默认选中第一个Tab或'all-tags'
const selectedTool = ref(null);

// --- Scroll Lock ---
// 锁定目标设为 document.documentElement 更可靠
const scrollLockTarget = ref(document.documentElement);
const isLocked = useScrollLock(scrollLockTarget);

// --- Computed Properties ---
// (过滤逻辑保持不变)
const filterToolsByQuery = (tools, query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return tools;
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(normalizedQuery) ||
    tool.description.toLowerCase().includes(normalizedQuery) ||
    (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)))
  );
};

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
  // 修正：确保热门工具也不包含特色工具
  return props.allToolsData.filter(tool => tool.isHot === true && !tool.isFeatured);
});

// --- Methods ---
const openToolDetail = (tool) => {
  selectedTool.value = tool;
  isLocked.value = true; // 使用 useScrollLock 锁定滚动
};

const closeToolDetail = () => {
  selectedTool.value = null;
  isLocked.value = false; // 使用 useScrollLock 解锁滚动
};

const handleTabClick = (tab) => {
  // 可以添加逻辑，例如滚动到页面顶部
  // window.scrollTo(0, 0); // 如果需要的话
};

const viewRelatedTool = (tool) => {
  selectedTool.value = tool;
  isLocked.value = true; // 使用 useScrollLock 锁定滚动
};

// --- Watchers ---
// (Watchers 逻辑保持不变)
watch(() => props.selectedSidebarCategory, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (newVal === 'all') {
      activeContentTab.value = props.contentTabs.length > 0 ? props.contentTabs[0].tag : 'all-tags'; // 重置为默认Tab
    } else {
      activeContentTab.value = 'all-tags';
    }
  }
});

watch(() => props.sidebarSearchQuery, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal.trim() !== '') { // 只有当搜索词非空时才切换
    activeContentTab.value = 'all-tags';
  }
});

</script>

<style lang="less" scoped>
/* 移除 calc() 并修正移动端滚动问题 */
.content-area {
  background-color: #ffffff;
  color: #303133;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
}

.content-tabs {
  background-color: #fff;
  padding: 0 15px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px; // 调整间距
  /* 移除固定位置相关样式 */
  /* position: sticky; */
  /* top: 0; */
  z-index: 10;
  /* 保留这个以确保在内容之上 */
  // backdrop-filter: saturate(180%) blur(5px); /* 可选：毛玻璃效果 */
  // background-color: rgba(255, 255, 255, 0.85); /* 半透明背景配合毛玻璃 */

  :deep(.el-tabs__header) {
    margin-bottom: 0; // 移除 element 默认的下边距
  }
}

.featured-section {
  margin-top: 20px; // 从内联样式移到这里
}

.featured-banner {
  margin-bottom: 15px; // 调整间距
  border: 1px solid #ebeef5;
  padding: 15px 20px; // 调整内边距
  border-radius: 6px; // 调整圆角
  background-color: #fff; // 改为白色背景，更突出
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease;
  cursor: pointer; // 移到这里

  &:hover,
  &:focus-within {
    // :focus-within 用于键盘导航
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  .banner-content {
    font-size: 1em; // 调整字号
    font-weight: 500;
    display: flex;
    align-items: center;
    color: #303133;
    overflow: hidden; // 防止内容溢出
    gap: 8px; // 使用 gap 控制图标和文本间距

    .el-icon {
      flex-shrink: 0; // 防止图标被压缩
    }

    span {
      // 限制文本宽度
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .banner-action {
    // el-button class
    flex-shrink: 0; // 防止按钮被压缩
  }
}

.section-divider {
  margin-top: 25px; // 调整间距
  margin-bottom: 20px; // 调整间距

  :deep(.el-divider__text) {
    display: inline-flex; // 改为 inline-flex
    align-items: center;
    gap: 6px; // 调整间距
    font-size: 1.1em;
    color: #303133;
    font-weight: 500;
    padding: 0 10px; // 调整内边距
    background-color: #f0f2f5; // 与页面背景色一致，避免线条穿过文字
  }
}

.empty-state {
  text-align: center;
  color: #909399;
  width: 100%;
  padding: 40px 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  /* .content-area {
      // 移除之前错误的移动端样式覆盖
      // height: auto !important;
      // min-height: calc(100vh - 60px); // 移除 calc()
      // overflow-y: visible !重要;
      // overscroll-behavior: none !important;
  } */

  .content-tabs {
    position: relative; // 这里已经是相对定位，不需要修改
    top: auto; // 保持这个设置

    :deep(.el-tabs__nav-wrap) {
      padding: 0 5px; // 保持
    }

    :deep(.el-tabs__item) {
      padding: 0 10px; // 保持
    }
  }

  .featured-banner {
    padding: 12px 15px; // 调整内边距
    flex-direction: column;
    align-items: flex-start; // 内容左对齐
    gap: 10px; // 设置列方向的间距

    .banner-content {
      width: 100%; // 允许内容占满宽度
    }

    .banner-action {
      margin-left: auto; // 将按钮推到右侧
    }
  }
}
</style>