<template>
    <div class="base-input-container">
        <textarea
            v-if="multiline"
            ref="input"
            :rows="rows"
            :class="[...classes, 'multiline-input']"
            :maxlength="maxLength || ''"
            :value="value"
            v-on:input="$emit('input', $event.target.value)"
            v-on:blur="$emit('blur', $event.target.value)"
        />
        <input
            v-else
            ref="input"
            v-bind="$attrs"
            type="text"
            :style="inputStyle"
            :class="classes"
            :maxlength="maxLength || ''"
            :value="value"
            v-on:input="$emit('input', $event.target.value)"
            v-on:blur="$emit('blur', $event.target.value)"
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
        inputStyle: {
            type: String,
            default: "",
        },
    },
    methods: {
        focus(): void {
            // @ts-ignore
            this.$refs.input.focus();
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
        border-color: transparent;
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
