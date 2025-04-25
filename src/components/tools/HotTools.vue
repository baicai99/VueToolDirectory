<template>
    <div class="hot-tools-section">
        <el-divider content-position="left" class="section-divider hot-tools-divider">
            <el-icon>
                <HotWater />
            </el-icon> 热门工具
        </el-divider>

        <el-row :gutter="20" class="hot-tools-grid">
            <el-col v-for="tool in hotTools" :key="'hot-' + tool.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <ToolCard :tool="tool" @open-detail="$emit('open-detail', tool)" />
            </el-col>

            <el-col v-if="hotTools.length === 0" class="empty-state">
                <el-empty description="暂无热门工具" />
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { HotWater } from '@element-plus/icons-vue';
import ToolCard from './ToolCard.vue';

defineProps({
    hotTools: {
        type: Array,
        required: true
    }
});

defineEmits(['open-detail']);
</script>

<style lang="less" scoped>
.hot-tools-section {
    margin-top: 20px;
}

/* 分割线样式 */
.section-divider {
    margin-top: 30px;
    margin-bottom: 25px;

    :deep(.el-divider__text) {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 1.1em;
        color: #303133;
        font-weight: 500;
    }
}

/* 热门工具卡片网格 */
.hot-tools-grid {
    margin-top: 20px;
}

/* 空状态样式 */
.empty-state {
    text-align: center;
    color: #909399;
    width: 100%;
    padding: 40px 0;
}

/* 移动端适配样式 */
@media (max-width: 768px) {
    .hot-tools-grid {

        /* 在移动设备上减小卡片之间的间距 */
        .el-row {
            margin-left: -5px !important;
            margin-right: -5px !important;
        }

        .el-col {
            padding-left: 5px !important;
            padding-right: 5px !important;
        }
    }
}
</style>