<!--
/**
 * @component Card
 * @description 通用模态卡片组件，用于创建弹出式对话框、详情展示或内容预览。
 * 该组件基于 Vue 3 的 Composition API 实现，提供了可自定义的外观和行为。
 * 
 * @features
 * - 支持 v-model 绑定控制显示/隐藏状态
 * - 可通过点击遮罩层或关闭按钮关闭
 * - 提供内容插槽，可自定义卡片内容
 * - 响应式设计，自适应不同屏幕尺寸
 * - 支持自定义 CSS 类扩展样式
 * - 模态框出现/消失时有平滑过渡动画
 * 
 * @props
 * - visible {Boolean} - 控制模态框是否可见，支持 v-model 绑定
 * - modalClass {String} - 允许添加自定义 CSS 类
 * - closeOnOverlay {Boolean} - 点击遮罩层是否可关闭模态框
 * 
 * @events
 * - update:visible - 更新可见状态
 * - close - 模态框关闭时触发
 * 
 * @example
 * <Card v-model:visible="showModal">
 *   <div class="custom-content">
 *     <h2>模态框标题</h2>
 *     <p>这里是模态框内容...</p>
 *   </div>
 * </Card>
 * 
 * @version 1.0.0
 * @author YourName
 * 
 * @AI_NOTE 
 * 警告：这是一个基础组件(base component)，除非用户明确强调必须修改此组件，否则不要对此组件进行任何修改。
 * 此组件的CSS样式已经过精心设计和测试，被认为是完美的，不应使用额外的CSS类或样式进行修改。
 * 使用此组件时，应当通过props和插槽来自定义行为和内容，而不是修改组件本身的结构或样式。
 */
-->

<template>
    <div v-if="visible" class="card-modal" :class="[
        { 'modal-open': visible, 'visually-visible': visible },
        modalClass
    ]" @click="handleOverlayClick">
        <div class="modal-overlay-container">
            <div class="modal-overlay" @click.stop>
                <div class="modal-content-container">
                    <div class="modal-content-wrapper">
                        <div class="modal-content">
                            <!-- 插槽: 允许父组件传入内容 -->
                            <slot></slot>
                        </div>
                    </div>
                </div>
                <button class="modal-close-button" @click="closeModal">
                    <span class="modal-close-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z">
                            </path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义属性
const props = defineProps({
    // 控制模态框是否可见
    visible: {
        type: Boolean,
        default: false
    },
    // 允许自定义额外的 CSS 类
    modalClass: {
        type: String,
        default: 'modal-page-overlay modal-scrim'
    },
    // 点击遮罩层是否可关闭
    closeOnOverlay: {
        type: Boolean,
        default: true
    }
});

// 定义事件
const emit = defineEmits(['close', 'update:visible']);

// 处理关闭模态框
const closeModal = () => {
    emit('update:visible', false);
    emit('close');
};

// 处理点击遮罩层
const handleOverlayClick = () => {
    if (props.closeOnOverlay) {
        closeModal();
    }
};
</script>

