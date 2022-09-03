<!-- @author:刘睿萌-详情界面的顶部导航栏（无背景图片） -->
<template>
  <div class="detail-view">
    <el-header style="height: 60px">
      <el-menu
        router
        :default-active="activeIndex"
        class="up-menu"
        mode="horizontal"
        background-color="#202714"
        text-color="#FFFFFF"
        active-text-color="#2E74B6"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-image
          style="height: 70%; width: 20%"
          :src="require('../../../image/logo.png')"
          fit="contain"
        />
        <div class="flex-grow" />
        <el-menu-item index="/cover">寻人首页</el-menu-item>
        <el-menu-item index="/volunOver">志愿活动</el-menu-item>
        <el-menu-item index="/news">寻人资讯</el-menu-item>
        <el-menu-item index="/department">相关部门信息</el-menu-item>
        <el-avatar
          v-if="loginState && userHead != null"
          :src="userHead"
          shape="circle"
          @click="gobackStage"
        ></el-avatar>
        <el-avatar
          v-if="loginState && userHead == null"
          shape="circle"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          @click="gobackStage"
        ></el-avatar>
        <!-- <el-menu-item v-if="loginState" :index="homepage">主页</el-menu-item> -->
        <el-menu-item v-if="!loginState" index="/">登录</el-menu-item>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "InfoHeader",
  setup() {
    let loginState = reactive(false);
    let userHead = reactive("");
    let user_type = reactive("");
    let user_id = reactive();
    let homepage = reactive("/"); //个人主页路径
    if (sessionStorage.getItem("userid") != null) {
      loginState = true;
      user_id = JSON.parse(sessionStorage.getItem("userid"));
      user_type = JSON.parse(sessionStorage.getItem("useridentity"));
      if (user_type == "user") homepage = "/UserBackstage/UserHomePage";
      else homepage = "/VolBackstage/VolHomePage";
    }
    return {
      homepage,
      loginState,
      user_id,
      userHead,
      user_type,
    };
  },
  methods: {
    gobackStage() {
      if (this.user_type == "user") {
        //普通用户
        this.$router.push({ path: "/UserBackstage/UserHomePage" });
      } else {
        //志愿者
        this.$router.push({ path: "/VolBackstage/VolHomePage" });
      }
    },
  },
};
//放一些引入的量  如const url =‘balabala'
// import { ref } from 'vue'
// const activeIndex = ref('1')
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
</script>


<!-- css -->
<style scoped>
.detail-view .el-header {
  background-color: #202714;
  color: #ffffff;
  align-items: center;
  display: flex;
  justify-content: center;
}
.up-menu {
  height: 55px;
  width: 100%;
  align-items: center;
}
.flex-grow {
  flex-grow: 1;
}
</style>