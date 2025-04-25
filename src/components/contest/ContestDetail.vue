<template>
    <teleport to="body">
        <div class="contest-detail-overlay" @click.self="closeDetail">
            <div class="contest-detail-container">
                <el-button class="close-button" circle plain @click="closeDetail">
                    <el-icon>
                        <Close />
                    </el-icon>
                </el-button>

                <div v-if="contest" class="contest-detail-content">
                    <div class="contest-header">
                        <div v-if="contest.imageUrl" class="contest-image">
                            <el-image :src="contest.imageUrl" fit="cover">
                                <template #error>
                                    <div class="image-error">
                                        <el-icon>
                                            <Picture />
                                        </el-icon>
                                    </div>
                                </template>
                            </el-image>
                        </div>
                        <div v-else class="contest-image placeholder-image">
                            <el-icon class="placeholder-icon">
                                <Trophy />
                            </el-icon>
                        </div>

                        <div class="status-badge" :class="statusClass">{{ statusText }}</div>
                    </div>

                    <div class="contest-detail-header">
                        <h2>{{ contest.title }}</h2>
                        <div class="contest-meta">
                            <span class="contest-organizer" v-if="contest.organizer">
                                <el-icon>
                                    <OfficeBuilding />
                                </el-icon> {{ contest.organizer }}
                            </span>
                            <el-tag size="small" :type="tagType" effect="plain">{{ statusText }}</el-tag>
                        </div>
                    </div>

                    <el-divider />

                    <div class="contest-detail-body">
                        <div class="contest-info-section">
                            <h3>比赛信息</h3>
                            <div class="info-grid">
                                <div class="info-item">
                                    <div class="info-label">开始日期</div>
                                    <div class="info-value">{{ formatDate(contest.startDate) }}</div>
                                </div>
                                <div class="info-item">
                                    <div class="info-label">结束日期</div>
                                    <div class="info-value">{{ formatDate(contest.endDate) }}</div>
                                </div>
                                <div v-if="contest.registrationDeadline" class="info-item">
                                    <div class="info-label">报名截止</div>
                                    <div class="info-value">{{ formatDate(contest.registrationDeadline) }}</div>
                                </div>
                                <div class="info-item" v-if="contest.organizer">
                                    <div class="info-label">主办方</div>
                                    <div class="info-value">{{ contest.organizer }}</div>
                                </div>
                                <div class="info-item" v-if="remainingDays !== null">
                                    <div class="info-label">剩余时间</div>
                                    <div class="info-value"
                                        :class="{ 'time-urgent': remainingDays <= 3 && remainingDays >= 0 }">
                                        {{ remainingText }}
                                    </div>
                                </div>
                                <div class="info-item official-link-container">
                                    <el-button type="primary" @click="openOfficialWebsite">
                                        访问官方网站 <el-icon>
                                            <Link />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>
                        </div>

                        <div class="contest-description-section">
                            <h3>比赛详情</h3>
                            <p class="contest-description">{{ contest.description }}</p>
                            <div class="tags-section" v-if="contest.tags && contest.tags.length > 0">
                                <h4>相关标签</h4>
                                <div class="tags-container">
                                    <el-tag v-for="(tag, index) in contest.tags" :key="index" class="tag"
                                        effect="light">
                                        {{ tag }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="contest-detail-footer">
                        <el-divider />

                        <div class="related-contests" v-if="relatedContests.length > 0">
                            <h3>相关比赛推荐</h3>
                            <el-divider />
                            <div class="related-list">
                                <div v-for="item in relatedContests" :key="item.id" class="related-item"
                                    @click="changeContest(item)">
                                    <div class="related-status" :class="`status-${item.status.toLowerCase()}`">{{
                                        getStatusText(item.status)
                                        }}</div>
                                    <div class="related-info">
                                        <h4>{{ item.title }}</h4>
                                        <div class="related-dates">
                                            <span>{{ formatDate(item.startDate) }} ~ {{ formatDate(item.endDate)
                                                }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="contest-detail-loading">
                    <el-empty description="内容加载中..."></el-empty>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Close, Picture, Link, Trophy, OfficeBuilding } from '@element-plus/icons-vue';

const props = defineProps({
    contest: {
        type: Object,
        default: null
    },
    allContests: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['close', 'change-contest']);

// 格式化日期
const formatDate = (dateString) => {
    if (!dateString) return '暂无';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

// 获取状态文本
const getStatusText = (status) => {
    const statusMap = {
        'upcoming': '即将开始',
        'ongoing': '进行中',
        'ended': '已结束'
    };
    return statusMap[status.toLowerCase()] || status;
};

// 比赛状态相关计算属性
const statusText = computed(() => {
    if (!props.contest) return '';
    return getStatusText(props.contest.status);
});

const statusClass = computed(() => {
    if (!props.contest) return '';
    return `status-${props.contest.status.toLowerCase()}`;
});

const tagType = computed(() => {
    if (!props.contest) return 'info';
    const statusTypeMap = {
        'upcoming': 'success',
        'ongoing': 'primary',
        'ended': 'info'
    };
    return statusTypeMap[props.contest.status.toLowerCase()] || 'info';
});

// 计算剩余天数
const remainingDays = computed(() => {
    if (!props.contest) return null;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (props.contest.status.toLowerCase() === 'upcoming') {
        // 即将开始的比赛，计算距离开始还有多少天
        const startDate = new Date(props.contest.startDate);
        const diffTime = startDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else if (props.contest.status.toLowerCase() === 'ongoing') {
        // 进行中的比赛，计算距离结束还有多少天
        const endDate = new Date(props.contest.endDate);
        const diffTime = endDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return null;
});

// 剩余时间的文本描述
const remainingText = computed(() => {
    if (remainingDays.value === null) return '已结束';

    if (props.contest.status.toLowerCase() === 'upcoming') {
        return remainingDays.value === 0 ? '今天开始' : `还有 ${remainingDays.value} 天开始`;
    } else if (props.contest.status.toLowerCase() === 'ongoing') {
        return remainingDays.value === 0 ? '今天结束' : `还有 ${remainingDays.value} 天结束`;
    }

    return '';
});

// 相关比赛 - 同状态或相似标签的其他比赛
const relatedContests = computed(() => {
    if (!props.contest || !props.allContests || props.allContests.length === 0) {
        return [];
    }

    // 先找出同状态的其他比赛
    let related = props.allContests
        .filter(item =>
            item.id !== props.contest.id &&
            item.status.toLowerCase() === props.contest.status.toLowerCase()
        );

    // 如果同状态的比赛不足3个，再考虑相似标签的比赛
    if (related.length < 3 && props.contest.tags && props.contest.tags.length > 0) {
        const tagSet = new Set(props.contest.tags.map(tag => tag.toLowerCase()));

        const otherContests = props.allContests
            .filter(item =>
                item.id !== props.contest.id &&
                !related.some(r => r.id === item.id) &&
                item.tags &&
                item.tags.some(tag => tagSet.has(tag.toLowerCase()))
            );

        related = [...related, ...otherContests];
    }

    return related.slice(0, 3); // 只显示最多3条相关比赛
});

// 关闭详情
const closeDetail = () => {
    emit('close');
};

// 切换到其他相关比赛
const changeContest = (contest) => {
    emit('change-contest', contest);
};

// 访问官方网站
const openOfficialWebsite = () => {
    if (props.contest && props.contest.officialUrl) {
        window.open(props.contest.officialUrl, '_blank', 'noopener,noreferrer');
    }
};
</script>

<style lang="less" scoped>
.contest-detail-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 20px;
    box-sizing: border-box;
    transform: translateZ(0);
    will-change: transform;
    isolation: isolate;
    pointer-events: auto;
}

.contest-detail-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }
}

.close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1010;
    font-size: 20px;
    opacity: 0.9;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        opacity: 1;
        background-color: rgba(255, 255, 255, 0.6);
    }
}

