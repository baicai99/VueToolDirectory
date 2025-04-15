<template>
    <div class="ai-competition-container competition-view">
        <h1 class="page-title">AIGC比赛信息</h1>

        <!-- 状态过滤按钮 -->
        <div class="competition-filter">
            <el-button-group>
                <el-button :type="activeFilter === 'all' ? 'primary' : 'default'"
                    @click="setFilter('all')">全部</el-button>
                <el-button :type="activeFilter === 'ongoing' ? 'primary' : 'default'"
                    @click="setFilter('ongoing')">进行中</el-button>
                <el-button :type="activeFilter === 'upcoming' ? 'primary' : 'default'"
                    @click="setFilter('upcoming')">即将开始</el-button>
                <el-button :type="activeFilter === 'ended' ? 'primary' : 'default'"
                    @click="setFilter('ended')">已结束</el-button>
            </el-button-group>
        </div>

        <!-- 竞赛列表 -->
        <div class="competition-list">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" v-for="competition in filteredCompetitions"
                    :key="competition.id" class="competition-col">
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ElNotification } from 'element-plus';
import CompetitionDetail from '../components/competition/CompetitionDetail.vue';
import CompetitionCard from '../components/competition/CompetitionCard.vue';

// 当前日期，用于确定竞赛状态
const currentDate = new Date();

// 当前活跃的过滤器
const activeFilter = ref('all');

// 设置过滤器
const setFilter = (filter) => {
    activeFilter.value = filter;
};

// 模拟的竞赛数据
const competitions = ref([
    {
        id: 1,
        title: "剪映x炉米Lumi-AI创想家培养计划",
        description: "剪映与炉米Lumi联合发起的AI创想家培养计划，旨在将高质量AI作品转化为AI特效，帮助创作者面向更广泛的用户群体，解决其成本和技术问题。",
        imageUrl: "https://picsum.photos/id/1/600/300",
        status: "已结束",
        startDate: "2024/11/11",
        endDate: "2024/11/22",
        registerDeadline: "2024/11/11",
        organizer: "剪映, 炉米Lumi",
        isHot: true,
        tags: ["AI特效", "创新", "剪映", "炉米Lumi", "用户市场", "模型", "AIGC"]
    },
    {
        id: 2,
        title: "【世间·万相】LlibliAI x 通义万相 创意模型征集大赛",
        description: "光影交汇，想象无界！基于通义万相视频微调的创意模型征集大赛，鼓励开发者创作天与行空的虚拟场景和震撼眼球的视觉冲击，聚焦创意特效和灵动画风两大主题。",
        imageUrl: "https://picsum.photos/id/20/600/300",
        status: "进行中",
        startDate: "2025/03/31",
        endDate: "2025/04/30",
        registerDeadline: "2025/04/30",
        organizer: "LlibliAI, 通义万相",
        tags: ["AI模型", "视频生成", "创意特效", "灵动画风"]
    },
    {
        id: 3,
        title: "万物重构 | LlibliAI F.1元素灵感大师挑战赛",
        description: "LlibliAI F.1元素灵感大师挑战赛，旨在鼓励参员创作应用于电商和海报场景的写实与创意风格模型，创作方向涵盖自然元素、生活空间、户外场景和灵感创意。",
        imageUrl: "https://picsum.photos/id/36/600/300",
        status: "进行中",
        startDate: "2025/03/17",
        endDate: "2025/04/25",
        registerDeadline: "2025/04/25",
        organizer: "LlibliAI",
        tags: ["AI模型", "电商", "海报", "写实", "创意", "自然元素", "生活空间", "户外场景", "灵感创意"]
    },
    {
        id: 4,
        title: "AI绘画创作大赛",
        description: "探索AI辅助艺术创作的无限可能，提交由AI工具生成或辅助创作的艺术作品。",
        imageUrl: "https://picsum.photos/id/42/600/300",
        status: "即将开始",
        startDate: "2025/05/01",
        endDate: "2025/06/30",
        registerDeadline: "2025/05/15",
        organizer: "创意AI联盟",
        tags: ["AI绘画", "艺术创作", "设计"]
    },
    {
        id: 5,
        title: "智能助手开发挑战",
        description: "为特定行业或场景开发基于大语言模型的智能助手应用，解决实际问题。",
        imageUrl: "https://picsum.photos/id/48/600/300",
        status: "已结束",
        startDate: "2025/01/10",
        endDate: "2025/03/20",
        registerDeadline: "2025/01/30",
        organizer: "AI应用技术联盟",
        tags: ["LLM", "智能助手", "应用开发"]
    },
    {
        id: 6,
        title: "多模态模型创新应用赛",
        description: "基于最新的多模态AI模型，开发创新应用，实现跨媒体内容的理解与生成。",
        imageUrl: "https://picsum.photos/id/60/600/300",
        status: "进行中",
        startDate: "2025/03/01",
        endDate: "2025/05/15",
        registerDeadline: "2025/04/01",
        organizer: "前沿技术研究院",
        tags: ["多模态", "创新应用", "跨媒体"]
    }
]);

