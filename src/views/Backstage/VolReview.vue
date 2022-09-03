<!-- @author:何懿励-志愿者审核-->
<template>
  <el-header>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>志愿者审核</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
  <el-main style="background-color: rgba(245, 249, 250, 1)">
    <el-row :gutter="60">
      <el-col :span="5">
        <div style="background-color: rgba(42, 130, 228, 0.17)" class="card">
          <div class="cicon">
            <el-icon size="60" color="#000000" class="eicon">
              <Document />
            </el-icon>
          </div>
          <div style="padding-left: 20px">
            <span style="font-size: large">待审核<br /><br /></span>
            <span style="font-size: xx-large">{{ vol_apply_notreviewed }}</span>
          </div>
        </div>
      </el-col>

      <el-col :span="5">
        <div style="background-color: rgba(4, 76, 144, 1)" class="card">
          <div class="cicon">
            <el-icon size="60" color="#FFFFFF" class="eicon">
              <DocumentChecked />
            </el-icon>
          </div>
          <div style="padding-left: 20px">
            <span style="color: #ffffff; font-size: large"
              >已审核<br /><br
            /></span>
            <span style="color: #ffffff; font-size: xx-large">{{
              vol_apply_reviewed
            }}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-card>
      <el-table :data="tableData" style="width: 100%" header-align="center">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="vol_apply_id" label="申请者ID" align="center" />
        <el-table-column prop="user_id" label="用户ID" align="center" />
        <el-table-column prop="user_name" label="用户名" align="center" />
        <el-table-column prop="career" label="职业" align="center" />
        <el-table-column prop="specialty" label="特长" align="center" />
        <el-table-column prop="background" label="背景" align="center" />
        <el-table-column prop="background" label="背景" align="center" />
        <el-table-column prop="operation" label="操作" align="center">
          <template v-slot="scope">
            <el-button
              type="success"
              plain
              size="small"
              @click="passVol(scope.row)"
              >通过</el-button
            >
            <el-button
              type="danger"
              plain
              size="small"
              @click="rejectVol(scope.row)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        v-model:currentPage="pagenum"
        v-model:page-size="pagesize"
        :page-sizes="[1, 2, 5, 10]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </el-main>
</template>
 
<script>
import { ref } from "vue";
import api from "/src/api/index";
const value1 = ref(true);
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1, //页数
      pagesize: 5, //每页的数量
      total: 0, //总条目数
      vol_apply_notreviewed: 0,
      vol_apply_reviewed: 0,
      adminId: JSON.parse(sessionStorage.getItem("administratorid")),
    };
  },
  mounted() {
    this.getVolApplyCount();
    this.getVolApplyReviewed();
  },
  methods: {
    getVolApplyCount() {
      api.getVolApplyCount(this.adminId).then((res) => {
        console.log(res.data.data.vol_apply_review);
        //this.tableData=res.data.data.user_info;
        this.vol_apply_notreviewed =
          res.data.data.vol_apply_review[0].vol_apply_notreviewed;
        this.vol_apply_reviewed =
          res.data.data.vol_apply_review[0].vol_apply_reviewed;
      });
    },
    getVolApplyReviewed() {
      api
        .getVolApplyReviewed(this.adminId, this.pagenum, this.pagesize, "N")
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.data.vol_apply;
          this.total = res.data.data.total;
        });
    },
    async passVol(userinfo) {
      if (confirm("您确定要通过该用户的申请吗？")) {
        await api
          .passVolApply(userinfo.vol_apply_id)
          .then((res) => {
            this.$message.success("审核成功！");
            this.getVolApplyCount();
            this.getVolApplyReviewed();
          })
          .catch((err) => {
            console.log(err);
            //userinfo.user_state=(userinfo.user_state=='Y'?'N':'Y');//操作失败状态恢复
            this.$message.error("审核失败！");
          });
      }
    },
    async rejectVol(userinfo) {
      if (confirm("您确定要拒绝该用户的申请吗？")) {
        await api
          .denyVolApply(userinfo.vol_apply_id)
          .then((res) => {
            this.$message.success("审核成功！");
            this.getVolApplyCount();
            this.getVolApplyReviewed();
          })
          .catch((err) => {
            console.log(err);
            this.$message.error("审核失败！");
          });
      }
    },
    handleSizeChange(newSize) {
      //console.log(newSize);
      this.pagesize = newSize; //重新指定每页数据量
      this.getVolApplyReviewed(); //带着新的分页请求获取数据
    },
    handleCurrentChange(newPage) {
      //console.log(newPage);
      this.pagenum = newPage; //重新指定当前页
      this.getVolApplyReviewed();
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: rgba(255, 255, 255, 1);
  height: 60px;
  display: flex; //设置显示为flex布局
  justify-content: space-between; //设置为flex左右布局
  padding-left: 30; //左内边距为20（Logo贴左边）
  align-items: center; //元素上下居中
}

.el-row:last-child {
  margin-bottom: 0;
}
.el-card {
  margin-bottom: 20px; //下边距
}
.card {
  height: 160px;
  margin-bottom: 40px;
  text-align: left;
  display: flex;
  align-items: center;
}
.cicon {
  float: left;
  padding-left: 20px;
}
.eicon {
  font-size: 80px;
}
</style>
 