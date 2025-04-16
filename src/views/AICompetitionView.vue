<template>
    <div class="ai-competition-container competition-view">
        <h1 class="page-title">AIGC比赛信息</h1>

        <!-- 状态过滤按钮 -->
        <div class="competition-filter">
            <el-button-group>
                <el-button v-for="filter in filterOptions" :key="filter.value"
                    :type="activeFilter === filter.value ? 'primary' : 'default'" @click="setFilter(filter.value)">
                    {{ filter.label }}
                </el-button>
            </el-button-group>
        </div>

        <!-- 竞赛列表 -->
        <div class="competition-list">
            <el-row :gutter="20">
                <el-col :sm="24" :md="12" :lg="8" v-for="competition in filteredCompetitions" :key="competition.id"
                    class="competition-col">
                    <competition-card :competition="competition" @view-details="viewCompetitionDetails"
                        @open-website="openOfficialWebsite" />
                </el-col>
                <el-col v-if="filteredCompetitions.length === 0" :span="24" class="empty-state">
                    <el-empty description="暂无符合条件的比赛信息" />
                </el-col>
            </el-row>
        </div>

        <!-- 竞赛详情弹窗组件 -->
        <competition-detail :visible="detailVisible" :competition="selectedCompetition" :all-competitions="competitions"
            @close="closeCompetitionDetail" @view-related="viewRelatedCompetition" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElNotification } from 'element-plus';
import CompetitionDetail from '../components/competition/CompetitionDetail.vue';
import CompetitionCard from '../components/competition/CompetitionCard.vue';
import { competitionsData } from '../data/competitions.js';

// --- 常量定义 ---
const FILTER_STATUS = {
    ALL: 'all',
    ONGOING: 'ongoing',
    UPCOMING: 'upcoming',
    ENDED: 'ended'
};

const filterOptions = [
    { label: '全部', value: FILTER_STATUS.ALL },
    { label: '进行中', value: FILTER_STATUS.ONGOING },
    { label: '即将开始', value: FILTER_STATUS.UPCOMING },
    { label: '已结束', value: FILTER_STATUS.ENDED }
];

// 状态到中文标签的映射
const statusMap = {
    [FILTER_STATUS.ONGOING]: '进行中',
    [FILTER_STATUS.UPCOMING]: '即将开始',
    [FILTER_STATUS.ENDED]: '已结束'
};

// --- 状态管理 ---
const activeFilter = ref(FILTER_STATUS.ALL);
const competitions = ref(competitionsData);
const detailVisible = ref(false);
const selectedCompetition = ref(null);

// --- 计算属性 ---
const filteredCompetitions = computed(() => {
    const filter = activeFilter.value;
    if (filter === FILTER_STATUS.ALL) {
        return competitions.value;
    }

    const targetStatus = statusMap[filter];
    return competitions.value.filter(comp => comp.status === targetStatus);
});

// --- 方法 ---
// 设置过滤器
const setFilter = (filter) => {
    activeFilter.value = filter;
};

// 打开官方网站
const openOfficialWebsite = (competition) => {
    if (!competition.websiteUrl) {
        ElNotification({
            title: '链接不可用',
            message: `"${competition.title}"暂未提供官方网站链接`,
            type: 'warning',
        });
        return;
    }

    ElNotification({
        title: '跳转官方网站',
        message: `正在跳转到"${competition.title}"的官方网站`,
        type: 'info',
        duration: 2000
    });

    // 在新标签页中打开链接
    window.open(competition.websiteUrl, '_blank', 'noopener noreferrer');
};

// 查看竞赛详情
const viewCompetitionDetails = (competition) => {
    selectedCompetition.value = competition;
    detailVisible.value = true;
    // 注意：不再手动设置body overflow
    // 依赖CompetitionDetail组件内的ElDialog处理
};

// 关闭竞赛详情
const closeCompetitionDetail = () => {
    detailVisible.value = false;
    // 注意：不再手动设置body overflow
};

// 查看相关竞赛
const viewRelatedCompetition = (competition) => {
    if (competition && competition.id !== selectedCompetition.value?.id) {
        selectedCompetition.value = competition;
    }
};
</script>

<style lang="less" scoped>
// --- 基础样式 ---
.ai-competition-container {
    background-color: #ffffff;
    color: #303133;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    width: 100%;
}

.page-title {
    margin-bottom: 24px;
    font-size: 28px;
    font-weight: bold;
    color: #303133;
    text-align: center;
}

// --- 过滤器部分 ---
.competition-filter {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;

    .el-button-group {
        display: inline-flex;

        .el-button {
            min-width: 90px;
            transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        }
    }
}

// --- 竞赛列表部分 ---
.competition-list {
    margin-top: 20px;
}

.competition-col {
    margin-bottom: 24px;
    transition: transform 0.3s ease-out;

    &:hover {
        transform: translateY(-5px);
    }
}

// --- 空状态 ---
.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    width: 100%;
}

// --- 视口高度 ---
.competition-view {
    min-height: 100vh;
}

// --- 响应式设计 ---
@media (max-width: 991px) {
    .competition-col {
        &:hover {
            transform: translateY(0); // 触摸设备上移除悬停效果
        }
    }
}

@media (max-width: 768px) {
    .ai-competition-container {
        padding: 15px;
    }

    .page-title {
        font-size: 22px;
        margin-bottom: 16px;
    }

    .competition-filter {
        margin-bottom: 16px;

        .el-button-group {
            width: 100%;
            display: flex;

            .el-button {
                flex: 1;
                padding: 8px 5px;
                font-size: 13px;
                min-width: 0; // 移除最小宽度限制
            }
        }
    }

    .competition-list {
        margin-top: 12px;
    }

    .competition-col {
        margin-bottom: 15px;
    }
}

@media (max-width: 480px) {
    .ai-competition-container {
        padding: 10px;
    }

    .page-title {
        font-size: 20px;
        margin-bottom: 12px;
    }

    .competition-filter .el-button-group .el-button {
        padding: 8px 3px;
        font-size: 12px;
    }

    .competition-col {
        margin-bottom: 12px;
    }
}
</style>