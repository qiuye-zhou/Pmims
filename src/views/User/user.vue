<script lang="ts" setup>
import { getUser, getintegral_rank } from "../../api/user";
import storage from "../../localstorage/localstorage";
import { reactive, ref, onMounted, watch } from "vue";
import { baseURL } from '../../config/request';
import { uploadimage } from "../../api/file";
import { ElMessage, UploadInstance, UploadProps, UploadUserFile } from "element-plus";
let userinfo = reactive({
  department: "",
  integral: "",
  jointime: "",
  name: "",
  sex: "",
  age: "",
  user: false,
});
const avatarurl = ref(`${baseURL}/head_image/user_img${storage.get('data').id}.png`)
onMounted(() => {
  const id = storage.get("data").id;
  getUser({
    id: id,
  })
    .then((res) => {
      if (res.code == 200) {
        if (res.data.length > 0) {
          const data = res.data[0];
          userinfo.department = data.department;
          userinfo.integral = data.integral;
          userinfo.jointime = data.jointime.slice(0, 10);
          userinfo.name = data.name;
          userinfo.sex = data.sex;
          userinfo.age = data.age
          userinfo.user = false;
        } else {
          console.error("用户不存在");
        }
      } else {
        console.log("出现错误");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  if (storage.get("data").grade == 3) {
    getintegral_rank({
      id: id,
    })
      .then((res) => {
        if (res.code == 200) {
          const data = res.data;
          userinfo.rank = data.rank;
          userinfo.equal = data.equal;
          userinfo.exceed = data.exceed + "%";
          userinfo.allnum = data.allnum;
          userinfo.user = true;
        } else {
          console.log("出现错误");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 检查头像是否存在
  let imgObj = new Image();
  imgObj.src = `${baseURL}/head_image/user_img${storage.get('data').id}.png`;
  if (imgObj.width == 0) {
    avatarurl.value = `${baseURL}/head_image/user_img${storage.get('data').id}.jpg`
  }
});
// 上传用户图片
const uploadRef = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(`只能上传一个文件`);
};
const submitUpload = () => {
  if (fileList.value.length == 0) {
    ElMessage.warning(`请选择要上传的文件`);
  }
  uploadRef.value!.submit();
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png') {
    ElMessage.error('请上传png或jpg图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('上传头像大小不要超过2MB!')
    return false
  }
  return true
}
const httpRequest = (params: any) => {
  const formDate = new FormData();
  formDate.append("file", fileList.value[0].raw);
  formDate.append("id", storage.get("data").id);
  uploadimage(formDate)
    .then((res) => {
      if (res.code == 200) {
        ElMessage({
            type: "success",
            message: res.msg,
        });
        setTimeout(() => location.reload(), 3000);
      } else {
        if(res.code == 406) {
          ElMessage.error(res.msg);
        }
      }
    })
    .catch((err) => {
      ElMessage.error("出现错误");
    });
};
</script>

<template>
  <div class="divcon">
    <div class="avatar">
      <el-avatar shape="square" :size="100" fit="cover" :src="avatarurl" />
      <el-upload
        v-model:file-list="fileList"
        ref="uploadRef"
        class="upload-demo"
        :action="`id`"
        :http-request="httpRequest"
        :limit="1"
        :on-exceed="handleExceed"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        :multiple="false"
      >
        <template #trigger>
          <el-button size="small" type="primary">选择文件</el-button>
        </template>
        <el-button size="small" type="success" @click="submitUpload">
              确认
        </el-button>
        <template #tip>
          <div class="el-upload__tip text">请选择上传头像(.png or .jpg)</div>
        </template>
      </el-upload>
    </div>
    <div class="info">
      <h3>个人信息</h3>
      <el-form
        label-position="right"
        label-width="100px"
        :model="userinfo"
        style="max-width: 560px; min-width: 460px"
      >
        <el-form-item label="姓名">
          <el-input v-model="userinfo.name" disabled />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="userinfo.sex" disabled />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userinfo.department" disabled />
        </el-form-item>
        <el-form-item label="入党时间">
          <el-input v-model="userinfo.jointime" disabled />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input v-model="userinfo.age" disabled />
        </el-form-item>
        <el-form-item label="积分">
          <el-input v-model="userinfo.integral" disabled />
        </el-form-item>
      </el-form>
    </div>
    <div class="info" v-if="userinfo.user">
      <h3>积分详情</h3>
      <el-form
        label-position="right"
        label-width="100px"
        :model="userinfo"
        style="max-width: 560px; min-width: 460px"
      >
        <el-form-item label="排名">
          <el-input v-model="userinfo.rank" disabled />
        </el-form-item>
        <el-form-item label="积分相同人数">
          <el-input v-model="userinfo.equal" disabled />
        </el-form-item>
        <el-form-item label="超过人数(%)">
          <el-input v-model="userinfo.exceed" disabled />
        </el-form-item>
        <el-form-item label="用户总人数">
          <el-input v-model="userinfo.allnum" disabled />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.divcon {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    min-width: 300px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 230px;
    .text {
      text-align: center;
      width: 100%;
    }
    .upload-demo {
      width: 200px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
}
.info {
  margin-bottom: 30px;
  h3 {
    margin: 20px;
  }
}
</style>