<template>
    <div class="tool-description-section">
        <h3>工具描述</h3>
        <p class="tool-description">{{ longDescription }}</p>

        <!-- 标签部分 -->
        <div class="tags-section" v-if="tags.length > 0">
            <h4>相关标签</h4>
            <div class="tags-container">
                <span class="el-tag el-tag--primary el-tag--light tag" v-for="tag in tags" :key="tag">
                    <span class="el-tag__content">{{ tag }}</span>
                </span>
            </div>
        </div>

        <!-- 你可能还喜欢 -->
        <div class="recommendations-section">
            <h4>你可能还喜欢 <i class="el-icon recommendation-more">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path fill="currentColor"
                            d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z" />
                    </svg>
                </i></h4>
            <div class="recommendations-list">
                <div class="recommendation-item" v-for="(item, index) in recommendedTools" :key="index"
                    @click="onViewTool(item)">
                    <div class="recommendation-icon">
                        <img :src="item.icon || defaultIcon" :alt="item.name" @error="onImageError">
                    </div>
                    <div class="recommendation-info">
                        <div class="recommendation-name">{{ item.name }}</div>
                        <div class="recommendation-desc">{{ item.shortDescription || truncateText(item.description, 30)
                            }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义传入的属性
const props = defineProps({
    longDescription: {
        type: String,
        default: '暂无详细描述。'
    },
    tags: {
        type: Array,
        default: () => []
    },
    recommendedTools: {
        type: Array,
        default: () => []
    },
    defaultIcon: {
        type: String,
        required: true
    }
});

// 定义事件
const emit = defineEmits(['viewTool', 'imageError']);

// 截取文本的辅助方法
const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

// 查看工具详情
const onViewTool = (tool) => {
    emit('viewTool', tool);
};

// 图片加载错误处理
const onImageError = (event) => {
    emit('imageError', event);
};
</script>

<style lang="less" scoped>
.tool-description-section {
    margin-bottom: 25px;

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

    .tool-description {
        margin: 0 0 20px;
        font-size: 14px;
        line-height: 1.6;
        color: #606266;
        white-space: pre-wrap;
    }
}

.tags-section {
    margin-bottom: 25px;

    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .tag {
            margin: 0;
        }
    }
}

.recommendations-section {
    margin-bottom: 25px;

    h4 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        color: #303133;
        font-weight: bold;

        .recommendation-more {
            color: #909399;
            cursor: pointer;
            font-size: 14px;

            &:hover {
                color: var(--el-color-primary);
            }
        }
    }

    .recommendations-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 12px;

        .recommendation-item {
            display: flex;
            align-items: center;
            padding: 12px;
            border-radius: 8px;
            background-color: white;
            border: 1px solid #ebeef5;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: #f5f7fa;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }

            .recommendation-icon {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                border-radius: 8px;
                overflow: hidden;
                background-color: #f5f7fa;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .recommendation-info {
                margin-left: 12px;
                flex-grow: 1;
                overflow: hidden;

                .recommendation-name {
                    font-size: 14px;
                    font-weight: 500;
                    color: #303133;
                    margin-bottom: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .recommendation-desc {
                    font-size: 12px;
                    color: #909399;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}
</style>