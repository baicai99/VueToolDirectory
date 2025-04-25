<!--
/**
 * @component ItemCard
 * @description 通用项目卡片组件，用于各种列表展示场景。
 * 组件提供一个标准化的卡片布局，包含图标、名称和描述文本。
 * 
 * @features
 * - 图标与信息区域垂直居中对齐
 * - 图标区域保持正方形尺寸
 * - 文字溢出处理（单行和多行）
 * - 鼠标悬停动效和阴影增强
 * 
 * @example
 * <ItemCard 
 *   :item="{ 
 *     name: '工具名称', 
 *     icon: '/path/to/icon.png', 
 *     description: '工具描述文本' 
 *   }" 
 *   :defaultIcon="'/default-icon.png'"
 *   :maxDescLength="30"
 *   @imageError="handleError"
 * />
 */

/**
 * @AI_NOTE 
 * 警告：这是一个基础组件(base component)，除非用户明确强调必须修改此组件，否则不要对此组件进行任何修改。
 * 使用此组件时，应当通过CSS变量调整布局和样式，而不是创建新的CSS类或修改组件内部结构。
 * 推荐的做法是通过父组件设置CSS变量来自定义此组件的外观，例如：
 * :root {
 *   --icon-size: 48px;
 *   --icon-radius: 12px;
 *   --title-font-size: 16px;
 *   --desc-font-size: 14px;
 *   --desc-lines: 1;
 * }
 */
-->

<template>
    <div class="item-card">
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

const emit = defineEmits(['imageError']);

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
 * 图片加载错误处理
 */
const handleImageError = (event) => {
    // 当图片加载失败时，将图片源设置为默认图标
    if (props.defaultIcon && event.target) {
        event.target.src = props.defaultIcon;
    }
    emit('imageError', event);
};
</script>

<style lang="less" scoped>
.item-card {
    display: flex;
    padding: 16px;
    border-radius: 14px;
    background-color: #ffffff;
    /* 修改为纯白色背景 */
    border: 1px solid var(--card-border-color, #f0f0f0);
    /* 微调边框颜色使其更浅 */
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    /* 添加浅浅的阴影 */

    &:hover {
        background-color: #ffffff;
        /* 保持白色背景 */
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        /* 悬停时加深阴影 */
        cursor: pointer;
        /* 鼠标悬停时显示为手型指针 */
    }

    .item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: var(--icon-size, 48px);
        height: var(--icon-size, 48px);
        border-radius: var(--icon-radius, 12px);
        overflow: hidden;
        background-color: white;
        align-self: center; // 垂直居中显示

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .item-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
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