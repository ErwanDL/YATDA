<template>
    <BaseCard class="container">
        <BaseTextInput
            :value="task.title"
            ref="title"
            inputStyle="font-size: 1.3em;
                        font-weight: 400;
                        margin-top: 0.3em;
                        margin-bottom: 1em;"
            @blur="update('title', $event)"
            :max-length="25"
        />
        <div class="subtasks" v-if="task.subtasks.length > 0">
            <div class="list-header">
                <div>Subtasks</div>
                <div>Duration</div>
            </div>
            <template v-for="(subtask, index) in task.subtasks">
                <Subtask
                    :key="subtask.id"
                    v-bind="subtask"
                    :ref="index"
                    @update="updateSubtask($event, index)"
                    @delete="deleteSubtask(index)"
                />
            </template>
            <p style="margin-top: 2em;">Only {{ daysLeft }} of work left !</p>
        </div>

        <p v-else>You have not added any subtask yet.</p>

        <div class="buttons-section">
            <base-button @click="pushNewSubtask()" style="alignSelf: flex-end;">
                <div style="display: flex;">
                    <PlusSign width="1em" fill="#fff" class="plus-sign" />New
                    subtask
                </div>
            </base-button>
            <base-button
                @click="$emit('delete')"
                color="error"
                style="alignSelf: flex-end;"
            >Delete task</base-button>
        </div>
    </BaseCard>
</template>
<script lang="ts">
import Vue from "vue";
import Subtask from "@/components/Subtask.vue";
import PlusSign from "@/icons/PlusSign.vue";
// @ts-ignore (false positive)
import { TaskType, SubtaskType } from "@/types.ts";
// @ts-ignore (false positive)
import { generateId } from "@/utils.ts";

export default Vue.extend({
    props: {
        task: {
            type: Object as () => TaskType,
            required: true,
        },
    },
    computed: {
        daysLeft(): string {
            const nbDays = this.task.subtasks.reduce(
                (acc: number, subtask: SubtaskType) =>
                    acc + (subtask.completed ? 0 : subtask.duration),
                0,
            );
            return `${nbDays} day${nbDays > 1 ? "s" : ""}`;
        },
    },
    methods: {
        update<T>(key: string, newValue: T): void {
            this.$emit("update", { ...this.$props.task, [key]: newValue });
        },
        updateSubtask(modifiedSubtask: SubtaskType, index: number): void {
            this.update("subtasks", [
                ...this.$props.task.subtasks.slice(0, index),
                modifiedSubtask,
                ...this.$props.task.subtasks.slice(index + 1),
            ]);
        },
        pushNewSubtask(): void {
            this.$emit("update", {
                ...this.$props.task,
                subtasks: [
                    ...this.$props.task.subtasks,
                    {
                        id: this.generateNextSubTaskID(),
                        description: "",
                        duration: 1,
                        completed: false,
                    },
                ],
            });
            this.$nextTick(() => {
                // @ts-ignore
                this.$refs[this.task.subtasks.length - 1][0].focusInput();
            });
        },
        deleteSubtask(index: number): void {
            this.$emit("update", {
                ...this.$props.task,
                subtasks: [
                    ...this.$props.task.subtasks.slice(0, index),
                    ...this.$props.task.subtasks.slice(index + 1),
                ],
            });
        },
        generateNextSubTaskID(): number {
            return generateId(this.$props.task.subtasks);
        },
        focusTitle(): void {
            // @ts-ignore
            this.$refs.title.focus();
        },
    },
    components: {
        Subtask,
        PlusSign,
    },
});
</script>
<style lang="scss" scoped>
.container {
    width: $card-width;
}

.subtasks {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.list-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 45px 0 45px;
    width: 100%;
    font-size: 0.9em;
    font-weight: 200;
    color: $color-light-text;
}

.buttons-section {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.5em;
}

.plus-sign {
    fill: $color-primary;
    margin-right: 8px;
}
</style>
