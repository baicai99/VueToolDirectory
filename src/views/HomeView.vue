// src/views/HomeView.vue
<template>
  <ContentArea
    :all-tools-data="allToolsData"
    :selected-sidebar-category="selectedSidebarCategory"
    :sidebar-search-query="sidebarSearchQuery"
    :quick-links="quickLinks"
    :content-tabs="contentTabs"
  />
</template>

<script setup>
import ContentArea from '../components/ContentArea.vue';

// 接收从 App.vue <router-view> 传递过来的 props
defineProps({
  allToolsData: Array,
  selectedSidebarCategory: String,
  sidebarSearchQuery: String,
  quickLinks: Array,
  contentTabs: Array,
});
</script>

<style scoped>
/* HomeView 一般不需要特定样式，样式在 ContentArea 内部 */
</style>