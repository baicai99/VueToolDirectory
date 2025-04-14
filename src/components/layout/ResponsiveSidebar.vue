<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-header">
      <button @click="toggleSidebar" class="toggle-button">
        <el-icon :size="20">
          <component :is="isCollapsed ? 'el-icon-menu' : 'el-icon-close'" />
        </el-icon>
      </button>
    </div>
    <div class="sidebar-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width, 320px);
  transition: width 0.3s ease;
  background-color: var(--sidebar-bg-color, #1f1f1f);
  color: var(--sidebar-text-color, #e3e3e3);
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  --sidebar-width: 72px;
}

.sidebar-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.toggle-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}
</style>