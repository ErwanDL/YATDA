<template>
    <div class="app">
        <Header />
        <div class="cards">
            <template v-for="(task, index) in tasks">
                <TaskCard
                    @update="updateTask($event, index)"
                    @delete="deleteTask(index)"
                    :key="task.id"
                    :task="task"
                />
            </template>
            <NewCardButton @click="pushNewTask()" class="new-card-button" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TaskCard from "@/components/TaskCard.vue";
import Header from "@/components/Header.vue";
import NewCardButton from "@/components/NewCardButton.vue";
// @ts-ignore (false positive)
import { TaskType } from "@/components/types.ts";
// @ts-ignore (false positive)
import KeygenMixin from "@/components/mixins/KeygenMixin";

const tasks = [
    {
        title: "Java project setup",
        id: -1,
        subtasks: [
            {
                id: -1,
                description: "Setup Maven project",
                duration: 1,
                completed: false,
            },
            {
                id: -2,
                description: "Refactor poller code",
                duration: 2,
                completed: false,
            },
        ],
    },
] as TaskType[];

export default Vue.extend({
    name: "App",
    data() {
        return { tasks };
    },
    methods: {
        updateTask(modifiedTask: TaskType, index: number): void {
            this.tasks = [
                ...this.tasks.slice(0, index),
                modifiedTask,
                ...this.tasks.slice(index + 1),
            ];
        },
        pushNewTask(): void {
            this.tasks = [
                ...this.tasks,
                {
                    // @ts-ignore
                    id: this.generateKey(),
                    title: "New task",
                    subtasks: [],
                },
            ];
        },
        deleteTask(index: number): void {
            this.tasks = [
                ...this.tasks.slice(0, index),
                ...this.tasks.slice(index + 1),
            ];
        },
    },
    components: {
        TaskCard,
        Header,
        NewCardButton,
    },
    mixins: [KeygenMixin],
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

.cards {
    padding-top: 20px;
    width: 70%;
    min-width: 350px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.new-card-button {
    margin: 60px 120px 60px 120px;
}
</style>
