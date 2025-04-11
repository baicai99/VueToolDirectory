<template>
    <el-aside width="210px" class="fixed-aside">
      <div style="padding: 15px; text-align: center; font-size: 1.2em; font-weight: bold;">
        收藏夹
      </div>
  
      <div style="padding: 0 15px 15px;">
        <el-input
          v-model="sidebarSearchTerm"
          placeholder="搜索工具..."
          :prefix-icon="Search"
          clearable
          @input="handleSidebarSearch"
        />
      </div>
  
      <el-menu
        :default-active="activeCategory"
        class="el-menu-vertical-demo"
        @select="handleSelectCategory"
      >
        <el-menu-item v-for="cat in categories" :key="cat.id" :index="cat.id">
          <el-icon><component :is="cat.icon" /></el-icon>
          <span>{{ cat.name }}</span>
        </el-menu-item>
      </el-menu>
  
      <div class="sidebar-bottom-links">
         <el-menu>
           <el-menu-item v-for="link in bottomLinks" :key="link.id" :index="link.id" @click="gotoLink(link.url)">
              <el-icon><component :is="link.icon" /></el-icon>
              <span>{{ link.name }}</span>
           </el-menu-item>
         </el-menu>
      </div>
    </el-aside>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import { Search } from '@element-plus/icons-vue'; // 显式引入图标
  
  // 定义 props 和 emits
  const props = defineProps({
    categories: {
      type: Array,
      required: true,
    },
    bottomLinks: {
      type: Array,
      required: true,
    },
    initialCategory: {
      type: String,
      default: 'all', // 默认选中“所有工具”
    },
  });
  
  const emit = defineEmits(['categorySelected', 'sidebarSearch']);
  
  // 内部状态
  const sidebarSearchTerm = ref('');
  const activeCategory = ref(props.initialCategory); // 初始化激活的分类
  
  // --- 方法 ---
  // 处理菜单选择
  const handleSelectCategory = (index) => {
    activeCategory.value = index; // 更新内部状态
    emit('categorySelected', index); // 触发事件，通知父组件
  };
  
  // 处理侧边栏搜索输入
  const handleSidebarSearch = () => {
    emit('sidebarSearch', sidebarSearchTerm.value); // 触发事件，传递搜索词
  };
  
  // 跳转链接 (用于底部链接)
  const gotoLink = (url) => {
      if (url && url !== '#') { // 简单处理，如果是有效链接则新窗口打开
          window.open(url, '_blank');
      } else if (url === '#hottopics') {
          // 可以实现滚动到页面特定区域的逻辑，如果需要的话
          console.log("需要滚动到热门工具");
          // 这里可以emit一个事件给父组件处理滚动
      }
  };
  </script>
  
  <style scoped>
  /* 侧边栏特定样式 */
  .el-aside {
    background-color: #FFF; /* 设置背景色 */
    border-right: 1px solid #e6e6e6;
    overflow-x: hidden; /* 防止水平滚动条 */
  }
  
  /* 移除菜单右侧边框，因为容器已有 */
  .el-menu {
    border-right: none;
  }
  
  /* 可选：调整菜单项高度和内边距 */
  .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
  .el-menu-item [class^=el-icon] {
      margin-right: 8px; /* 图标和文字间距 */
  }
  
  /* 底部链接区域样式 */
  .sidebar-bottom-links {
      margin-top: auto; /* 关键：将这部分推到底部 */
      padding: 10px 0; /* 上下留白 */
      border-top: 1px solid #eee; /* 可选：顶部加分隔线 */
  }
  .sidebar-bottom-links .el-menu-item {
      height: 40px;
      line-height: 40px;
      font-size: 0.9em; /* 可以让字体小一点 */
  }
  </style>