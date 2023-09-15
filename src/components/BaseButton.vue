<template>
    <button
        :class="['base-button', { disabled: disabled }]"
        :disabled="disabled"
        @click="$emit('click')"
    >
        {{ text }}
    </button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
.base-button {
    border-radius: 5px;
    background: var(--main-button-color);
    color: var(--white);
    padding: 10px 30px;
    border: none;
    font-size: 17px;
    font-style: normal;
    cursor: pointer;
}

.base-button:hover {
    background: var(--hover-button-color);
}

.base-button:disabled,
.base-button[disabled] {
    background-color: var(--disabled-button-color);
    color: #666666;
    cursor: not-allowed;
}
</style>
