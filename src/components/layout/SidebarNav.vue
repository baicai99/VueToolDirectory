<template>
  <div class="sidebar-content-wrapper sidebar-nav-component">
    <div class="sidebar-title">
      {{ sidebarTitle }}
    </div>

    <div class="sidebar-search-wrapper">
      <el-input v-model="sidebarSearchTerm" placeholder="搜索工具..." :prefix-icon="Search" clearable
        @input="debouncedHandleSidebarSearch" />
    </div>

    <!-- 上部分：工具分类 -->
    <div class="sidebar-main-section">
      <el-menu :default-active="activeItem" class="el-menu-vertical-demo main-menu" @select="handleSelectItem">
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
      <el-menu :default-active="activeItem" class="el-menu-vertical-demo bottom-menu" @select="handleSelectItem">
        <el-menu-item v-for="link in bottomLinks" :key="link.id" :index="link.id" @click="handleBottomLinkClick(link)">
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

  // 移动端下通知父组件折叠侧边栏
  if (props.isCollapsed === false) {
    emit('sidebarCollapse', true);
  }

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

  // 移动端下通知父组件折叠侧边栏
  if (props.isCollapsed === false) {
    emit('sidebarCollapse', true);
  }

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
  /* 添加更强的滚动隔离属性 */
  overscroll-behavior: contain;
  overscroll-behavior-y: contain;
  /* 限制触摸操作，只允许水平滚动 */
  touch-action: pan-y pinch-zoom;

  /* 移动端毛玻璃效果 */
  @media (max-width: 768px) {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    /* 确保在移动端也应用 overscroll-behavior */
    overscroll-behavior: contain !important;
    overscroll-behavior-y: contain !important;
  }
}

.sidebar-title {
  padding: 15px;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  flex-shrink: 0;
  /* 防止标题被压缩 */
  /* 防止标题区域滚动事件传递 */
  overscroll-behavior: contain;
  overscroll-behavior-y: contain;
  /* 限制触摸操作，防止滚动手势 */
  touch-action: none;
  /* 确保不会接收滚动事件 */
  pointer-events: auto;
}

.sidebar-search-wrapper {
  padding: 0 15px 15px;
  flex-shrink: 0;
  /* 防止搜索框被压缩 */
  /* 防止搜索区域滚动事件传递 */
  overscroll-behavior: contain;
  overscroll-behavior-y: contain;
  /* 限制触摸操作 */
  touch-action: none;
}

/* 上部分：主要内容区域（工具分类） */
.sidebar-main-section {
  flex-grow: 1;
  /* 占据可用空间 */
  overflow-y: auto;
  /* 内容多时可滚动 */
  display: flex;
  flex-direction: column;
  /* 防止滚动到边界时传递给外部容器 */
  overscroll-behavior: contain;
  /* 移除滚动回弹效果 */
  -webkit-overflow-scrolling: auto;
  /* 禁用iOS的滚动弹性效果 */
}

/* 下部分：底部链接区域 */
.sidebar-bottom-section {
  flex-shrink: 0;
  /* 防止被压缩 */
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa;
  /* 轻微改变背景色以区分 */
  /* 强化防止滚动传递 */
  overscroll-behavior: contain;
  overscroll-behavior-y: contain;
  /* 限制触摸操作，防止滚动手势 */
  touch-action: none;
  /* 确保不会接收滚动事件 */
  pointer-events: auto;
}

.sidebar-bottom-divider {
  padding: 0 15px;

  :deep(.el-divider__text) {
    font-size: 0.9rem;
    color: #909399;
    background-color: #fafafa;
    /* 与底部区域背景一致 */
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
  overflow-y: auto;
  /* 内容多时可滚动 */
  overflow-x: hidden;
  min-height: 0;
  /* 配合 flex-grow 和 overflow-y */
  border-top: 1px solid #eee;
  /* 防止滚动到边界时传递给外部容器 */
  overscroll-behavior: contain;
  /* 移除滚动回弹效果 */
  -webkit-overflow-scrolling: auto;
  /* 禁用iOS的弹性滚动 */
  scroll-behavior: smooth;
  /* 平滑滚动 */
}

/* 确保 el-menu 没有右边框 */
.el-menu {
  border-right: none !important;
}

.bottom-menu {
  border-right: none !important;
  /* 确保底部菜单的滚动行为也被控制 */
  overscroll-behavior: contain;
  overscroll-behavior-y: contain;
  /* 禁止底部菜单的滚动触摸操作 */
  touch-action: none;
}

/* 添加滚动事件处理，通过JS阻止 wheel 事件 */
.el-menu-item {
  // ...existing code...
}
</style>

<script>
// 添加一个额外的脚本块来处理滚动事件
export default {
  mounted() {
    // 阻止滚动事件的区域选择器列表
    const noScrollSelectors = [
      '.sidebar-bottom-section',  // 底部菜单区域
      '.sidebar-title',           // 标题区域
      '.sidebar-search-wrapper'   // 搜索区域
    ];
    
    // 为每个区域添加事件监听器
    noScrollSelectors.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        // 阻止滚轮事件传递
        element.addEventListener('wheel', (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, { passive: false });
        
        // 阻止触摸滚动事件传递
        element.addEventListener('touchmove', (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, { passive: false });
      }
    });
  }
}
</script>