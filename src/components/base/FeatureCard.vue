<!--
/**
 * @component FeatureCard
 * @description 特性卡片组件，用于在画廊或网格中展示带有图片和文字的内容卡片。
 * 该组件提供了丰富的自定义选项，可用于产品特性展示、工具预览、图片画廊等多种场景。
 * 
 * @features
 * - 支持自定义卡片尺寸（宽度和高度）
 * - 可选择显示或隐藏左下角展开按钮
 * - 可选择显示或隐藏左上角文字内容
 * - 支持文字颜色切换（黑色或白色）
 * - 支持多种图片位置模式（全屏、居中等）
 * - 支持浅色和深色主题
 * - 包含点击交互和悬停效果
 * 
 * @props
 * - idSuffix {String} - 用于构造唯一图片ID（默认：'card'）
 * - theme {String} - 卡片主题，可选'light'或'dark'（默认：'light'）
 * - label {String} - 卡片顶部标签文本（必填）
 * - headline {String} - 卡片标题文本，可包含HTML标签（必填）
 * - imageUrl {String} - 图片URL地址（必填）
 * - imageAlt {String} - 图片的alt文本（必填）
 * - imagePosition {String} - 图片位置，可选值：null, 'image-bottom-center', 'image-center-center', 'image-full', 'image-backdrop'
 * - showButton {Boolean} - 是否显示左下角按钮（默认：true）
 * - cardWidth {String|Number} - 自定义卡片宽度，可使用像素值或CSS单位（默认：null，使用内置响应式宽度）
 * - cardHeight {String|Number} - 自定义卡片高度（默认：null）
 * - showText {Boolean} - 是否显示左上角文字（默认：true）
 * - textColor {String} - 文字颜色，可选'black'或'white'（默认：'black'）
 * 
 * @events
 * - openModal - 点击卡片时触发，传递idSuffix参数
 * 
 * @example
 * <FeatureCard 
 *   label="AI工具" 
 *   headline="智能助手" 
 *   imageUrl="/path/to/image.jpg" 
 *   imageAlt="智能助手预览图"
 *   textColor="white"
 *   :showButton="true"
 *   :cardWidth="350"
 *   :cardHeight="450"
 *   @openModal="handleOpenModal"
 * />
 * 
 * @version 1.1.0
 * 
 * @AI_NOTE 
 * 警告：这是一个基础组件(base component)，除非用户明确强调必须修改此组件，否则不要对此组件进行任何修改。
 * 此组件的CSS样式已经过精心设计和测试，被认为是完美的，不应使用额外的CSS类或样式进行修改。
 * 使用此组件时，应当通过props和插槽来自定义行为和内容，而不是修改组件本身的结构或样式。
 */
-->

<template>
    <div class="feature-card card-container" :style="cardStyle">
        <div class="card">
            <div class="card-modifier card-padding"
                :class="{ 'theme-dark': theme === 'dark', 'fixed-width': !cardWidth }">
                <div class="card-viewport-content">
                    <div class="feature-card-content">
                        <div v-if="showText" class="feature-card-copy"
                            :class="{ 'text-white': textColor === 'white', 'text-black': textColor === 'black' }">
                            <p class="typography-feature-card-label feature-card-label">
                                {{ label }}
                            </p>
                            <p class="typography-card-headline feature-card-headline" v-html="headline"></p>
                        </div>
                        <figure class="feature-card-image-container" :class="imagePosition || 'image-full'">
                            <img :id="`overview-consider-${idSuffix}-1`"
                                class="overview-consider-image feature-card-image" :src="imageUrl" :alt="imageAlt" />
                            <noscript>
                                <img :id="`overview-consider-${idSuffix}-1-noscript`"
                                    class="overview-consider-image feature-card-image" :src="imageUrl"
                                    :alt="imageAlt" />
                            </noscript>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <button v-if="showButton" class="card-modal-trigger modal-trigger card-cta-modal-button"
            @click="handleOpenModal">
            <div class="modal-trigger-container">
                <span class="card-cta-modal-button-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        class="card-cta-modal-button-small-icon card-modal-button-small-icon">
                        <path
                            d="M17.25,8.51H11.5V2.75A1.5,1.5,0,0,0,10,1.25h0a1.5,1.5,0,0,0-1.5,1.5V8.5H2.75a1.5,1.5,0,0,0,0,3H8.5v5.75a1.5,1.5,0,0,0,1.5,1.5h0a1.5,1.5,0,0,0,1.5-1.5V11.5h5.75a1.5,1.5,0,0,0,0-3Z">
                        </path>
                    </svg>
                </span>
            </div>
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

