<template>
    <ItemCard :item="item" :defaultIcon="defaultIcon" :maxDescLength="30" @click="onItemClick"
        @imageError="onImageError" class="recommendation-item" />
</template>

<script setup>
import ItemCard from '@/components/base/ItemCard.vue';

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    defaultIcon: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['click', 'imageError']);

// 处理点击事件
const onItemClick = (item) => {
    emit('click', item);
};

// 图片加载错误处理
const onImageError = (event) => {
    emit('imageError', event);
};
</script>

<style lang="less" scoped>
.recommendation-item {
    // 推荐项目的特定样式，可以自定义覆盖基础组件的样式
    --card-bg-color: #f5f5f7;
    --card-hover-bg-color: #ebebf0;
    --title-color: #1d1d1f;
    --desc-color: #515154;
}
</style>