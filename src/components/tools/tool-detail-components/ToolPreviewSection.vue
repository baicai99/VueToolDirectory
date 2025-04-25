<template>
    <div class="preview-component">
        <div class="preview-title">预览</div>
        <div class="carousel-container" v-if="screenshots && screenshots.length > 0">
            <div class="carousel-inner" :style="{ transform: `translateX(${-currentIndex * 100}%)` }"
                @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
                <div class="carousel-item" v-for="(screenshot, index) in screenshots" :key="index">
                    <img :src="screenshot" :alt="toolName + ' 预览 ' + (index + 1)" class="preview-image">
                </div>
            </div>

            <!-- 右下角圆点导航 -->
            <div class="carousel-navigation" v-if="screenshots.length > 1">
                <div class="carousel-dots">
                    <span v-for="(_, index) in screenshots" :key="index" class="carousel-dot"
                        :class="{ active: currentIndex === index }" @click="goToSlide(index)">
                    </span>
                </div>
                <div class="carousel-arrows">
                    <div class="carousel-arrow carousel-arrow-prev" @click="prevSlide">
                        <i class="el-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor"
                                    d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z">
                                </path>
                            </svg>
                        </i>
                    </div>
                    <div class="carousel-arrow carousel-arrow-next" @click="nextSlide">
                        <i class="el-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor"
                                    d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z">
                                </path>
                            </svg>
                        </i>
                    </div>
                </div>
            </div>
        </div>
        <div class="carousel-container" v-else>
            <div class="preview-placeholder">
                <div class="no-preview-text">暂无预览图</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';

// 定义传入的属性
const props = defineProps({
    toolName: {
        type: String,
        required: true
    },
    screenshots: {
        type: Array,
        default: () => []
    }
});

// 轮播图状态
const currentIndex = ref(0);

// 修复点击按钮后特效不消失的问题
// 使用一个计时器移除按钮点击状态
let timeoutId = null;

const resetButtonState = () => {
    const buttons = document.querySelectorAll('.carousel-arrow');
    buttons.forEach(button => {
        button.classList.remove('clicked');
    });
};

// 基础滑动功能
const goToNextSlide = () => {
    if (props.screenshots.length <= 1) return;
    currentIndex.value = (currentIndex.value + 1) % props.screenshots.length;
};

const goToPrevSlide = () => {
    if (props.screenshots.length <= 1) return;
    currentIndex.value = (currentIndex.value - 1 + props.screenshots.length) % props.screenshots.length;
};

// 增强按钮点击体验
const nextSlide = (e) => {
    if (e) {
        // 先清除之前的计时器
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // 移除所有按钮的点击状态
        resetButtonState();

        // 添加点击状态到当前按钮
        e.currentTarget.classList.add('clicked');

        // 设置计时器移除点击状态
        timeoutId = setTimeout(() => {
            resetButtonState();
        }, 300); // 300ms后移除点击效果
    }

    goToNextSlide();
};

const prevSlide = (e) => {
    if (e) {
        // 先清除之前的计时器
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // 移除所有按钮的点击状态
        resetButtonState();

        // 添加点击状态到当前按钮
        e.currentTarget.classList.add('clicked');

        // 设置计时器移除点击状态
        timeoutId = setTimeout(() => {
            resetButtonState();
        }, 300); // 300ms后移除点击效果
    }

    goToPrevSlide();
};

// 跳转到指定幻灯片
const goToSlide = (index) => {
    currentIndex.value = index;
};

// 触摸滑动相关状态
const touchStartX = ref(0);
const touchEndX = ref(0);
const minSwipeDistance = 50; // 最小滑动距离，低于这个值不触发翻页

// 处理触摸开始
const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX;
};

// 处理触摸移动
const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX;
    // 阻止页面滚动，只在水平方向有明显移动时
    if (Math.abs(touchEndX.value - touchStartX.value) > 10) {
        e.preventDefault();
    }
};

// 处理触摸结束
const handleTouchEnd = () => {
    const swipeDistance = touchEndX.value - touchStartX.value;

    // 只有滑动距离超过阈值才触发翻页
    if (Math.abs(swipeDistance) >= minSwipeDistance) {
        if (swipeDistance > 0) {
            // 向右滑动，显示上一张
            goToPrevSlide();
        } else {
            // 向左滑动，显示下一张
            goToNextSlide();
        }
    }

    // 重置触摸状态
    touchStartX.value = 0;
    touchEndX.value = 0;
};

// 组件卸载前清理
onBeforeUnmount(() => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
});
</script>

<style lang="less" scoped>
.preview-component {
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    position: relative;

    .preview-title {
        font-size: 18px;
        font-weight: bold;
        color: #303133;
        margin-bottom: 15px;
    }

    .carousel-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

        .carousel-inner {
            display: flex;
            transition: transform 0.5s ease;
            height: 400px;

            .carousel-item {
                min-width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f5f7fa;

                .preview-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover; // 改为 cover 而不是 contain，让图片按最短边填充
                }
            }
        }

        .carousel-navigation {
            position: absolute;
            right: 20px;
            bottom: 20px;
            display: flex;
            align-items: center;
            z-index: 10;
            background-color: rgba(0, 0, 0, 0.3); // 稍微加深背景色
            border-radius: 24px; // 增大圆角
            backdrop-filter: blur(8px);
            padding: 8px 12px; // 增加内边距

            .carousel-dots {
                display: flex;
                gap: 8px; // 增加圆点间距
                margin-right: 10px; // 增加右边距

                .carousel-dot {
                    width: 10px; // 增大圆点尺寸
                    height: 10px; // 增大圆点尺寸
                    border-radius: 50%; // 确保是圆形
                    background-color: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.2s;

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.8);
                        transform: scale(1.1); // 添加轻微缩放效果增强交互感
                    }

                    &.active {
                        background-color: white;
                        transform: scale(1.1); // 当前活动点稍微放大
                        box-shadow: 0 0 4px rgba(255, 255, 255, 0.5); // 添加轻微发光效果
                    }
                }
            }

            .carousel-arrows {
                display: flex;
                gap: 8px; // 增加箭头按钮间距

                .carousel-arrow {
                    width: 36px; // 显著增大按钮尺寸
                    height: 36px; // 显著增大按钮尺寸
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 50%;
                    transition: background-color 0.3s, transform 0.2s;

                    // 在移动设备上禁用hover效果
                    @media (hover: hover) {
                        &:hover {
                            background-color: rgba(255, 255, 255, 0.2);
                        }
                    }

                    .el-icon {
                        font-size: 16px; // 增大图标尺寸
                        color: white;
                    }

                    // 修改点击状态样式，确保比hover效果更加明显
                    &.clicked {
                        background-color: rgba(255, 255, 255, 0.4);
                        transform: scale(0.95);
                    }
                }
            }
        }
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
    }
}

// 适配移动端
@media (max-width: 768px) {
    .preview-component {
        .carousel-container {
            .carousel-inner {
                height: 300px;
            }

            .carousel-navigation {
                padding: 8px 10px; // 增加内边距，使按钮区域更大

                .carousel-dots {
                    .carousel-dot {
                        width: 10px; // 保持与桌面版相同尺寸，更容易点击
                        height: 10px;
                    }
                }

                .carousel-arrows {
                    .carousel-arrow {
                        width: 32px; // 显著增大移动端按钮尺寸
                        height: 32px;

                        .el-icon {
                            font-size: 16px; // 保持图标足够大
                        }
                    }
                }
            }
        }

        .preview-placeholder {
            height: 220px;
        }
    }
}
</style>