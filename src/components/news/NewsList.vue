<template>
  <div class="news-list-container">
    <div class="news-filter">
      <el-select v-model="selectedCategory" placeholder="选择分类" clearable @change="handleFilter">
        <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
      </el-select>
      <el-input v-model="searchQuery" placeholder="搜索快讯" clearable @input="handleFilter" class="search-input">
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>

    <div class="news-grid">
      <news-card v-for="item in paginatedNewsItems" :key="item.id" :news="item" @open-detail="openNewsDetail" />
    </div>

    <div v-if="paginatedNewsItems.length === 0" class="no-results">
      <el-empty description="没有找到匹配的快讯" />
    </div>

    <div class="news-pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[6, 12, 18, 24]"
        :background="true" layout="total, sizes, prev, pager, next, jumper" :total="filteredNews.length"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <!-- 新闻详情弹窗 -->
    <news-detail v-if="selectedNews" :news-item="selectedNews" :all-news="props.newsData" @close="closeNewsDetail"
      @change-news="changeSelectedNews" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import NewsCard from './NewsCard.vue';
import NewsDetail from './NewsDetail.vue';

// 接收外部传入的新闻数据
const props = defineProps({
  newsData: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  }
});

// 过滤和搜索状态
const selectedCategory = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(6);

// 当前选中的新闻（用于详情页展示）
const selectedNews = ref(null);

// 过滤后的新闻数据
const filteredNews = ref([]);

// 计算当前页的新闻项目
const paginatedNewsItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredNews.value.slice(startIndex, endIndex);
});

// 监听props变化，更新过滤后的数据
watch(() => props.newsData, (newValue) => {
  applyFilters();
}, { deep: true });

// 应用过滤条件
const applyFilters = () => {
  filteredNews.value = props.newsData.filter(item => {
    const matchCategory = !selectedCategory.value || item.category === selectedCategory.value;
    const matchQuery = !searchQuery.value ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCategory && matchQuery;
  });

  // 当过滤后的总数少于当前页起始索引时，重置到第一页
  if (filteredNews.value.length <= (currentPage.value - 1) * pageSize.value) {
    currentPage.value = 1;
  }
};

// 处理过滤器变化
const handleFilter = () => {
  currentPage.value = 1; // 重置到第一页
  applyFilters();
};

// 处理页面大小变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
};

// 处理页面变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
};

// 打开新闻详情
const openNewsDetail = (news) => {
  selectedNews.value = news;
  document.body.style.overflow = 'hidden'; // 防止背景滚动
};

// 关闭新闻详情
const closeNewsDetail = () => {
  selectedNews.value = null;
  document.body.style.overflow = ''; // 恢复背景滚动
};

// 切换选中的新闻（用于相关新闻推荐功能）
const changeSelectedNews = (news) => {
  selectedNews.value = news;
};

// 初始化
onMounted(() => {
  filteredNews.value = [...props.newsData];
});
</script>

<style lang="less" scoped>
.news-list-container {
  width: 100%;

  .news-filter {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;

    .search-input {
      width: 300px;
    }
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  }

  .no-results {
    padding: 40px 0;
  }

  .news-pagination {
    display: flex;
    justify-content: center;
    margin: 24px 0;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .news-list-container {
    .news-filter {
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;

      .search-input,
      .el-select {
        width: 100%;
      }
    }

    .news-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .news-pagination {
      margin: 16px 0;

      :deep(.el-pagination) {
        .el-pagination__sizes {
          display: none;
        }
      }
    }
  }
}
</style>