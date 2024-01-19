<template>
  <div class="box">
    <div class="left"></div>
    <div class="right">
      <div class="center">
        <h2>智慧园区——登录</h2>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
          :size="formSize" status-icon>
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Create
            </el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { loginApi } from "../api/index"
import { useRouter } from "vue-router"


const router = useRouter()
interface RuleForm {
  username: string
  password: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: 'demo',
  password: 'zh@hm#23',

})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 5, message: '3-5个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
})

const list = ref([])

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginApi(ruleForm).then((res: any) => {
        console.log(res);
        if (res.code == 10000) {
          list.value = res.data
          localStorage.setItem("token", res.data.token)
          router.push("/about")
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    width: 60%;
    height: 100%;
    background: #040d56;
  }

  .right {
    width: 40%;
    height: 100%;
  }
}
</style>
