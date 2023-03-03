<template>
    <div :stlye="{ height: 200 + 'px' }">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="selectData.title" placeholder="请输入标题" />
            </el-form-item>
            <el-form-item label="详情">
                <el-input v-model="selectData.introduce" placeholder="请输入详情" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList.comList" style="width: 100%">
            <el-table-column prop="id" label="ID" align="center" width="70" />
            <el-table-column prop="title" label="标题" align="center" width="180" />
            <el-table-column prop="introduce" label="内容" header-align="center" />
        </el-table>
        <el-pagination class="page" @size-change="sizeChange" @current-change="currentChange" layout="prev, pager, next"
            :total="selectData.count" :page-size="selectData.size" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { getGoodsList } from "@/requst/api"
import { InitData, ListInt } from "@/type/goods"

export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        getGoodsList().then((res) => {
            data.list = res.data
            data.initList = res.data
            data.selectData.count = res.data.length
        })
        //展示的数据
        const dataList = reactive({
            comList: computed(() => {
                //通过size和page拿取要展示的数据
                return data.list.slice((data.selectData.page - 1) * data.selectData.size, data.selectData.page * data.selectData.size)
            })
        })
        //查询
        let onSearch = (title: string, introduce: string) => {
            data.list = data.initList
            let arr: ListInt[] = []//定义数组，用来接受查询过后要展示的数据
            if (data.selectData.title || data.selectData.introduce) {
                if (data.selectData.title) {
                    arr = data.list.filter((value) => {
                        return value.title.indexOf(data.selectData.title) !== -1
                    })
                }
                if (data.selectData.introduce) {
                    arr = data.list.filter((value) => {
                        return value.introduce.indexOf(data.selectData.introduce) !== -1
                    })
                }
                if (data.selectData.title && data.selectData.introduce) {
                    arr = data.list.filter((value) => {
                        return value.title.indexOf(data.selectData.title) !== -1
                    }).filter((value) => {
                        return value.introduce.indexOf(data.selectData.introduce) !== -1
                    })
                }
            } else {
                arr = data.initList
            }
            data.selectData.count = arr.length
            data.list = arr
        }
        //展示数量
        const sizeChange = (size: number) => {
            data.selectData.size = size
        }
        //页码
        const currentChange = (page: number) => {
            data.selectData.page = page
        }
        return { ...toRefs(data), dataList, onSearch, sizeChange, currentChange }
    }
})
</script>

<style scoped>
.page {
    float: right;
}
</style> 