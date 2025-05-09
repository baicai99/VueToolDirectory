<template>
    <!-- 组件名：ToolInfoSection -->
    <div class="app-store-layout">
        <div class="app-icon-container">
            <img :src="iconUrl" :alt="toolName" class="app-icon" @error="onImageError">
        </div>
        <div class="app-info-container">
            <h3 class="app-name">{{ toolName }}</h3>
            <p class="app-slogan">{{ description }}</p>
            <el-button type="primary" class="official-website-btn" @click="onVisitWebsite">官网</el-button>
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
    description: {
        type: String,
        default: ''
    }
});

// 定义事件
const emit = defineEmits(['imageError', 'visitWebsite']);

// 图片加载错误处理
const onImageError = (event) => {
    emit('imageError', event);
};

// 访问官网
const onVisitWebsite = () => {
    emit('visitWebsite');
};
</script>

<style lang="less" scoped>
.app-store-layout {
    display: flex;
    align-items: center;
    padding: 20px 0;
    /* 修改：移除左右内边距，只保留上下内边距 */
    border-radius: 8px;
    margin: 20px 0;

    .app-icon-container {
        flex-shrink: 0;
        width: 96px;
        height: 96px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;

        .app-icon {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .app-info-container {
        margin-left: 20px;
        flex-grow: 1;

        .app-name {
            margin: 0 0 -2px;
            font-size: 20px;
            font-weight: bold;
            color: #303133;
        }

        .app-slogan {
            margin: 0 0 15px;
            font-size: 14px;
            color: #606266;
        }

        .official-website-btn {
            font-size: 14px;
        }
    }
}

@media (max-width: 768px) {
    .app-store-layout {
        padding: 15px 0;
        margin: 10px 0;

        .app-icon-container {
            width: 72px;
            height: 72px;
            border-radius: 14px;
        }

        .app-info-container {
            margin-left: 15px;

            .app-name {
                font-size: 18px;
            }

            .app-slogan {
                margin-bottom: 12px;
                font-size: 13px;
            }

            .official-website-btn {
                padding: 6px 15px;
                font-size: 13px;
            }
        }
    }
}

@media (max-width: 480px) {
    .app-store-layout {
        padding: 12px 0;

        .app-icon-container {
            width: 64px;
            height: 64px;
            border-radius: 12px;
        }

        .app-info-container {
            margin-left: 12px;
        }
    }
}
</style>