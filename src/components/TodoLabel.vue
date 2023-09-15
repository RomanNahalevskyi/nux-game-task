<template>
    <p class="todo-label">{{ label }}</p>
</template>

<script>
export default {
    props: {
        label: {
            type: [Boolean, Number, String]
        }
    }
};
</script>

<style scoped>
.todo-label {
    padding: 4px 8px;
    border: 2px solid var(--light-blue);
    border-radius: 5px;
    color: var(--blue);
    background-color: rgba(194, 224, 255, 0.5);
    font-size: 1.1rem;
}
</style>
