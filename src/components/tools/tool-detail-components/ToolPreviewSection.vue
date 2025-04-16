<template>
    <div class="preview-component">
        <div class="preview-title">预览</div>
        <div class="preview-content">
            <div class="preview-image-container" v-if="screenshots && screenshots.length > 0">
                <img :src="screenshots[0]" :alt="toolName + ' 预览'" class="preview-image">
            </div>
            <div class="preview-image-container preview-placeholder" v-else>
                <div class="no-preview-text">暂无预览图</div>
            </div>
        </div>
    </div>
</template>

<script setup>
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
</script>

<style lang="less" scoped>
.preview-component {
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;

    .preview-title {
        font-size: 18px;
        font-weight: bold;
        color: #303133;
        margin-bottom: 10px;
    }

    .preview-content {
        display: flex;
        justify-content: center;
        align-items: center;

        .preview-image-container {
            width: 100%;
            max-width: 300px;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;

            .preview-image {
                width: 100%;
                height: 100%;
            }
        }

        .preview-placeholder {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e5e9f2;
            color: #909399;
            font-size: 14px;
            font-weight: bold;
        }
    }
}
</style>