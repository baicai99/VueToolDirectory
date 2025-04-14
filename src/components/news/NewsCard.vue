<template>
  <el-card class="news-card" shadow="hover" @click="openDetail">
    <div class="news-image">
      <el-image :src="news.imageUrl" fit="cover" lazy>
        <template #error>
          <div class="image-error">
            <el-icon>
              <Picture />
            </el-icon>
          </div>
        </template>
      </el-image>
      <div class="news-category">{{ news.category }}</div>
    </div>
    <div class="news-content">
      <h3>{{ news.title }}</h3>
      <p class="news-summary">{{ news.summary }}</p>
      <div class="news-footer">
        <span class="news-date">{{ news.date }}</span>
        <el-button type="primary" text @click.stop="readMore">
          阅读更多 <el-icon>
            <ArrowRight />
          </el-icon>
        </el-button>
      </div>
    </div>
  </el-card>
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

const emit = defineEmits(['open-detail']);

// 阅读更多
const readMore = () => {
  openDetail();
};

// 打开详情
const openDetail = () => {
  emit('open-detail', props.news);
};
</script>

<style lang="less" scoped>
.news-card {
  transition: transform 0.3s;
  height: 100%;

  // 在桌面端保留hover效果
  @media (min-width: 769px) {
    &:hover {
      transform: translateY(-5px);
    }
  }

  .news-image {
    position: relative;
    height: 180px;
    overflow: hidden;
    border-radius: 4px 4px 0 0;

    .el-image {
      width: 100%;
      height: 100%;
    }

    .image-error {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #f5f7fa;

      .el-icon {
        font-size: 32px;
        color: #909399;
      }
    }

    .news-category {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 4px 8px;
      background-color: var(--el-color-primary);
      color: white;
      border-radius: 4px;
      font-size: 12px;
    }
  }

  .news-content {
    padding: 16px;

    h3 {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 1.4;
      height: 50px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .news-summary {
      color: #606266;
      font-size: 14px;
      line-height: 1.6;
      height: 67px;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .news-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .news-date {
        color: #909399;
        font-size: 13px;
      }
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .news-card {

    // 移动端禁用hover状态变换
    &:hover {
      transform: none;
    }

    .news-image {
      height: 160px; // 稍微减小图片高度
    }

    .news-content {
      padding: 12px;

      h3 {
        font-size: 16px;
        height: 44px;
      }

      .news-summary {
        font-size: 13px;
        height: 62px;
        margin-bottom: 12px;
      }

      .news-footer {
        flex-wrap: wrap;
        gap: 8px;

        .news-date {
          font-size: 12px;
        }

        .el-button {
          padding: 6px 0;
          margin-left: 0;
        }
      }
    }
  }
}
</style>