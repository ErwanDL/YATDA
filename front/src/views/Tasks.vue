<template>
    <div class="container">
        <div v-if="!isRegisteredUser" class="unregistered-user-alert">
            <i>This is an offline, test version of yatda : your tasks will only be saved locally on this computer. Contact the admin to get an online synchronized account.</i>
        </div>
        <div class="cards">
            <BaseModal
                :visible="taskToDelete !== null"
                title="Confirmation"
                details="Are you certain you want to delete this task ? This action is irreversible."
                hasCancelButton
                @confirm="confirmDeleteTask(taskToDelete)"
                @cancel="taskToDelete = null"
            />
            <template v-for="(task, index) in currentTasks">
                <TaskCard
                    @update="updateTask($event, index)"
                    :ref="index"
                    @delete="taskToDelete = index"
                    class="card"
                    :key="task.id"
                    :task="task"
                />
            </template>
            <NewCardButton @click="pushNewTask()" class="card" />
        </div>
    </div>
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
import {
    getLocalStorageData,
    updateLocalStorageTasks,
    // @ts-ignore (false positive)
} from "@/services/localStorageService.ts";

export default Vue.extend({
    data() {
        return {
            lastSyncedTasks: [] as TaskType[],
            currentTasks: [] as TaskType[],
            isRegisteredUser: false,
            taskToDelete: null,
        };
    },
    async mounted() {
        let tasksData: TaskType[];
        try {
            tasksData = await getUserData(this.user);
            this.currentTasks = tasksData;
            this.lastSyncedTasks = tasksData;
            this.isRegisteredUser = true;
        } catch {
            tasksData = await getLocalStorageData();
            this.currentTasks = tasksData;
            this.lastSyncedTasks = tasksData;
        }
    },
    methods: {
        async syncDataWithAPI(): Promise<void> {
            if (this.isRegisteredUser) {
                try {
                    await putUpdatedUserData(this.user, this.currentTasks);
                } catch {
                    this.currentTasks = this.lastSyncedTasks;
                }
            } else {
                await updateLocalStorageTasks(this.currentTasks);
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
                    title: "",
                    subtasks: [],
                },
            ];
            this.syncDataWithAPI();
            this.$nextTick(() => {
                // @ts-ignore
                this.$refs[this.currentTasks.length - 1][0].focusTitle();
            });
        },
        confirmDeleteTask(index: number): void {
            this.currentTasks = [
                ...this.currentTasks.slice(0, index),
                ...this.currentTasks.slice(index + 1),
            ];
            this.taskToDelete = null;
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
.container {
    width: 100%;
    height: 100%;
}

.unregistered-user-alert {
    width: 100%;
    min-height: 40px;
    background-color: $color-error;
    color: $color-white-bg;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 100;
    text-align: center;
}

.cards {
    width: 100%;
    padding: 20px 50px 20px 50px;
    @media (max-width: $mobile-width) {
        padding-right: 0;
        padding-left: 0;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.card {
    margin: 20px;
}
</style>
