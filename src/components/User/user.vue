<template>
    <div>
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="addUser">添加用户</el-button>
            </el-form-item>

            <el-form-item label="用户">
                <el-input v-model="selectData.nickName" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="selectData.role" multiple collapse-tags collapse-tags-tooltip placeholder="Select"
                    style="width: 240px">
                    <el-option label="全部" :value="0">

                    </el-option>
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onRest">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="ID" align="center" width="70" />
            <el-table-column prop="nickName" label="用户" align="center" width="180" />
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-tag v-for="item in scope.row.role" :key="item.role" :style="'margin-left:4px'">
                        {{ item.roleName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <el-button @click="changUser(scope.row)">
                        编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination @size-change="sizeChange" @current-change="currentChange" layout="prev, pager, next"
            :total="selectData.count" :page-size="selectData.size" /> -->
    </div>
    <el-dialog v-model="isShow" :title="editUserTitle">
        <el-form :model="active">
            <el-form-item label="姓名" label-width="50px">
                <el-input v-model="active.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="角色" label-width="50px">
                <el-select v-model="active.role" multiple collapse-tags collapse-tags-tooltip placeholder="请选择角色"
                    value-key="roleId">
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="subMit">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { getUserList, getRoleList, getAuthorityList } from '@/requst/api'
import { InitData, ListInt, ActiveInt } from '@/type/user'
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        getUserList().then((res) => {
            let row = Object.assign(res.data, {})
            row.forEach((item: any) => {
                item.role.map((citem: any) => {
                    citem.roleId = citem.role
                })
            })
            data.list = row
            data.initList = row
        })
        getRoleList().then((res) => {
            data.roleList = res.data
        })
        //查询
        let onSearch = () => {
            data.list = data.initList
            let arr: ListInt[] = []
            if (data.selectData.nickName || data.selectData.role.length) {
                if (data.selectData.nickName && data.selectData.role.length || data.selectData.nickName) {
                    arr = data.list.filter(item => {
                        return item.nickName.indexOf(data.selectData.nickName) !== -1
                    })
                } else if (data.selectData.role.length) {
                    if (data.selectData.role.includes(0)) return;
                    arr = data.list.filter(item => {
                        return item.role.find(findItem => {
                            return data.selectData.role.includes(findItem.role)
                        })
                    })
                }
                data.list = arr
            } else {
                return
            }


        }
        //重置查询
        let onRest = () => {
            data.selectData.role = [0]
            data.selectData.nickName = ""
            data.list = data.initList
        }
        //添加用户
        let addUser = () => {
            data.editUserTitle = "添加用户"
            data.isShow = true
        }
        //编辑用户
        let changUser = (row: ListInt) => {
            data.editUserTitle = "编辑信息"
            data.active = {
                id: row.id,
                nickName: row.nickName,
                role: row.role,
                userName: row.userName
            }
            data.isShow = true

        }
        //编辑用户-提交
        let subMit = () => {
            if (data.editUserTitle == '添加用户') {
                console.log(data.active.role);

                data.list.push({
                    id: data.list.slice(-1)[0].id + 1,
                    nickName: data.active.nickName,
                    role: data.active.role,
                    userName: data.active.userName
                })
            } else if (data.editUserTitle == '编辑信息') {
                data.list.find(item => {
                    if (item.id === data.active.id) {
                        item.nickName = data.active.nickName
                        item.role = data.active.role
                    }
                })
            }
            data.isShow = false
            data.active = {} as ActiveInt;

        }

        return { ...toRefs(data), onSearch, onRest, changUser, subMit, addUser }
    }
})
</script>

<style scoped>

</style>