<template>
    <header class="container">
        <div class="title">
            <h1>yatda:</h1>
            <span class="subheader">(yet another to-do app)</span>
        </div>
    </header>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
<style lang="scss" scoped>
h1 {
    color: $color-white-bg;
    margin-bottom: 0;
}

.subheader {
    color: $color-white-bg;
    font-family: "Lucida Console", Monaco, monospace;
    margin-bottom: 8px;
    margin-left: 10px;
}

.container {
    width: 100vw;
    height: 70px;
    position: sticky;
    background-color: $color-primary;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 6px $color-shadow;
}

.title {
    display: flex;
    align-items: flex-end;
    padding-bottom: 25px;
}
</style>
