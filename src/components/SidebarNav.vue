// src/components/SidebarNav.vue
<template>
  <el-aside width="210px" class="sidebar-nav-aside">
    <div class="sidebar-title"> {{ sidebarTitle }}
    </div>

    <div class="sidebar-search-wrapper"> <el-input
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
         <el-menu-item v-for="link in bottomLinks" :key="link.id" :index="link.id" @click="handleBottomLinkClick(link)">
           <el-icon><component :is="link.icon" /></el-icon>
           <span>{{ link.name }}</span>
         </el-menu-item>
       </el-menu>
    </div>
  </el-aside>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router'; // <--- 导入 useRouter

const sidebarTitle = import.meta.env.VITE_APP_NAME || '收藏夹';

// --- Props 和 Emits 不变 ---
const props = defineProps({
  categories: { type: Array, required: true },
  bottomLinks: { type: Array, required: true },
  initialCategory: { type: String, default: 'all' },
});
const emit = defineEmits(['categorySelected', 'sidebarSearch']);

// --- 获取 router 实例 ---
const router = useRouter(); // <--- 获取 router 实例

// --- 内部状态 不变 ---
const sidebarSearchTerm = ref('');
const activeCategory = ref(props.initialCategory);

// --- 方法 ---
// handleSelectCategory 和 handleSidebarSearch 不变
const handleSelectCategory = (index) => {
  activeCategory.value = index;
  emit('categorySelected', index);
};
const handleSidebarSearch = () => {
  emit('sidebarSearch', sidebarSearchTerm.value);
};

// --- 新的处理底部链接点击的方法 ---
const handleBottomLinkClick = (link) => {
  // --- 添加日志 ---
  console.log("点击了底部链接对象:", JSON.stringify(link, null, 2)); // 打印出完整的 link 对象看看结构
  // --- 添加结束 ---

  if (link.route) {
    // --- 添加日志 ---
    console.log("检测到 route 属性，尝试导航到:", link.route);
    // --- 添加结束 ---
    // activeCategory.value = link.id; // 建议不修改主分类高亮
    router.push(link.route);
  } else if (link.url && link.url !== '#') {
    // --- 添加日志 ---
    console.log("未检测到 route 属性，尝试打开外部链接:", link.url);
    // --- 添加结束 ---
    window.open(link.url, '_blank');
  } else {
    console.log(`点击了底部链接 "${link.name}" 但没有定义操作。`);
    if (link.url === '#hottopics') {
       console.log("需要滚动到热门工具 (功能待实现)");
    }
  }
};
// --- 删除了旧的 gotoLink 方法 ---

</script>

<style lang="less" scoped>
.sidebar-nav-aside { // 使用类名作为根选择器
  background-color: #FFF;
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box; // 包含边框和内边距

  .sidebar-title { // 标题样式
    padding: 15px;
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    flex-shrink: 0; // 防止被压缩
  }

  .sidebar-search-wrapper { // 搜索框容器样式
    padding: 0 15px 15px;
    flex-shrink: 0;
  }

  .el-menu { // 适用于两个菜单
    border-right: none;
    flex-shrink: 0; // 防止菜单被压缩（如果内容过多）

    // 如果希望主菜单可以滚动而底部固定，需要调整布局
    // 例如，让主菜单的容器 overflow-y: auto; flex-grow: 1;
  }

  .el-menu-vertical-demo { // 主分类菜单特定样式（如果需要）
     flex-grow: 1; // 让主菜单占据剩余空间
     overflow-y: auto; // 如果分类过多允许滚动
  }

  .el-menu-item {
    height: 50px;
    line-height: 50px;
    .el-icon { // 嵌套图标样式
      margin-right: 8px;
    }
  }

  .sidebar-bottom-links {
      margin-top: auto; // 推到底部
      padding: 10px 0;
      border-top: 1px solid #eee;
      flex-shrink: 0; // 防止被压缩
      .el-menu-item { // 嵌套底部链接项样式
        height: 40px;
        line-height: 40px;
        font-size: 0.9em;
      }
  }
}
</style>