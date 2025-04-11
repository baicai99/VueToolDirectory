<template>
  <el-main class="news-view-main">
    <h1>每日 AI 快讯</h1>
    <el-divider />
    <p>此页面内容待开发...</p>
    <p>这里将来会展示最新的 AI 相关新闻和资讯。</p>
  </el-main>
</template>

<script setup>
// 目前不需要特定的 setup 逻辑
</script>

<style lang="less" scoped>
.news-view-main {
  padding: 20px; // 添加内边距，与其他视图统一
  box-sizing: border-box;
  height: 100%; // 尝试让其填充父容器高度

  h1 {
    margin-top: 0; // 移除 h1 默认的上边距
  }
}
</style>