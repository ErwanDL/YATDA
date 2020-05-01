<template>
    <base-card :title="taskName" style="width: 350px;">
        <ul>
            <li
                v-for="(task, index) in subtasks"
                :key="task"
                style="list-style-type : none;"
            >
                <Subtask
                    :index="index + 1"
                    :description="task.description"
                    :duration="task.duration"
                />
            </li>
        </ul>
        <div
            style="display: flex; justify-content: space-between; width: 100%;"
        >
            <base-button variant="contained" style="alignSelf: flex-end;">
                <div style="display: flex;">
                    <PlusSign
                        width="1em"
                        fill="#fff"
                        style="margin-right: 8px;"
                    />New subtask
                </div>
            </base-button>
            <base-button color="error" style="alignSelf: flex-end;">
                Archive task
            </base-button>
        </div>
    </base-card>
</template>
<script lang="ts">
import Vue from "vue";
import Subtask from "@/components/Subtask.vue";
import PlusSign from "@/icons/PlusSign.vue";

type Subtask = {
    description: string;
    duration: number;
};

export default Vue.extend({
    props: {
        taskName: {
            type: String,
            required: true,
        },
        subtasks: {
            type: Object as () => Subtask[],
            required: true,
        },
    },
    components: {
        Subtask,
        PlusSign,
    },
});
</script>
<style lang="scss" scoped></style>
