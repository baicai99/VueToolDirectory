<template>
    <div class="tool-detail-overlay" v-if="tool" @click="handleOverlayClick">
        <div class="tool-detail-container" @click.stop>
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

            <!-- 工具详情内容 -->
            <div class="tool-detail-content">
                <!-- 顶部图片和类型标签 -->
                <div class="tool-header">
                    <div class="tool-image">
                        <div class="el-image">
                            <img :src="resolvedIconUrl" :alt="tool.name" class="icon-image" @error="handleImageError">
                        </div>
                    </div>
                    <div class="tool-type-badge" v-if="tool.category">{{ tool.category }}</div>
                </div>

                <!-- 工具标题和标签 -->
                <div class="tool-detail-header">
                    <h2>{{ tool.name }}</h2>
                    <div class="tool-meta">
                        <span class="tool-developer" v-if="tool.developer">
                            <i class="el-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                    <path fill="currentColor"
                                        d="M384 192c0-64-64-64-64-64H192s-64 0-64 64v192s0 64 64 64h128s64 0 64-64V192zM576 192c0-64-64-64-64-64H384s-64 0-64 64v192s0 64 64 64h128s64 0 64-64V192zM384 448c0-64-64-64-64-64H192s-64 0-64 64v192s0 64 64 64h128s64 0 64-64V448zM576 448c0-64-64-64-64-64H384s-64 0-64 64v192s0 64 64 64h128s64 0 64-64V448zM384 704c0-64-64-64-64-64H192s-64 0-64 64v192s0 64 64 64h128s64 0 64-64V704zM576 704c0-64-64-64-64-64H384s-64 0-64 64v192s0 64 64 64h128s64 0 64-64V704z">
                                    </path>
                                    <path fill="currentColor"
                                        d="M896 192c0-64-64-64-64-64H704s-64 0-64 64v192s0 64 64 64h128s64 0 64-64V192zM896 448c0-64-64-64-64-64H704s-64 0-64 64v192s0 64 64 64h128s64 0 64-64V448zM896 704c0-64-64-64-64-64H704s-64 0-64 64v192s0 64 64 64h128s64 0 64-64V704z">
                                    </path>
                                </svg>
                            </i>
                            {{ tool.developer }}
                        </span>
                        <div class="tool-tags">
                            <span class="el-tag el-tag--primary el-tag--small el-tag--plain" v-for="tag in toolTags"
                                :key="tag">
                                <span class="el-tag__content">{{ tag }}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="el-divider el-divider--horizontal" role="separator"></div>

                <!-- 工具内容正文 -->
                <div class="tool-detail-body">
                    <!-- 基本信息部分 -->
                    <div class="tool-info-section">
                        <h3>基本信息</h3>
                        <div class="info-grid">
                            <div class="info-item" v-if="tool.releaseDate">
                                <div class="info-label">发布日期</div>
                                <div class="info-value">{{ tool.releaseDate }}</div>
                            </div>
                            <div class="info-item" v-if="tool.version">
                                <div class="info-label">当前版本</div>
                                <div class="info-value">{{ tool.version }}</div>
                            </div>
                            <div class="info-item" v-if="tool.pricing">
                                <div class="info-label">收费方式</div>
                                <div class="info-value">{{ tool.pricing }}</div>
                            </div>
                            <div class="info-item" v-if="tool.developer">
                                <div class="info-label">开发者</div>
                                <div class="info-value">{{ tool.developer }}</div>
                            </div>
                            <div class="info-item" v-if="tool.platforms">
                                <div class="info-label">支持平台</div>
                                <div class="info-value">{{ Array.isArray(tool.platforms) ? tool.platforms.join(', ') :
                                    tool.platforms }}</div>
                            </div>
                            <div class="info-item official-link-container" v-if="tool.url">
                                <button type="button" class="el-button el-button--primary" @click="openToolWebsite">
                                    <span>
                                        访问官方网站
                                        <i class="el-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                                <path fill="currentColor"
                                                    d="M715.648 625.152 670.4 579.904l90.496-90.56c75.008-74.944 85.12-186.368 22.656-248.896-62.528-62.464-173.952-52.352-248.96 22.656L444.16 353.6l-45.248-45.248 90.496-90.496c100.032-99.968 251.968-110.08 339.456-22.656 87.488 87.488 77.312 239.424-22.656 339.456l-90.496 90.496zm-90.496 90.496-90.496 90.496C434.624 906.112 282.688 916.224 195.2 828.8c-87.488-87.488-77.312-239.424 22.656-339.456l90.496-90.496 45.248 45.248-90.496 90.56c-75.008 74.944-85.12 186.368-22.656 248.896 62.528 62.464 173.952 52.352 248.96-22.656l90.496-90.496zm0-362.048 45.248 45.248L398.848 670.4 353.6 625.152z">
                                                </path>
                                            </svg>
                                        </i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 工具描述部分 -->
                    <div class="tool-description-section">
                        <h3>工具描述</h3>
                        <p class="tool-description">{{ tool.longDescription || tool.description || '暂无详细描述。' }}</p>
                    </div>

                    <!-- 工具截图部分 -->
                    <div class="tool-screenshots-section" v-if="tool.screenshots && tool.screenshots.length">
                        <h3>工具截图</h3>
                        <el-carousel :interval="4000" type="card" height="250px">
                            <el-carousel-item v-for="(screenshot, index) in tool.screenshots" :key="index">
                                <el-image :src="screenshot" fit="cover" :preview-src-list="tool.screenshots"
                                    :initial-index="index" />
                            </el-carousel-item>
                        </el-carousel>
                    </div>

                    <!-- 标签部分 -->
                    <div class="tags-section" v-if="toolTags.length > 0">
                        <h4>相关标签</h4>
                        <div class="tags-container">
                            <span class="el-tag el-tag--primary el-tag--light tag" v-for="tag in toolTags" :key="tag">
                                <span class="el-tag__content">{{ tag }}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- 底部相关推荐 -->
                <div class="tool-detail-footer" v-if="relatedTools.length > 0">
                    <div class="el-divider el-divider--horizontal" role="separator"></div>
                    <div class="related-tools">
                        <h3>相关工具推荐</h3>
                        <div class="el-divider el-divider--horizontal" role="separator"></div>
                        <div class="related-list">
                            <div class="related-item" v-for="relatedTool in relatedTools" :key="relatedTool.id"
                                @click="viewRelatedTool(relatedTool)">
                                <div class="related-category" v-if="relatedTool.category">
                                    {{ relatedTool.category }}
                                </div>
                                <div class="related-info">
                                    <h4>{{ relatedTool.name }}</h4>
                                    <div class="related-meta">
                                        <span>{{ relatedTool.description }}</span>
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
import { computed, watch, onUnmounted } from 'vue';
import { ElNotification } from 'element-plus';
import { defaultToolIcon } from '../../data/allCategories.js';

