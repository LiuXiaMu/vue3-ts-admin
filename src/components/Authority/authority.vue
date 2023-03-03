<template>
    <div>
        <el-tree ref="treeRef" :data="list" show-checkbox node-key="roleId" :check-strictly="true"
            :default-checked-keys="authority" :default-expanded-keys="authority" :props="{
                children: 'roleList',
                label: 'name'
            }">

        </el-tree>
        <el-button @click="changAuthority">确认修改</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { InitData } from '@/type/authority'
import { getAuthorityList } from '@/requst/api'
export default defineComponent({
    name: "authority",
    setup() {
        const route = useRoute()
        const router = useRouter()
        const query: any = route.query;
        const data = reactive(new InitData(query.roleId, query.authority.split(',')))
        getAuthorityList().then(res => {
            data.list = res.data
        })
        let changAuthority = () => {
            let arr = data.treeRef.getCheckedKeys().sort(function (a: number, b: number) { return a - b })
            //携带ID和修改好的权限列表跳转页面到角色列表

            router.push({
                path: "/role",
                query: query.authority != arr.join(',') ? {
                    roleId: data.roleId,
                    authority: arr
                } : {}
            })

        }
        return { ...toRefs(data), changAuthority }
    }
})
</script>

<style scoped>

</style>