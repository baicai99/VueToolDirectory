<!--
/**
 * @component FeatureGallery
 * @description 一个响应式的水平滚动特性卡片画廊组件，提供左右导航按钮控制卡片滚动。
 * 
 * 该组件实现了一个水平滚动的画廊，主要用于展示特性卡片或其他内容，具有以下特点：
 * - 响应式设计，适配不同屏幕尺寸
 * - 平滑的水平滚动效果
 * - 自动计算可见卡片数量和滚动控制
 * - 左右导航按钮，可在卡片间导航
 * - 支持RTL(从右到左)布局
 * 
 * @example
 * <FeatureGallery>
 *   <FeatureCard title="功能1" />
 *   <FeatureCard title="功能2" />
 *   <FeatureCard title="功能3" />
 * </FeatureGallery>
 * 
 * @slots
 * default - 放置要在画廊中展示的卡片或其他内容元素
 * 
 * @implementation
 * 内部实现细节：
 * - 使用计算属性动态决定左右导航按钮的禁用状态
 * - 自动计算卡片宽度和当前可见卡片数量
 * - 监听窗口大小变化以适配不同设备
 * - 平滑滚动动画实现
 * - 支持触控滑动和按钮点击导航
 * 
 * @aiInstructions
 * AI注意事项:
 * - 此组件包含经过精心调整的滚动逻辑和样式
 * - 请不要修改现有代码的结构和逻辑，除非用户明确授权
 * - 特别注意不要改变滚动计算方法、事件处理函数和DOM引用
 * - CSS变量和样式结构对组件的正常运行至关重要，请勿随意更改
 * - 如需添加功能，请在保持现有代码完整性的基础上进行扩展
 * - 对此组件的任何修改都应经过充分测试以确保不影响现有功能
 */
-->
 
<template>
    <section class="section section-consider">
        <div class="consider-container v0 staggered-end">
            <div id="scroll-gallery-feature-cards" class="gallery gallery-align-start gallery-feature-cards"
                style="--scroll-bar-width: 15px;">
                <div class="scroll-container" ref="scrollContainer" style="scroll-snap-type: none;">
                    <div class="item-container">
                        <ul class="card-set">
                            <slot></slot>
                        </ul>
                    </div>
                </div>
                <div class="paddlenav paddlenav-alpha">
                    <ul class="sticky-element">
                        <li class="left-item">
                            <button class="paddlenav-arrow paddlenav-arrow-previous" :disabled="isPrevDisabled"
                                @click="handlePrevClick">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                                    <path
                                        d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z">
                                    </path>
                                </svg>
                            </button>
                        </li>
                        <li class="right-item">
                            <button class="paddlenav-arrow paddlenav-arrow-next" :disabled="isNextDisabled"
                                @click="handleNextClick">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                                    <path
                                        d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z">
                                    </path>
                                </svg>
                            </button>
                        </li>
                        <div class="scrim"></div>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// --- 响应式DOM引用 ---
const scrollContainer = ref(null);

// --- 响应式状态 ---
const isPrevDisabled = ref(true);
const isNextDisabled = ref(false);
const scrollPosition = ref(0);
const maxScrollPosition = ref(0);
const cardWidth = ref(0); // 存储卡片的平均宽度
const visibleCards = ref(0); // 当前可见卡片数量
const totalCardCount = ref(0); // 存储总卡片数量
const currentCardIndex = ref(0); // 当前显示的第一张卡片索引

// --- 计算属性 ---
const canScrollLeft = computed(() => currentCardIndex.value > 0);
const canScrollRight = computed(() => {
    if (!scrollContainer.value || totalCardCount.value === 0) return false;
    return currentCardIndex.value < totalCardCount.value - visibleCards.value;
});

// 计算每次滚动的距离，基于当前可见的卡片宽度
const scrollDistance = computed(() => {
    // 如果有卡片宽度信息，则滚动一个完整卡片的距离
    // 如果没有，则使用默认值400px
    return cardWidth.value > 0 ? cardWidth.value : 400;
});

