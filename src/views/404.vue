<template>
    <div>
        <h1>404</h1>
        <el-button @click="goBack"> 返回首页</el-button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: '404',
    setup() {
        const router = useRouter()

        function goBack() {
            router.push('/')
        }
        return { goBack }
    }
}
</script>