<style scoped>
.card-modal {
    --modal-overlay-background: rgb(255, 255, 255);
    --modal-overlay-padding-top: 76px;
    --modal-overlay-padding-bottom: 76px;
    --modal-overlay-padding-inline: 76px;
    --modal-close-button-offset-top: 16px;
    --modal-close-button-offset-inline-start: 16px;
    --modal-close-button-size: 44px;
    --modal-close-background: rgb(232, 232, 237);
    --modal-close-background-hover: #ececf0;
    --modal-close-background-active: #dfdfe4;
    --modal-close-color: rgba(0, 0, 0, 0.56);
    --modal-close-color-hover: rgba(0, 0, 0, 0.72);
    --modal-close-border-radius: 50%;
    --modal-close-button-position: sticky;
    --modal-close-icon-size: 36px;
    --modal-close-icon-svg-size: 20px;
    --modal-scrim-background: rgba(0, 0, 0, 0.48);
    --modal-overlay-margin-top: 40px;
    --modal-overlay-margin-bottom: var(--modal-overlay-margin-top);
    --modal-overlay-border-radius-top: 18px;
    --modal-overlay-border-radius-bottom: var(--modal-overlay-border-radius-top);
    --modal-overlay-width: 816px;
    --modal-close-timeout: 400ms;

    background: var(--modal-scrim-background);
    position: fixed;
    z-index: 11000;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
    overflow: auto;
    color: var(--sk-body-text-color, #1d1d1f);
    transition: opacity var(--modal-close-timeout) ease;
}

/* 增强模态框的毛玻璃效果 */
.card-modal.modal-open.visually-visible {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

/* 工具详情模态框特殊效果 */
.card-modal.tool-detail-modal {
    --modal-scrim-background: rgba(0, 0, 0, 0.35);
    /* 更透明的背景，更明显的毛玻璃效果 */
}

@media (max-width:1068px) {
    .card-modal {
        --modal-overlay-width: 692px;
    }
}

@media (max-width:734px) {
    .card-modal {
        --modal-overlay-width: max(87.5%, 480px);
        --modal-overlay-padding-bottom: 60px;
    }
}

@media (max-width:480px) {
    .card-modal {
        --modal-overlay-border-radius-bottom: 0;
        --modal-overlay-width: 100%;
        --modal-close-button-offset-top: max(16px, env(safe-area-inset-top));
    }
}

.modal-overlay-container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    min-height: 100%;
}

.modal-overlay {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    margin-inline-start: auto;
    margin-inline-end: auto;
    box-sizing: border-box;
    border-radius: var(--modal-overlay-border-radius-top) var(--modal-overlay-border-radius-top) var(--modal-overlay-border-radius-bottom) var(--modal-overlay-border-radius-bottom);
    width: var(--modal-overlay-width);
    margin-top: var(--modal-overlay-margin-top);
    margin-bottom: var(--modal-overlay-margin-bottom);
}

.modal-overlay:focus-visible {
    outline: 2px solid var(--sk-focus-color, #0071e3);
    outline-offset: 0;
}

.modal-content-container {
    background: var(--modal-overlay-background);
    order: 2;
    box-sizing: border-box;
    padding-inline-start: var(--modal-overlay-padding-inline);
    padding-inline-end: var(--modal-overlay-padding-inline);
    padding-top: var(--modal-overlay-padding-top);
    padding-bottom: var(--modal-overlay-padding-bottom);
    margin-top: calc(-44px + var(--modal-close-button-offset-top)*-1);
    border-radius: inherit;
    mask-image: radial-gradient(white, #000);
}

.modal-close-button {
    cursor: pointer;
    position: var(--modal-close-button-position);
    order: 1;
    display: flex;
    align-self: flex-end;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    height: var(--modal-close-button-size);
    width: var(--modal-close-button-size);
    margin: 0;
    padding: 0;
    border: 0;
    margin-inline-end: var(--modal-close-button-offset-inline-start);
    margin-top: var(--modal-close-button-offset-top);
    top: var(--modal-close-button-offset-top);
    background: transparent;
    /* 添加透明背景 */
}

.modal-close-button:focus-visible {
    outline: 0;
}

.modal-close-button:focus-visible .modal-close-icon {
    outline: 2px solid var(--sk-focus-color, #0071e3);
    outline-offset: 3px;
}

.modal-close-button .modal-close-icon {
    background: var(--modal-close-background);
    border-radius: var(--modal-close-border-radius);
    color: var(--modal-close-color);
    display: flex;
    align-items: center;
    justify-content: center;
    /* 添加水平居中对齐 */
    height: var(--modal-close-icon-size);
    width: var(--modal-close-icon-size);
    outline: 0;
    transition: color .1s linear, background .1s linear;
    position: relative;
}

.modal-close-button:hover .modal-close-icon {
    background: var(--modal-close-background-hover);
    color: var(--modal-close-color-hover);
}

.modal-close-button:active .modal-close-icon {
    background: var(--modal-close-background-active);
}

.modal-close-button .modal-close-icon svg {
    fill: currentColor;
    position: static;
    /* 修改定位方式 */
    /* 移除旧有定位和转换 */
    /* inset-inline-start: 50%; */
    /* transform: translateX(-50%); */
    height: var(--modal-close-icon-svg-size);
    width: var(--modal-close-icon-svg-size);
    /* 让svg位于中央 */
    display: block;
}

.modal-close-button .modal-close-icon * {
    pointer-events: none;
}

/* 移动端适配 */
@media (max-width: 480px) {
    .modal-overlay-container {
        flex-direction: column;
    }

    .modal-overlay {
        --modal-overlay-margin-top: 20px;
        --modal-overlay-margin-bottom: 0;
        flex-grow: 1;
    }

    .modal-overlay .modal-content-container {
        flex-grow: 1;
    }
}

/* 动画效果 */
.visually-visible {
    opacity: 1;
}

@supports ((-webkit-backdrop-filter:initial) or (backdrop-filter:initial)) {
    .modal-scrim:not(.modal-scrim-no-blur) {
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
    }

    /* 为工具详情模态框增加特殊的毛玻璃效果 */
    .tool-detail-modal .modal-overlay {
        background-color: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px) saturate(180%);
        -webkit-backdrop-filter: blur(12px) saturate(180%);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        /* border: 1px solid rgba(255, 255, 255, 0.18); */
    }

    /* 确保内容容器保持清晰 */
    .tool-detail-modal .modal-content-container {
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }
}
</style>