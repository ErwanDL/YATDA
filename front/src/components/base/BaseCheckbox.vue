<template>
    <label :class="['container', { 'container-active': value }]">
        <input
            type="checkbox"
            style="display: none;"
            :checked="value"
            @input="$emit('input', Boolean($event.target.checked))"
        />
        <CheckMark class="checkmark" />
    </label>
</template>
<script lang="ts">
import Vue from "vue";
import CheckMark from "@/icons/CheckMark.vue";

export default Vue.extend({
    props: {
        value: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    components: {
        CheckMark,
    },
});
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    border: 1px solid $color-separator;
    border-radius: $border-radius;
    &:hover {
        border-color: $color-primary;
        box-shadow: 0 0 4px $color-separator;
    }
}

.container-active {
    background-color: $color-primary;
    border-color: $color-primary;
}

.checkmark {
    width: 10px;
    height: 10px;
    fill: $color-white-bg;
}
</style>
