<template>
    <div style="display: flex; justify-content: space-between;">
        <input type="checkbox" />
        <base-text-input
            :label="`Subtask ${index}`"
            v-model="description"
            :max-length="50"
        />
        <base-text-input
            label="Estimated duration"
            type="number"
            style="width: 3em;"
            :max-length="5"
            v-model="duration"
        />
    </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        index: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
    },
});
</script>
<style lang="scss" scoped></style>
