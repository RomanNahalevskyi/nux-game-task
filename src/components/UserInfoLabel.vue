<template>
    <h3 class="info">
        <span class="label">{{ label }}:</span> {{ value }}
    </h3>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.info {
    color: var(--white);
}

.label {
    color: var(--black);
}
</style>
