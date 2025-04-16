<template>
    <div class="tool-header">
        <div class="tool-image">
            <div class="el-image">
                <img :src="iconUrl" :alt="toolName" class="icon-image" @error="onImageError">
            </div>
        </div>
        <div class="tool-type-badge" v-if="category">{{ category }}</div>
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
    position: relative;
    height: 180px;
    overflow: hidden;
    background-color: #f5f7fa;
    display: flex;
    justify-content: center;
    align-items: center;

    .tool-image {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .el-image {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .icon-image {
            width: 120px;
            height: 120px;
            object-fit: contain;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
    }

    .tool-type-badge {
        position: absolute;
        top: 15px;
        left: 15px;
        padding: 5px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        color: white;
        background-color: var(--el-color-primary);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
}

// --- 响应式调整 ---
@media (max-width: 768px) {
    .tool-header {
        height: 150px;

        .tool-image .icon-image {
            width: 100px;
            height: 100px;
        }
    }
}
</style>