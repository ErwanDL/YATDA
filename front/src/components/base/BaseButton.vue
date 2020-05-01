<template>
    <button :class="classes">
        <slot />
    </button>
</template>

<script lang="ts">
import Vue from "vue";

type ButtonVariant = "contained" | "text";
type ButtonColor = "primary" | "error";

export default Vue.extend({
    props: {
        variant: {
            type: String as () => ButtonVariant,
            default: "text",
        },
        color: {
            type: String as () => ButtonColor,
            default: "primary",
        },
    },
    computed: {
        classes() {
            return [this.variant, this.color];
        },
    },
});
</script>

<style lang="scss" scoped>
button {
    padding: 0.6em 1em 0.6em 1em;
    border-width: 0;
    font-size: 0.9em;
    position: relative;
    border-radius: $border-radius;
}
button:enabled {
    cursor: pointer;
}
.primary {
    background-color: $color-primary;
    color: $color-primary;
    &::before,
    &::after {
        border-color: $color-primary;
    }
    &.text:hover {
        background: rgba($color-primary, 0.08);
    }
    &.text:active {
        background: rgba($color-primary, 0.2);
    }
}
.error {
    background-color: $color-error;
    color: $color-error;
    &::before,
    &::after {
        border-color: $color-error;
    }
    &.text:hover {
        background: rgba($color-error, 0.08);
    }
    &.text:active {
        background: rgba($color-error, 0.2);
    }
}

.contained {
    box-shadow: 0 1px 2px grey;
    color: $color-white-bg;
    transition: box-shadow 0.25s ease-out, transform 0.25s ease-out;
}
.contained:disabled {
    box-shadow: none;
    background: $color-darker-bg;
}
.contained:hover:enabled:not(:active) {
    box-shadow: 0 2px 6px grey;
    transform: translate(0px, -1px);
    filter: brightness(105%);
}
.contained:active:enabled {
    box-shadow: none;
    filter: brightness(95%);
}

.text {
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.5s ease-in;
    &:disabled {
        color: $color-separator;
    }
    &:enabled {
        &::before,
        &::after {
            border: 0px solid;
            border-radius: $border-radius;
            width: 0;
            height: 0;
            box-sizing: inherit;
            content: "";
            position: absolute;
            transition: height 0.25s ease-out, width 0.25s ease-out 0.25s,
                border-width 0s 0.5s;
        }
        &::before {
            top: 0;
            left: 0;
        }
        &::after {
            bottom: 0;
            right: 0;
        }
        &:hover {
            transition: background-color 0.25s ease-in 0.25s;
            &::after,
            &::before {
                width: 100%;
                height: 100%;
                transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
            }
            &::before {
                border-width: 1px 1px 0 0;
            }
            &::after {
                border-width: 0 0 1px 1px;
            }
        }
        &:active {
            transition: background-color 0.25s;
        }
    }
}
</style>
