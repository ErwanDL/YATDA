<template>
    <div class="base-input-container">
        <textarea
            v-if="multiline"
            :rows="rows"
            :class="[...classes, 'multiline-input']"
            :maxlength="maxLength || ''"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
        />
        <input
            v-else
            v-bind="$attrs"
            type="text"
            :class="classes"
            :maxlength="maxLength || ''"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
        />
        <label class="base-input-label label">{{ label }}</label>
    </div>
</template>
<script lang="ts">
import Vue from "vue";

type ClassPropType = string | Array<string | Record<string, boolean>>;
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
        multiline: {
            type: Boolean,
            default: false,
        },
        rows: {
            type: Number,
            default: 10,
        },
        maxLength: {
            type: Number,
        },
    },
    computed: {
        classes(): ClassPropType {
            return [
                "base-input",
                "text-input",
                { "offset-label": this.value.length > 0 },
            ];
        },
    },
    inheritAttrs: false,
});
</script>
<style lang="scss" scoped>
$final-top-offset: -1.3em;
$animation-duration: 0.2s;
$animation-delay: 0.1s;

.label {
    position: absolute;
    left: 0.3em;
    top: 0.2em;
    transition: top $animation-duration ease $animation-delay,
        color $animation-duration;
    pointer-events: none;
    white-space: nowrap;
}

.text-input {
    resize: none;
    &:not(:focus) {
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
    }
    transition: border-color $animation-duration ease-out;
    &:hover,
    &:focus {
        & ~ label {
            top: $final-top-offset;
            transition: top $animation-duration ease;
        }
    }
    &:hover:not(:focus) {
        border-color: $color-separator;
        transition: border-color $animation-duration ease-out $animation-delay;
    }
    &:focus {
        transition: border-color;
    }
}

.multiline-input {
    font-family: inherit;
    font-size: 0.8em;
    &:not(:focus) {
        border-color: $color-separator;
    }
    &:hover {
        animation: temporary-transparent2 $animation-duration;
    }
}

.offset-label {
    & ~ label {
        top: $final-top-offset;
        transition: top $animation-duration ease, color $animation-duration;
    }
}
</style>
