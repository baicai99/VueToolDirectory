<template>
    <div class="tool-detail-footer" v-if="relatedTools.length > 0">
        <div class="el-divider el-divider--horizontal" role="separator"></div>
        <div class="related-tools">
            <h3>相关工具推荐</h3>
            <div class="el-divider el-divider--horizontal" role="separator"></div>
            <div class="related-list">
                <div class="related-item" v-for="relatedTool in relatedTools" :key="relatedTool.id"
                    @click="onViewTool(relatedTool)">
                    <div class="related-category" v-if="relatedTool.category">
                        {{ relatedTool.category }}
                    </div>
                    <div class="related-info">
                        <h4>{{ relatedTool.name }}</h4>
                        <div class="related-meta">
                            <span>{{ relatedTool.description }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 定义传入的属性
const props = defineProps({
    relatedTools: {
        type: Array,
        default: () => []
    }
});

// 定义事件
const emit = defineEmits(['viewTool']);

// 查看工具详情
const onViewTool = (tool) => {
    emit('viewTool', tool);
};
</script>

<style lang="less" scoped>
.tool-detail-footer {
    padding: 0 20px 20px;

    .related-tools {
        h3 {
            margin: 20px 0 15px;
            font-size: 18px;
            font-weight: bold;
            color: #303133;
        }
    }
}

// --- 相关推荐部分 ---
.related-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 15px;
    padding: 0;

    .related-item {
        display: flex;
        flex-direction: column;
        padding: 12px 15px;
        background-color: #f5f7fa;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s, box-shadow 0.3s;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

        &:hover {
            background-color: #ecf5ff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .related-category {
            align-self: flex-start;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            color: white;
            margin-bottom: 8px;
            background-color: var(--el-color-primary);
        }

        .related-info {
            h4 {
                margin: 0 0 5px;
                font-size: 15px;
                font-weight: 500;
                color: #303133;
            }

            .related-meta {
                font-size: 12px;
                color: #909399;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}

// --- 响应式调整 ---
@media (max-width: 480px) {
    .related-list {
        gap: 10px;

        .related-item {
            padding: 10px 12px;
        }
    }
}
</style>