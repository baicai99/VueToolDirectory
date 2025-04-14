<template>
  <div class="news-detail-overlay" @click.self="closeDetail">
    <div class="news-detail-container">
      <!-- 将关闭按钮直接放在容器中，与ToolDetail.vue保持一致 -->
      <el-button class="close-button" circle plain @click="closeDetail">
        <el-icon>
          <Close />
        </el-icon>
      </el-button>

      <div v-if="newsItem" class="news-detail-content">
        <div class="news-detail-image">
          <el-image :src="newsItem.imageUrl" fit="cover">
            <template #error>
              <div class="image-error">
                <el-icon>
                  <Picture />
                </el-icon>
              </div>
            </template>
          </el-image>
          <div class="news-detail-category">{{ newsItem.category }}</div>
        </div>

        <div class="news-detail-header">
          <h2>{{ newsItem.title }}</h2>
          <div class="news-meta">
            <span class="news-date">{{ newsItem.date }}</span>
            <el-tag size="small" effect="plain">{{ newsItem.category }}</el-tag>
          </div>
        </div>

        <el-divider />

        <div class="news-detail-body">
          <p class="news-summary">{{ newsItem.summary }}</p>
          <div v-if="newsItem.content" class="news-content">
            <div v-html="newsItem.content"></div>
          </div>
          <div v-else class="news-content">
            <p>
              今日，{{ newsItem.category }}领域迎来重大发展。{{ newsItem.summary }}这一消息引起了业内广泛关注。
            </p>
            <p>
              据相关专家分析，这一进展将对相关产业链带来显著影响。不仅能够提升现有技术水平，还将开拓全新的应用场景。
              市场研究机构预测，未来5年内，相关技术的市场规模有望增长超过200%。
            </p>
            <p>
              与此同时，这一技术突破也引发了关于技术安全、伦理和监管方面的讨论。多位行业专家呼吁，在推进技术创新的同时，
              应当建立健全相关的监管框架，确保技术发展朝着有利于人类社会的方向前进。
            </p>
            <p>
              本站将持续关注相关动态，为您带来最新的技术发展信息。
            </p>
          </div>
        </div>

        <div class="news-detail-footer">
          <el-divider />

          <div class="related-news" v-if="relatedNews.length > 0">
            <h3>相关推荐</h3>
            <el-divider />
            <div class="related-list">
              <div v-for="item in relatedNews" :key="item.id" class="related-item" @click="changeNews(item)">
                <div class="related-image">
                  <el-image :src="item.imageUrl" fit="cover"></el-image>
                </div>
                <div class="related-info">
                  <h4>{{ item.title }}</h4>
                  <span class="related-date">{{ item.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="news-detail-loading">
        <el-empty description="内容加载中..."></el-empty>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Close, Picture } from '@element-plus/icons-vue';

const props = defineProps({
  newsItem: {
    type: Object,
    default: null
  },
  allNews: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'change-news']);

// 相关新闻，同类别的其他新闻
const relatedNews = computed(() => {
  if (!props.newsItem || !props.allNews || props.allNews.length === 0) {
    return [];
  }

  return props.allNews
    .filter(item =>
      item.id !== props.newsItem.id &&
      item.category === props.newsItem.category
    )
    .slice(0, 3); // 只显示最多3条相关新闻
});

// 关闭详情
const closeDetail = () => {
  emit('close');
};

// 切换到其他相关新闻
const changeNews = (newsItem) => {
  emit('change-news', newsItem);
};
</script>

<style lang="less" scoped>
.news-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}

.news-detail-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column; // 使用flex布局，方便固定顶部
  overflow: hidden; // 修改为hidden，内部内容区域单独设置滚动

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
}

/* 新增按钮容器，保证不干扰图片显示 */
.button-container {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1010;
}

.close-button {
  position: absolute; // 改为absolute定位
  top: 16px;
  right: 16px;
  z-index: 1010;
  font-size: 20px;
  opacity: 0.9;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.6);
  }
}

.news-detail-content {
  overflow-y: auto; // 使内容区域可以独立滚动
  max-height: calc(90vh - 32px); // 考虑padding的高度限制
  scrollbar-width: thin;
  position: relative;
  z-index: 1;
  padding-top: 0; // 移除顶部内边距，避免挤压图片

  .news-detail-image {
    position: relative;
    height: 300px;
    overflow: hidden;
    margin-top: 0; // 确保没有上边距

    .el-image {
      width: 100%;
      height: 100%;
    }

    .news-detail-category {
      position: absolute;
      top: 16px;
      left: 16px; // 将分类标签移到左侧，避免与关闭按钮重叠
      padding: 6px 12px;
      background-color: var(--el-color-primary);
      color: white;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
      z-index: 10; // 确保标签在图片上方，但在关闭按钮下方
    }
  }

  .news-detail-header {
    padding: 24px 32px 0;

    h2 {
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 28px;
      line-height: 1.4;
    }

    .news-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;

      .news-date {
        color: #909399;
        font-size: 14px;
      }
    }
  }

  .news-detail-body {
    padding: 0 32px;

    .news-summary {
      font-size: 18px;
      font-weight: 500;
      color: #303133;
      margin-bottom: 24px;
      line-height: 1.6;
    }

    .news-content {
      font-size: 16px;
      line-height: 1.8;
      color: #606266;

      p {
        margin-bottom: 20px;
      }
    }
  }

  .news-detail-footer {
    padding: 0 32px 32px;

    .related-news {
      h3 {
        font-size: 20px;
        margin: 0 0 16px;
      }

      .related-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
      }

      .related-item {
        display: flex;
        gap: 12px;
        padding: 8px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background-color: #f5f7fa;
        }

        .related-image {
          width: 80px;
          height: 60px;
          overflow: hidden;
          border-radius: 4px;

          .el-image {
            width: 100%;
            height: 100%;
          }
        }

        .related-info {
          flex: 1;
          display: flex;
          flex-direction: column;

          h4 {
            margin: 0 0 8px;
            font-size: 14px;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .related-date {
            font-size: 12px;
            color: #909399;
          }
        }
      }
    }
  }
}

/* 全局修复 el-tag 翻转效果 */
:deep(.el-tag) {
  transition: none !important;
  transform: none !important;
  backface-visibility: visible !important;
  perspective: none !important;
  transform-style: flat !important;
}

/* 特别针对 primary small plain 样式的标签 */
:deep(.el-tag--primary.el-tag--small.el-tag--plain) {
  transition: none !important;
  animation: none !important;
}

.news-detail-loading {
  padding: 100px 0;
}

/* 移动端适配样式 */
@media (max-width: 768px) {
  .news-detail-overlay {
    padding: 5%;
    /* 为Chrome搜索框预留空间，将内容下移 */
    padding-top: 17%;
    align-items: flex-start; /* 顶部对齐而不是居中 */
    z-index: 1000;
  }

  .news-detail-container {
    max-height: 80vh; /* 减小高度以适应顶部和底部空间 */
    z-index: 1001;
    position: relative;
    /* 距离屏幕底部更远一些 */
    margin-bottom: 20px;

    /* 在移动端Chrome浏览器中，添加这些属性可以帮助解决层叠问题 */
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .close-button {
    top: 10px;
    right: 10px;
    z-index: 1010; /* 确保关闭按钮在最上层 */
  }

  .news-detail-content {
    max-height: calc(80vh - 40px); /* 调整为新的高度限制 */
  }
}
</style>