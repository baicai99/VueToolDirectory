<template>
    <div class="modal modal-scrim modal-page-overlay modal-open visually-visible" v-if="tool"
        @click="handleOverlayClick">
        <div class="modal-overlay-container">
            <div class="modal-overlay" aria-modal="true" role="dialog" @click.stop>
                <!-- 工具详情内容 -->
                <div class="modal-content-container">
                    <div class="modal-content-wrapper variant-crossfade">
                        <div class="modal-content">
                            <!-- 使用子组件：顶部图片和类型标签 -->
                            <ToolDetailHeader :iconUrl="resolvedIconUrl" :toolName="tool.name" :category="tool.category"
                                :defaultIcon="defaultToolIcon" @imageError="handleImageError" />

                            <!-- 使用子组件：应用商店式布局 -->
                            <ToolInfoSection :iconUrl="resolvedIconUrl" :toolName="tool.name"
                                :description="tool.shortDescription || tool.description" @imageError="handleImageError"
                                @visitWebsite="openToolWebsite" />

                            <!-- 使用子组件：预览组件 -->
                            <ToolPreviewSection :toolName="tool.name" :screenshots="toolScreenshots" />

                            <!-- 工具内容正文 -->
                            <div class="tool-detail-body">
                                <!-- 使用子组件：工具描述部分 -->
                                <ToolDescriptionSection
                                    :longDescription="tool.longDescription || tool.description || '暂无详细描述。'"
                                    :tags="toolTags" :recommendedTools="recommendedTools" :defaultIcon="defaultToolIcon"
                                    @viewTool="viewRelatedTool" @imageError="handleImageError" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 关闭按钮 -->
                <button type="button" class="modal-close-button" @click="closeDetail">
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
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, onUnmounted } from 'vue';
import { ElNotification } from 'element-plus';
import { defaultToolIcon } from '../../data/allCategories.js';

// 导入子组件
import ToolDetailHeader from './tool-detail-components/ToolDetailHeader.vue';
import ToolInfoSection from './tool-detail-components/ToolInfoSection.vue';
import ToolPreviewSection from './tool-detail-components/ToolPreviewSection.vue';
import ToolDescriptionSection from './tool-detail-components/ToolDescriptionSection.vue';

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

// 添加一个用于"你可能还喜欢"的推荐工具列表
const recommendedTools = computed(() => {
    if (!props.allTools || !props.tool || !props.tool.tags || props.tool.tags.length === 0) {
        return [];
    }

    // 寻找有相同标签的工具
    const similarTools = props.allTools
        .filter(t => {
            // 排除当前工具和已经在相关工具中的工具
            if (t.id === props.tool.id || relatedTools.value.some(r => r.id === t.id)) {
                return false;
            }
            // 找出有共同标签的工具
            return t.tags && t.tags.some(tag => props.tool.tags.includes(tag));
        })
        .slice(0, 4); // 最多显示4个推荐

    return similarTools;
});

// 如果tool没有截图，使用示例图片
const getRandomPreviewImages = () => {
    const previewImages = [
        'https://picsum.photos/800/500?random=1',
        'https://picsum.photos/800/500?random=2',
        'https://picsum.photos/800/500?random=3',
        'https://picsum.photos/800/500?random=4',
        'https://picsum.photos/800/500?random=5'
    ];

    // 随机返回1-3张图片
    const count = Math.floor(Math.random() * 3) + 1;
    return previewImages.slice(0, count);
};

// 确保工具始终有预览图
const toolScreenshots = computed(() => {
    if (props.tool?.screenshots && props.tool.screenshots.length > 0) {
        return props.tool.screenshots;
    }
    return getRandomPreviewImages();
});

// 截取描述文本的辅助方法
const truncateDescription = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

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
        // 禁止滚动，只在组件显示时禁用
        document.body.style.overflow = 'hidden';
    } else {
        // 恢复滚动
        document.body.style.overflow = originalOverflow || '';
    }
}, { immediate: true });

// 组件卸载时确保恢复滚动
onUnmounted(() => {
    // 即使组件意外销毁，也确保恢复滚动状态
    document.body.style.overflow = originalOverflow || '';
});
</script>

<style lang="less" scoped>
// --- 苹果风格的模态框样式 ---
.modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11000;
    overflow: auto;

    &.modal-scrim {
        background-color: rgba(0, 0, 0, 0.48);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }

    &.modal-open {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.modal-overlay-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.modal-overlay {
    position: relative;
    background-color: white;
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    width: 100%;
    max-width: 900px;
    margin: auto;
    overflow: hidden;
    padding: 0;
    transform: translateZ(0);
    will-change: transform;
    isolation: isolate;
}

.modal-content-container {
    width: 100%;
}

.modal-content-wrapper {
    width: 100%;
}

.modal-content {
    width: 100%;
}

.modal-close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }

    i {
        font-size: 16px;
    }
}

.tool-detail-body {
    padding: 0 20px 20px;
}

// --- 响应式调整 ---
@media (max-width: 768px) {
    .modal-overlay {
        max-width: 100%;
        border-radius: 12px;
    }
}
</style>