<template>
    <div class="container">
        Yet Another To-Do App
        <ProjectCard />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProjectCard from "@/components/ProjectCard.vue";

type TodoItemProps = {
    message: string;
    id: number;
};

export default Vue.extend({
    name: "App",
    components: {
        ProjectCard,
    },
});
</script>

<style lang="scss">
@import "@/styles/globalStyles.scss";

.title {
    align-self: center;
}
.new-item-form {
    display: flex;
    align-items: flex-end;
    align-self: flex-end;
}
</style>
