<template>
    <div class="tools-grid-container">
        <el-row :gutter="20" class="tools-grid">
            <el-col v-for="tool in tools" :key="tool.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <ToolCard :tool="tool" @open-detail="$emit('open-detail', tool)" />
            </el-col>

            <el-col v-if="tools.length === 0" class="empty-state">
                <el-empty :description="emptyStateMessage" />
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import ToolCard from './ToolCard.vue';

defineProps({
    tools: {
        type: Array,
        required: true
    },
    emptyStateMessage: {
        type: String,
        default: '没有找到匹配的工具'
    }
});

defineEmits(['open-detail']);
</script>

<style lang="less" scoped>
/* 工具卡片网格 */
.tools-grid-container {
    width: 100%;
}

.tools-grid {
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
    .tools-grid {

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