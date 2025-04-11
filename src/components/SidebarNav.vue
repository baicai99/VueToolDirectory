<template>
  <el-aside width="210px" class="sidebar-nav-aside">

    <div class="sidebar-title">
      {{ sidebarTitle }}
    </div>

    <div class="sidebar-search-wrapper">
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
      class="el-menu-vertical-demo" @select="handleSelectCategory"
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
// <script setup> 部分保持不变，它与布局逻辑解耦
import { ref, defineProps, defineEmits } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const sidebarTitle = import.meta.env.VITE_APP_NAME || '收藏夹';
const props = defineProps({
  categories: { type: Array, required: true },
  bottomLinks: { type: Array, required: true },
  initialCategory: { type: String, default: 'all' },
});
const emit = defineEmits(['categorySelected', 'sidebarSearch']);
const router = useRouter();
const sidebarSearchTerm = ref('');
const activeCategory = ref(props.initialCategory);

const handleSelectCategory = (index) => {
  activeCategory.value = index;
  emit('categorySelected', index);
};
const handleSidebarSearch = () => {
  emit('sidebarSearch', sidebarSearchTerm.value);
};
const handleBottomLinkClick = (link) => {
  if (link.route) {
    activeCategory.value = link.id;
    router.push(link.route);
  } else if (link.url && link.url !== '#') {
    window.open(link.url, '_blank');
  } else {
    console.log(`Clicked bottom link "${link.name}" with no defined action.`);
    if (link.url === '#hottopics') {
       console.log("需要滚动到热门工具 (功能待实现)");
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar-nav-aside {
  background-color: #FFF;
  border-right: 1px solid #e6e6e6;
  overflow: hidden; /* 根容器不滚动 */
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;

  .sidebar-title { // 固定顶部
    padding: 15px;
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    flex-shrink: 0; // 不压缩
  }

  .sidebar-search-wrapper { // 固定顶部
    padding: 0 15px 15px;
    flex-shrink: 0; // 不压缩
  }

  // --- 主分类菜单样式 ---
  .el-menu-vertical-demo {
    flex-grow: 1; // 占据中间所有剩余空间
    overflow-y: auto; // 内容超出时允许垂直滚动
    overflow-x: hidden; // 禁止水平滚动
    min-height: 0; // 重要: Flexbox hack 确保滚动生效
    border-top: 1px solid #eee; // 与搜索框分隔
    border-bottom: 1px solid #eee; // 与底部链接分隔
    padding: 5px 0; // 给菜单上下一点空间

    // 主菜单项样式
    .el-menu-item {
      height: 50px;
      line-height: 50px;
      .el-icon {
        margin-right: 8px;
      }
    }
  }
  // --- 主菜单样式结束 ---

  .sidebar-bottom-links { // 固定底部
      padding: 10px 0;
      // border-top: 1px solid #eee; // 分隔线加在了主菜单底部
      flex-shrink: 0; // 不压缩

      .el-menu { // 底部菜单本身不需要特殊样式
         border-right: none;
      }

      .el-menu-item { // 底部链接项样式
        height: 40px;
        line-height: 40px;
        font-size: 0.9em;
        .el-icon {
            margin-right: 8px;
        }
      }
  }

  // 通用菜单样式（如果需要覆盖 Element Plus 默认）
  .el-menu {
    border-right: none !important; // 强制移除边框
  }
}
</style>