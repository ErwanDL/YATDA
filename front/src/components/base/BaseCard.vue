<template>
    <div class="card">
        <slot />
    </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        title: {
            type: String,
        },
    },
});
</script>
<style lang="scss" scoped>
.card {
    background-color: $color-white-bg;
    border: none;
    border-radius: 5px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 1px 1px 5px $color-shadow;
}
</style>
