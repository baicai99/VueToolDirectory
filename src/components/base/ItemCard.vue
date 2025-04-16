<template>
    <div class="item-card" @click="handleClick">
        <div class="item-icon">
            <img :src="item.icon || defaultIcon" :alt="item.name || '项目'" @error="handleImageError">
        </div>
        <div class="item-info">
            <div class="item-name">{{ item.name || '未命名项目' }}</div>
            <div class="item-desc">{{ item.shortDescription || truncateText(item.description, maxDescLength) }}</div>
        </div>
    </div>
</template>

<script setup>
/**
 * 通用项目卡片组件
 * 可用于推荐项目、列表项等多种场景
 */
const props = defineProps({
    /** 项目数据对象 */
    item: {
        type: Object,
        required: true
    },
    /** 默认图标，当item.icon不存在时显示 */
    defaultIcon: {
        type: String,
        default: ''
    },
    /** 描述文本最大长度 */
    maxDescLength: {
        type: Number,
        default: 30
    }
});

const emit = defineEmits(['click', 'imageError']);

/**
 * 截取文本的辅助方法
 * @param {String} text 需要截取的文本
 * @param {Number} maxLength 最大长度
 * @returns {String} 截取后的文本
 */
const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

/**
 * 处理点击事件
 */
const handleClick = () => {
    emit('click', props.item);
};

/**
 * 图片加载错误处理
 */
const handleImageError = (event) => {
    emit('imageError', event);
};
</script>

<style lang="less" scoped>
.item-card {
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 12px;
    background-color: var(--card-bg-color, #f5f5f7);
    border: 1px solid var(--card-border-color, #e6e6e6);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: var(--card-hover-bg-color, #ebebf0);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }

    .item-icon {
        flex-shrink: 0;
        width: var(--icon-size, 48px);
        height: var(--icon-size, 48px);
        border-radius: var(--icon-radius, 12px);
        overflow: hidden;
        background-color: white;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .item-info {
        margin-left: 16px;
        flex-grow: 1;
        overflow: hidden;

        .item-name {
            font-size: var(--title-font-size, 16px);
            line-height: 1.25;
            font-weight: 500;
            color: var(--title-color, #1d1d1f);
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .item-desc {
            font-size: var(--desc-font-size, 14px);
            line-height: 1.33337;
            font-weight: 400;
            color: var(--desc-color, #515154);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: var(--desc-lines, 1);
            -webkit-box-orient: vertical;
        }
    }
}
</style>