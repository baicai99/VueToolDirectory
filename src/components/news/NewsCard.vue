<template>
  <div class="news-card" @click="openDetail">
    <!-- 新闻图片 -->
    <div class="news-image">
      <img :src="news.imageUrl" alt="新闻图片">
      <template v-if="!news.imageUrl">
        <div class="image-error">
          <el-icon>
            <Picture />
          </el-icon>
        </div>
      </template>
      <div class="news-category">{{ news.category }}</div>
      <div v-if="news.isHot" class="news-hot-tag">热点</div>
    </div>

    <!-- 新闻内容 -->
    <div class="news-content">
      <h3 class="news-title">{{ news.title }}</h3>
      <p class="news-summary">{{ news.summary }}</p>

      <!-- 新闻详情 -->
      <div class="news-details">
        <div class="detail-item">
          <span class="label">发布日期:</span>
          <span class="value">{{ news.date }}</span>
        </div>
        <div class="detail-item" v-if="news.author">
          <span class="label">作者:</span>
          <span class="value">{{ news.author }}</span>
        </div>
        <div class="detail-item" v-if="news.source">
          <span class="label">来源:</span>
          <span class="value">{{ news.source }}</span>
        </div>
      </div>

      <!-- 标签 -->
      <div class="news-tags" v-if="news.tags && news.tags.length">
        <el-tag v-for="tag in news.tags" :key="tag" size="small" effect="plain">
          {{ tag }}
        </el-tag>
      </div>

      <!-- 按钮 -->
      <div class="news-buttons">
        <el-button type="primary" @click.stop="readMore">阅读全文</el-button>
        <el-button v-if="news.url" @click.stop="openExternalUrl">原文链接</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Picture, ArrowRight } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 定义props
const props = defineProps({
  news: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['open-detail', 'open-url']);

// 阅读更多
const readMore = () => {
  openDetail();
};

// 打开详情
const openDetail = () => {
  emit('open-detail', props.news);
};

// 打开外部链接
const openExternalUrl = () => {
  if (props.news.url) {
    emit('open-url', props.news.url);
  }
};
</script>

<style lang="less" scoped>
// 新闻卡片
.news-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }

  // 图片容器
  .news-image {
    position: relative;
    height: 180px;
    overflow: hidden;
    background-color: #f5f7fa;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-error {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      .el-icon {
        font-size: 32px;
        color: #909399;
      }
    }

    // 分类标签
    .news-category {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 4px 12px;
      background-color: var(--el-color-primary);
      color: white;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }

    // 热点标签
    .news-hot-tag {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 4px 12px;
      background-color: #F56C6C;
      border-radius: 4px;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
  }

  // 内容部分
  .news-content {
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .news-title {
      margin: 0 0 10px;
      font-size: 18px;
      font-weight: bold;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .news-summary {
      color: #606266;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    // 新闻详细信息
    .news-details {
      margin-bottom: 16px;

      .detail-item {
        display: flex;
        margin-bottom: 6px;
        font-size: 13px;

        .label {
          color: #909399;
          width: 70px;
          flex-shrink: 0;
        }

        .value {
          color: #303133;
          font-weight: 500;
        }
      }
    }

    // 标签
    .news-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 16px;
    }

    // 按钮区域
    .news-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
      gap: 10px;

      .el-button {
        flex: 1;
      }
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .news-card {
    .news-image {
      height: 160px;
    }

    .news-content {
      padding: 12px;

      .news-title {
        font-size: 16px;
      }

      .news-summary {
        font-size: 13px;
        margin-bottom: 12px;
      }

      .news-buttons {
        flex-direction: column;

        .el-button {
          margin-left: 0 !important;
        }
      }
    }
  }
}
</style>