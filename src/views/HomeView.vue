<template>
    <div class="home">
        <UserInformation :user-data="userData" />

        <MainContainer>
            <CreateTodo />

            <BaseInput v-model="inputValue" class="home-input" placeholder="Filter by title" />

            <div class="home-select">
                <BaseSelect
                    placeholder="Filter by status"
                    :options="options"
                    @select="filterDataByStatusAndId($event, 'statusSelectKey')"
                    :key="statusSelectKey"
                />

                <BaseSelect
                    v-if="mainTodos"
                    placeholder="Filter by id"
                    :options="getIds"
                    @select="filterDataByStatusAndId($event, 'idSelectKey')"
                    :key="idSelectKey"
                />
            </div>

            <TheTodos v-if="todos" :todos="todos" @addToFavorite="addFavoriteMarker" />
        </MainContainer>
    </div>
</template>

<script>
import UserInformation from '@/components/UserInformation.vue';
import MainContainer from '@/components/MainContainer.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import TheTodos from '@/components/TheTodos.vue';
import BaseInput from '@/components/BaseInput.vue';
import { concatFavoritesWithTodos, filterTodosBy, generateRandomString } from '@/functions';
import CreateTodo from '@/components/CreateTodo.vue';

export default {
    name: 'HomeView',
    components: { CreateTodo, BaseInput, TheTodos, BaseSelect, MainContainer, UserInformation },
    data() {
        return {
            options: [
                { value: 'all', label: 'All' },
                { value: 'completed', label: 'Completed' },
                { value: 'uncompleted', label: 'Uncompleted' },
                { value: 'favorites', label: 'Favorites' }
            ],
            inputValue: '',
            statusSelectKey: 1,
            idSelectKey: 2
        };
    },
    computed: {
        userData() {
            return this.$store.getters['currentUser'];
        },
        mainTodos() {
            return this.$store.getters['mainTodos'];
        },
        getIds() {
            return this.$store.getters['userId'];
        },
        favoritesData() {
            return this.$store.getters['favoritesTodos'];
        },
        todos() {
            let result = null;
            const storeData = this.$store.getters['todos'];

            if (storeData) {
                result = storeData.filter((item) =>
                    item.title.toLowerCase().includes(this.inputValue.toLowerCase())
                );
            }

            return result;
        }
    },
    methods: {
        filterDataByStatusAndId(filterType, selectKey) {
            let filteredTodos = this.mainTodos;

            if (this.favoritesData.length) {
                filteredTodos = concatFavoritesWithTodos(this.favoritesData, filteredTodos);
            }

            if (filterType) {
                filteredTodos = filterTodosBy(filteredTodos, filterType);

                const keyMap = {
                    statusSelectKey: 'idSelectKey',
                    idSelectKey: 'statusSelectKey'
                };

                if (keyMap[selectKey]) {
                    this[keyMap[selectKey]] = generateRandomString(7);
                }
            }

            this.$store.commit('SET_TODOS', filteredTodos);
        },
        addFavoriteMarker(id) {
            const updatedTodos = this.todos.map((todo) => {
                if (todo.id === id) {
                    if (todo.favorite) {
                        delete todo.favorite;
                    } else {
                        todo.favorite = true;
                    }
                }
                return todo;
            });

            this.$store.commit('SET_TODOS', updatedTodos);

            this.favoritesStore(updatedTodos, id);
        },
        favoritesStore(updatedTodos, id) {
            const result = updatedTodos.find((todo) => todo.id === id);

            this.$store.commit('SET_FAVORITES_TODO', result);
        }
    },
    created() {
        this.$store.dispatch('getTodos');
    }
};
</script>

<style scoped>
.home-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.home-input {
    margin-bottom: 20px;
}
</style>