const props = defineProps({
    tool: {
        type: Object,
        default: null
    },
    allTools: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['close', 'viewRelated']);

// 确保标签始终有值
const toolTags = computed(() => {
    return props.tool?.tags || [];
});

// 计算属性：直接使用图标路径
const resolvedIconUrl = computed(() => {
    const currentTool = props.tool; // 获取当前工具数据
    if (!currentTool) {
        return defaultToolIcon; // 如果工具数据还没加载好，返回默认图标
    }

    const iconPathInData = currentTool.icon; // 获取数据中记录的路径字符串

    if (!iconPathInData) {
        return defaultToolIcon; // 如果数据中没有 icon 路径，返回默认图标
    }

    // 直接返回图标路径
    return iconPathInData;
});

// 相关工具推荐，过滤掉当前工具，最多显示3个
const relatedTools = computed(() => {
    if (!props.allTools || !props.tool) return [];

    // 过滤掉当前工具，优先推荐同类别的工具
    const sameCategoryTools = props.allTools
        .filter(t => t.id !== props.tool.id && t.category === props.tool.category)
        .slice(0, 2);

    // 如果同类别工具不足3个，添加一些其他类别但有相同标签的工具
    let result = [...sameCategoryTools];

    if (result.length < 3 && props.tool.tags && props.tool.tags.length > 0) {
        const tagRelatedTools = props.allTools
            .filter(t => {
                // 已经添加过的不重复添加
                if (result.some(r => r.id === t.id) || t.id === props.tool.id) {
                    return false;
                }
                // 有至少一个共同标签
                return t.tags && t.tags.some(tag => props.tool.tags.includes(tag));
            })
            .slice(0, 3 - result.length);

        result = [...result, ...tagRelatedTools];
    }

    // 如果仍不足3个，随机添加一些其他工具
    if (result.length < 3) {
        const randomTools = props.allTools
            .filter(t => !result.some(r => r.id === t.id) && t.id !== props.tool.id)
            .slice(0, 3 - result.length);

        result = [...result, ...randomTools];
    }

    return result.slice(0, 3); // 确保最多返回3个
});

// 图片加载失败时的处理函数
const handleImageError = (event) => {
    if (event.target.src !== defaultToolIcon) {
        console.warn(`Failed to load image: ${event.target.src}. Falling back to default.`);
        event.target.src = defaultToolIcon;
    }
};

// 关闭详情
const closeDetail = () => {
    emit('close');
};

// 处理背景点击关闭
const handleOverlayClick = () => {
    closeDetail();
};

// 打开工具网站
const openToolWebsite = () => {
    if (props.tool && props.tool.url) {
        ElNotification({
            title: '跳转官方网站',
            message: `正在跳转到"${props.tool.name}"的官方网站`,
            type: 'info'
        });
        window.open(props.tool.url, '_blank');
    }
};

// 查看相关工具
const viewRelatedTool = (tool) => {
    emit('viewRelated', tool);
};

// 处理滚动锁定
let originalOverflow;

// 监听tool属性变化，控制body滚动
watch(() => props.tool, (newVal) => {
    if (newVal) {
        // 保存原始overflow值
        originalOverflow = document.body.style.overflow;
        // 禁止滚动
        document.body.style.overflow = 'hidden';
    } else {
        // 恢复滚动
        document.body.style.overflow = originalOverflow || '';
    }
}, { immediate: true });

// 组件卸载时确保恢复滚动
onUnmounted(() => {
    if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = originalOverflow || '';
    }
});
</script>

