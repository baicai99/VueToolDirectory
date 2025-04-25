<template>
  <el-main class="hot-tools-main">
    <h1>热门工具</h1>
    <el-divider />
    <FeatureGallery>
      <li v-for="tool in featuredTools" :key="tool.id">
        <FeatureCard :idSuffix="tool.id" :label="tool.category" :headline="tool.name" :imageUrl="tool.icon"
          :imageAlt="tool.name" :showButton="tool.showButton !== undefined ? tool.showButton : true"
          :cardWidth="tool.cardWidth" :cardHeight="tool.cardHeight"
          :showText="tool.showText !== undefined ? tool.showText : true" :textColor="tool.textColor || 'black'"
          :theme="tool.theme || 'light'" :imagePosition="tool.imagePosition || 'image-full'"
          @openModal="openToolDetail(tool)" />
      </li>
    </FeatureGallery>

    <h2 class="section-title">所有热门工具</h2>
    <div class="hot-tools-grid">
      <div v-for="tool in featuredTools" :key="'grid-' + tool.id" class="hot-tool-item">
        <FeatureCard :idSuffix="tool.id" :label="tool.category" :headline="tool.name" :imageUrl="tool.icon"
          :imageAlt="tool.name" :showButton="false" cardWidth="100%" :cardHeight="320" :showText="true"
          :textColor="tool.textColor || 'black'" :theme="tool.theme || 'light'" :imagePosition="'image-backdrop'"
          @openModal="openToolDetail(tool)" />
      </div>
    </div>
  </el-main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Card from '@/components/base/Card.vue';
import FeatureCard from '@/components/base/FeatureCard.vue';
import FeatureGallery from '@/components/base/FeatureGallery.vue';
import { ElMessage } from 'element-plus';
import { allTools } from '@/data/allCategories.js';

const router = useRouter();
const defaultIcon = '/public/icons/tool-icon-placeholder.png';

// 获取热门工具
const featuredTools = ref([]);

// 在组件挂载时获取数据
onMounted(() => {
  // 从allTools中筛选isHot为true的工具
  featuredTools.value = allTools.filter(tool => tool.isHot === true);

  // 如果没有热门工具，使用默认数据
  if (featuredTools.value.length === 0) {
    featuredTools.value = [
      {
        id: 'feature1',
        name: '特色工具1',
        description: '这是一个特色工具的描述',
        icon: 'https://picsum.photos/600',
        category: '特色工具',
        cardWidth: 350,
        cardHeight: 450,
        textColor: 'white',
        imagePosition: 'image-backdrop',
        showButton: true,
        showText: true
      },
      {
        id: 'feature2',
        name: '特色工具2',
        description: '这是另一个特色工具的描述',
        icon: 'https://picsum.photos/600',
        category: '特色工具',
        theme: 'dark',
        textColor: 'white'
      }
    ];
  }
});

// 添加状态变量
const showToolDetail = ref(false);
const selectedTool = ref(null);

// 打开工具详情模态框
const openToolDetail = (tool) => {
  router.push({
    name: 'tool-detail',
    params: { id: tool.id }
  });
};

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.src = defaultIcon;
};
</script>

<style lang="less" scoped>
.hot-tools-main {
  padding: 20px;
  box-sizing: border-box;
  height: 100%;

  h1 {
    margin-top: 0;
  }

  .hot-tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin-top: 20px;
  }

  .hot-tool-item {
    width: 100%;
    height: 100%;
  }

  .section-title {
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
  }

  // 响应式调整
  @media (max-width: 768px) {
    .hot-tools-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>