<template>
<<<<<<< HEAD
  <div class="news-view-main">
    <h1>每周 AI 快讯</h1>
    <el-divider />
=======
  <div class="news-view">
    <el-main class="news-view-main">
      <h1>每周 AI 快讯</h1>
      <el-divider />
>>>>>>> 90a77d083112ea7c8141bc42e51f40ae9cb776f8

      <news-list :news-data="newsData" :categories="categories" />

<<<<<<< HEAD
    <el-backtop :right="20" :bottom="20" />
=======
      <el-backtop :right="20" :bottom="20" />
    </el-main>
>>>>>>> 90a77d083112ea7c8141bc42e51f40ae9cb776f8
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NewsList from '../components/news/NewsList.vue';
import { newsCategories, newsItems } from '../data/news.js';

// 类别数据
const categories = newsCategories;

// 新闻数据
const newsData = ref([]);

// 获取新闻数据
const fetchNewsData = () => {
  // 在实际应用中，这里可能是API调用
  // 现在我们直接使用导入的数据
  newsData.value = newsItems;
};

// 生命周期钩子
onMounted(() => {
  fetchNewsData();
});
</script>

<style lang="less" scoped>
<<<<<<< HEAD
.news-view-main {
  box-sizing: border-box;
=======
.news-view {
  background-color: #f5f7fa;
  min-height: 100vh;
  width: 100%;
}
>>>>>>> 90a77d083112ea7c8141bc42e51f40ae9cb776f8

.news-view-main {

  // padding: 20px;
  // box-sizing: border-box;
  // height: 100%;
  h1 {
    margin-top: 0;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .news-view-main {
    padding: 12px;

    h1 {
      font-size: 1.5rem;
      margin-bottom: 12px;
    }
  }
}
</style>