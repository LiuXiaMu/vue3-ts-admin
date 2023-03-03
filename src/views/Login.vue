<template>
    <div class="login">
        <img class="bg" src="~public/image/background.jpg" alt="">

        <!-- <div class="box">
            <div class="title">
                <span>Login</span>
            </div>
            <div class="user">
                
            </div>
            <div class="btn"></div>
        </div> -->
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="ruleForm">
            <p class="title">Login</p>
            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" type="text" autocomplete="off" placeholder="账号" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="密码" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">GO</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { LoginData } from "@/type/login"
import { setLocal } from '@/hooks/localstorage'
import type { FormInstance } from 'element-plus'
import { login } from '@/requst/api'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: "Login",
    setup() {
        const data = reactive(new LoginData())
        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入账号",
                    trigger: "blur"
                },
                {
                    min: 3,
                    max: 5,
                    message: "账号长度在3-5",
                    trigger: "blur"
                }
            ],
            password: [
                {
                    required: true,
                    message: "请输入密码",
                    trigger: "blur"
                },
                {
                    min: 3,
                    max: 10,
                    message: "密码长度在3-10",
                    trigger: "blur"
                }
            ]
        }

        //登录
        const ruleFormRef = ref<FormInstance>()
        const router = useRouter() //相当于$router
        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return;
            //对表单的内容进行验证
            //valid布尔类型，为true表示验证成功，反正错误
            formEl.validate((vlid) => {
                if (vlid) {
                    // console.log('submit!');
                    login(data.ruleForm).then((res) => {
                        //将token进行保存然后跳转页面
                        setLocal('token', res.data.token)
                        router.push('/')
                    }).catch((e) => {
                        console.log(e);
                    })
                } else {
                    console.log('error submit!');
                    return false
                }
            })

        }
        return { ...toRefs(data), rules, ruleFormRef, submitForm }

    }


})

</script>

<style lang="less">
.login {
    height: 100%;

    .bg {
        position: absolute;
        z-index: -1;
        height: 100vh;
        width: 100%;
    }

    .ruleForm {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        width: 20rem;
        background-color: rgba(255, 255, 255, 0.592);
        border-radius: 15px;
        backdrop-filter: blur(3px);
        box-shadow: 0 0 20px #fff;
        padding: 20px;

        .title {
            text-align: center;
            height: 3rem;
            line-height: 4rem;
            font-weight: 800;
            font-size: 30px;
            color: rgb(77, 76, 76);
            letter-spacing: 3px;
        }

        .el-form-item {
            width: 15rem;
            margin: 20px auto;

            .el-input__wrapper {
                background: none;
                box-shadow: none;
                border-bottom: 2px solid rgb(144, 144, 187);
                border-radius: 0;

                ::placeholder {
                    color: rgb(135, 135, 135);
                }
            }

            .el-button {
                width: 100%;
                font-weight: 600;
                font-size: 18px;
                letter-spacing: 6px;
                padding: 19px;
                background-image: linear-gradient(to left, #80bde7, #b3c7dc);
                border: none;
                margin-top: 1rem;
            }
        }

    }
}
</style>