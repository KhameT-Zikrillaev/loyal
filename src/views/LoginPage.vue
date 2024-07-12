<template>
    <div class="login">
        <div class="container">
            <LoginForm/>
        </div>
    </div>
</template>

<script setup>
import LoginForm from "@/components/LoginForm.vue"
</script>

<style lang="scss" scoped>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>