<template>
    <div class="contest-list">
        <h2 class="section-title">AIGC比赛信息</h2>

        <div class="filter-tabs">
            <button v-for="filter in filters" :key="filter.value"
                :class="['filter-tab', { active: currentFilter === filter.value }]"
                @click="currentFilter = filter.value">
                {{ filter.label }}
            </button>
        </div>

        <div v-if="loading" class="loading">
            <p>加载中...</p>
        </div>

        <div v-else-if="filteredContests.length === 0" class="empty-state">
            <p>暂无{{ filterLabel }}比赛信息</p>
        </div>

        <div v-else class="contest-grid">
            <div v-for="contest in filteredContests" :key="contest.id" class="contest-item">
                <contest-card :contest="contest" @view-detail="openContestDetail" />
            </div>
        </div>

        <!-- 比赛详情弹窗 -->
        <contest-detail v-if="selectedContest" :contest="selectedContest" :all-contests="allContests"
            @close="closeContestDetail" @change-contest="changeSelectedContest" />
    </div>
</template>

<script>
import ContestCard from './ContestCard.vue';
import ContestDetail from './ContestDetail.vue';
import { ref, computed, onMounted } from 'vue';
import { getUpdatedContests } from '../../data/contests'; // 改用更新状态后的数据

export default {
    name: 'ContestList',
    components: {
        ContestCard,
        ContestDetail
    },
    setup() {
        const allContests = ref([]);
        const loading = ref(true);
        const currentFilter = ref('all');
        const selectedContest = ref(null);

        const filters = [
            { label: '全部', value: 'all' },
            { label: '进行中', value: 'ongoing' },
            { label: '即将开始', value: 'upcoming' },
            { label: '已结束', value: 'ended' }
        ];

        const filterLabel = computed(() => {
            const filter = filters.find(f => f.value === currentFilter.value);
            return filter ? filter.label : '';
        });

        const filteredContests = computed(() => {
            if (currentFilter.value === 'all') {
                return allContests.value;
            }
            return allContests.value.filter(contest =>
                contest.status.toLowerCase() === currentFilter.value
            );
        });

        // 打开比赛详情
        const openContestDetail = (contest) => {
            selectedContest.value = contest;
        };

        // 关闭比赛详情
        const closeContestDetail = () => {
            selectedContest.value = null;
        };

        // 切换选中的比赛
        const changeSelectedContest = (contest) => {
            selectedContest.value = contest;
        };

        onMounted(() => {
            // 获取动态更新状态后的比赛数据
            setTimeout(() => {
                allContests.value = getUpdatedContests();
                loading.value = false;
            }, 500);
        });

        return {
            allContests,
            loading,
            currentFilter,
            filters,
            filteredContests,
            filterLabel,
            selectedContest,
            openContestDetail,
            closeContestDetail,
            changeSelectedContest
        };
    }
}
</script>

<style scoped>


.section-title {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 24px;
    text-align: center;
}

.filter-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-tab {
    padding: 8px 16px;
    border: none;
    background-color: #f0f0f0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
}

.filter-tab.active {
    background-color: #1976d2;
    color: white;
}

.contest-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
}

.loading,
.empty-state {
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 16px;
}

@media (max-width: 768px) {
    .contest-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
    }

    .section-title {
        font-size: 24px;
    }
}
</style>