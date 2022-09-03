<template>
  <div>
    <!--class="common-layout"-->
    <el-container style="height: fit-content">
      <el-header style="padding: 0">
        <InfoHeader />
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="goBack()" type="text" class="return"
            >&lt;&lt;返回</el-button
          >
          <!--el-button @click="prev()">返回</!--el-button-->
        </el-row>

        <el-row>
          <el-image
            v-if="this.MissInfo.search_photo"
            :src="this.MissInfo.search_photo"
            style="width: 200px; height: 200px"
            class="image"
            fit="cover"
          />
          <el-image
            style="width: 200px; height: 200px"
            v-else
            :src="require('../../image/txiang.jpg')"
            class="image"
            fit="cover"
          />
          <!-- <el-image style="width: 200px; height: 200px"  :src="require('../../image/txiang.jpg')" class="image" :fit="fill"/> -->

          <div>
            <div class="info">
              <div>| 失踪人姓名：{{ MissInfo.search_name }}</div>
              <div>| 性别：{{ MissInfo.search_gender }}</div>
              <div>| 出生日期：{{ MissInfo.search_birthday }}</div>
              <div>| 详细地址：{{ address }} {{ MissInfo.search_address }}</div>
              <div style="padding: 20px 0px 15px 5px">
                <el-button v-if="!this.isFollow" @click="follow" round
                  >关注寻人信息</el-button
                >
                <el-button v-else @click="follow" round>取 消 关 注</el-button>
              </div>
            </div>
          </div>
          <div>
            <!-- <el-button type="primary" v-if="MisReason" @click="SubmitMisReason(MisReason)">确 定</el-button>
            <el-button type="primary" disabled v-else>确 定</el-button> -->
          </div>
        </el-row>

        <el-col class="toptext">特征描述</el-col>
        <div class="text">{{ MissInfo.search_detail }}</div>

        <el-col class="toptext">寻人线索</el-col>
        <el-row
          v-for="clue in this.MissInfo.search_clue"
          :key="clue.ClueContent"
        >
          <div class="text">| {{ clue.ClueContent }}</div>
          <div style="padding: 9px">
            <el-button
              type="primary"
              class="actButton"
              round
              size="small"
              @click="upClueReport(clue.ClueId)"
              >举报</el-button
            >
          </div>
        </el-row>

        <el-col class="toptext">跟进志愿者</el-col>
        <el-row v-for="vol in this.MissInfo.search_vols" :key="vol">
          <el-col>
            <div class="text">姓名：{{ vol.Name }}</div>
            <div class="text">联系电话：{{ vol.PhoneNum }}</div>
          </el-col>
        </el-row>

        <!-- 上传线索，举报寻人信息按钮 -->
        <div style="padding: 50px 0px 15px 75px">
          <el-form
            :model="clueForm"
            label-width="100px"
            style="max-width: 1500px"
          >
            <el-form-item label="线索描述 ">
              <el-input
                v-model="clueForm.report_content"
                :autosize="{ minRows: 10, maxRows: 12 }"
                type="textarea"
              />
            </el-form-item>

            <el-button
              type="primary"
              class="actButton"
              round
              @click="upClue(clueForm.report_content)"
              >发布线索</el-button
            >

            <!-- <el-button type="primary" class="actButton" round @click="goReport(index)">举 报</el-button> -->
            <el-button type="primary" class="actButton" round @click="misReport"
              >举 报</el-button
            >
          </el-form>
        </div>

        <!-- 线索举报对话框 -->
        <div>
          <el-dialog title="线索举报" v-model="dialogFormVisible2">
            <el-input
              v-model="clueReason"
              autocomplete="off"
              :autosize="{ minRows: 10, maxRows: 12 }"
              type="textarea"
              placeholder="点击输入举报理由"
            />

            <div slot="footer" class="dialog-footer" style="padding: 10px">
              <el-button
                @click="(dialogFormVisible2 = false), (clueReason = '')"
                >取 消</el-button
              >

              <el-button
                type="primary"
                v-if="clueReason"
                @click="SubmitClueReason(clueReason)"
                >确 定</el-button
              >
              <el-button type="primary" disabled v-else>确 定</el-button>

              <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            </div>
          </el-dialog>
        </div>

        <!-- 寻人信息举报对话框 -->
        <div>
          <el-dialog title="寻人信息举报" v-model="dialogFormVisible">
            <el-input
              v-model="MisReason"
              autocomplete="off"
              :autosize="{ minRows: 10, maxRows: 12 }"
              type="textarea"
              placeholder="点击输入举报理由"
            />

            <div slot="footer" class="dialog-footer" style="padding: 10px">
              <el-button @click="(dialogFormVisible = false), (MisReason = '')"
                >取 消</el-button
              >

              <el-button
                type="primary"
                v-if="MisReason"
                @click="SubmitMisReason(MisReason)"
                >确 定</el-button
              >
              <el-button type="primary" disabled v-else>确 定</el-button>

              <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            </div>
          </el-dialog>
        </div>
      </el-main>
      <Footer></Footer>
    </el-container>
  </div>
