<template>
    <div class="base-input-container">
        <select
            class="base-input select"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
        >
            <slot />
        </select>
        <label class="base-input-label label">{{ label }}</label>
        <down-arrow width="0.9em" class="dropdown-icon" />
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import DownArrow from "@/icons/DownArrow.vue";

export default Vue.extend({
    props: {
        value: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
    components: {
        DownArrow,
    },
});
</script>
<style lang="scss" scoped>
.select {
    appearance: none;
    color: transparent;
    text-shadow: 0 0 0 $color-dark-text;
    cursor: pointer;
    & ~ svg {
        transform: rotate(-90deg);
        transition: transform 0.2s ease-out;
    }
    &:hover ~ svg,
    &:focus ~ svg {
        transform: rotate(0deg);
    }
}

.label {
    position: absolute;
    left: 0;
    top: -1.4em;
}

.dropdown-icon {
    position: absolute;
    right: 0.5em;
    top: 0.7em;
    pointer-events: none;
    fill: $color-light-text;
}
</style>
