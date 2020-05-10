<template>
    <div class="app">
        <Header />
        <Tasks />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tasks from "@/views/Tasks.vue";
import Header from "@/components/Header.vue";

export default Vue.extend({
    name: "App",
    components: {
        Header,
        Tasks,
    },
});
</script>

<style lang="scss">
@import "@/styles/globalStyles.scss";

.app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
