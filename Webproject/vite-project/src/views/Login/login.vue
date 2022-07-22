<script setup lang="ts">
import { reactive, ref } from "vue";

const formLabelAlign = reactive({
  account: "",
  password: ""
});

function loginsub() {
  // console.log(formLabelAlign.name);
  //登入功能待写
}
</script>

<template>
  <div>
    <el-form
      label-position="top"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
      class="login-container"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="账户" label-width="50px">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="密码" label-width="50px">
        <el-input v-model="formLabelAlign.region" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round class="login_submit" @click="loginsub">登入</el-button>
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
