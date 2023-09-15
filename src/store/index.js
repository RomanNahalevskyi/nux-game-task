import Vue from 'vue';
import Vuex from 'vuex';
import {
    extractUserIds,
    concatFavoritesWithTodos,
    updateLocalStorage,
    filterStorageData,
    generateRandomNumberAbove201
} from '@/functions';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        users: null,
        currentUser: null,
        mainTodos: null,
        userId: null,
        favoritesTodos: [],
        todos: null
    },
    getters: {
        isAuthenticated: ({ isAuthenticated }) => isAuthenticated,
        usersData: ({ users }) => users,
        currentUser: ({ currentUser }) => currentUser,
        mainTodos: ({ mainTodos }) => mainTodos,
        userId: ({ userId }) => userId,
        favoritesTodos: ({ favoritesTodos }) => favoritesTodos,
        todos: ({ todos }) => todos
    },
    mutations: {
        SET_USERS(store, data) {
            store.users = data;
        },
        SET_AUTHENTICATED(store, data) {
            store.isAuthenticated = data;
        },
        SET_CURRENT_USER(store, data) {
            store.currentUser = data;
        },
        SET_MAIN_TODOS(store, data) {
            store.mainTodos = data;
        },
        SET_ID(store, data) {
            store.userId = data;
        },
        SET_FAVORITES_TODO(store, data) {
            const isExistingCurrency = store.favoritesTodos.some((todo) => todo.id === data.id);

            if (!isExistingCurrency) {
                store.favoritesTodos.push(data);
            } else {
                store.favoritesTodos = store.favoritesTodos.filter((todo) => {
                    return todo.id !== data.id;
                });
            }

            updateLocalStorage(store.favoritesTodos);
        },
        SET_DATA_FROM_STORAGE(store, data) {
            store.favoritesTodos = data;
        },
        SET_TODOS(store, data) {
            store.todos = data;
        },
        SET_NEW_TODO(store, data) {
            store.todos.push(data);
        }
    },
    actions: {
        async getUsers({ commit }) {
            try {
                await fetch('https://jsonplaceholder.typicode.com/users')
                    .then((response) => response.json())
                    .then((users) => {
                        commit('SET_USERS', users);
                    });
            } catch (e) {
                console.error(e);
            }
        },
        async getTodos({ state, commit }) {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                let mainTodos = await response.json();
                const userId = extractUserIds(mainTodos);
                const filteredData = filterStorageData(mainTodos);

                updateLocalStorage(filteredData);

                commit('SET_DATA_FROM_STORAGE', filteredData);

                if (state.favoritesTodos.length) {
                    mainTodos = concatFavoritesWithTodos(state.favoritesTodos, mainTodos);
                }

                commit('SET_ID', userId);
                commit('SET_MAIN_TODOS', mainTodos);
                commit('SET_TODOS', mainTodos);
            } catch (e) {
                console.error(e);
            }
        },
        async createTodo({ state, commit }, formData) {
            try {
                await fetch('https://jsonplaceholder.typicode.com/todos', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        data.id = generateRandomNumberAbove201();
                        data.completed = false;

                        commit('SET_NEW_TODO', data);

                        const userId = extractUserIds(state.mainTodos);
                        commit('SET_ID', userId);
                    });
            } catch (e) {
                console.error(e);
            }
        }
    },
    modules: {}
});
