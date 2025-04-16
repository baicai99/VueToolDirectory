<template>
  <el-main class="hot-tools-main">
    <h1>热门工具</h1>
    <el-divider />

    <div class="hot-tools-grid">
      <ItemCard v-for="(tool, index) in hotTools" :key="index" :item="tool" :defaultIcon="defaultIcon"
        @click="handleToolClick" class="hot-tool-card" />
    </div>

    <el-empty v-if="!hotTools.length" description="暂无热门工具数据"></el-empty>
  </el-main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ItemCard from '@/components/base/ItemCard.vue';

const router = useRouter();
const defaultIcon = '/public/icons/tool-icon-placeholder.png';

// 热门工具数据示例
const hotTools = ref([
  {
    id: 'tool1',
    name: 'AI 图像生成器',
    description: '基于最新的人工智能技术，快速生成高质量图像，支持多种风格和分辨率',
    icon: '/public/icons/tool-icon-placeholder.png',
    category: '图像工具'
  },
  {
    id: 'tool2',
    name: '智能写作助手',
    description: '帮助您创作高质量内容，支持多种文体和风格，提供智能建议和修改',
    icon: '/public/icons/chatgpt.jpg',
    category: '文本工具'
  },
  {
    id: 'tool3',
    name: '视频编辑器',
    description: '简单易用的视频编辑工具，内置丰富模板和特效，一键生成专业视频',
    icon: '/public/icons/gemini.jpg',
    category: '视频工具'
  },
  {
    id: 'tool4',
    name: '数据分析平台',
    description: '强大的数据分析工具，支持多种数据源，生成直观的可视化图表',
    icon: '/public/icons/claude.jpg',
    category: '数据工具'
  },
  {
    id: 'tool5',
    name: '音频转写工具',
    description: '将音频文件转写为文本，支持多种语言，准确率高',
    icon: '/public/icons/hidream.png',
    category: '音频工具'
  },
  {
    id: 'tool6',
    name: '背景移除工具',
    description: '一键移除图片背景，生成透明背景图片，适用于电商产品图等场景',
    icon: '/public/icons/remove-photos.png',
    category: '图像工具'
  }
]);

// 处理工具点击事件
const handleToolClick = (tool) => {
  router.push({
    name: 'tool-detail',
    params: { id: tool.id },
    query: { name: tool.name }
  });
};
</script>

<style lang="less" scoped>
.hot-tools-main {
  padding: 20px; // 添加内边距，与其他视图统一
  box-sizing: border-box;
  height: 100%; // 尝试让其填充父容器高度

  h1 {
    margin-top: 0; // 移除 h1 默认的上边距
  }

  .hot-tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .hot-tool-card {
    // 自定义热门工具卡片样式
    --card-bg-color: #f8f9fa;
    --card-hover-bg-color: #f0f2f5;
    --icon-size: 56px;
    --title-font-size: 18px;
    --desc-lines: 2;

    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .hot-tools-main {
    .hot-tools-grid {
      grid-template-columns: 1fr;
    }

    .hot-tool-card {
      --icon-size: 48px;
      --title-font-size: 16px;
    }
  }
}
</style>