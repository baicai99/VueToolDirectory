<template>
    <div class="contest-card" :class="[statusClass, { 'ended-card': isEnded }]" @click="handleCardClick">
        <div class="status-badge">{{ statusText }}</div>
        <div v-if="contest.imageUrl" class="image-container">
            <img :src="contest.imageUrl" :alt="contest.title" class="contest-image">
        </div>
        <div v-else class="image-container">
            <img src="../../assets/icons/tool-icon-placeholder.png" alt="默认图片" class="contest-image">
        </div>
        <div class="contest-content">
            <h3 class="contest-title">{{ contest.title }}</h3>
            <p class="contest-description">{{ truncatedDescription }}</p>
            <div class="contest-info">
                <div class="info-item">
                    <span class="label">开始日期：</span>
                    <span>{{ formatDate(contest.startDate) }}</span>
                </div>
                <div class="info-item">
                    <span class="label">结束日期：</span>
                    <span>{{ formatDate(contest.endDate) }}</span>
                </div>
                <div v-if="contest.registrationDeadline" class="info-item">
                    <span class="label">报名截止：</span>
                    <span>{{ formatDate(contest.registrationDeadline) }}</span>
                </div>
                <div v-if="contest.organizer" class="info-item">
                    <span class="label">主办方：</span>
                    <span>{{ contest.organizer }}</span>
                </div>
            </div>
            <div v-if="contest.tags && contest.tags.length > 0" class="contest-tags">
                <span v-for="(tag, index) in contest.tags" :key="index" class="tag">{{ tag }}</span>
            </div>
            <div class="contest-actions">
                <a :href="contest.officialUrl" target="_blank" rel="noopener noreferrer" class="official-link"
                    @click.stop>
                    官方网站 <i class="fa fa-external-link"></i>
                </a>
                <button class="detail-btn" :class="{ 'disabled-btn': isEnded }" @click.stop="handleDetailClick">
                    {{ isEnded ? '比赛已结束' : '查看详情' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContestCard',
    props: {
        contest: {
            type: Object,
            required: true
        }
    },
    computed: {
        statusClass() {
            return `status-${this.contest.status.toLowerCase()}`;
        },
        statusText() {
            const statusMap = {
                'upcoming': '即将开始',
                'ongoing': '进行中',
                'ended': '已结束'
            };
            return statusMap[this.contest.status.toLowerCase()] || this.contest.status;
        },
        truncatedDescription() {
            if (!this.contest.description) return '';
            return this.contest.description.length > 100
                ? this.contest.description.substring(0, 100) + '...'
                : this.contest.description;
        },
        isEnded() {
            return this.contest.status.toLowerCase() === 'ended';
        }
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return '暂无';
            const date = new Date(dateString);
            return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
        },
        handleCardClick() {
            // 只有非结束状态的比赛允许点击卡片打开详情
            if (!this.isEnded) {
                this.openDetail();
            }
        },
        handleDetailClick() {
            // 只有非结束状态的比赛允许点击按钮打开详情
            if (!this.isEnded) {
                this.openDetail();
            }
        },
        openDetail() {
            this.$emit('view-detail', this.contest);
        }
    }
}
</script>

<style scoped>
.contest-card {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    background-color: #fff;
    height: 100%;
    border: 1px solid #eaeaea;
    cursor: pointer;
}

.ended-card {
    cursor: default;
    opacity: 0.8;
    filter: grayscale(30%);
}

.ended-card:hover {
    transform: none;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.contest-card:not(.ended-card):hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.status-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    z-index: 1;
}

.status-upcoming .status-badge {
    background-color: #4caf50;
}

.status-ongoing .status-badge {
    background-color: #2196f3;
}

.status-ended .status-badge {
    background-color: #9e9e9e;
}

.image-container {
    width: 100%;
    height: 160px;
    overflow: hidden;
}

.contest-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.contest-content {
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    /* 添加盒模型计算 */
    width: 100%;
    /* 确保内容区域不会超出卡片 */
    overflow: hidden;
    /* 防止内容溢出 */
}

.contest-title {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.contest-description {
    margin: 8px 0;
    color: #666;
    font-size: 14px;
    line-height: 1.4;
}

.contest-info {
    margin: 12px 0;
}

.info-item {
    margin-bottom: 4px;
    font-size: 14px;
}

.label {
    font-weight: bold;
    color: #555;
}

.contest-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin: 8px 0;
}

.tag {
    padding: 2px 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    font-size: 12px;
    color: #555;
}

.contest-actions {
    margin-top: auto;
    padding-top: 12px;
    display: flex;
    justify-content: space-between;
    gap: 6px;
    /* 减小按钮之间的间距 */
    box-sizing: border-box;
    /* 确保边框计算在宽度内 */
    width: 100%;
}

.official-link,
.detail-btn {
    flex-basis: calc(50% - 3px);
    /* 设置基础宽度为一半减去间距的一半 */
    flex-grow: 0;
    /* 不允许按钮增长 */
    flex-shrink: 1;
    /* 允许按钮缩小 */
    min-width: 0;
    padding: 8px 5px;
    /* 进一步减少内边距 */
    font-size: 13px;
    /* 缩小字体大小 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    border-radius: 4px;
    box-sizing: border-box;
    /* 确保边框计算在宽度内 */
}

.official-link {
    background-color: #1976d2;
    color: white;
    text-decoration: none;
    transition: background-color 0.3s;
    font-weight: bold;
}

.detail-btn {
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
}

.official-link:hover {
    background-color: #1565c0;
}

.detail-btn:hover {
    background-color: #e0e0e0;
}

.disabled-btn {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
}

.disabled-btn:hover {
    background-color: #e0e0e0;
}

@media (max-width: 768px) {
    .contest-card {
        flex-direction: column;
    }

    .image-container {
        width: 100%;
        height: 140px;
    }

    .contest-actions {
        flex-direction: column;
    }

    .official-link,
    .detail-btn {
        width: 100%;
    }
}
</style>