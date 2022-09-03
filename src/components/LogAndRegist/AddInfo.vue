<!-- 登记信息界面卡片 -->
<!-- 可封装在页面主体部分，整体高度占父容器100%，宽度占100% -->
<template>
  <div class="body">
    <el-image
      class="left-image"
      :src="require('../../../image/log-in.png')"
      fit="fill"
    />
    <div class="message-card">
      <el-image
        style="height: 15%; width: 100%"
        :src="require('../../../image/logo.png')"
        fit="contain"
      />

      <div class="input">
        <span style="text-align: left; padding-bottom: 5px">上传头像</span>
        <div style="text-align: center">
          <el-upload
            class="avatar-uploader"
            action
            :auto-upload="false"
            ref="upload"
            :show-file-list="false"
            :on-change="onUploadChange"
          >
            <img v-if="this.user_head" :src="this.user_head" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <span style="text-align: left; padding-bottom: 5px">性别</span>
        <el-select v-model="user_gender" placeholder="性别">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <span style="text-align: left; padding-top: 10px">地址</span>
        <div id="app">
          <el-cascader
            style="width: 190px"
            :options="options"
            v-model="selectedOptions"
            placeholder="省-市-区"
            @change="handleChange"
          >
          </el-cascader>
          <el-input
            size="samll"
            style="width: 130px"
            v-model="user_address"
            autocomplete="off"
            placeholder="详细地址"
          ></el-input>
        </div>
        <span style="text-align: left; padding-top: 30px"></span>
        <el-button type="primary" @click="save">提 交</el-button>
      </div>
    </div>
  </div>
</template>
 
 <script>
// @ is an alias to /src
import { ref } from "vue";

const text = ref("");
const input = ref("");
import api from "/src/api/index";
import { regionData } from "element-china-area-data";
export default {
  data() {
    return {
      user_id: 1,
      user_gender: "",
      user_province: "",
      user_city: "",
      user_area: "",
      user_address: "",
      user_head: "",
      options: regionData,
      selectedOptions: [],
      genderOptions: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
        {
          value: "3",
          label: "其它",
        },
      ],
    };
  },

  methods: {
    handleChange(value) {
      this.user_province = value[0];
      this.user_city = value[1];
      this.user_area = value[2];
    },
    //选择上传图片
    onUploadChange(file) {
      const isIMAGE =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/png" ||
        file.raw.type === "image/gif";
      const isLt1M = file.size / 1024 / 1024 < 5;

      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = (e) => {
        this.user_head = e.target.result;
        console.log(this.user_head); //图片的base64数据
      };
    },

    save() {
      console.log(this.data);
      api
        .upLoadInfo(
          this.user_id,
          this.user_gender,
          this.user_province,
          this.user_city,
          this.user_area,
          this.user_address,
          this.user_head
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status == true) {
            this.$message({
              type: "success",
              message: "填写成功",
            });
            //this.$router.push("/backstage");//登录跳转
          } else {
            this.$message({
              type: "error",
              message: "填写失败",
            });
          }
        });
    },
  },
};
</script>

<!-- css -->
<style scoped>
.body {
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left-image {
  height: 100%;
  width: 50%;
  background-color: #000;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.message-card {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10%;
  padding-bottom: 10%;
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;
}
.input {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.avatar-uploader .el-upload {
  border: 3px dashed #761a1a;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 1px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>

 
