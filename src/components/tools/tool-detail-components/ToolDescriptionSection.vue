<template>
    <div class="tool-description-section">
        <!-- 标题部分 -->
        <div class="modal-header">
            <h3 class="typography-modal-topic-label">{{ toolCategory }}</h3>
            <h4 class="typography-modal-headline">{{ toolHeadline }}</h4>
        </div>

        <!-- 苹果风格特性卡片展示区 -->
        <div class="feature-cards-container">
            <ToolFeatureCard title="惊艳大作随手来。"
                description="iPhone 配备先进的摄像头，能自动捕捉丰富细节与色彩，拍出令人叫绝的照片。想要光速开拍得意作品？iPhone 16 和 iPhone 16 Pro 都有相机控制功能，让你秒开各种拍摄工具。"
                imageUrl="https://picsum.photos/800/500?random=1" class="feature-card-modal-tile bleed-bottom"
                @image-error="onImageError" />
            <ToolFeatureCard title="变焦进行时。" description="超广角镜头让你捕捉更宽广的风景，而长焦镜头则可以将远处的主体拉近，不同焦段之间无缝切换，满足各种摄影需求。"
                imageUrl="https://picsum.photos/800/500?random=2" class="feature-card-modal-tile bleed-bottom"
                @image-error="onImageError" />
            <ToolFeatureCard title="视频直出大片范儿。" description="4K高清视频录制，配合电影级防抖功能，让你随手拍摄的视频都有专业品质。杜比视界让你的视频色彩更加丰富生动。"
                imageUrl="https://picsum.photos/800/500?random=3" class="feature-card-modal-tile bleed-bottom"
                @image-error="onImageError" />
        </div>

        <!-- 工具详细描述 -->
        <div class="description-container">
            <h3 class="section-title">工具描述</h3>
            <p class="tool-description">{{ longDescription }}</p>
        </div>

        <!-- 标签部分 -->
        <div class="tags-section" v-if="tags.length > 0">
            <h4 class="section-subtitle">相关标签</h4>
            <div class="tags-container">
                <span class="el-tag el-tag--primary el-tag--light tag" v-for="tag in tags" :key="tag">
                    <span class="el-tag__content">{{ tag }}</span>
                </span>
            </div>
        </div>

        <!-- 你可能还喜欢 -->
        <div class="recommendations-section">
            <h4 class="section-subtitle">你可能还喜欢 <i class="el-icon recommendation-more">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path fill="currentColor"
                            d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z" />
                    </svg>
                </i>
            </h4>
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
import { computed } from 'vue';
import ToolFeatureCard from './ToolFeatureCard.vue';

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
    },
    toolName: {
        type: String,
        default: '高级工具'
    },
    toolCategory: {
        type: String,
        default: '高性能工具'
    }
});

// 计算属性：工具标题
const toolHeadline = computed(() => {
    return '提升效率<br>赋能创作';
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
    margin: 0;
}

.modal-header {
    padding: 40px 44px 20px;
    text-align: left;

    .typography-modal-topic-label {
        font-size: 14px;
        line-height: 1.42859;
        font-weight: 500;
        letter-spacing: -.016em;
        color: #515154;
        margin: 0 0 12px;
    }

    .typography-modal-headline {
        font-size: 40px;
        line-height: 1.1;
        font-weight: 600;
        letter-spacing: -.009em;
        color: #1d1d1f;
        margin: 0;
    }
}

.feature-cards-container {
    padding: 20px 0;
}

.description-container {
    padding: 30px 44px;

    .section-title {
        font-size: 24px;
        line-height: 1.16667;
        font-weight: 600;
        letter-spacing: .009em;
        color: #1d1d1f;
        margin: 0 0 20px;
    }

    .tool-description {
        margin: 0;
        font-size: 17px;
        line-height: 1.47059;
        font-weight: 400;
        letter-spacing: -.022em;
        color: #515154;
        white-space: pre-wrap;
    }
}

.tags-section {
    margin: 0;
    padding: 0 44px 30px;

    .section-subtitle {
        font-size: 20px;
        line-height: 1.2;
        font-weight: 600;
        letter-spacing: .007em;
        color: #1d1d1f;
        margin: 0 0 16px;
    }

    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .tag {
            margin: 0;
            border-radius: 16px;
            padding: 6px 14px;
            font-size: 14px;
            background-color: #f5f5f7;
            color: #1d1d1f;
            border: none;
        }
    }
}

.recommendations-section {
    margin: 0;
    padding: 0 44px 30px;

    .section-subtitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
        line-height: 1.2;
        font-weight: 600;
        letter-spacing: .007em;
        color: #1d1d1f;
        margin: 0 0 16px;

        .recommendation-more {
            color: #06c;
            cursor: pointer;
            font-size: 16px;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .recommendations-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;

        .recommendation-item {
            display: flex;
            align-items: center;
            padding: 16px;
            border-radius: 12px;
            background-color: #f5f5f7;
            border: 1px solid #e6e6e6;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: #ebebf0;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            }

            .recommendation-icon {
                flex-shrink: 0;
                width: 48px;
                height: 48px;
                border-radius: 12px;
                overflow: hidden;
                background-color: white;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .recommendation-info {
                margin-left: 16px;
                flex-grow: 1;
                overflow: hidden;

                .recommendation-name {
                    font-size: 16px;
                    line-height: 1.25;
                    font-weight: 500;
                    color: #1d1d1f;
                    margin-bottom: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .recommendation-desc {
                    font-size: 14px;
                    line-height: 1.33337;
                    font-weight: 400;
                    color: #515154;
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

// 响应式调整
@media (max-width: 900px) {
    .modal-header {
        padding: 30px 20px 16px;

        .typography-modal-headline {
            font-size: 32px;
        }
    }

    .description-container,
    .tags-section,
    .recommendations-section {
        padding-left: 20px;
        padding-right: 20px;
    }

    .description-container {
        .section-title {
            font-size: 20px;
        }

        .tool-description {
            font-size: 15px;
        }
    }

    .tags-section,
    .recommendations-section {
        .section-subtitle {
            font-size: 18px;
        }
    }

    .recommendations-list {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 600px) {
    .modal-header {
        padding: 24px 16px 12px;

        .typography-modal-headline {
            font-size: 28px;
        }
    }

    .description-container,
    .tags-section,
    .recommendations-section {
        padding-left: 16px;
        padding-right: 16px;
    }
}
</style>