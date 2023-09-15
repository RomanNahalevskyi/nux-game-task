<template>
    <article :class="['todo-card', { favorite: isFavorite }]">
        <TodoLabel :label="userId" />

        <p>{{ title }}</p>

        <TodoLabel :label="completed" />
    </article>
</template>

<script>
import TodoLabel from '@/components/TodoLabel.vue';

export default {
    components: { TodoLabel },
    props: {
        userId: {
            type: [Number, String]
        },
        title: {
            type: String
        },
        completed: {
            type: Boolean
        },
        isFavorite: {
            type: Boolean
        }
    }
};
</script>

<style scoped>
.todo-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    padding: 2rem;
    text-align: center;
    border: 1px solid var(--main-green-color);
    border-radius: 5px;
    box-shadow: 5px 5px 0 var(--black);
    cursor: pointer;
    min-height: 165px;
}

.favorite {
    background: var(--gold);
}
</style>
