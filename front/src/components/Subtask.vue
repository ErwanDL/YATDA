<template>
    <div class="row">
        <div class="checkbox">
            <BaseCheckbox :value="completed" @input="update('completed', $event)" />
        </div>
        <div :class="['inputs', { strikeout: completed }]">
            <BaseTextInput
                class="description-input"
                ref="description"
                :value="description"
                @blur="update('description', $event)"
                :max-length="40"
            />
            <div class="duration">
                <BaseTextInput
                    style="margin: 0;"
                    inputStyle="text-align: right;"
                    :value="duration.toString()"
                    @keypress="validateDuration"
                    @blur="update('duration', Number($event))"
                />
                <span class="days">d</span>
            </div>
        </div>
        <div class="delete-button" @click="$emit('delete')">
            <PlusSign width="12px" height="12px" class="delete-icon" />
        </div>
    </div>
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
        validateDuration(event: InputEvent): boolean {
            // @ts-ignore
            const newValue: string = event.target.value + event.key;
            if (
                newValue.match(/^[0-9]*(\.[0-9]*)?$/g) &&
                newValue.length <= 3
            ) {
                return true;
            }
            event.preventDefault();
            return false;
        },
        focusInput() {
            // @ts-ignore
            this.$refs.description.focus();
        },
    },
    components: {
        PlusSign,
    },
});
</script>
<style lang="scss" scoped>
.row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.checkbox {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
}

.inputs {
    position: relative;
    display: flex;
    flex-grow: 1;
    &::after {
        content: " ";
        position: absolute;
        top: 50%;
        border-bottom: 1px solid $color-dark-text;
        width: 0%;
        transition: width 0.25s ease-out;
    }
}

.description-input {
    flex-grow: 1;
    margin: 0.3em 0 0.2em 0;
}

.duration {
    display: flex;
    align-items: center;
    flex-grow: 0;
    width: 3.5em;
    margin-right: 10px;
}

.days {
    margin-top: 1px;
    color: $color-light-text;
    font-size: 0.9em;
    margin-left: 1px;
}

.strikeout {
    &::after {
        width: 100%;
    }
}

.delete-button {
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.delete-icon {
    transform: rotate(45deg);
    fill: $color-error;
    &:hover {
        filter: brightness(85%);
        cursor: pointer;
    }
}
</style>
