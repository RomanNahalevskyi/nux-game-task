<template>
    <div class="create-todo">
        <div class="inputs">
            <BaseInput v-model="userId" type="number" placeholder="User ID" />
            <BaseInput v-model="title" placeholder="Title" />
        </div>

        <BaseButton :disabled="validateForm" @click="createTodo" text="Add" />
    </div>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
    components: { BaseButton, BaseInput },
    data() {
        return {
            userId: '',
            title: ''
        };
    },
    computed: {
        validateForm() {
            return !this.userId || !this.title;
        }
    },
    methods: {
        createTodo() {
            const formData = {
                userId: this.userId,
                title: this.title
            };

            this.$store.dispatch('createTodo', formData);

            this.userId = this.title = '';
        }
    }
};
</script>

<style scoped>
.create-todo {
    margin-bottom: 40px;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
}
</style>
