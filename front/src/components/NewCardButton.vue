<template>
    <div @click="$emit('click')" class="container">
        <h4 class="label">New Task</h4>
        <TaskIcon class="icon" width="4em" height="4em" />
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import TaskIcon from "@/icons/TaskIcon.vue";

export default Vue.extend({
    components: { TaskIcon },
});
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    width: $card-width;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    &:hover {
        .label,
        .icon {
            color: $color-primary;
            fill: $color-primary;
        }
        cursor: pointer;
    }
}

.label {
    color: $color-separator;
    margin-bottom: 0em;
}

.icon {
    fill: $color-separator;
}
</style>
