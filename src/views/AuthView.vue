<template>
    <div class="auth">
        <div class="auth-form">
            <div class="form-header">
                <h1>Login Form</h1>
            </div>

            <div class="form-body">
                <h2 class="error-message" v-if="errorMessage">{{ errorMessage }}</h2>

                <div class="form-inputs">
                    <BaseInput
                        v-model.trim="userName"
                        placeholder="User name"
                        label="User name"
                        :validation-regex="LETTERS_ONLY_REGEX()"
                    />

                    <BaseInput
                        v-model="phoneNumber"
                        placeholder="Phone phone"
                        label="Phone phone"
                        :validation-regex="NUMBERS_AND_CHARS_REGEX()"
                    />
                </div>

                <BaseButton :disabled="isValidForm" text="Login" @click="login" />
            </div>
        </div>
    </div>
</template>

<script>
import { LETTERS_ONLY_REGEX, NUMBERS_AND_CHARS_REGEX, ERROR_MESSAGE } from '@/constants';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
    components: { BaseButton, BaseInput },
    data() {
        return {
            userName: '',
            phoneNumber: '',
            usersData: null,
            errorMessage: ''
        };
    },
    computed: {
        isValidForm() {
            return this.userName.trim() === '' || this.phoneNumber.length < 4;
        },
        getUsers() {
            return this.$store.getters['usersData'];
        }
    },
    methods: {
        NUMBERS_AND_CHARS_REGEX() {
            return NUMBERS_AND_CHARS_REGEX;
        },
        LETTERS_ONLY_REGEX() {
            return LETTERS_ONLY_REGEX;
        },
        login() {
            const formData = {
                userName: this.userName,
                phone: this.phoneNumber
            };

            const user = this.getUsers.find(
                (user) =>
                    user.username.toLowerCase() === formData.userName.toLowerCase() &&
                    user.phone === formData.phone
            );

            if (user) {
                this.$store.commit('SET_AUTHENTICATED', true);
                this.$store.commit('SET_CURRENT_USER', user);
                this.$router.push({ name: 'home' });
            } else {
                this.errorMessage = ERROR_MESSAGE;
            }
        }
    },
    created() {
        this.$store.dispatch('getUsers');
    }
};
</script>

<style scoped>
.auth {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.auth-form {
    width: 100%;
    max-width: 447px;
    border-radius: 5px;
}

.form-header {
    padding: 15px 0;
    display: flex;
    justify-content: center;
    background: var(--form-header-color);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.form-body {
    display: flex;
    flex-direction: column;
    gap: 25px;
    background: var(--form-body-color);
    padding: 50px 25px 30px 25px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.form-inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