</template>

<script>
import { ref } from "vue";
import InfoHeader from "@/views/Frontstage/InfoHeader.vue";
import Footer from "@/views/Frontstage/Footer.vue";
import api from "/src/api/index";
import { reactive } from "vue";
import { thisTypeAnnotation } from "@babel/types";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { regionData, CodeToText } from "element-china-area-data";
import { Star, Search } from "@element-plus/icons-vue";

// do not use same name with ref

export default {
  name: "ref",
  data() {
    return {
      MissInfo: [],
      //对话框显示与隐藏
      dialogFormVisible: false,
      dialogFormVisible2: false,
      MisReason: "",
      clueReason: "",
      clueID: "",
      address: "",
      isFollow: "",
    };
  },
  components: {
    InfoHeader,
    Footer,
  },
  setup() {
    const currentDate = ref(new Date());
    const route = useRoute();

    const MissID = route.query.SearchInfo;

    const clueForm = reactive({
      report_content: "",
    });
    return {
      currentDate,
      clueForm,
      MissID,
    };
  },
  mounted() {
    api
      .getMissingpersonInfo(this.MissID)
      .then((res) => {
        console.log("接收到的数据", res);
        this.MissInfo = res.data.data;
        this.address =
          CodeToText[this.MissInfo.search_province] +
          CodeToText[this.MissInfo.search_city] +
          CodeToText[this.MissInfo.search_area];
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .followMis(1, this.MissID)
      .then((res) => {
        console.log("关注按钮接收的数据", res);
        this.isFollow = res.data.data.state;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    goReport() {
      this.$router.push({ path: "/report", query: {} });
      api
        .upMisReport(608, 1, "This is a test!")
        .then(function (response) {
          console.log("发布寻人信息举报", response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    goBack() {
      this.$router.back();
    },
    //线索发布按钮
    upClue(clueText) {
      console.log("发布线索内容", clueText);
      console.log("寻人信息ID", this.MissID);
      api
        .upClue(4, this.MissID, clueText)
        .then(function (response) {
          console.log("发布线索", response);
          ElMessage({
            message: "线索发布成功",
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //点击举报[寻人信息]按钮
    misReport() {
      //显示对话框
      this.dialogFormVisible = true;
    },
    //确认提交寻人信息举报理由按钮
    SubmitMisReason(text) {
      api
        .upMisReport(4, this.MissID, text)
        .then(function (response) {
          console.log("发布寻人信息举报", response);
          ElMessage({
            message: "提交成功",
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      this.dialogFormVisible = false;
    },

    //点击举报线索按钮
    upClueReport(id) {
      this.dialogFormVisible2 = true;
      this.clueID = id;
    },
    //确认提交线索举报按钮
    SubmitClueReason(text) {
      api
        .upClueReport(4, this.clueID, text)
        .then(function (response) {
          console.log("发布线索举报", response);
          ElMessage({
            message: "提交成功",
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialogFormVisible2 = false;
    },

    //关注寻人信息按钮
    follow() {
      api
        .followMis(1, this.MissID)
        .then((res) => {
          console.log("关注按钮接收的数据", res);
          this.isFollow = res.data.data.state;
          if (this.isFollow) {
            ElMessage({
              message: "已关注",
              type: "success",
            });
          } else {
            ElMessage({
              message: "已取消关注",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
/*.el-header.myHeader {
    position: relative;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 60px;
    background-image: none;
    background-color:#32495E;
}*/

/* .detail-view .el-header {
  background-color: #202741;
  color: #ffffff;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
}

.up-menu {
  height: 55px;
  width: 100%;
  align-items: center;
}

.flex-grow {
  flex-grow: 1;
} */

.el-main {
  background-color: #f4f6f9;
  position: relative;
  padding: 2% 5% 2%;
  width: 100%;
}

/* .el-footer {
  background-color: #202741;
  color: #dddcdc;
  height: 40px;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
} */

.return {
  float: left;
  color: grey;
  font-size: 15px;
  margin-bottom: 30px;
  margin-left: 100px;
}

.image {
  object-fit: contain;
  width: 20%;
  height: 250px;
  margin-right: 50px;
  margin-left: 300px;
}

.info {
  padding: 14px;
  text-align: left;
  font-size: 16px;
  line-height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: bold;
}

.toptext {
  margin-top: 50px;
  height: 30px;
  text-align: left;
  color: #2e74b6;
  font-size: 25px;
  margin-left: 100px;
  font-weight: bold;
}

.el-divider {
  background-color: #67bbff;
  margin: 20px 0;
}

.text {
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
  margin-top: 10px;
  margin-left: 100px;
}
</style>