// --- 方法 ---
const updateScrollState = () => {
    if (!scrollContainer.value) return;

    scrollPosition.value = scrollContainer.value.scrollLeft;
    maxScrollPosition.value =
        scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth;

    // 计算当前显示的第一张卡片索引
    currentCardIndex.value = cardWidth.value > 0 ?
        Math.round(scrollPosition.value / cardWidth.value) : 0;

    // 更新按钮状态
    isPrevDisabled.value = !canScrollLeft.value;
    isNextDisabled.value = !canScrollRight.value;

    // 计算当前视窗中可以显示多少卡片
    calculateCardMetrics();
};

const calculateCardMetrics = () => {
    if (!scrollContainer.value) return;

    // 获取所有卡片元素
    const cards = scrollContainer.value.querySelectorAll('.card-set > *');
    if (cards.length === 0) return;

    // 更新总卡片数量
    totalCardCount.value = cards.length;

    // 计算平均卡片宽度（包括间距）
    let totalWidth = 0;
    cards.forEach(card => {
        totalWidth += card.offsetWidth;
    });

    // 设置平均卡片宽度
    cardWidth.value = totalWidth / cards.length;

    // 计算当前可视区域能显示多少卡片
    const containerWidth = scrollContainer.value.clientWidth;
    visibleCards.value = Math.floor(containerWidth / cardWidth.value);

    // 重新检查按钮状态
    isPrevDisabled.value = !canScrollLeft.value;
    isNextDisabled.value = !canScrollRight.value;
};

const handlePrevClick = () => {
    if (!scrollContainer.value || !canScrollLeft.value) return;

    // 滚动到上一张卡片
    currentCardIndex.value = Math.max(0, currentCardIndex.value - 1);
    const newPosition = currentCardIndex.value * cardWidth.value;

    scrollContainer.value.scrollTo({
        left: newPosition,
        behavior: 'smooth'
    });
};

const handleNextClick = () => {
    if (!scrollContainer.value || !canScrollRight.value) return;

    // 滚动到下一张卡片
    currentCardIndex.value = Math.min(
        totalCardCount.value - visibleCards.value,
        currentCardIndex.value + 1
    );
    const newPosition = currentCardIndex.value * cardWidth.value;

    scrollContainer.value.scrollTo({
        left: newPosition,
        behavior: 'smooth'
    });
};

// --- 生命周期钩子 ---
onMounted(() => {
    // 初始化滚动状态和卡片指标
    setTimeout(() => {
        updateScrollState();
        calculateCardMetrics();
    }, 200); // 短暂延迟以确保DOM完全渲染

    // 监听滚动事件以更新按钮状态
    if (scrollContainer.value) {
        scrollContainer.value.addEventListener('scroll', updateScrollState);

        // 监听窗口大小变化以更新最大滚动位置和卡片指标
        window.addEventListener('resize', () => {
            updateScrollState();
            calculateCardMetrics();
        });
    }
});
</script>

<style>
/* 基本重置和通用设置 */
html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
}

body,
button,
li,
ul {
    margin: 0;
    padding: 0
}

button {
    background: 0 0;
    border: 0;
    box-sizing: initial;
    color: inherit;
    cursor: pointer;
    font: inherit;
    line-height: inherit;
    overflow: visible;
    vertical-align: inherit
}

button:disabled {
    cursor: default
}

