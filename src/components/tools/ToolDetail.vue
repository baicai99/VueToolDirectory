<template>
    <Card v-if="tool" v-model:visible="isVisible" modalClass="tool-detail-modal" @close="closeDetail">
        <!-- 使用子组件：顶部图片和类型标签 -->
        <ToolDetailHeader :iconUrl="resolvedIconUrl" :toolName="tool.name" :category="tool.category"
            :defaultIcon="defaultToolIcon" @imageError="handleImageError" />

        <!-- 使用子组件：应用商店式布局 -->
        <ToolInfoSection :iconUrl="resolvedIconUrl" :toolName="tool.name"
            :description="tool.shortDescription || tool.description" @imageError="handleImageError"
            @visitWebsite="openToolWebsite" />

        <div class="preview-section">
            <h3 class="section-title">预览</h3>
            <div class="preview-overflow-container">
                <FeatureGallery v-if="toolScreenshots && toolScreenshots.length > 0">
                    <li v-for="(screenshot, index) in toolScreenshots" :key="index">
                        <FeatureCard :cardWidth="650" :showButton="false" :idSuffix="`preview-${index}`"
                            :label="tool.name" :headline="`${tool.name} 截图 ${index + 1}`" :imageUrl="screenshot"
                            :imageAlt="`${tool.name} 预览图片 ${index + 1}`" imagePosition="image-full"
                            @openModal="handlePreviewClick(screenshot)" />
                    </li>
                </FeatureGallery>
                <div v-else class="preview-placeholder">
                    <div class="no-preview-text">暂无预览图</div>
                </div>
            </div>
        </div>

        <!-- 使用子组件：工具描述部分 -->
        <ToolDescriptionSection :longDescription="tool.longDescription || tool.description || '暂无详细描述。'"
            :tags="toolTags" :recommendedTools="recommendedTools" :defaultIcon="defaultToolIcon"
            @viewTool="viewRelatedTool" @imageError="handleImageError" />
    </Card>
</template>

<script setup>
import { computed, watch, onUnmounted, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { defaultToolIcon } from '../../data/allCategories.js';
import Card from '../base/Card.vue';

// 导入子组件
import ToolDetailHeader from './tool-detail-components/ToolDetailHeader.vue';
import ToolInfoSection from './tool-detail-components/ToolInfoSection.vue';
import ToolDescriptionSection from './tool-detail-components/ToolDescriptionSection.vue';
// 导入新组件替代ToolPreviewSection
import FeatureGallery from '../base/FeatureGallery.vue';
import FeatureCard from '../base/FeatureCard.vue';

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

// 添加可见性状态控制
const isVisible = ref(true);

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
    isVisible.value = false;
    emit('close');
};

// 不再需要处理背景点击关闭，由Card组件处理
// const handleOverlayClick = () => {
//     closeDetail();
// };

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
        // 显示模态框
        isVisible.value = true;
    } else {
        // 隐藏模态框
        isVisible.value = false;
    }
}, { immediate: true });

// 组件卸载时确保恢复滚动
onUnmounted(() => {
    // 即使组件意外销毁，也确保恢复滚动状态
    document.body.style.overflow = originalOverflow || '';
});

// 添加处理预览图点击的方法
const handlePreviewClick = (imageUrl) => {
    // 这里可以添加点击预览图后的逻辑，例如显示大图等
    if (imageUrl) {
        ElNotification({
            title: '图片预览',
            message: '查看大图',
            type: 'info'
        });
        window.open(imageUrl, '_blank');
    }
};
</script>

<style lang="less" scoped>
// --- 内容样式 ---
.modal-content {
    width: 100%;
}

.tool-detail-body {
    padding: 0 20px 20px;
}

// 预览部分样式
.preview-section {
    padding: 20px 0 30px;

    // 删除旧的preview-title样式，使用section-title样式
    .section-title {
        font-size: 24px;
        line-height: 1.16667;
        font-weight: 600;
        letter-spacing: .009em;
        color: #1d1d1f;
        margin: 0 0 20px;
    }

    .preview-placeholder {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e5e9f2;
        color: #909399;
        font-size: 14px;
        font-weight: bold;
        border-radius: 12px;
        margin: 0 20px;
    }

    // 新增预览容器样式，允许内容超出右侧内边距
    .preview-overflow-container {
        position: relative;
        width: 100%;
        margin-right: calc(var(--modal-overlay-padding-inline) * -1);
        padding-right: var(--modal-overlay-padding-inline);

        :deep(.gallery) {
            overflow: visible;
        }

        :deep(.scroll-container) {
            margin-right: calc(var(--modal-overlay-padding-inline) * -1);
            padding-right: var(--modal-overlay-padding-inline);
        }

        :deep(.card-set) {
            margin-right: 0;
        }
    }
}

// 移除预览组件、tags组件、推荐组件和描述组件的左右内边距
:deep(.tags-section) {
    padding: 0 0 30px;
}

:deep(.recommendations-section) {
    padding: 0 0 30px;
}

:deep(.description-container) {
    padding: 30px 0;
}

// --- 响应式调整 ---
@media (max-width: 768px) {
    :deep(.modal-overlay) {
        max-width: 100%;
        border-radius: 12px;
    }

    .preview-section {
        padding: 15px 0 20px;

        .preview-placeholder {
            height: 180px;
            margin: 0 10px;
        }

        .section-title {
            font-size: 20px;
            margin-bottom: 15px;
        }
    }

    :deep(.tags-section) {
        padding: 0 0 20px;
    }

    :deep(.recommendations-section) {
        padding: 0 0 20px;
    }

    :deep(.description-container) {
        padding: 20px 0;
    }
}

@media (max-width: 480px) {

    // 超小屏幕适配
    .preview-section {
        .preview-overflow-container {
            margin-right: calc(var(--modal-overlay-padding-inline) * -1);
            padding-right: var(--modal-overlay-padding-inline);
        }
    }
}
</style>