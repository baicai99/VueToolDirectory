<template>
  <div class="sidebar-content-wrapper sidebar-nav-component" :class="{ 'collapsed': isCollapsed }" ref="sidebarRef">
    <div class="sidebar-title" v-show="!isCollapsed" ref="titleRef">
      {{ sidebarTitle }}
    </div>

    <div class="sidebar-search-wrapper" v-show="!isCollapsed" ref="searchRef">
      <el-input v-model="sidebarSearchTerm" placeholder="搜索工具..." :prefix-icon="Search" clearable
        @input="debouncedHandleSidebarSearch" />
    </div>

    <div class="sidebar-menu-area">
      <el-menu :default-active="activeItem" class="el-menu-vertical-demo unified-menu" :collapse="isCollapsed"
        @select="handleMenuSelect">
        <el-menu-item v-for="item in combinedMenuItems" :key="item.id" :index="item.id">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
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
  categories: { type: Array, required: true },
  bottomLinks: { type: Array, required: true },
  initialCategory: { type: String, default: null },
  isCollapsed: { type: Boolean, default: false },
});

// --- Emits ---
const emit = defineEmits([
  'categorySelected',
  'sidebarSearch',
  'bottomLinkClicked',
  'sidebarCollapse',
  'syncRouteWithCategory',
]);

// --- DOM Refs ---
const sidebarRef = ref(null);
const titleRef = ref(null);
const searchRef = ref(null);

// --- State ---
const sidebarTitle = import.meta.env.VITE_APP_NAME || '收藏夹';
const sidebarSearchTerm = ref('');
const isMobile = ref(window.innerWidth <= 768);

// --- Computed ---
// 合并分类和底部链接到一个数组，并添加 type 标识
const combinedMenuItems = computed(() => {
  const cats = props.categories.map(cat => ({ ...cat, type: 'category' }));
  const links = props.bottomLinks.map(link => ({ ...link, type: 'link' }));
  return [...cats, ...links];
});

// --- State ---
const getSavedActiveItem = () => {
  const savedItem = localStorage.getItem('sidebarActiveItem');
  const defaultItem = combinedMenuItems.value.length > 0 ? combinedMenuItems.value[0].id : 'all';
  return savedItem || props.initialCategory || defaultItem;
};

const activeItem = ref(getSavedActiveItem());

// --- Methods ---
/**
 * 处理非滚动区域的滚动和触摸事件
 */
const setupNoScrollElements = () => {
  const noScrollElements = [titleRef.value, searchRef.value];

  noScrollElements.forEach(element => {
    if (element) {
      const options = { passive: false };
      element.addEventListener('wheel', (e) => {
        if (e.target === element) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, options);
      element.addEventListener('touchmove', (e) => {
        if (e.target === element) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, options);
    }
  });
};

/**
 * 响应窗口大小变化
 */
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

/**
 * 统一处理菜单项选择事件
 * @param {string} itemId - 被选中的菜单项 ID (即 el-menu 的 index)
 */
const handleMenuSelect = (itemId) => {
  // 在合并后的列表中查找被点击的项
  const selectedItem = combinedMenuItems.value.find(item => item.id === itemId);

  if (!selectedItem) return; // 未找到则退出

  // 更新本地激活状态并保存
  activeItem.value = itemId;
  localStorage.setItem('sidebarActiveItem', itemId);

  // 移动端下通知父组件折叠侧边栏
  if (isMobile.value) {
    emit('sidebarCollapse', true);
  }

  // 根据类型触发不同的事件
  if (selectedItem.type === 'category') {
    emit('categorySelected', itemId); // 传递 ID
  } else if (selectedItem.type === 'link') {
    // 对于链接点击，传递整个链接对象可能更有用
    emit('bottomLinkClicked', selectedItem);
  }
};

/**
 * 处理搜索框输入
 */
const handleSidebarSearch = () => {
  sessionStorage.setItem('sidebarSearchTerm', sidebarSearchTerm.value);
  emit('sidebarSearch', sidebarSearchTerm.value);
};

const debouncedHandleSidebarSearch = debounce(handleSidebarSearch, 300);

// --- Lifecycle Hooks ---
onMounted(() => {
  // 初始化处理滚动事件
  setupNoScrollElements();

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);

  // 恢复保存的搜索词
  const savedSearchTerm = sessionStorage.getItem('sidebarSearchTerm');
  if (savedSearchTerm) {
    sidebarSearchTerm.value = savedSearchTerm;
    handleSidebarSearch();
  }

  // 恢复保存的激活项
  activeItem.value = getSavedActiveItem();

  // 检查恢复的 activeItem 是否在合并后的列表中有效
  const currentItem = combinedMenuItems.value.find(item => item.id === activeItem.value);

  if (!currentItem && combinedMenuItems.value.length > 0) {
    // 如果恢复的项无效，则默认选中第一个
    activeItem.value = combinedMenuItems.value[0].id;
    localStorage.setItem('sidebarActiveItem', activeItem.value);
  } else if (!currentItem) {
    // 如果列表为空，则重置 activeItem
    activeItem.value = 'all'; // 或者 null
    localStorage.removeItem('sidebarActiveItem');
  }

  // 初始加载时，根据当前的 activeItem 触发相应的事件
  if (currentItem) {
    if (currentItem.type === 'category') {
      emit('categorySelected', activeItem.value);
      emit('syncRouteWithCategory', activeItem.value);
    }
  }

  // 清理函数
  return () => {
    window.removeEventListener('resize', handleResize);
  };
});

// --- Watchers ---
// 监听 initialCategory 变化，同步激活项
watch(() => props.initialCategory, (newInitialCategory) => {
  if (newInitialCategory && newInitialCategory !== activeItem.value) {
    // 检查 newInitialCategory 是否在合并列表中有效
    const isValidItem = combinedMenuItems.value.some(item => item.id === newInitialCategory);
    if (isValidItem) {
      activeItem.value = newInitialCategory;
      localStorage.setItem('sidebarActiveItem', newInitialCategory);
      // 可选：如果是由外部（如路由）触发的分类变化，再次触发 categorySelected 以确保一致性
      const changedItem = combinedMenuItems.value.find(item => item.id === newInitialCategory);
      if (changedItem?.type === 'category') {
        emit('categorySelected', newInitialCategory);
      }
    }
  }
});
</script>

<style lang="less" scoped>
.sidebar-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #FFF;
  overflow: hidden;
  overscroll-behavior: contain;
  touch-action: pan-y pinch-zoom;
  transition: width 0.3s ease;
  width: 240px;

  &.collapsed {
    width: 64px;
  }

  @media (max-width: 768px) {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    overscroll-behavior: contain !important;
  }
}

.sidebar-title {
  padding: 15px;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  flex-shrink: 0;
  overscroll-behavior: contain;
  touch-action: none;
}

.sidebar-search-wrapper {
  padding: 0 15px 15px;
  flex-shrink: 0;
  overscroll-behavior: contain;
  touch-action: none;
}

/* 单一菜单滚动区域 */
.sidebar-menu-area {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f0f0f0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
}

/* 统一菜单样式 */
.el-menu-vertical-demo.unified-menu {
  border-right: none !important;
  padding-top: 5px; // 给顶部一点间距
  padding-bottom: 5px; // 给底部一点间距
  transition: width 0.3s ease;

  &.el-menu--collapse {
    width: 64px; // 折叠时的宽度
  }

  .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 20px !important; // 强制左右内边距

    .el-icon {
      margin-right: 8px;
    }

    &.is-active {
      background-color: #ecf5ff;
      color: #409eff;
    }
  }
}
</style>