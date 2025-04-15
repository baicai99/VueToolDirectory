<template>
    <div class="competition-card" @click="$emit('view-details', competition)">
        <!-- 竞赛图片 -->
        <div class="competition-image">
            <img :src="competition.imageUrl" alt="竞赛图片" @error="handleImageError">
            <div class="competition-status" :class="getStatusClass(competition.status)">
                {{ competition.status }}
            </div>
            <div v-if="competition.isHot" class="competition-hot-tag">热点</div>
        </div>

        <!-- 竞赛内容 -->
        <div class="competition-content">
            <h3 class="competition-title">{{ competition.title }}</h3>
            <p class="competition-desc">{{ competition.description }}</p>

            <div class="competition-details">
                <div class="detail-item" v-if="competition.startDate">
                    <span class="label">开始日期:</span>
                    <span class="value">{{ competition.startDate }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">结束日期:</span>
                    <span class="value">{{ competition.endDate }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">报名截止:</span>
                    <span class="value">{{ competition.registerDeadline }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">主办方:</span>
                    <span class="value">{{ competition.organizer }}</span>
                </div>
            </div>

            <!-- 标签 -->
            <div class="competition-tags" v-if="competition.tags && competition.tags.length">
                <el-tag v-for="tag in getDisplayTags(competition.tags)" :key="tag" size="small" effect="plain">
                    {{ tag }}
                </el-tag>
                <span v-if="competition.tags.length > maxDisplayTags" class="more-tags">
                    +{{ competition.tags.length - maxDisplayTags }}
                </span>
            </div>

            <!-- 按钮 -->
            <div class="competition-buttons">
                <el-button type="primary" @click.stop="$emit('open-website', competition)">官方网站</el-button>
                <el-button @click.stop="$emit('view-details', competition)">查看详情</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElTag, ElButton } from 'element-plus';
import { ref } from 'vue';

// 定义Props
const props = defineProps({
    competition: {
        type: Object,
        required: true
    }
});

// 定义Emits
defineEmits(['view-details', 'open-website']);

// 最大显示标签数量
const maxDisplayTags = 3;

// 获取要显示的标签
const getDisplayTags = (tags) => {
    if (!tags || !tags.length) return [];
    return tags.slice(0, maxDisplayTags);
};

// 根据状态获取对应的CSS类名
const getStatusClass = (status) => {
    switch (status) {
        case '进行中': return 'status-ongoing';
        case '即将开始': return 'status-upcoming';
        case '已结束': return 'status-ended';
        default: return '';
    }
};

// 图片错误处理
const handleImageError = (event) => {
    event.target.src = 'https://picsum.photos/300/180?text=竞赛图片';
};
</script>

<style lang="less" scoped>
// 竞赛卡片
.competition-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    // 桌面端悬停效果
    @media (min-width: 992px) {
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }
    }

    // 图片容器
    .competition-image {
        position: relative;
        height: 180px;
        overflow: hidden;
        background-color: #f0f0f0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        // 状态标签
        .competition-status {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1;

            &.status-ongoing {
                background-color: #409EFF;
            }

            &.status-upcoming {
                background-color: #67C23A;
            }

            &.status-ended {
                background-color: #909399;
            }
        }

        // 热点标签
        .competition-hot-tag {
            position: absolute;
            top: 10px;
            left: 10px;
            padding: 4px 12px;
            background-color: #F56C6C;
            border-radius: 4px;
            color: white;
            font-size: 12px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1;
        }
    }

    // 内容部分
    .competition-content {
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        .competition-title {
            margin: 0 0 10px;
            font-size: 18px;
            font-weight: bold;
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .competition-desc {
            color: #606266;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            min-height: 40px;
        }

        // 竞赛详细信息
        .competition-details {
            margin-bottom: 16px;

            .detail-item {
                display: flex;
                margin-bottom: 6px;
                font-size: 13px;

                .label {
                    color: #909399;
                    width: 70px;
                    flex-shrink: 0;
                }

                .value {
                    color: #303133;
                    font-weight: 500;
                    word-break: break-word;
                }
            }
        }

        // 标签
        .competition-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 16px;

            .more-tags {
                font-size: 12px;
                color: #909399;
                display: inline-flex;
                align-items: center;
                margin-left: 4px;
            }
        }

        // 按钮区域
        .competition-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: auto;
            gap: 10px;

            .el-button {
                flex: 1;
            }
        }
    }
}

// 响应式调整
@media (max-width: 991px) {
    .competition-card {
        .competition-image {
            img:hover {
                transform: none;
            }
        }
    }
}

@media (max-width: 768px) {
    .competition-card {
        .competition-image {
            height: 160px;
        }

        .competition-content {
            padding: 12px;

            .competition-title {
                font-size: 16px;
                margin-bottom: 8px;
            }

            .competition-desc {
                font-size: 13px;
                margin-bottom: 12px;
                -webkit-line-clamp: 2;
                min-height: 30px;
            }

            .competition-details {
                margin-bottom: 12px;

                .detail-item {
                    margin-bottom: 4px;
                    font-size: 12px;

                    .label {
                        width: 65px;
                    }
                }
            }

            .competition-tags {
                margin-bottom: 12px;
            }

            .competition-buttons {
                flex-direction: column;
                gap: 8px;

                .el-button {
                    margin-left: 0 !important;
                    margin-right: 0;
                    font-size: 13px;
                    padding: 8px 15px;
                }
            }
        }
    }
}

@media (max-width: 480px) {
    .competition-card {
        .competition-image {
            height: 140px;
        }

        .competition-content {
            padding: 10px;

            .competition-title {
                font-size: 15px;
            }

            .competition-desc {
                font-size: 12px;
                margin-bottom: 10px;
            }

            .competition-buttons .el-button {
                padding: 6px 12px;
            }
        }
    }
}
</style>