:focus-visible {
    outline: 2px solid var(--sk-focus-color, #0071e3);
    outline-offset: var(--sk-focus-offset, 1px)
}

::-moz-focus-inner {
    border: 0;
    padding: 0
}

/* 根变量设置 */
:root {
    --sk-body-text-color: rgb(29, 29, 31);
    --sk-headline-text-color: rgb(29, 29, 31);
    --sk-body-background-color: rgb(255, 255, 255);
    --sk-body-font-stack: text;
    --sk-default-stacked-margin: 0.4em;
    --sk-paragraph-plus-element-margin: 0.8em;
    --sk-headline-plus-first-element-margin: 0.8em;
    --sk-headline-plus-headline-margin: 0.4em;
    --sk-paragraph-plus-headline-margin: 1.6em;
    --sk-body-link-color: rgb(0, 102, 204);
    --sk-link-disabled-opacity: 0.42;
    --sk-focus-color: #0071e3;
    --sk-focus-color-alt: rgb(0, 0, 0);
    --sk-focus-offset: 1px;
    --sk-focus-offset-container: 3px;
    --sk-footnote-font-size: 0.6em;
    --sk-footnote-offset-top: -0.5em;
    --sk-footnote-reduced-font-size: 0.45em;
    --sk-footnote-reduced-offset-top: -0.86em;
}

/* 基本字体设置 */
html {
    font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 106.25%;
}

body {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 400;
    letter-spacing: -.022em;
    font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
    background-color: var(--sk-body-background-color, #fff);
    color: var(--sk-body-text-color, #1d1d1f);
    font-style: normal;
    min-width: 320px;
}

/* 从RTL支持 */
html:not([dir=rtl]) {
    --r-sk-start: left;
    --r-sk-end: right;
    --r-sk-safe-area-inset-start: env(safe-area-inset-left);
    --r-sk-safe-area-inset-end: env(safe-area-inset-right);
    --r-sk-logical-factor: 1
}

html[dir=rtl] {
    --r-sk-start: right;
    --r-sk-end: left;
    --r-sk-safe-area-inset-start: env(safe-area-inset-right);
    --r-sk-safe-area-inset-end: env(safe-area-inset-left);
    --r-sk-logical-factor: -1
}

/* 列表样式 */
ul+* {
    margin-top: var(--sk-paragraph-plus-element-margin, .8em)
}

ul {
    margin-inline-start: 1.1764705882em
}

ul ul {
    margin-top: 0;
    margin-bottom: 0
}

li li {
    font-size: 1em
}

/* 导航箭头样式 */
.paddlenav {
    --sk-paddlenav-diameter: 36px;
    --sk-paddlenav-arrow-color: rgba(0, 0, 0, 0.56);
    --sk-paddlenav-arrow-color-hover: rgba(0, 0, 0, 0.64);
    --sk-paddlenav-arrow-color-active: rgba(0, 0, 0, 0.64);
    --sk-paddlenav-background: transparent;
    --sk-paddlenav-background-hover: transparent;
    --sk-paddlenav-background-active: transparent
}

.paddlenav,
.paddlenav ul {
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: center
}

.paddlenav .paddlenav-arrow {
    background: var(--sk-paddlenav-background);
    color: var(--sk-paddlenav-arrow-color);
    display: block;
    width: var(--sk-paddlenav-diameter);
    height: var(--sk-paddlenav-diameter);
    border-radius: var(--sk-paddlenav-diameter);
    font-style: normal;
    overflow: hidden;
    position: absolute;
    text-align: center;
    line-height: 1;
    transition: background .1s linear, color .1s linear, opacity .1s linear
}

.paddlenav .paddlenav-arrow-next,
.paddlenav .paddlenav-arrow-previous {
    margin-top: calc(var(--sk-paddlenav-diameter)*-.5);
    top: 50%
}

html[dir=rtl] .paddlenav .paddlenav-arrow-next,
html[dir=rtl] .paddlenav .paddlenav-arrow-previous {
    transform: rotate(180deg)
}

.paddlenav .paddlenav-arrow svg path {
    fill: var(--sk-paddlenav-arrow-color);
    transition: fill .1s linear
}

.paddlenav .paddlenav-arrow:hover {
    background: var(--sk-paddlenav-background-hover);
    color: var(--sk-paddlenav-arrow-color-hover);
    text-decoration: none
}

.paddlenav .paddlenav-arrow:hover svg path {
    fill: var(--sk-paddlenav-arrow-color-hover)
}

.paddlenav .paddlenav-arrow:active {
    background: var(--sk-paddlenav-background-active);
    color: var(--sk-paddlenav-arrow-color-active)
}

.paddlenav .paddlenav-arrow:active svg path {
    fill: var(--sk-paddlenav-arrow-color-active)
}

.paddlenav .paddlenav-arrow:focus-visible {
    outline: 2px solid var(--sk-focus-color, #0071e3);
    outline-offset: var(--sk-focus-offset-container, 3px)
}

.paddlenav .paddlenav-arrow.disabled,
.paddlenav .paddlenav-arrow:disabled {
    pointer-events: none;
    opacity: var(--sk-link-disabled-opacity, .42)
}

.paddlenav .paddlenav-arrow-previous {
    inset-inline-start: 18px
}

.paddlenav .paddlenav-arrow-next {
    inset-inline-end: 18px
}

.paddlenav-alpha {
    --sk-paddlenav-background: rgba(210, 210, 215, 0.64);
    --sk-paddlenav-background-hover: rgba(223, 223, 227, 0.6976);
    --sk-paddlenav-background-active: rgba(193, 193, 198, 0.6544)
}

/* 组件样式变量 */
:root {
    --global-card-corner-radius: 28px;
    --global-card-padding: 32px;
    --global-section-padding: 150px;
    --global-section-background-color: rgb(255, 255, 255);
    --global-section-background-color-dark: rgb(0, 0, 0);
    --global-section-background-color-alt: rgb(245, 245, 247);
    --global-section-background-color-alt-dark: #101010;
    --global-scrim-background-color: rgb(250, 250, 252);
    --global-scrim-background-color-dark: rgb(22, 22, 23);
    --global-scrim-background-color-alt: rgb(255, 255, 255);
    --global-scrim-background-color-alt-dark: rgb(0, 0, 0);
    --global-spacing-img-to-headline: 100px;
    --global-staggered-delay: 0.15;
    --global-staggered-opacity-duration: 0.9;
    --global-staggered-translate-y: 30px;
    --global-staggered-translate-y-duration: 0.7;
    --global-viewport-content-responsive: 87.5vw;
    --global-animation-easing-function: cubic-bezier(0.455, 0.030, 0.515, 0.955);
    --global-select-column-space: 20px
}

@media (max-width:1068px) {
    :root {
        --global-card-padding: 28px;
        --global-section-padding: 120px
    }
}

@media (max-width:734px) {
    :root {
        --global-card-padding: 24px;
        --global-section-padding: 90px
    }
}

/* 区域样式 */
.section {
    padding-top: var(--global-section-padding);
    padding-bottom: var(--global-section-padding)
}

/* section-consider特定样式 */
.section.section-consider {
    padding-top: 60px;
    padding-bottom: 60px;
}

@media (max-width:1068px) {
    .section.section-consider {
        padding-top: 50px;
        padding-bottom: 50px;
    }
}

@media (max-width:734px) {
    .section.section-consider {
        padding-top: 40px;
        padding-bottom: 40px;
    }
}

/* 卡片相关样式 */
.gallery .card-set {
    display: grid;
    grid-template-rows: repeat(1, auto);
    grid-template-columns: max-content;
    grid-auto-flow: column;
    grid-column-gap: var(--gallery-column-gap);
    column-gap: var(--gallery-column-gap);
    grid-row-gap: 0;
    row-gap: 0;
    width: -moz-fit-content;
    width: fit-content;
    margin: 0;
    list-style: none
}

.gallery .card-set .card,
.gallery .card-set .card-container {
    height: 100%
}

.feature-card {
    transition: transform .3s cubic-bezier(0, 0, .5, 1)
}

/* 画廊样式 */
.paddlenav .scrim {
    background: linear-gradient(0deg, var(--global-section-background-color), var(--global-section-background-color) 50%, transparent)
}

.gallery {
    position: relative;
    margin-top: 0;
    padding-bottom: 83px;
    --gallery-side-padding: calc(50vw - min(1680px, var(--global-viewport-content-responsive))/2);
    --scroll-bar-width: 0px
}

@media (max-width:734px) {
    .gallery {
        padding-bottom: 78px
    }
}

.gallery ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: rgba(0, 0, 0, 0)
}

.gallery.gallery-align-start .scroll-container {
    scroll-padding: var(--gallery-side-padding)
}

.gallery.gallery-align-start .item-container {
    padding: 0;
    padding-right: var(--gallery-side-padding);
}

.gallery.gallery-align-start .gallery-item {
    scroll-snap-align: start
}

.gallery .scroll-container {
    position: relative;
    overflow-x: scroll;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    padding: 10px 0;
    margin: -10px 0
}

.gallery .scroll-container::-webkit-scrollbar {
    display: none
}

.gallery .item-container {
    --gallery-column-gap: 45px;
    display: grid;
    grid-template-rows: repeat(1, auto);
    grid-template-columns: max-content;
    grid-auto-flow: column;
    grid-column-gap: var(--gallery-column-gap);
    column-gap: var(--gallery-column-gap);
    grid-row-gap: 0;
    row-gap: 0;
    width: -moz-fit-content;
    width: fit-content
}

@media (min-width:1441px) {
    .gallery .item-container {
        --gallery-column-gap: 72px
    }
}

@media (max-width:1068px) {
    .gallery .item-container {
        --gallery-column-gap: 72px
    }
}

@media (max-width:734px) {
    .gallery .item-container {
        --gallery-column-gap: 45px
    }
}

.gallery .paddlenav {
    --sk-paddlenav-arrow-color: rgba(0, 0, 0, 0.56);
    --sk-paddlenav-arrow-color-hover: rgba(0, 0, 0, 0.64);
    --sk-paddlenav-arrow-color-active: rgba(0, 0, 0, 0.64);
    --sk-paddlenav-background: rgba(210, 210, 215, 0.64);
    --sk-paddlenav-background-hover: rgba(223, 223, 227, 0.6976);
    --sk-paddlenav-background-active: rgba(193, 193, 198, 0.6544);
    --paddlenav-offset: 60px;
    position: absolute;
    top: calc(100% - var(--paddlenav-offset));
    right: var(--gallery-side-padding);
    height: 100%;
    visibility: inherit
}

html[dir=rtl] .gallery .paddlenav {
    display: flex;
    justify-content: flex-end;
    right: auto;
    left: var(--gallery-side-padding)
}

@media (max-width:1068px) {
    .gallery .paddlenav {
        --paddlenav-offset: 59px
    }
}

@media (max-width:734px) {
    .gallery .paddlenav {
        --paddlenav-offset: 63px
    }
}

.gallery .paddlenav .sticky-element {
    --sticky-height: 60px;
    --paddlenav-arrow-height: 36px;
    --paddlenav-arrows-offset: 128px;
    --paddlenav-right-offset: calc(var(--paddlenav-arrow-height)*-0.5);
    position: relative;
    width: 0;
    height: var(--sticky-height);
    z-index: 2
}

.gallery .paddlenav .sticky-element .left-item {
    position: absolute;
    right: calc(var(--paddlenav-arrows-offset) + var(--paddlenav-right-offset));
    bottom: calc(var(--paddlenav-arrow-height)*.5)
}

html[dir=rtl] .gallery .paddlenav .sticky-element .left-item {
    right: auto;
    left: calc(var(--paddlenav-arrows-offset) + var(--paddlenav-right-offset))
}

.gallery .paddlenav .sticky-element .right-item {
    position: absolute;
    right: var(--paddlenav-right-offset);
    bottom: calc(var(--paddlenav-arrow-height)*.5)
}

html[dir=rtl] .gallery .paddlenav .sticky-element .right-item {
    right: auto;
    left: var(--paddlenav-right-offset)
}

html[dir=rtl] .gallery .paddlenav .sticky-element .scrim {
    left: calc(var(--gallery-side-padding)*-1)
}

.gallery .paddlenav .sticky-element .paddlenav-arrow {
    width: var(--paddlenav-arrow-height);
    height: var(--paddlenav-arrow-height);
    display: flex;
    justify-content: center;
    align-items: center
}

html[dir=rtl] .gallery .paddlenav .sticky-element .paddlenav-arrow {
    transform: rotate(180deg)
}

.gallery .paddlenav .sticky-element .paddlenav-arrow svg {
    pointer-events: none;
    width: 100%
}

.gallery .paddlenav .sticky-element .paddlenav-arrow::after {
    font-size: 34px;
    padding-inline-start: 0
}

.gallery .paddlenav .sticky-element .paddlenav-arrow .scrim {
    display: none
}

/* 滚动状态相关样式 */
.staggered-start .gallery .scroll-container {
    overflow: hidden
}

.staggered-start .gallery .paddlenav .paddlenav-arrow {
    pointer-events: none;
    opacity: .42
}

.staggered-end .gallery .scroll-container {
    overflow: scroll
}

/* 特别区域样式 */
.section:has(.index) {
    background-color: #fafafc
}

.section-consider .gallery .item-container {
    --gallery-column-gap: 20px
}

[data-at-ab-iaswitch=v1] .section-consider .gallery-feature-cards {
    display: none
}

/* 基本动画 */
@keyframes fadeIn {
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
}

@keyframes welcomeFadeIn {
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
}

@keyframes welcomeMoveIn {
    0% {
        transform: translateY(var(--global-staggered-translate-y))
    }

    100% {
        transform: translateY(0)
    }
}
</style>