<!-- @author:杨嘉仪-后台管理界面的模板 -->
<template>
<!-- 侧边栏 -->
  <el-aside width="200px" style="background-color: #323A52">
    <el-menu
      background-color="#323A52"
        text-color="#fff"
        active-text-color="#2C9EF7"
        router>

      <el-sub-menu index="1">
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
            <el-menu-item index="/backstage/userManagement">普通用户</el-menu-item>
            <el-menu-item index="/backstage/volManagement">志愿者</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
            <el-icon><DocumentCopy /></el-icon>
            <span>资讯管理</span>
        </template>
        <el-menu-item-group>
            <el-menu-item index="/backstage/releasedNews">已发布资讯</el-menu-item>
            <el-menu-item index="/backstage/InformationRelease">发布资讯</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item index="/backstage/releaseActivity">
        <el-icon><Edit /></el-icon>
            <span>发布志愿活动</span>
      </el-menu-item>

      <el-menu-item index="/backstage/volReview">
        <el-icon><Coordinate /></el-icon>
            <span>志愿者审核</span>
      </el-menu-item>

      <el-sub-menu index="3">
        <template #title>
          <el-icon><MessageBox /></el-icon>
          <span>举报处理</span>
        </template>
        <el-menu-item-group>
            <el-menu-item index="/backstage/infoReports">寻人信息举报</el-menu-item>
            <el-menu-item index="/backstage/clueReports">线索举报</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
 
 
