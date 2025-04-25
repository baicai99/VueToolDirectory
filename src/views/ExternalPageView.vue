<template>
  <div class="container">
    <iframe v-if="url" :src="url" class="external-iframe" frameborder="0" allowfullscreen allow="microphone"></iframe>
    <el-empty v-else description="未指定要加载的外部页面 URL"></el-empty>
  </div>
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
.container {
  height: 100%;
}

.external-page-main {
  padding: 0;
  height: 100%;
  width: 100%; // 确保main元素占满全宽
  overflow: hidden;
  display: flex;
  flex-direction: column; // 确保内部元素能够占据全部宽度
}

.external-iframe {
  width: 100%;
  height: 100%;
  border: none;
  flex-grow: 1; // 让iframe填充所有可用空间
}
</style>