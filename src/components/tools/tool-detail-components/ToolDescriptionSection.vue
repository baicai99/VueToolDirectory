<template>
    <div class="tool-description-section">
        <!-- 工具详细描述 -->
        <div class="description-container">
            <h3 class="section-title">工具描述</h3>
            <p class="tool-description">{{ longDescription }}</p>
        </div>

        <!-- 标签部分 -->
        <div class="tags-section" v-if="tags.length > 0">
            <h4 class="section-title">相关标签</h4>
            <div class="tags-container">
                <span class="el-tag el-tag--primary el-tag--light tag" v-for="tag in tags" :key="tag">
                    <span class="el-tag__content">{{ tag }}</span>
                </span>
            </div>
        </div>

        <!-- 你可能还喜欢 -->
        <div class="recommendations-section">
            <h4 class="section-title">你可能还喜欢</h4>
            <div class="recommendations-list">
                <ItemCard v-for="(item, index) in recommendedTools" :key="index" :item="item" :defaultIcon="defaultIcon"
                    @imageError="onImageError" @click="onViewTool" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import ItemCard from '@/components/base/ItemCard.vue';

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

    .section-title {
        font-size: 24px;
        line-height: 1.16667;
        font-weight: 600;
        letter-spacing: .009em;
        color: #1d1d1f;
        margin: 0 0 20px;
    }
}

.description-container {
    padding: 30px 44px;

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

    .section-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .recommendations-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;
    }
}

// 响应式调整
@media (max-width: 900px) {

    .description-container,
    .tags-section,
    .recommendations-section {
        padding-left: 0;
        padding-right: 0;
    }

    .tool-description-section {
        .section-title {
            font-size: 20px;
            margin-bottom: 15px;
        }
    }

    .description-container {
        padding-top: 20px;
        padding-bottom: 20px;

        .tool-description {
            font-size: 15px;
        }
    }

    .recommendations-section {
        .recommendations-list {
            grid-template-columns: 1fr;
        }
    }
}

@media (max-width: 480px) {
    .tool-description-section {
        .section-title {
            font-size: 18px;
            margin-bottom: 12px;
        }
    }

    .description-container {
        padding-top: 15px;
        padding-bottom: 15px;

        .tool-description {
            font-size: 14px;
            line-height: 1.4;
        }
    }

    .tags-section {
        padding-bottom: 20px;
    }

    .recommendations-section {
        padding-bottom: 20px;
    }
}

@media (max-width: 600px) {

    .description-container,
    .tags-section,
    .recommendations-section {
        padding-left: 16px;
        padding-right: 16px;
    }
}
</style>