// 定义组件接收的属性 (props)
const props = defineProps({
    // 用于构造图片 ID 等（可选，根据实际需求）
    idSuffix: {
        type: String,
        default: 'card', // 提供一个默认值
    },
    // 主题，'light' 或 'dark'
    theme: {
        type: String,
        default: 'light', // 默认浅色主题
        validator: (value) => ['light', 'dark'].includes(value),
    },
    // 卡片标签文本
    label: {
        type: String,
        required: true,
    },
    // 卡片标题文本 (可以包含 HTML 如 <br>)
    headline: {
        type: String,
        required: true,
    },
    // 图片 URL
    imageUrl: {
        type: String,
        required: true,
    },
    // 图片 Alt 文本
    imageAlt: {
        type: String,
        required: true,
    },
    // 图片位置
    imagePosition: {
        type: String,
        default: null,
        validator: (value) => [
            null,
            'image-bottom-center',
            'image-center-center',
            'image-full',
            'image-backdrop'
        ].includes(value),
    },
    // 是否显示左下角按钮
    showButton: {
        type: Boolean,
        default: true
    },
    // 自定义卡片宽度
    cardWidth: {
        type: [String, Number],
        default: null
    },
    // 自定义卡片高度
    cardHeight: {
        type: [String, Number],
        default: null
    },
    // 是否显示左上角文字
    showText: {
        type: Boolean,
        default: true
    },
    // 文字颜色，'black' 或 'white'
    textColor: {
        type: String,
        default: 'black',
        validator: (value) => ['black', 'white'].includes(value)
    }
});

// 计算卡片样式
const cardStyle = computed(() => {
    const style = {};

    if (props.cardWidth) {
        style.width = typeof props.cardWidth === 'number' ? `${props.cardWidth}px` : props.cardWidth;
    }

    if (props.cardHeight) {
        style.height = typeof props.cardHeight === 'number' ? `${props.cardHeight}px` : props.cardHeight;
    }

    return style;
});

// 定义组件可以触发的事件 (emits)
const emit = defineEmits(['openModal']);

// 处理点击事件的方法
const handleOpenModal = () => {
    // 发射 openModal 事件，可以传递数据给父组件，例如卡片 ID
    emit('openModal', props.idSuffix); // 示例：传递 idSuffix
    console.log(`Modal trigger clicked for card: ${props.idSuffix}`);
};
</script>

<style lang="less" scoped>
/* 卡片基本样式 */
.feature-card {
    position: relative;
    display: block;
    border-radius: 28px;
    overflow: hidden;
    transition: transform 0.3s ease;
    width: max-content;

    /* 添加此行，确保feature-card自身不会过宽 */
    &:hover {
        transform: translateY(-5px);
    }

    .card-container {
        position: relative;
        height: 100%;
    }

    .card {
        height: 100%;
        display: flex;
        flex-direction: column;
        width: inherit;
        /* 更改为inherit，从父元素继承宽度 */
    }

    .card-modifier {
        background: #f5f5f7;
        border-radius: 28px;
        box-sizing: border-box;
        height: 100%;
        min-height: 480px;
        overflow: hidden;
        position: relative;

        &.theme-dark {
            background: #242426;

            p {
                color: #f5f5f7;
            }
        }

        &.card-padding {
            padding: 32px;

            @media (max-width: 1068px) {
                padding: 28px;
            }

            @media (max-width: 734px) {
                padding: 24px;
            }
        }

        &.fixed-width {
            width: 372px;

            @media (min-width: 1441px) {
                width: 405px;
            }

            @media (max-width: 1068px) {
                width: 344px;
            }

            @media (max-width: 734px) {
                width: 260px;
            }
        }
    }

    .feature-card-content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .feature-card-copy {
        z-index: 1;
        position: relative;
        padding-bottom: 20px;

        &.text-white {
            color: #ffffff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

            .feature-card-label,
            .feature-card-headline {
                color: #ffffff;
            }
        }

        &.text-black {
            color: #000000;

            .feature-card-label,
            .feature-card-headline {
                color: #000000;
            }
        }
    }

    .feature-card-label {
        font-size: 17px;
        line-height: 1.23536;
        font-weight: 600;
        letter-spacing: -.022em;
        margin: 0;

        @media (max-width: 1068px) {
            font-size: 14px;
            line-height: 1.28577;
            letter-spacing: -.016em;
        }
    }

    .feature-card-headline {
        font-size: 28px;
        line-height: 1.14286;
        font-weight: 600;
        letter-spacing: .007em;
        margin: 0;

        @media (max-width: 1068px) {
            font-size: 24px;
            line-height: 1.16667;
            letter-spacing: .009em;
        }

        @media (max-width: 734px) {
            font-size: 21px;
            line-height: 1.19048;
            letter-spacing: .011em;
        }
    }

    .feature-card-image-container {
        position: absolute;
        margin: 0;

        &.image-bottom-center {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }

        &.image-center-center {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &.image-full {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;

            .feature-card-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &.image-backdrop {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));
            }

            .feature-card-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .feature-card-image {
            position: relative;
            display: flex;
            max-width: 100%;
            height: auto;
        }
    }

    .card-modal-trigger {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
        border-radius: 28px;
        z-index: 1;
        width: 100%;
        height: 100%;

        .modal-trigger-container {
            width: 100%;
            height: 100%;
        }

        .card-cta-modal-button-icon {
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 36px;
            width: 36px;
            position: absolute;
            z-index: 1;
            right: 20px;
            bottom: 20px;
            background-color: rgba(51, 51, 54, 0.8);
            color: #d6d6d7;
            transition: background-color .1s linear, color .1s linear;

            &:hover {
                background-color: rgba(55, 55, 58, 0.9);
                color: #ffffff;
            }

            svg {
                width: 18px;
                height: 18px;
                fill: currentColor;
            }
        }
    }
}
</style>