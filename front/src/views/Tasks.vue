<template>
    <div v-if="isValidUser" class="cards">
        <template v-for="(task, index) in currentTasks">
            <TaskCard
                @update="updateTask($event, index)"
                @delete="deleteTask(index)"
                :key="task.id"
                :task="task"
            />
        </template>
        <NewCardButton @click="pushNewTask()" class="new-card-button" />
    </div>
    <h2 align="center" style="margin: 20%;" v-else>
        There is no registered user with the name {{ user }}. Ensure you have
        not mistyped the URL, or if you do not have an account contact the app's
        administrator.
    </h2>
</template>

<script lang="ts">
import Vue from "vue";
import TaskCard from "@/components/TaskCard.vue";
import NewCardButton from "@/components/NewCardButton.vue";
// @ts-ignore (false positive)
import { getUserData, putUpdatedUserData } from "@/services/tasksService.ts";
// @ts-ignore (false positive)
import { TaskType } from "@/types.ts";
// @ts-ignore (false positive)
import { generateId } from "@/utils.ts";

export default Vue.extend({
    data() {
        return {
            lastSyncedTasks: [] as TaskType[],
            currentTasks: [] as TaskType[],
            isValidUser: false,
        };
    },
    async mounted() {
        try {
            const tasksData = await getUserData(this.user);
            this.currentTasks = tasksData;
            this.lastSyncedTasks = tasksData;
            this.isValidUser = true;
        } catch {
            this.isValidUser = false;
        }
    },
    methods: {
        async syncDataWithAPI(): Promise<void> {
            try {
                await putUpdatedUserData(this.user, this.currentTasks);
            } catch {
                this.currentTasks = this.lastSyncedTasks;
            }
        },
        updateTask(modifiedTask: TaskType, index: number): void {
            this.currentTasks = [
                ...this.currentTasks.slice(0, index),
                modifiedTask,
                ...this.currentTasks.slice(index + 1),
            ];
            this.syncDataWithAPI();
        },
        pushNewTask(): void {
            this.currentTasks = [
                ...this.currentTasks,
                {
                    id: this.generateNextTaskID(),
                    title: "New task",
                    subtasks: [],
                },
            ];
            this.syncDataWithAPI();
        },
        deleteTask(index: number): void {
            this.currentTasks = [
                ...this.currentTasks.slice(0, index),
                ...this.currentTasks.slice(index + 1),
            ];
            this.syncDataWithAPI();
        },
        generateNextTaskID(): number {
            return generateId(this.currentTasks);
        },
    },
    computed: {
        user(): string {
            return window.location.pathname.slice(1);
        },
    },
    components: {
        TaskCard,
        NewCardButton,
    },
});
</script>

<style lang="scss">
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
