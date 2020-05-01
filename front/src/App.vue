<template>
    <div class="container">
        Yet Another To-Do App
        <TaskCard taskName="Java deployment" :subtasks="subtasks" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TaskCard from "@/components/TaskCard.vue";

type TodoItemProps = {
    message: string;
    id: number;
};

export default Vue.extend({
    name: "App",
    data() {
        return {
            subtasks: [
                {
                    description: "Setup Maven project",
                    duration: "1",
                },
                {
                    description: "Refactor poller code",
                    duration: "2",
                },
            ],
        };
    },
    components: {
        TaskCard,
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