.contest-detail-content {
    overflow-y: auto;
    max-height: calc(90vh - 32px);
    scrollbar-width: thin;
    position: relative;
    z-index: 1;
    padding-top: 0;

    .contest-header {
        position: relative;
        height: 240px;
        overflow: hidden;
        margin-top: 0;
        background-color: #f5f7fa;

        .contest-image {
            width: 100%;
            height: 100%;

            .el-image {
                width: 100%;
                height: 100%;
            }
        }

        .placeholder-image {
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);

            .placeholder-icon {
                font-size: 80px;
                color: #c0c4cc;
            }
        }

        .status-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            padding: 6px 12px;
            color: white;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
            z-index: 10;
        }

        .status-upcoming {
            background-color: #4caf50;
        }

        .status-ongoing {
            background-color: #2196f3;
        }

        .status-ended {
            background-color: #9e9e9e;
        }
    }

    .contest-detail-header {
        padding: 24px 32px 0;

        h2 {
            margin-top: 0;
            margin-bottom: 16px;
            font-size: 28px;
            line-height: 1.4;
        }

        .contest-meta {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
            flex-wrap: wrap;

            .contest-organizer {
                display: flex;
                align-items: center;
                gap: 4px;
                color: #606266;
                font-size: 14px;
            }
        }
    }

    .contest-detail-body {
        padding: 0 32px;

        h3 {
            font-size: 20px;
            margin: 20px 0 16px;
            color: #303133;
        }

        h4 {
            font-size: 16px;
            margin: 16px 0 8px;
            color: #606266;
        }

        .contest-info-section {
            margin-bottom: 30px;

            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 16px;

                .info-item {
                    padding: 12px;
                    background-color: #f5f7fa;
                    border-radius: 6px;

                    .info-label {
                        font-size: 14px;
                        color: #909399;
                        margin-bottom: 4px;
                    }

                    .info-value {
                        font-size: 16px;
                        font-weight: 500;
                        color: #303133;

                        &.time-urgent {
                            color: #f56c6c;
                            font-weight: bold;
                        }
                    }

                    &.official-link-container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        grid-column: 1 / -1;
                        background-color: transparent;
                    }
                }
            }
        }

        .contest-description-section {
            margin-bottom: 30px;

            .contest-description {
                font-size: 16px;
                line-height: 1.8;
                color: #606266;
                margin-bottom: 20px;
                white-space: pre-wrap;
            }

            .tags-container {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;

                .tag {
                    margin-right: 0;
                }
            }
        }
    }

    .contest-detail-footer {
        padding: 0 32px 32px;

        .related-contests {
            h3 {
                font-size: 20px;
                margin: 0 0 16px;
            }

            .related-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                gap: 16px;
            }

            .related-item {
                position: relative;
                padding: 16px;
                border-radius: 8px;
                background-color: #f5f7fa;
                cursor: pointer;
                transition: all 0.3s;

                &:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .related-status {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-size: 12px;
                    color: white;
                }

                .status-upcoming {
                    background-color: #4caf50;
                }

                .status-ongoing {
                    background-color: #2196f3;
                }

                .status-ended {
                    background-color: #9e9e9e;
                }

                .related-info {
                    h4 {
                        margin: 0 0 8px;
                        font-size: 16px;
                        line-height: 1.4;
                    }

                    .related-dates {
                        font-size: 13px;
                        color: #909399;
                    }
                }
            }
        }
    }
}

