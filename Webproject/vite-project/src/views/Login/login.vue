<script setup lang="ts">
import { reactive, ref } from "vue";
import useUserStore from "../../store/user";
const store = useUserStore();
import { Login } from "../../api/login";
import router from "../../router/index";
import storage from '../../localstorage/localstorage'
import { getUser } from '../../api/user'

const formLabelAlign = reactive({
  number: "",
  password: "",
});

function loginsub(formEl: FormInstance | undefined) {
  if (!formEl) return;
  let re: boolean = false;
  formEl.validate((valid) => {
    if (valid) {
      // console.log("Login!");
      Login({
        number: formLabelAlign.number,
        password: formLabelAlign.password,
      })
        .then((res) => {
          if (res.code == 200) {
            store.Data = res.data;
            store.Token = res.token;
            storage.set('token',res.token)
            router.push({ path: "/home" });
            })
            
          } else {
            loginerr(res.msg)
          }
        })
        .catch((err) => {
          console.log(err);
          loginerr('请求未响应')
        });
    } else {
      // console.log("error Login!");
      return false;
    }
  });
}
function remove(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
}

//from校验
import type { FormInstance } from "element-plus";
const ruleFormRef = ref<FormInstance>();

const rules = reactive({
  number: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 5, max: 12, message: "Length should be 5 to 12", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 12, message: "Length should be 5 to 12", trigger: "blur" },
  ],
});
import { ElMessage } from 'element-plus'
const loginerr = (msg) => {
  ElMessage.error(msg)
}
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      label-position="top"
      label-width="100px"
      :model="formLabelAlign"
      :rules="rules"
      style="max-width: 460px"
      class="login-container"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="账户" label-width="50px" prop="number">
        <el-input v-model="formLabelAlign.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" label-width="50px" prop="password">
        <el-input
          v-model="formLabelAlign.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          round
          class="login_submit"
          @click="loginsub(ruleFormRef)"
          >登入</el-button
        >
        <el-button
          type="danger"
          round
          class="login_submit"
          @click="remove(ruleFormRef)"
          >清空</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit {
  margin: auto;
}
</style>
