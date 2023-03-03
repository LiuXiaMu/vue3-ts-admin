<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="addUser">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" style="width: 100%">
            <el-table-column prop="roleId" label="ID" align="center" width="70" />
            <el-table-column prop="roleName" label="角色名" align="center" width="280" />
            <el-table-column prop="authority" label="操作" header-align="center" width="180">
                <template #default="scope">
                    <el-button type="primary" @click="changRole(scope.row)">编辑</el-button>
                    <el-button type="primary" @click="changAuthority(scope.row)">修改权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination @size-change="sizeChange" @current-change="currentChange" layout="prev, pager, next"
            :total="selectData.count" :page-size="selectData.size" /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { InitData } from "@/type/role"
import { getRoleList } from "@/requst/api"
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        const router = useRouter()
        const route = useRoute()
        //添加角色
        let addUser = () => {
            ElMessageBox.prompt('请输入角色名', '添加', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                inputPattern:
                    /\S/,
                inputErrorMessage: '内容不能为空',
            })
                .then(({ value }) => {
                    data.list.push({ roleId: data.list.slice(-1)[0].roleId + 1, roleName: value, authority: [] })
                    ElMessage({
                        type: 'success',
                        message: `你添加的角色名为：${value}`,
                    })
                })
        }
        //编辑角色
        let changRole = (row: any) => {
            ElMessageBox.prompt('修改角色名', '编辑', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                inputPattern:
                    /\S/,
                inputErrorMessage: '内容不能为空',
                inputValue: row.roleName

            })
                .then(({ value }) => {
                    row.roleName = value
                    ElMessage({
                        type: 'success',
                        message: `你编辑后的角色名为：${value}`,
                    })
                })

        }
        //修改权限
        let changAuthority = (row: any) => {
            router.push({
                path: "/authority",
                query: {
                    roleId: row.roleId,
                    authority: row.authority.join(',')
                }
            })
        }
        //接收路由跳转参数
        let onQuery = async () => {
            if (Object.keys(route.query).length != 0) {
                let query: any = route.query
                data.list.find(item => {
                    if (item.roleId == query.roleId) {
                        item.authority = query.authority
                    }
                })

            }
            // authority: number[]
            // roleId: number
            // roleName: string

        }
        onMounted(async () => {
            await getRoleList().then(res => {
                data.list = res.data
            })
            await onQuery()
        })
        return { ...toRefs(data), addUser, changRole, changAuthority }
    }
})
</script>

<style scoped>

</style>