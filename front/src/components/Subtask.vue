<template>
    <tr :class="['row', { strikeout: completed }]">
        <td>
            <BaseCheckbox
                :value="completed"
                @input="update('completed', $event)"
            />
        </td>
        <td>
            <BaseTextInput
                :value="description"
                @input="update('description', $event)"
                :max-length="50"
            />
        </td>
        <td>
            <div style="display: flex;">
                <BaseTextInput
                    style="margin: 0;"
                    inputStyle="text-align: right;"
                    :max-length="3"
                    :value="duration.toString()"
                    @input="updateDuration($event)"
                />
                <span class="days">d</span>
            </div>
        </td>
        <td style="text-align: right; padding-top: 5px;">
            <div @click="$emit('delete')">
                <PlusSign width="12px" height="12px" class="delete-icon" />
            </div>
        </td>
    </tr>
</template>
<script lang="ts">
import Vue from "vue";
import PlusSign from "@/icons/PlusSign.vue";

export default Vue.extend({
    props: {
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        update<T>(key: string, newValue: T): void {
            this.$emit("update", { ...this.$props, [key]: newValue });
        },
        updateDuration(newValue: string): void {
            if (newValue === "") {
                this.update("duration", 0);
            } else if (newValue.match(/^[0-9]*(\.[0-9]*)?$/g)) {
                this.update("duration", parseFloat(newValue));
            }
        },
    },
    computed: {
        console() {
            return console;
        },
    },
    components: {
        PlusSign,
    },
});
</script>
<style lang="scss" scoped>
.days {
    display: flex;
    align-items: center;
    color: $color-light-text;
    padding-left: 3px;
    font-size: 0.9em;
}

.row {
    position: relative;
    &::after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 8%;
        border-bottom: 1px solid $color-dark-text;
        width: 0%;
        transition: width 0.25s ease-out;
    }
}

.strikeout {
    &::after {
        width: 82%;
    }
}

.delete-icon {
    transform: rotate(45deg);
    fill: $color-light-text;
    &:hover {
        fill: $color-error;
        cursor: pointer;
    }
}
</style>
