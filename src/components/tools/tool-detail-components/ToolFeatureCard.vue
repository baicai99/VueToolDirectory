<template>
    <div class="feature-card-modal-tile">
        <div class="card" tabindex="-1">
            <div class="card-modifier">
                <div class="card-viewport-content">
                    <div class="feature-card-modal-copyblock feature-card-modal-content">
                        <h5 class="feature-card-modal-copy-highlight">{{ title }}</h5>
                        <p class="feature-card-modal-copy">{{ description }}</p>
                    </div>
                    <div class="image-container">
                        <picture class="responsive-image">
                            <img :src="imageUrl" :alt="title" class="feature-image" @error="onImageError">
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['imageError']);

const onImageError = (event) => {
    emit('imageError', event);
};
</script>

<style lang="less" scoped>
.feature-card-modal-tile {
    --tile-padding-vertical: 40px;
    --tile-padding-horizontal: 28px;
    --tile-border-radius: 18px;
    --tile-background: #f5f5f7;
    --tile-text-color: #1d1d1f;
    --tile-text-secondary-color: #515154;

    padding: 24px;
    width: 100%;
    box-sizing: border-box;

    &.bleed-bottom {
        padding-bottom: 0;
    }

    &.tile-horizontal-layout .card-viewport-content {
        display: flex;
        flex-direction: row;
        align-items: center;

        .feature-card-modal-copyblock {
            flex: 1;
            padding-right: 24px;
        }

        .image-container {
            flex: 1;
        }
    }
}

.card {
    background-color: var(--tile-background);
    border-radius: var(--tile-border-radius);
    overflow: hidden;
    height: 100%;
    transition: transform 0.3s ease;
}

.card-modifier {
    height: 100%;

    &.hover-disabled:hover {
        transform: none;
    }
}

.card-viewport-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.feature-card-modal-copyblock {
    padding: var(--tile-padding-vertical) var(--tile-padding-horizontal);
}

.feature-card-modal-copy-highlight {
    font-size: 28px;
    line-height: 1.14286;
    font-weight: 600;
    letter-spacing: -.01em;
    margin: 0 0 16px;
    color: var(--tile-text-color);
}

.feature-card-modal-copy {
    font-size: 17px;
    line-height: 1.47059;
    font-weight: 400;
    letter-spacing: -.022em;
    color: var(--tile-text-secondary-color);
    margin: 0;
}

.image-container {
    margin-top: 0;
    overflow: hidden;

    &.pin-middle-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .responsive-image {
        display: block;
        width: 100%;
    }

    .feature-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        display: block;
    }
}

@media (max-width: 768px) {
    .feature-card-modal-tile {
        --tile-padding-vertical: 24px;
        --tile-padding-horizontal: 20px;
        padding: 16px;

        &.tile-horizontal-layout .card-viewport-content {
            flex-direction: column;

            .feature-card-modal-copyblock {
                padding-right: var(--tile-padding-horizontal);
            }
        }
    }

    .feature-card-modal-copy-highlight {
        font-size: 24px;
        margin-bottom: 12px;
    }

    .feature-card-modal-copy {
        font-size: 15px;
    }
}
</style>