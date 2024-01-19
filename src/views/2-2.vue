<template>
    <div class="box">
        <div class="top">
            <p>车牌号码：<input type="text" v-model="obj.carNumber" placeholder="请输入内容"></p>
            <p>车主姓名：<input type="text" v-model="obj.personName" placeholder="请输入内容"></p>
            <p> 状态:</p> <el-select v-model="obj.cardStatus" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item, index in options" :label="item.label" :value="item.value" :key="item.value" />
            </el-select>
            <el-button type="primary" size="large"  @click="search">查询</el-button>

        </div>
        <div class="buttton">
            <el-table ref="multipleTableRef" :data="list" style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" label="序号" width="120" />
                <el-table-column property="personName" label="车主名称" width="120" />
                <el-table-column property="phoneNumber" label="联系方式" />
                <el-table-column property="carNumber" label="车牌号码" />
                <el-table-column property="carBrand" label="车辆品牌" />
                <el-table-column property="totalEffectiveDate" label="剩余有效天数" />
                <el-table-column property="cardStatus" label="状态">
                    <template #default="scope">
                        {{ scope.row.cardStatus == 0 ? '有效' : '过期' }}
                    </template>
                </el-table-column>
                <el-table-column property="address" label="操作">

                    <template #default="scope">
                        <el-text class="mx-1" type="primary">续费</el-text> &ensp;
                        <el-text class="mx-1" type="primary">查看</el-text> &ensp;
                        <el-text class="mx-1" type="primary">编辑</el-text> &ensp;
                        <el-text class="mx-1" type="primary">删除</el-text>
                    </template>
                </el-table-column>

            </el-table>

            <el-pagination v-model:current-page="obj.page" :page-size="obj.pageSize" layout="total, prev, pager, next"
                :total="total" @size-change="getList" @current-change="getList" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { listApi } from "../api/index";

const obj = reactive({
    page: 1,
    pageSize: 2,
    carNumber: '',
    personName: '',
    cardStatus: ''
})
const list = ref<any>([])
const total = ref(0)

const getList = () => {
    listApi(obj).then((res: any) => {
        console.log(res)
        list.value = res.data.rows
        total.value = res.data.total
    })
}
getList()

const router = useRouter();

const options = reactive([
    {
        value: '',
        label: '全部'
    },
    {
        value: '1',
        label: '有效'
    },
    {
        value: '2',
        label: '无效'
    }
])


const search = () => {
    getList()
}
</script>

<style lang="scss" scoped>
.top {
    width: 80%;
    height: 100px;
    display: flex;

    p {
        margin: 0 3px;
    }
}
</style>