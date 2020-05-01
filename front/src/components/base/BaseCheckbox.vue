<template>
    <label :class="['container', { 'container-active': value }]">
        <input
            type="checkbox"
            style="display: none;"
            v-bind:checked="value"
            v-on:input="$emit('input', Boolean($event.target.checked))"
        />
    </label>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        value: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
});
</script>
<style lang="scss" scoped>
.container {
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
</style>
