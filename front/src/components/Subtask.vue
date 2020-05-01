<template>
    <tr>
        <td class="center-cell-content">
            <base-checkbox v-model="completed" />
        </td>
        <td>
            <base-text-input v-model="description" :max-length="50" />
        </td>
        <td class="center-cell-content">
            <base-text-input
                inputStyle="text-align: right;"
                :max-length="3"
                v-model="duration"
            />
            <span class="days">d</span>
        </td>
    </tr>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            description: "Setup Maven project",
            duration: "1",
            completed: false,
        };
    },
    props: {
        index: {
            type: Number,
            required: true,
        },
        // description: {
        //     type: String,
        //     required: true,
        // },
        // duration: {
        //     type: Number,
        //     required: true,
        // },
        // completed: {
        //     type: Boolean,
        //     required: true,
        // },
    },
});
</script>
<style lang="scss" scoped>
.center-cell-content {
    display: flex;
    justify-content: center;
}

.days {
    display: flex;
    align-items: center;
    color: $color-light-text;
    padding-left: 3px;
    font-size: 0.9em;
}
</style>
