<template>
    <div>
        <label v-if="label" :for="label">{{ label }}</label>
        <input
            :id="label"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            @input="validateInput"
            class="base-input"
        />
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        label: {
            type: String
        },
        placeholder: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            default: ''
        },
        validationRegex: {
            default: null
        }
    },
    methods: {
        validateInput(event) {
            const inputValue = event.target.value;
            const regex = this.validationRegex;

            if (!regex) {
                this.$emit('input', inputValue);
            } else {
                if (regex.test(inputValue)) {
                    this.$emit('input', inputValue);
                } else {
                    event.target.value = this.value;
                }
            }
        }
    }
};
</script>

<style scoped>
.base-input {
    border-radius: 5px;
    width: 100%;
    padding: 10px;
    border: none;
    font-size: 17px;
}
</style>