/* 全局修复 el-tag 翻转效果 */
:deep(.el-tag) {
    transition: none !important;
    transform: none !important;
    backface-visibility: visible !important;
    perspective: none !important;
    transform-style: flat !important;
    animation: none !important;
}

/* 特别针对 primary small plain 样式的标签 */
:deep(.el-tag--primary.el-tag--small.el-tag--plain) {
    transition: none !important;
    animation: none !important;
    transform: none !important;
}

.contest-detail-loading {
    padding: 100px 0;
    text-align: center;
}

/* 移动端适配样式 */
@media (max-width: 768px) {
    .contest-detail-overlay {
        padding: 5%;
        padding-top: 8%;
        align-items: flex-start;
        z-index: 10000;
    }

    .contest-detail-container {
        max-height: 80vh;
        z-index: 10001;
        position: relative;
        margin-bottom: 20px;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    }

    .close-button {
        top: 10px;
        right: 10px;
        z-index: 10001;
    }

    .contest-detail-content {
        max-height: calc(80vh - 40px);

        .contest-header {
            height: 180px;
        }

        .contest-detail-header {
            padding: 16px 20px 0;

            h2 {
                font-size: 22px;
            }
        }

        .contest-detail-body {
            padding: 0 20px;

            .info-grid {
                grid-template-columns: 1fr !important;
            }
        }

        .contest-detail-footer {
            padding: 0 20px 20px;

            .related-list {
                grid-template-columns: 1fr !important;
            }
        }
    }
}
</style>