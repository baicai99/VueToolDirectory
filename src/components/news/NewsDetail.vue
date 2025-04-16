<template>
  <div class="news-detail-overlay" v-if="newsItem" @click="handleOverlayClick">
    <div class="news-detail-container" @click.stop>
      <!-- 关闭按钮 -->
      <button type="button" class="el-button is-plain is-circle close-button" @click="closeDetail">
        <span>
          <i class="el-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path fill="currentColor"
                d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z">
              </path>
            </svg>
          </i>
        </span>
      </button>

      <!-- 新闻详情内容 -->
      <div class="news-detail-content">
        <!-- 顶部图片和分类 -->
        <div class="news-header">
          <div class="news-image">
            <div class="el-image">
              <img v-if="newsItem.imageUrl" :src="newsItem.imageUrl" alt="新闻图片">
              <div v-else class="image-error">
                <i class="el-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                      d="M160 160v704h704V160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32">
                    </path>
                    <path fill="currentColor"
                      d="M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64M185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952z">
                    </path>
                  </svg>
                </i>
              </div>
            </div>
          </div>
          <div class="news-category-badge">{{ newsItem.category }}</div>
        </div>

        <!-- 新闻标题和元信息 -->
        <div class="news-detail-header">
          <h2>{{ newsItem.title }}</h2>
          <div class="news-meta">
            <span class="news-date">
              <i class="el-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                  <path fill="currentColor"
                    d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96h64v32h192a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h192V96h64v32z">
                  </path>
                  <path fill="currentColor" d="M256 416h512v32H256zm0 192h512v32H256zm0 192h512v32H256z">
                  </path>
                </svg>
              </i>
              {{ newsItem.date }}
            </span>
            <span class="el-tag el-tag--primary el-tag--small el-tag--plain">
              <span class="el-tag__content">{{ newsItem.category }}</span>
            </span>
          </div>
        </div>

        <div class="el-divider el-divider--horizontal" role="separator"></div>

        <!-- 新闻内容正文 -->
        <div class="news-detail-body">
          <!-- 新闻摘要部分 -->
          <div class="news-summary-section">
            <h3>摘要</h3>
            <p class="news-summary">{{ newsItem.summary }}</p>
          </div>

          <!-- 新闻正文部分 -->
          <div class="news-content-section">
            <h3>详细内容</h3>
            <div class="news-content" v-if="newsItem.content" v-html="newsItem.content"></div>
            <div class="news-content" v-else>
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
        </div>

        <!-- 底部相关推荐 -->
        <div class="news-detail-footer">
          <div class="el-divider el-divider--horizontal" role="separator"></div>
          <div class="related-news" v-if="relatedNews.length > 0">
            <h3>相关推荐</h3>
            <div class="el-divider el-divider--horizontal" role="separator"></div>
            <div class="related-list">
              <div v-for="item in relatedNews" :key="item.id" class="related-item" @click="changeNews(item)">
                <div class="related-category">{{ item.category }}</div>
                <div class="related-info">
                  <h4>{{ item.title }}</h4>
                  <div class="related-date">
                    <span>{{ item.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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

// 处理背景点击关闭
const handleOverlayClick = () => {
  closeDetail();
};

// 切换到其他相关新闻
const changeNews = (newsItem) => {
  emit('change-news', newsItem);
};
</script>

<style lang="less" scoped>
// --- 基本变量和通用样式 ---
.news-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
  transform: translateZ(0);
  will-change: transform;
  isolation: isolate;
  pointer-events: auto;
}

.news-detail-container {
  position: relative;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  font-size: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: none;
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  i {
    font-size: 16px;
  }
}

.news-detail-content {
  overflow-y: auto;
}

.news-header {
  position: relative;
  height: 200px;
  overflow: hidden;

  .news-image {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .el-image {
      width: 100%;
      height: 100%;
    }

    .image-error {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f7fa;
      color: #909399;
      font-size: 24px;
    }
  }

  .news-category-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    background-color: var(--el-color-primary);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
}

.news-detail-header {
  padding: 20px;

  h2 {
    margin: 0 0 10px;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.4;
  }

  .news-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px 15px;

    .news-date {
      display: flex;
      align-items: center;
      color: #606266;
      font-size: 14px;

      i {
        margin-right: 5px;
        font-size: 16px;
      }
    }
  }
}

.news-detail-body {
  padding: 0 20px 20px;

  h3 {
    margin: 20px 0 15px;
    font-size: 18px;
    font-weight: bold;
    color: #303133;
  }

  h4 {
    margin: 15px 0 10px;
    font-size: 16px;
    font-weight: bold;
    color: #606266;
  }
}

// --- 新闻摘要和内容部分 ---
.news-summary-section {
  margin-bottom: 25px;

  .news-summary {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
    line-height: 1.6;
    padding: 15px;
    background-color: #f5f7fa;
    border-radius: 6px;
    margin: 0;
  }
}

.news-content-section {
  .news-content {
    font-size: 14px;
    line-height: 1.8;
    color: #606266;

    p {
      margin-bottom: 20px;
    }
  }
}

.news-detail-footer {
  padding: 0 20px 20px;

  .related-news {
    h3 {
      margin: 20px 0 15px;
      font-size: 18px;
      font-weight: bold;
      color: #303133;
    }
  }
}

// --- 相关推荐部分 ---
.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  padding: 0;

  .related-item {
    display: flex;
    flex-direction: column;
    padding: 12px 15px;
    background-color: #f5f7fa;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
      background-color: #ecf5ff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .related-category {
      align-self: flex-start;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      color: white;
      margin-bottom: 8px;
      background-color: var(--el-color-primary);
    }

    .related-info {
      h4 {
        margin: 0 0 5px;
        font-size: 15px;
        font-weight: 500;
        color: #303133;
      }

      .related-date {
        font-size: 12px;
        color: #909399;
      }
    }
  }
}

// --- 响应式调整 ---
@media (max-width: 768px) {
  .news-detail-container {
    max-width: 100%;
    max-height: 95vh;
  }

  .news-header {
    height: 150px;
  }

  .news-detail-header h2 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .news-detail-header .news-meta {
    font-size: 13px;

    .news-date i {
      font-size: 14px;
    }
  }

  .news-summary-section .news-summary {
    padding: 10px;
    font-size: 15px;
  }

  .related-list {
    gap: 10px;

    .related-item {
      padding: 10px 12px;
    }
  }
}
</style>