<template>
    <div class="featured-banner-container" v-if="featuredTools.length > 0">
        <div v-for="tool in featuredTools" :key="tool.id" class="banner-recommendation"
            @click="$emit('open-detail', tool)" style="cursor: pointer;">
            <span class="banner-content">
                <el-icon>
                    <Promotion />
                </el-icon> {{ tool.name }} - {{ tool.description }}
            </span>
            <el-button type="primary" link>
                查看详情 <el-icon>
                    <ArrowRight />
                </el-icon>
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { Promotion, ArrowRight } from '@element-plus/icons-vue';

defineProps({
    featuredTools: {
        type: Array,
        required: true
    }
});

defineEmits(['open-detail']);
</script>

<style lang="less" scoped>
.featured-banner-container {
    margin-top: 20px;
}

.banner-recommendation {
    margin-bottom: 20px;
    border: 1px solid #ebeef5;
    padding: 15px;
    border-radius: 4px;
    background-color: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .banner-content {
        font-size: 1.1em;
        font-weight: 500;
        display: flex;
        align-items: center;
        color: #303133;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .el-icon {
            margin-right: 8px;
            flex-shrink: 0;
        }
    }

    .el-button {
        flex-shrink: 0;
    }
}

/* 移动端适配样式 */
@media (max-width: 768px) {
    .banner-recommendation {
        padding: 10px;
        flex-direction: column;
        align-items: flex-start;

        .banner-content {
            margin-bottom: 10px;
            width: 100%;
        }
    }
}
</style>