// 根据当前过滤器筛选竞赛
const filteredCompetitions = computed(() => {
    if (activeFilter.value === 'all') {
        return competitions.value;
    } else if (activeFilter.value === 'ongoing') {
        return competitions.value.filter(comp => comp.status === '进行中');
    } else if (activeFilter.value === 'upcoming') {
        return competitions.value.filter(comp => comp.status === '即将开始');
    } else if (activeFilter.value === 'ended') {
        return competitions.value.filter(comp => comp.status === '已结束');
    }
    return competitions.value;
});

// 竞赛详情弹窗相关状态
const detailVisible = ref(false);
const selectedCompetition = ref({});

// 打开官方网站
const openOfficialWebsite = (competition) => {
    ElNotification({
        title: '跳转官方网站',
        message: `正在跳转到"${competition.title}"的官方网站`,
        type: 'info',
    });
    // 这里可以实现链接跳转逻辑
};

// 查看竞赛详情
const viewCompetitionDetails = (competition) => {
    selectedCompetition.value = competition;
    detailVisible.value = true;
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
};

// 关闭竞赛详情
const closeCompetitionDetail = () => {
    detailVisible.value = false;
    // 恢复背景滚动
    document.body.style.overflow = '';
};

// 查看相关竞赛
const viewRelatedCompetition = (competition) => {
    selectedCompetition.value = competition;
    // 不需要重新打开弹窗，因为已经打开了
};

// 动态计算视口高度解决移动端100vh问题
const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// 组件挂载和卸载时的处理
onMounted(() => {
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', setViewportHeight);
    // 确保恢复滚动状态
    if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = '';
    }
});
</script>

<style lang="less" scoped>
.ai-competition-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
}

.page-title {
    margin-bottom: 24px;
    font-size: 28px;
    font-weight: bold;
    color: #303133;
    text-align: center;
}

// 过滤按钮组样式
.competition-filter {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;

    .el-button-group {
        .el-button {
            min-width: 90px;
            transition: all 0.3s;
        }
    }
}

// 竞赛列表样式
.competition-list {
    margin-top: 20px;

    .el-row {
        margin-bottom: 20px;
    }
}

// 竞赛列项
.competition-col {
    margin-bottom: 24px;
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5px);
    }
}

// 空状态
.empty-state {
    text-align: center;
    padding: 30px 0;
    width: 100%;
}

.competition-view {
    background-color: #f5f7fa;
    min-height: calc(var(--vh, 1vh) * 100);
    width: 100%;
}

// 响应式调整
@media (max-width: 991px) {
    .competition-col {
        &:hover {
            transform: translateY(0);
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
                padding-left: 5px;
                padding-right: 5px;
                font-size: 13px;
                min-width: unset;
            }
        }
    }

    .competition-list {
        margin-top: 12px;

        .el-row {
            margin-left: -5px !important;
            margin-right: -5px !important;
        }

        .el-col {
            padding-left: 5px !important;
            padding-right: 5px !important;
        }
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