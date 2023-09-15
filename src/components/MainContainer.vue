<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'MainContainer'
};
</script>

<style scoped>
.container {
    max-width: var(--max-content-width);
    margin: 0 auto;
    padding: 20px;
}
</style>