<style lang="less" scoped>
// --- 基本变量和通用样式 ---
.tool-detail-overlay {
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

.tool-detail-container {
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

.tool-detail-content {
    overflow-y: auto;
}

.tool-header {
    position: relative;
    height: 180px;
    overflow: hidden;
    background-color: #f5f7fa;
    display: flex;
    justify-content: center;
    align-items: center;

    .tool-image {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .el-image {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .icon-image {
            width: 120px;
            height: 120px;
            object-fit: contain;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
    }

    .tool-type-badge {
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

.tool-detail-header {
    padding: 20px;

    h2 {
        margin: 0 0 10px;
        font-size: 24px;
        font-weight: bold;
        line-height: 1.4;
    }

    .tool-meta {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px 15px;

        .tool-developer {
            display: flex;
            align-items: center;
            color: #606266;
            font-size: 14px;

            i {
                margin-right: 5px;
                font-size: 16px;
            }
        }

        .tool-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
    }
}

.tool-detail-body {
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

// --- 工具信息部分 ---
.tool-info-section {
    margin-bottom: 25px;

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        padding: 0;

        .info-item {
            display: flex;
            flex-direction: column;
            padding: 12px;
            background-color: #f5f7fa;
            border-radius: 6px;

            .info-label {
                color: #909399;
                font-size: 13px;
                margin-bottom: 5px;
            }

            .info-value {
                color: #303133;
                font-size: 14px;
                font-weight: 500;
            }

            &.official-link-container {
                grid-column: 1 / -1;
                padding: 0;
                background-color: transparent;

                .el-button {
                    width: 100%;
                }
            }
        }
    }
}

.tool-description-section {
    margin-bottom: 25px;

    .tool-description {
        margin: 0 0 20px;
        font-size: 14px;
        line-height: 1.6;
        color: #606266;
        white-space: pre-wrap;
    }
}

.tool-screenshots-section {
    margin-bottom: 25px;

    .el-carousel {
        margin-top: 20px;
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

.tool-detail-footer {
    padding: 0 20px 20px;

    .related-tools {
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

            .related-meta {
                font-size: 12px;
                color: #909399;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}

// --- 响应式调整 ---
@media (max-width: 768px) {
    .tool-detail-container {
        max-width: 100%;
        max-height: 95vh;
    }

    .tool-header {
        height: 150px;

        .tool-image .icon-image {
            width: 100px;
            height: 100px;
        }
    }

    .tool-detail-header h2 {
        font-size: 20px;
    }
}

@media (max-width: 480px) {
    .tool-detail-header .tool-meta {
        font-size: 13px;

        .tool-developer i {
            font-size: 14px;
        }
    }

    .tool-info-section .info-grid {
        gap: 10px;

        .info-item {
            padding: 10px;
        }
    }

    .related-list {
        gap: 10px;

        .related-item {
            padding: 10px 12px;
        }
    }
}
</style>