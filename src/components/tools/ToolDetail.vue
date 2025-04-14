<template>
    <div class="tool-detail-overlay" @click.self="closeDetail">
        <div class="tool-detail-container">
            <el-button class="close-button" circle plain @click="closeDetail">
                <el-icon>
                    <Close />
                </el-icon>
            </el-button>

            <div v-if="tool" class="tool-detail-content">
                <div class="tool-header">
                    <img :src="resolvedIconUrl" :alt="tool.name" class="detail-icon" @error="handleImageError" />
                    <div class="tool-header-info">
                        <h2>{{ tool.name }}</h2>

                        <!-- 移除条件渲染，使用计算属性确保始终有值 -->
                        <div class="detail-tags">
                            <el-tag v-for="tag in toolTags" :key="tag" type="info" size="small">
                                {{ tag }}
                            </el-tag>
                        </div>

                        <div class="detail-link" v-if="tool.url">
                            <el-button type="primary" size="small" @click="openToolWebsite">
                                访问官网 <el-icon>
                                    <Link />
                                </el-icon>
                            </el-button>
                        </div>
                    </div>
                </div>

                <el-divider />

                <div class="tool-description">
                    <h3>工具描述</h3>
                    <p>{{ tool.longDescription || tool.description || '暂无详细描述。' }}</p>
                </div>

                <div class="tool-screenshots" v-if="tool.screenshots && tool.screenshots.length">
                    <h3>工具截图</h3>
                    <el-carousel :interval="4000" type="card" height="250px">
                        <el-carousel-item v-for="(screenshot, index) in tool.screenshots" :key="index">
                            <el-image :src="screenshot" fit="contain" :preview-src-list="tool.screenshots"
                                :initial-index="index" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>

            <div v-else class="tool-detail-loading">
                <el-empty description="未找到该工具的信息" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Close, Link } from '@element-plus/icons-vue';
import defaultIconPath from '../../assets/icons/tool-icon-placeholder.png';

// 使用 import.meta.glob 动态导入 src/assets/icons 下的所有图片资源
const imageModules = import.meta.glob('/src/assets/icons/*.{png,jpg,jpeg,gif,svg,ico}', { eager: true });

const props = defineProps({
    tool: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['close']);

// 新增计算属性：确保标签始终有值
const toolTags = computed(() => {
    return props.tool?.tags || [];
});

// 计算属性：动态解析最终要显示的图标 URL
const resolvedIconUrl = computed(() => {
    const currentTool = props.tool; // 获取当前工具数据
    if (!currentTool) {
        return defaultIconPath; // 如果工具数据还没加载好，返回默认图标
    }

    const iconPathInData = currentTool.icon; // 获取 data.js 中记录的路径字符串

    if (!iconPathInData) {
        return defaultIconPath; // 如果数据中没有 icon 路径，返回默认图标
    }

    // 构建 import.meta.glob 需要的 key (格式需要完全匹配，包括开头的 '/')
    const moduleKey = '/' + iconPathInData;
    const module = imageModules[moduleKey]; // 在 glob 结果中查找

    if (module && module.default) {
        // 如果找到了模块，返回 Vite 处理后的 URL (通常在 .default 属性)
        return module.default;
    } else {
        // 如果没找到匹配的模块 (可能文件丢失或路径/格式不符)
        console.warn(`Icon module not found for key: ${moduleKey}. Using default icon for tool ${currentTool.name}.`);
        return defaultIconPath; // 返回默认图标作为最终的回退
    }
});

// 图片加载失败时的处理函数
const handleImageError = (event) => {
    // 避免因默认图标也加载失败导致无限循环
    if (event.target.src !== defaultIconPath) {
        console.warn(`Failed to load image: ${event.target.src}. Falling back to default.`);
        event.target.src = defaultIconPath;
    }
};

// 关闭详情
const closeDetail = () => {
    emit('close');
};

// 打开工具网站
const openToolWebsite = () => {
    if (props.tool && props.tool.url) {
        window.open(props.tool.url, '_blank');
    }
};
</script>

<style lang="less" scoped>
.tool-detail-overlay {
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

.tool-detail-container {
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

.tool-detail-content {
    padding: 24px 32px 32px;
    overflow-y: auto; // 使内容区域可以独立滚动
    max-height: calc(90vh - 32px); // 考虑padding的高度限制
    scrollbar-width: thin;

    // 添加顶部padding，防止内容被关闭按钮遮挡
    padding-top: 48px;

    .tool-header {
        display: flex;
        gap: 24px;

        @media (max-width: 640px) {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .detail-icon {
            width: 120px;
            height: 120px;
            object-fit: contain;
            border-radius: 12px;
            flex-shrink: 0;
        }

        .tool-header-info {
            flex: 1;

            h2 {
                margin-top: 0;
                margin-bottom: 16px;
                font-size: 24px;
            }

            .detail-tags {
                margin-bottom: 16px;
                min-height: 32px;
                /* 设置最小高度确保空间稳定 */

                .el-tag {
                    margin-right: 8px;
                    margin-bottom: 8px;
                    /* 禁用可能的过渡效果 */
                    transition: none !important;
                }
            }
        }
    }

    .tool-description {
        margin: 24px 0;

        h3 {
            font-size: 18px;
            margin-bottom: 16px;
            color: #303133;
        }

        p {
            font-size: 16px;
            line-height: 1.8;
            color: #606266;
            white-space: pre-wrap;
        }
    }

    .tool-screenshots {
        margin: 24px 0;

        h3 {
            font-size: 18px;
            margin-bottom: 16px;
            color: #303133;
        }

        .el-carousel {
            margin-top: 16px;
        }
    }
}

.tool-detail-loading {
    padding: 100px 0;
}

/* 全局修复所有 el-tag 元素的翻转效果 */
:deep(.el-tag) {
    transition: none !important;
    transform: none !important;
    backface-visibility: visible !important;
    perspective: none !important;
    transform-style: flat !important;
    animation: none !important;
}

/* 特别针对带有 primary small plain 类的标签 */
:deep(.el-tag--primary.el-tag--small.el-tag--plain) {
    transition: none !important;
    animation: none !important;
    transform: none !important;
}

/* 移动端适配样式 */
@media (max-width: 768px) {
    .tool-detail-overlay {
        padding: 10px;
    }

    .tool-detail-container {
        max-height: 95vh;
    }

    .close-button {
        top: 10px;
        right: 10px;
    }

    .tool-detail-content {
        padding: 16px 20px 20px;
        max-height: calc(95vh - 20px);
        padding-top: 40px; // 移动端顶部padding调小

        .tool-header {
            flex-direction: column;
            gap: 16px;

            .detail-icon {
                width: 80px;
                height: 80px;
            }

            .tool-header-info {
                h2 {
                    font-size: 22px;
                    margin-bottom: 12px;
                    text-align: center;
                }

                .detail-tags {
                    justify-content: center;
                }

                .detail-link {
                    display: flex;
                    justify-content: center;
                }
            }
        }

        .tool-screenshots {
            .el-carousel {
                height: 200px !important;
            }
        }
    }
}
</style>