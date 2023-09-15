<template>
    <div>
        <label>{{ placeholder }}</label>
        <select v-model="selectedValue" @change="$emit('select', $event.target.value)">
            <option disabled>{{ placeholder }}</option>
            <option v-for="(option, index) in options" :key="index" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'BaseSelect',
    props: {
        options: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        selected: {
            type: [Number, String]
        }
    },
    data() {
        return {
            selectedValue: this.placeholder
        };
    }
};
</script>

<style scoped>
select {
    width: 100%;
    padding: 10px;
    font-size: 15px;
    color: var(--black);
    max-width: 100%;
    margin: auto;
    outline: 0;
    background: var(--white);
    border: 2px solid var(--main-green-color);
    border-radius: 5px;
    box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
}
</style>
