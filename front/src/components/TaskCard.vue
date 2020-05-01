<template>
    <base-card :title="taskName" style="width: 350px;">
        <table>
            <tr>
                <th></th>
                <th style="text-align: left; padding-left: 0.5em;">Subtasks</th>
                <th style="width: 15%;">Duration</th>
            </tr>
            <template
                v-for="(task, index) in subtasks"
                style="list-style-type : none;"
            >
                <Subtask :key="index" :index="index + 1" v-bind="task" />
            </template>
        </table>

        <div
            style="display: flex; justify-content: space-between; width: 100%;"
        >
            <base-button style="alignSelf: flex-end;">
                <div style="display: flex;">
                    <PlusSign width="1em" fill="#fff" class="plus-sign" />New
                    subtask
                </div>
            </base-button>
            <base-button color="error" style="alignSelf: flex-end;"
                >Archive task</base-button
            >
        </div>
    </base-card>
</template>
<script lang="ts">
import Vue from "vue";
import Subtask from "@/components/Subtask.vue";
import PlusSign from "@/icons/PlusSign.vue";

type SubtaskType = {
    description: string;
    duration: number;
    completed: boolean;
};

export default Vue.extend({
    props: {
        taskName: {
            type: String,
            required: true,
        },
        subtasks: {
            type: Array as () => SubtaskType[],
            required: true,
        },
    },
    components: {
        Subtask,
        PlusSign,
    },
});
</script>
<style lang="scss" scoped>
th {
    font-size: 0.9em;
    font-weight: 200;
    color: $color-light-text;
}

.plus-sign {
    fill: $color-primary;
    margin-right: 8px;
}
</style>
