<template>
  <div class="sidebar-content-wrapper sidebar-nav-component">
    <div class="sidebar-title">
      {{ sidebarTitle }}
    </div>

    <div class="sidebar-search-wrapper">
      <el-input
        v-model="sidebarSearchTerm"
        placeholder="搜索工具..."
        :prefix-icon="Search"
        clearable
        @input="debouncedHandleSidebarSearch"
      />
    </div>

    <!-- 上部分：工具分类 -->
    <div class="sidebar-main-section">
      <el-menu
        :default-active="activeItem"
        class="el-menu-vertical-demo main-menu"
        @select="handleSelectItem"
      >
        <el-menu-item v-for="cat in categories" :key="cat.id" :index="cat.id">
          <el-icon>
            <component :is="cat.icon" />
          </el-icon>
          <span>{{ cat.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 下部分：固定在底部的链接 -->
    <div class="sidebar-bottom-section">
      <el-menu
        :default-active="activeItem"
        class="el-menu-vertical-demo bottom-menu"
        @select="handleSelectItem"
      >
        <el-menu-item
          v-for="link in bottomLinks"
          :key="link.id"
          :index="link.id"
          @click="handleBottomLinkClick(link)"
        >
          <el-icon>
            <component :is="link.icon" />
          </el-icon>
          <span>{{ link.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps, defineEmits } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { debounce } from 'lodash-es';

// --- Props ---
const props = defineProps({
  // 主分类数据
  categories: { type: Array, required: true },
  // 底部链接数据
  bottomLinks: { type: Array, required: true },
  // 当前选中的主分类 ID (由父组件控制)
  initialCategory: { type: String, default: null },
  // 侧边栏是否折叠 (由父组件控制，此组件仅接收状态)
  isCollapsed: { type: Boolean, default: false },
});

// --- Emits ---
const emit = defineEmits([
  'categorySelected',    // App.vue 中使用的事件名
  'sidebarSearch',       // 当搜索框内容变化时触发 (防抖后)
  'bottomLinkClicked',   // App.vue 中使用的事件名
  'sidebarCollapse',     // 侧边栏折叠状态变化事件
]);

// --- State ---
// 从环境变量获取侧边栏标题，或使用默认值
const sidebarTitle = import.meta.env.VITE_APP_NAME || '收藏夹';
// 搜索框的绑定值
const sidebarSearchTerm = ref('');
// 当前激活的菜单项 ID (本地状态)
const activeItem = ref(props.initialCategory || '');

// --- Lifecycle Hooks ---
onMounted(() => {
  // 组件挂载时，尝试从 sessionStorage 恢复上次的搜索词
  const savedSearchTerm = sessionStorage.getItem('sidebarSearchTerm');
  if (savedSearchTerm) {
    sidebarSearchTerm.value = savedSearchTerm;
  }
});

// --- Methods ---
/**
 * 处理主分类菜单项选择
 * @param {string} categoryId - 被选中的分类 ID
 */
const handleSelectItem = (categoryId) => {
  // 只处理分类项的点击，底部链接由 handleBottomLinkClick 处理
  if (props.bottomLinks.some(link => link.id === categoryId)) {
    return;
  }
  
  // 更新本地的菜单项激活状态
  activeItem.value = categoryId;
  
  // 触发 App.vue 中监听的事件
  emit('categorySelected', categoryId);
};

/**
 * 处理底部链接点击
 * @param {object} link - 被点击的链接对象
 */
const handleBottomLinkClick = (link) => {
  // 更新本地的激活状态
  activeItem.value = link.id;
  
  // 触发 App.vue 中监听的事件
  emit('bottomLinkClicked', link);
};

/**
 * 处理搜索框输入的核心逻辑
 * - 将当前搜索词存入 sessionStorage
 * - 触发 'sidebarSearch' 事件，将搜索词传递给父组件
 */
const handleSidebarSearch = () => {
  sessionStorage.setItem('sidebarSearchTerm', sidebarSearchTerm.value);
  emit('sidebarSearch', sidebarSearchTerm.value);
};

// 创建防抖版的搜索处理函数，延迟 300ms 执行 handleSidebarSearch
const debouncedHandleSidebarSearch = debounce(handleSidebarSearch, 300);

</script>

<style lang="less" scoped>
.sidebar-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #FFF;
  overflow: hidden;
}

.sidebar-title {
  padding: 15px;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  flex-shrink: 0; /* 防止标题被压缩 */
}

.sidebar-search-wrapper {
  padding: 0 15px 15px;
  flex-shrink: 0; /* 防止搜索框被压缩 */
}

/* 上部分：主要内容区域（工具分类） */
.sidebar-main-section {
  flex-grow: 1; /* 占据可用空间 */
  overflow-y: auto; /* 内容多时可滚动 */
  display: flex;
  flex-direction: column;
}

/* 下部分：底部链接区域 */
.sidebar-bottom-section {
  flex-shrink: 0; /* 防止被压缩 */
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa; /* 轻微改变背景色以区分 */
}

.sidebar-bottom-divider {
  padding: 0 15px;
  
  :deep(.el-divider__text) {
    font-size: 0.9rem;
    color: #909399;
    background-color: #fafafa; /* 与底部区域背景一致 */
  }
}

.el-menu-vertical-demo {
  border-right: none !important;
  padding: 5px 0;
  
  .el-menu-item {
    height: 50px;
    line-height: 50px;

    .el-icon {
      margin-right: 8px;
    }
  }
}

.main-menu {
  flex-grow: 1;
  overflow-y: auto; /* 内容多时可滚动 */
  overflow-x: hidden;
  min-height: 0; /* 配合 flex-grow 和 overflow-y */
  border-top: 1px solid #eee;
}

.bottom-menu {
  border-right: none !important;
}

/* 确保 el-menu 没有右边框 */
.el-menu {
  border-right: none !important;
}
</style>