<template>
    <div class="contest-detail-overlay" v-if="visible" @click="handleOverlayClick">
        <div class="contest-detail-container" @click.stop>
            <!-- 关闭按钮 -->
            <button type="button" class="el-button is-plain is-circle close-button" @click="closeDetail">
                <span>
                    <i class="el-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z">
                            </path>
                        </svg>
                    </i>
                </span>
            </button>

            <!-- 竞赛详情内容 -->
            <div class="contest-detail-content">
                <!-- 顶部图片和状态 -->
                <div class="contest-header">
                    <div class="contest-image">
                        <div class="el-image">
                            <img v-if="competition.imageUrl" :src="competition.imageUrl" alt="竞赛图片">
                            <div v-else class="image-error">
                                <i class="el-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                        <path fill="currentColor"
                                            d="M160 160v704h704V160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32">
                                        </path>
                                        <path fill="currentColor"
                                            d="M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64M185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952z">
                                        </path>
                                    </svg>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div :class="['status-badge', getStatusClass(competition.status)]">{{ competition.status }}</div>
                </div>

                <!-- 竞赛标题和主办方 -->
                <div class="contest-detail-header">
                    <h2>{{ competition.title }}</h2>
                    <div class="contest-meta">
                        <span class="contest-organizer">
                            <i class="el-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                    <path fill="currentColor"
                                        d="M192 128v704h384V128zm-32-64h448a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32">
                                    </path>
                                    <path fill="currentColor"
                                        d="M256 256h256v64H256zm0 192h256v64H256zm0 192h256v64H256zm384-128h128v64H640zm0 128h128v64H640zM64 832h896v64H64z">
                                    </path>
                                    <path fill="currentColor"
                                        d="M640 384v448h192V384zm-32-64h256a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H608a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32">
                                    </path>
                                </svg>
                            </i>
                            {{ competition.organizer }}
                        </span>
                        <span class="el-tag el-tag--primary el-tag--small el-tag--plain">
                            <span class="el-tag__content">{{ competition.status }}</span>
                        </span>
                    </div>
                </div>

                <div class="el-divider el-divider--horizontal" role="separator"></div>

                <!-- 竞赛内容正文 -->
                <div class="contest-detail-body">
                    <!-- 比赛信息部分 -->
                    <div class="contest-info-section">
                        <h3>比赛信息</h3>
                        <div class="info-grid">
                            <div class="info-item" v-if="competition.startDate">
                                <div class="info-label">开始日期</div>
                                <div class="info-value">{{ competition.startDate }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">结束日期</div>
                                <div class="info-value">{{ competition.endDate }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">报名截止</div>
                                <div class="info-value">{{ competition.registerDeadline }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">主办方</div>
                                <div class="info-value">{{ competition.organizer }}</div>
                            </div>
                            <div class="info-item" v-if="remainingDays !== null">
                                <div class="info-label">剩余时间</div>
                                <div class="info-value">{{ remainingDays }}</div>
                            </div>
                            <div class="info-item official-link-container">
                                <button type="button" class="el-button el-button--primary"
                                    @click="visitOfficialWebsite">
                                    <span>
                                        访问官方网站
                                        <i class="el-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                                <path fill="currentColor"
                                                    d="M715.648 625.152 670.4 579.904l90.496-90.56c75.008-74.944 85.12-186.368 22.656-248.896-62.528-62.464-173.952-52.352-248.96 22.656L444.16 353.6l-45.248-45.248 90.496-90.496c100.032-99.968 251.968-110.08 339.456-22.656 87.488 87.488 77.312 239.424-22.656 339.456l-90.496 90.496zm-90.496 90.496-90.496 90.496C434.624 906.112 282.688 916.224 195.2 828.8c-87.488-87.488-77.312-239.424 22.656-339.456l90.496-90.496 45.248 45.248-90.496 90.56c-75.008 74.944-85.12 186.368-22.656 248.896 62.528 62.464 173.952 52.352 248.96-22.656l90.496-90.496zm0-362.048 45.248 45.248L398.848 670.4 353.6 625.152z">
                                                </path>
                                            </svg>
                                        </i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 比赛详情部分 -->
                    <div class="contest-description-section">
                        <h3>比赛详情</h3>
                        <p class="contest-description">{{ competition.description }}</p>
                        <div class="tags-section">
                            <h4>相关标签</h4>
                            <div class="tags-container">
                                <span class="el-tag el-tag--primary el-tag--light tag" v-for="tag in competition.tags"
                                    :key="tag">
                                    <span class="el-tag__content">{{ tag }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 底部相关推荐 -->
                <div class="contest-detail-footer">
                    <div class="el-divider el-divider--horizontal" role="separator"></div>
                    <div class="related-contests">
                        <h3>相关比赛推荐</h3>
                        <div class="el-divider el-divider--horizontal" role="separator"></div>
                        <div class="related-list">
                            <div class="related-item" v-for="relatedContest in relatedContests" :key="relatedContest.id"
                                @click="viewRelatedContest(relatedContest)">
                                <div :class="['related-status', getStatusClass(relatedContest.status)]">
                                    {{ relatedContest.status }}
                                </div>
                                <div class="related-info">
                                    <h4>{{ relatedContest.title }}</h4>
                                    <div class="related-dates">
                                        <span>{{ relatedContest.startDate }} ~ {{ relatedContest.endDate }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { ElNotification } from 'element-plus';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    competition: {
        type: Object,
        required: false,
        default: () => ({})
    },
    allCompetitions: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['close', 'viewRelated']);

// 当前日期
const currentDate = new Date();

// 计算剩余天数
const remainingDays = computed(() => {
    if (!props.competition.endDate) return null;

    const endDate = new Date(props.competition.endDate);
    if (isNaN(endDate.getTime())) return null;

    const diffTime = endDate - currentDate;
    if (diffTime <= 0) return '已结束';

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `还有 ${diffDays} 天结束`;
});

// 根据状态获取对应的CSS类名
const getStatusClass = (status) => {
    switch (status) {
        case '进行中': return 'status-ongoing';
        case '即将开始': return 'status-upcoming';
        case '已结束': return 'status-ended';
        default: return '';
    }
};

// 相关竞赛推荐，过滤掉当前竞赛，最多显示3个
const relatedContests = computed(() => {
    if (!props.allCompetitions || !props.competition) return [];

    // 过滤掉当前竞赛并随机选择最多3个
    const filtered = props.allCompetitions
        .filter(c => c.id !== props.competition.id)
        .slice(0, 3);

    return filtered;
});

// 访问官方网站
const visitOfficialWebsite = () => {
    if (props.competition.officialUrl) {
        ElNotification({
            title: '跳转官方网站',
            message: `正在跳转到"${props.competition.title}"的官方网站`,
            type: 'info'
        });
        window.open(props.competition.officialUrl, '_blank');
    } else {
        ElNotification({
            title: '无法跳转',
            message: '该竞赛未提供官方网站链接',
            type: 'warning'
        });
    }
};

// 关闭弹窗
const closeDetail = () => {
    emit('close');
};

// 处理背景点击关闭
const handleOverlayClick = () => {
    closeDetail();
};

// 查看相关竞赛
const viewRelatedContest = (contest) => {
    emit('viewRelated', contest);
};

// 处理滚动锁定
let originalOverflow;

// 监听visible属性变化，控制body滚动
watch(() => props.visible, (newVal) => {
    if (newVal) {
        // 保存原始overflow值
        originalOverflow = document.body.style.overflow;
        // 禁止滚动
        document.body.style.overflow = 'hidden';
    } else {
        // 恢复滚动
        document.body.style.overflow = originalOverflow || '';
    }
}, { immediate: true });

// 组件卸载时确保恢复滚动
onUnmounted(() => {
    // 确保页面滚动被恢复，即使组件意外销毁
    document.body.style.overflow = originalOverflow || '';
});
</script>

<style lang="less" scoped>
// --- 基本变量和通用样式 (保持不变) ---
.contest-detail-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 20px; // 在小屏幕上，内边距可能需要调整，但20px通常可接受
    box-sizing: border-box;
    transform: translateZ(0);
    will-change: transform;
    isolation: isolate;
    pointer-events: auto;
}

.contest-detail-container {
    position: relative;
    max-width: 900px; // 桌面最大宽度
    width: 100%;
    max-height: 90vh; // 限制最大高度，允许滚动
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    font-size: 20px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: none;
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }

    i {
        font-size: 16px;
    }
}

.contest-detail-content {
    overflow-y: auto; // 允许内容区域垂直滚动
    // max-height 由 .contest-detail-container 控制
}

.contest-header {
    position: relative;
    height: 200px; // 默认高度
    overflow: hidden;

    .contest-image {
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .el-image {
            width: 100%;
            height: 100%;
        }

        .image-error {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f5f7fa;
            color: #909399;
            font-size: 24px;
        }
    }

    .status-badge {
        position: absolute;
        top: 15px;
        left: 15px;
        padding: 5px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        color: white;

        &.status-ongoing {
            background-color: #409EFF;
        }

        &.status-upcoming {
            background-color: #67C23A;
        }

        &.status-ended {
            background-color: rgba(144, 147, 153, 0.4);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
    }
}

.contest-detail-header {
    padding: 20px;

    h2 {
        margin: 0 0 10px;
        font-size: 24px; // 默认字体大小
        font-weight: bold;
        line-height: 1.4;
    }

    .contest-meta {
        display: flex;
        align-items: center;
        flex-wrap: wrap; // 允许换行
        gap: 10px 15px; // 行间距 垂直间距

        .contest-organizer {
            display: flex;
            align-items: center;
            color: #606266;
            font-size: 14px;

            i {
                margin-right: 5px;
                font-size: 16px;
            }
        }

        // el-tag 样式保持不变
    }
}

.contest-detail-body {
    padding: 0 20px 20px;

    h3 {
        margin: 20px 0 15px;
        font-size: 18px;
        font-weight: bold;
        color: #303133;
    }

    h4 {
        margin: 15px 0 10px;
        font-size: 16px;
        font-weight: bold;
        color: #606266;
    }
}

// --- 重构: 比赛信息网格 ---
.contest-info-section {
    margin-bottom: 25px;

    .info-grid {
        display: grid;
        // 使用 auto-fit 和 minmax 替代固定的列数和媒体查询
        // minmax(200px, 1fr): 项目最小宽度 200px，最大填满可用空间
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        padding: 0;

        .info-item {
            display: flex;
            flex-direction: column;
            padding: 12px;
            background-color: #f5f7fa;
            border-radius: 6px;

            .info-label {
                color: #909399;
                font-size: 13px;
                margin-bottom: 5px;
            }

            .info-value {
                color: #303133;
                font-size: 14px;
                font-weight: 500;
            }

            &.official-link-container {
                // 让官网链接按钮始终占据整行
                grid-column: 1 / -1; // 从第一条网格线到最后一条
                // margin-top: 10px; // 根据需要保留或移除
                padding: 0; // 移除内边距，因为按钮自带样式
                background-color: transparent; // 移除背景色

                .el-button {
                    width: 100%;
                }
            }
        }
    }
}

.contest-description-section {
    .contest-description {
        margin: 0 0 20px;
        font-size: 14px;
        line-height: 1.6;
        color: #606266;
    }

    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .tag {
            margin: 0;
        }
    }
}

.contest-detail-footer {
    padding: 0 20px 20px;

    .related-contests {
        h3 {
            margin: 20px 0 15px;
            font-size: 18px;
            font-weight: bold;
            color: #303133;
        }
    }
}

// --- 重构: 相关推荐网格 ---
.related-list {
    display: grid;
    // 使用 auto-fit 和 minmax
    // minmax(220px, 1fr): 相关推荐项可以稍宽一些
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

        .related-status {
            align-self: flex-start;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            color: white;
            margin-bottom: 8px;

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

        .related-info {
            h4 {
                margin: 0 0 5px;
                font-size: 15px;
                font-weight: 500;
                color: #303133;
            }

            .related-dates {
                font-size: 12px;
                color: #909399;
            }
        }
    }
}

// --- 通用响应式调整 ---
@media (max-width: 768px) {
    .contest-detail-container {
        max-width: 100%; // 在小屏幕上占满宽度
        max-height: 95vh; // 稍微增加高度占比
    }

    .contest-header {
        height: 150px; // 减小头部图片高度
    }

    .contest-detail-header h2 {
        font-size: 20px; // 减小标题字体大小
    }

    // 如果需要，可以在这里调整 .contest-detail-overlay 的 padding
    // .contest-detail-overlay { padding: 10px; }
}

// 可以添加更小屏幕的断点，如果需要进一步调整
@media (max-width: 480px) {
    .contest-detail-header .contest-meta {
        font-size: 13px; // 调整元信息字体大小

        .contest-organizer i {
            font-size: 14px;
        }
    }

    .contest-info-section .info-grid {
        gap: 10px; // 减小网格间距

        .info-item {
            padding: 10px;
        }
    }

    .related-list {
        gap: 10px; // 减小网格间距

        .related-item {
            padding: 10px 12px;
        }
    }

    // 你可以在这里为超小屏幕做更细致的调整
}
</style>