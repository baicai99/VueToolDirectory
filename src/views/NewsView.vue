<template>
  <div class="news-view-main">
    <h1>每周 AI 快讯</h1>
    <el-divider />

    <news-list :news-data="newsData" :categories="categories" />

    <el-backtop :right="20" :bottom="20" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NewsList from '../components/news/NewsList.vue';

// 类别数据
const categories = ['人工智能', '机器学习', '大语言模型', '计算机视觉', 'AI应用', '产业动态'];

// 新闻数据
const newsData = ref([]);

// 获取新闻数据
const fetchNewsData = () => {
  // 这里应该是实际的API调用
  // 以下是模拟数据
  newsData.value = [
    {
      id: 1,
      title: 'OpenAI 发布 GPT-5 预览版',
      summary: 'OpenAI 今日宣布发布 GPT-5 预览版，新模型在推理能力和长文本处理上有显著提升。',
      category: '大语言模型',
      imageUrl: 'https://picsum.photos/600/300?random=1',
      date: '2025-04-14'
    },
    {
      id: 2,
      title: 'Google 推出全新视觉 AI 系统',
      summary: 'Google 今日发布新一代计算机视觉系统，可以实现更精确的图像识别和物体追踪。',
      category: '计算机视觉',
      imageUrl: 'https://picsum.photos/600/300?random=2',
      date: '2025-04-13'
    },
    {
      id: 3,
      title: '微软宣布将 AI 技术应用于全线产品',
      summary: '微软宣布其全线产品将集成先进 AI 功能，提升用户体验和工作效率。',
      category: 'AI应用',
      imageUrl: 'https://picsum.photos/600/300?random=3',
      date: '2025-04-12'
    },
    {
      id: 4,
      title: '中国 AI 芯片产业投资超过 1000 亿元',
      summary: '据报道，中国 AI 芯片产业投资规模已超过 1000 亿元，多家企业进入量产阶段。',
      category: '产业动态',
      imageUrl: 'https://picsum.photos/600/300?random=4',
      date: '2025-04-11'
    },
    {
      id: 5,
      title: '新研究突破传统机器学习算法限制',
      summary: '一项新研究成功突破了传统机器学习算法的限制，大幅降低了训练数据需求。',
      category: '机器学习',
      imageUrl: 'https://picsum.photos/600/300?random=5',
      date: '2025-04-10'
    },
    {
      id: 6,
      title: 'AI 辅助医疗系统获批临床应用',
      summary: '一款用于辅助医学影像诊断的 AI 系统获得监管部门批准，即将在多家医院投入使用。',
      category: 'AI应用',
      imageUrl: 'https://picsum.photos/600/300?random=6',
      date: '2025-04-09'
    },
    {
      id: 7,
      title: 'DeepMind 在蛋白质结构预测领域取得新突破',
      summary: 'DeepMind 最新研究在蛋白质结构预测精度上达到历史新高，将加速药物研发进程。',
      category: '人工智能',
      imageUrl: 'https://picsum.photos/600/300?random=7',
      date: '2025-04-08'
    },
    {
      id: 8,
      title: '首个完全自主驾驶出租车服务在旧金山上线',
      summary: '世界首个完全无人驾驶的出租车服务在旧金山正式商业化运营，标志着自动驾驶技术进入新阶段。',
      category: 'AI应用',
      imageUrl: 'https://picsum.photos/600/300?random=8',
      date: '2025-04-07'
    },
    {
      id: 9,
      title: '全球AI安全峰会在伦敦举行',
      summary: '来自30多个国家的代表齐聚伦敦，讨论人工智能发展带来的安全挑战和监管框架。',
      category: '产业动态',
      imageUrl: 'https://picsum.photos/600/300?random=9',
      date: '2025-04-06'
    },
    {
      id: 10,
      title: '新型神经网络结构将AI推理速度提升10倍',
      summary: '研究人员设计的新型神经网络结构显著提高了AI模型的推理速度，同时减少了能耗。',
      category: '机器学习',
      imageUrl: 'https://picsum.photos/600/300?random=10',
      date: '2025-04-05'
    },
    {
      id: 11,
      title: '多模态AI在创意产业应用取得突破性进展',
      summary: '一款结合图像、声音和文本的多模态AI系统在创意设计和内容创作领域展现出惊人能力。',
      category: '人工智能',
      imageUrl: 'https://picsum.photos/600/300?random=11',
      date: '2025-04-04'
    },
    {
      id: 12,
      title: '边缘计算与AI融合成为新趋势',
      summary: '边缘计算和人工智能技术的融合正在改变物联网设备的智能化水平和应用场景。',
      category: '产业动态',
      imageUrl: 'https://picsum.photos/600/300?random=12',
      date: '2025-04-03'
    }
  ];
};

// 生命周期钩子
onMounted(() => {
  fetchNewsData();
});
</script>

<style lang="less" scoped>
.news-view-main {
  box-sizing: border-box;

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