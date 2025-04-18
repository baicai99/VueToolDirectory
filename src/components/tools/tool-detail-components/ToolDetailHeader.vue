<template>
    <!-- 组件名： ToolDetailHeader-->
    <div class="tool-header">
        <div class="header-background"></div>

        <!-- 添加苹果风格的标题部分 -->
        <div class="header-content">
            <div class="tool-badge" v-if="category">{{ category }}</div>
            <h3 class="tool-title">{{ toolName }}</h3>
            <h4 class="tool-subtitle">拍照、拍视频，出手成片</h4>
        </div>

        <!-- 工具图标 -->
        <div class="tool-image">
            <div class="el-image">
                <img :src="iconUrl" :alt="toolName" class="icon-image" @error="onImageError">
            </div>
        </div>
    </div>
</template>

<script setup>
// 定义传入的属性
const props = defineProps({
    iconUrl: {
        type: String,
        required: true
    },
    toolName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: ''
    },
    defaultIcon: {
        type: String,
        required: true
    }
});

// 定义事件
const emit = defineEmits(['imageError']);

// 图片加载错误处理
const onImageError = (event) => {
    emit('imageError', event);
};
</script>

<style lang="less" scoped>
.tool-header {
    border-radius: 30px;
    position: relative;
    min-height: 280px;
    overflow: hidden;
    padding: 40px 20px 60px;
    color: #333;
    // background-color: #f5f7fa;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
}

.header-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
    z-index: 0;
}

.header-content {
    position: relative;
    z-index: 1;
    max-width: 700px;
    margin-bottom: 20px;
}

.tool-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 14px;
    font-size: 12px;
    font-weight: 500;
    color: white;
    background-color: #1d1d1f;
    margin-bottom: 16px;
    letter-spacing: 0.5px;
}

.tool-title {
    font-size: 48px;
    font-weight: 700;
    margin: 0 0 12px;
    letter-spacing: -0.5px;
    line-height: 1.1;
}

.tool-subtitle {
    font-size: 28px;
    font-weight: 500;
    margin: 0;
    color: #515154;
    line-height: 1.3;
}

.tool-image {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .el-image {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon-image {
        width: 120px;
        height: 120px;
        object-fit: contain;
        border-radius: 22px;
    }
}

// --- 响应式调整 ---
@media (max-width: 768px) {
    .tool-header {
        padding: 30px 16px 40px;
        min-height: 220px;
    }

    .tool-title {
        font-size: 32px;
    }

    .tool-subtitle {
        font-size: 20px;
    }

    .tool-image .icon-image {
        width: 100px;
        height: 100px;
        border-radius: 18px;
    }
}
</style>