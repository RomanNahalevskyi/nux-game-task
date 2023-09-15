<template>
    <div class="todos">
        <ul class="todos-card">
            <li v-for="todo in todos" :key="todo.id">
                <div @click="$emit('addToFavorite', todo.id)">
                    <TodoCard
                        :title="todo.title"
                        :user-id="todo.userId"
                        :completed="todo.completed"
                        :is-favorite="todo.favorite"
                    />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import TodoCard from '@/components/TodoCard.vue';

export default {
    components: { TodoCard },
    props: {
        todos: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style scoped>
.todos {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 20px;
}

.todos-card {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 2rem;
    list-style: none;
    padding: 0;
}
</style>
