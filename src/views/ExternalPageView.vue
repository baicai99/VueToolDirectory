// src/views/ExternalPageView.vue
<template>
  <el-main class="external-page-main">
    <iframe
      v-if="url"
      :src="url"
      class="external-iframe"
      frameborder="0"
      allowfullscreen
      allow="microphone"></iframe>
    <el-empty v-else description="未指定要加载的外部页面 URL"></el-empty>
  </el-main>
</template>

<script setup>
defineProps({
  url: {
    type: String,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.external-page-main {
  padding: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
}
.external-iframe {
  width: 100%;
  height: 100%;
  border: none;
  // 你提供的 style 中有 min-height: 700px，如果容器高度不足可能需要它
  // min-height: 700px; // 如果需要最小高度，取消注释
}
</style>