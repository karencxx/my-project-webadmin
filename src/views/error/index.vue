
<template>
    <div class="error-page text-center">
        <el-empty description="找不到页面～" />
        <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goHome() {
            this.$router.push('/dashboard')
        }
    }
}
</script>