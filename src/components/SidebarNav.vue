// src/components/SidebarNav.vue
<template>
  <el-aside width="210px" class="sidebar-nav-aside"> <div class="sidebar-title"> {{ sidebarTitle }}
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
       <el-menu :default-active="activeCategory">
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
import { useRouter } from 'vue-router';

const sidebarTitle = import.meta.env.VITE_APP_NAME || '收藏夹';

// --- Props 和 Emits ---
const props = defineProps({
  categories: { type: Array, required: true },
  bottomLinks: { type: Array, required: true },
  initialCategory: { type: String, default: 'all' },
});
const emit = defineEmits(['categorySelected', 'sidebarSearch']);

// --- 获取 router 实例 ---
const router = useRouter();

// --- 内部状态 ---
const sidebarSearchTerm = ref('');
// activeCategory 同时被两个菜单用于高亮状态
const activeCategory = ref(props.initialCategory);

// --- 方法 ---
const handleSelectCategory = (index) => {
  activeCategory.value = index; // 更新状态
  emit('categorySelected', index); // 通知父组件
};

const handleSidebarSearch = () => {
  emit('sidebarSearch', sidebarSearchTerm.value);
};

const handleBottomLinkClick = (link) => {
  // console.log("点击了底部链接对象:", JSON.stringify(link, null, 2)); // 保留或移除调试日志
  if (link.route) {
    // console.log("检测到 route 属性，尝试导航到:", link.route); // 保留或移除调试日志
    activeCategory.value = link.id; // 点击底部链接也更新高亮状态
    router.push(link.route);
  } else if (link.url && link.url !== '#') {
    // console.log("未检测到 route 属性，尝试打开外部链接:", link.url); // 保留或移除调试日志
    window.open(link.url, '_blank');
  } else {
    console.log(`Clicked bottom link "${link.name}" with no defined action.`);
    if (link.url === '#hottopics') {
       console.log("需要滚动到热门工具 (功能待实现)");
       // emit('scrollToSection', 'hot-tools');
    }
  }
};

</script>

<style lang="less" scoped>
/* 样式与你提供的一致 */
.sidebar-nav-aside {
  background-color: #FFF;
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;

  .sidebar-title {
    padding: 15px;
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    flex-shrink: 0;
  }

  .sidebar-search-wrapper {
    padding: 0 15px 15px;
    flex-shrink: 0;
  }

  .el-menu {
    border-right: none;
    flex-shrink: 0;
  }

  .el-menu-vertical-demo { // 主分类菜单
     flex-grow: 1;
     overflow-y: auto;
  }

  .el-menu-item {
    height: 50px;
    line-height: 50px;
    .el-icon {
      margin-right: 8px;
    }
  }

  .sidebar-bottom-links {
      margin-top: auto;
      padding: 10px 0;
      border-top: 1px solid #eee;
      flex-shrink: 0;
      .el-menu-item { // 底部链接项
        height: 40px;
        line-height: 40px;
        font-size: 0.9em;
      }
  }
}
</style>