<template>
    <div v-show="visible" class="backdrop">
        <BaseCard class="modal">
            <h4 class="title">{{ title }}</h4>
            <p>{{ details }}</p>
            <div class="buttons">
                <BaseButton @click="$emit('confirm')" variant="contained">OK</BaseButton>
                <BaseButton v-if="hasCancelButton" @click="$emit('cancel')" color="error">Cancel</BaseButton>
            </div>
        </BaseCard>
    </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        details: {
            type: String,
        },
        hasCancelButton: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
<style lang="scss" scoped>
.backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 500;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    margin-top: 0.2em;
    margin-bottom: 0.2em;
}

.modal {
    background-color: $color-white-bg;
    min-width: 300px;
    max-width: 50%;
    border-radius: $border-radius;
    justify-content: space-between;
}

.buttons {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
</style>