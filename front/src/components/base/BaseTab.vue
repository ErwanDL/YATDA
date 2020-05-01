<template>
    <div class="tab">
        <h5 :class="['tab-text', { 'active-tab': isActive }]">{{ text }}</h5>
    </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        text: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
<style lang="scss" scoped>
$border-width: 2px;
.tab {
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::after {
        content: "";
        border: 0px solid $color-primary;
        border-bottom-width: $border-width;
        width: 0;
        transition: width 0.35s ease-out;
    }
    &:hover::after {
        width: 100%;
    }
}
.tab-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1em 0 1em;
    flex-grow: 1;
    padding-top: $border-width + 8px;
    user-select: none;
}
.active-tab {
    color: $color-primary;
}
</style>
