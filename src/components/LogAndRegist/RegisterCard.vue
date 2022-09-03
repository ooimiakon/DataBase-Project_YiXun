<!-- 注册界面卡片 -->
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
        <!--           ref="ruleFormRef" -->
        <el-form
          ref="ruleFormRef"
          :model="registForm"
          status-icon
          :rules="rules"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="registForm.userName"
              type="text"
              placeholder="用户名"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="userEmail">
            <el-input
              v-model="registForm.userEmail"
              type="email"
              placeholder="邮箱"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="phoneNumber">
            <el-input
              v-model="registForm.phoneNumber"
              placeholder="手机号"
              show-word-limit
              style="margin-right: 3%"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="registForm.password"
              type="password"
              placeholder="密码"
              show-password
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registForm.confirmPassword"
              type="password"
              placeholder="确认密码"
              show-password
              autocomplete="off"
            />
          </el-form-item>

          <div>
            <el-button @click="goRegister('ruleFormRef')" type="primary"
              >注册</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
 
 <script>
// @ is an alias to /src
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
// import { FormInstance, FormRules } from "element-plus";
import api from "/src/api/index";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // console.log("这个值到底存在吗", this.$refs.ruleFormRef.validateField(1234567))
        if (this.registForm.confirmPassword !== "") {
          console.log(
            "这个值到底存在吗",
            this.$refs.ruleFormRef.validateField(registForm.confirmPassword)
          );
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registForm: reactive({
        userName: "",
        userEmail: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      }),
      userId: 0,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "用户名长度需在4-16个字符之间",
            trigger: "blur",
          },
        ],
        userEmail: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          {
            min: 6,
            max: 18,
            message: "密码长度需在6-18个字符之间",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        confirmPassword: [
          {
            min: 6,
            max: 18,
            message: "密码长度需在6-18个字符之间",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur", required: true },
        ],
      },
      ruleFormRef: ref(),
    };
  },
  methods: {
    goRegister(formEl) {
      //点击以后，调用api看是否注册成功
      this.$refs[formEl].validate((valid) => {
        if (!valid) {
          // alert('submit!');
          console.log("error submit!!");
          return false;
        } else {
          api
            .Regist(
              this.registForm.userName,
              this.registForm.phoneNumber,
              this.registForm.userEmail,
              this.registForm.password
            )
            .then((res) => {
              console.log("注册成功", res.data);
              ElMessage({
                message: "注册成功",
                type: "success",
              });
              this.userId = res.data.data.user_id;

              window.sessionStorage.setItem(
                "userid",
                JSON.stringify(res.data.data.user_id)
              ); //保存用户id

              window.sessionStorage.setItem(
                "useridentity",
                JSON.stringify({ identity: "user" })
              ); //保存用户类型

              //跳转到补充信息
              this.$router.push({
                path: "/addInfo",
                //query: { user_id: this.userId },
              });
            })
            .catch((err) => {
              ElMessage({
                message: "注册失败",
                type: "warning",
              });
              console.log("注册失败", err.data);
            });
          //路径跳转
        }
      });
    },
  },
};
// const text = ref("");
// const input = ref("");
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
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-link {
  font-size: 10px;
}
.tip {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
 
