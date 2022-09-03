<!---登录界面卡片 -->
<!-- 可封装在页面主体部分，整体高度占父容器100%，宽度占100% -->
<template>
  <div class="body">
    <el-image
      style="
        height: 100%;
        width: 50%;
        background-color: #000;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      "
      :src="require('../../../image/log-in.png')"
      fit="fill"
    />
    <div class="message-card">
      <el-image
        style="height: 20%; width: 100%"
        :src="require('../../../image/logo.png')"
        fit="contain"
      />
      <el-form
        ref="checkForm"
        :model="loginForm"
        label-width="80px"
        justify="center"
        style="max-width: 500px"
        :rules="rules"
      >
        <el-form-item label="手机号" prop="inputPhonenumber">
          <el-input v-model="loginForm.inputPhonenumber" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="inputPassword">
          <el-input v-model="loginForm.inputPassword" placeholder="密码" />
        </el-form-item>
      </el-form>
      <div
        style="
          width: 50%;
          height: 15%;
          margin: 0% auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <el-button @click="checkUser('checkForm')" type="primary"
          >登录</el-button
        >
      </div>

      <div class="tip">
        <!-- <el-link>忘记密码</el-link> -->
        <!-- <el-link>没有账号？立即注册</el-link> -->
        <router-link to="/cover" class="registerLink">看一看</router-link>
        <router-link to="/register" class="registerLink"
          >没有账号？立即注册</router-link
        >
      </div>
    </div>
  </div>
</template>
 
 <script>
// @ is an alias to /src
//import axios from "axios";
import api from "/src/api/index";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      identity: "",
      user_id: "",
      vol_id: "",
      loginForm: reactive({
        inputPassword: "",
        inputPhonenumber: "",
      }),
      // phonenumber: "手机号",
      // password: "密码",
      checkForm: ref(),
      rules: {
        inputPhonenumber: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        inputPassword: [
          { required: true, message: "此项不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    checkUser(formEl) {
      //console.log(this.loginForm.inputPhonenumber);
      this.$refs[formEl].validate((valid) => {
        if (!valid) {
          //console.log("valid", valid);
          // alert('submit!');
          console.log("error submit!");
          return false;
        } else {
          api
            .login(
              Number(this.loginForm.inputPhonenumber),
              this.loginForm.inputPassword
            )
            .then((res) => {
              console.log("登录请求成功", res.data);
              if (res.data.status) {
                // this.$message({
                //   type: "success",
                //   message: "登录成功!",
                // });

                ElMessage({
                  message: "登陆成功!",
                  type: "success",
                });
                //保存登录后的信息在sessionStorage中

                // this.identity = res.data.data.identity;
                // this.user_id = res.data.data.user_id;
                window.sessionStorage.setItem(
                  "useridentity",
                  JSON.stringify(res.data.data.identity)
                ); //保存用户类型

                if (res.data.data.identity == "user") {
                  window.sessionStorage.setItem(
                    "userid",
                    JSON.stringify(res.data.data.id)
                  ); //保存用户id

                  this.$router.push({
                    //登陆成功跳转到普通用户后台
                    path: "/UserBackstage/UserHomePage",
                  });

                  // this.$router.push({
                  //   //登陆成功跳转到寻人首页
                  //   path: "/cover",
                  // });
                } else if (res.data.data.identity == "volunteer") {
                  //判定用户是志愿者
                  //this.vol_id = res.data.data.vol_id;
                  window.sessionStorage.setItem(
                    "volid",
                    JSON.stringify(res.data.data.vol_id)
                  ); //保存志愿者id
                  window.sessionStorage.setItem(
                    "userid",
                    JSON.stringify(res.data.data.user_id)
                  ); //保存用户id

                  // this.$router.push({
                  //   //登陆成功跳转到志愿者用户后台
                  //   path: "/VolBackstage/VolHomePage",
                  // });

                  this.$router.push({
                    //登陆成功跳转到寻人首页
                    path: "/cover",
                  });
                } else if (res.data.data.identity == "administrator") {
                  window.sessionStorage.setItem(
                    "administratorid",
                    JSON.stringify(res.data.data.id)
                  ); //保存管理员id

                  this.$router.push({
                    //管理员登陆成功跳转到管理员后台
                    path: "/backstage",
                  });
                }
              } else {
                // this.$message({
                //   type: "error",
                //   message: "登录失败",
                // });

                ElMessage({
                  message: "用户不存在或密码错误",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log("登录请求失败", err.data);
            });
        }
      });
    },
  },
  //注释掉的代码是获取数据用的，加载界面的同时会获取数据
  // mounted(){
  //     axios({
  //         method:"get",
  //         url:"http://8.130.101.207:1827/Login/GetHello"
  //     }).then(res=>{
  //         console.log(res.data);
  //     })
  // }
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
.message-card {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15%;
  padding-bottom: 15%;
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;
}
.registerLink {
  font-size: 10px;
}
.tip {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
 
