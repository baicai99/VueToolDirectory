// src/views/RankingView.vue
<template>
  <div class="ranking-view-main">
    <h1 class="ranking-title">
      LLM 排行榜
      <span class="subtitle">综合能力评估</span>
    </h1>
    <el-divider />

    <div class="llm-ranking-section">
        <div class="ranking-list">
            <div v-for="(item, index) in llmRankingData" :key="index" class="ranking-item">
                <p class="ranking-name">
                    <span class="main-name">{{ item.mainName }}</span>
                    <span v-if="item.secondaryName" class="secondary-name">{{ item.secondaryName }}</span>
                </p>
                <div class="ranking-bar-bg">
                    <div
                      class="ranking-bar"
                      :style="{ width: item.width + '%', background: item.background }"
                     ></div>
                </div>
            </div>
        </div>
        <div class="ranking-footer">
            *数据仅为示例，非实时或权威排名。
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
// 直接在此组件定义或从外部导入排行榜数据
const llmRankingData = ref([
  { mainName: "Google", secondaryName: "Gemini 2.5 Pro Exp", width: 100, background: 'linear-gradient(to right, #88511d, #903f49, #9b0a72)' },
  { mainName: "OpenAI", secondaryName: "o1-pro", width: 95, background: 'linear-gradient(to right, #d4c64a, #7cc87c, #66b2e3)' },
  { mainName: "OpenAI", secondaryName: "GPT-4.5 Preview", width: 90, background: '#a86bdb' },
  { mainName: "OpenAI", secondaryName: "o3-mini(high)", width: 87, background: '#60a8e6' },
  { mainName: "OpenAI", secondaryName: "o1", width: 86, background: '#60a8e6' },
  { mainName: "xAI", secondaryName: "Grok 3", width: 86, background: '#bdbdbd' },
  { mainName: "阿里", secondaryName: "Qwen 2.5 Max", width: 86, background: '#bdbdbd' },
  { mainName: "Anthropic", secondaryName: "Claude 3.7 Sonnet", width: 86, background: '#bdbdbd' },
  { mainName: "DeepSeek", secondaryName: "R1", width: 84, background: '#bdbdbd' },
  { mainName: "OpenAI", secondaryName: "GPT-4o", width: 82, background: '#bdbdbd' },
  { mainName: "OpenAI", secondaryName: "o3-mini(medium)", width: 81, background: '#bdbdbd' },
  { mainName: "其他", secondaryName: "文心一言, 豆包 等", width: 35, background: '#bdbdbd' }
]);
</script>

<style lang="less" scoped>
.ranking-view-main {
  box-sizing: border-box;
  overflow-y: auto;
}

.ranking-title {
    font-size: 1.8em;
    font-weight: bold;
    margin-bottom: 0.2em;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    color: #303133; // 深色标题

    .subtitle {
        font-size: 0.7em;
        font-weight: normal;
        margin-left: 1em;
        color: #909399; // 灰色副标题
    }
}

.llm-ranking-section {
    background-color: #ffffff; // 可以使用白色背景卡片效果
    color: #303133;         // 深色文字
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.06); // 调整阴影

    .ranking-list { /* ... */ }
    .ranking-item {
        margin-bottom: 1.5em;
        &:last-child { margin-bottom: 0; }
    }
    .ranking-name {
        margin-top: 0;
        margin-bottom: 0.6em;
        font-size: 0.95em;
        color: #606266; // 调整名称颜色
        line-height: 1.4;
        .main-name {
            opacity: 1;
            font-weight: 500;
            color: #303133; // 主名称颜色深一点
        }
        .secondary-name {
            opacity: 0.8; // 次要名称透明度调整
            padding-left: 0.5em;
            font-size: 0.9em;
        }
    }
    .ranking-bar-bg {
        height: 8px;
        border-radius: 4px;
        background-color: #ebeef5; // 使用 Element Plus 的浅灰色
        overflow: hidden;
    }
    .ranking-bar {
        height: 100%;
        border-radius: 4px;
    }
    .ranking-footer {
        margin-top: 20px;
        font-size: 0.8em;
        color: #aaaaaa; // 页脚文字颜色
        text-align: center;
    }
    /* ... (可能需要的响应式样式) ... */
     @media (max-width: 600px) { /* ... */ }
}
</style>