<template>
  <div>
    <el-container style="height: fit-content">
      <el-header style="padding: 0">
        <InfoHeader />
      </el-header>
      <el-main style="background-color: #f5f5f5">
        <!-- 这里是页面内容 -->
        <!-- 地图定位到当前地点并显示其周围信息 -->
        <gaodeMap></gaodeMap>
        <div id="release">
          <el-button
            @click="goReleaseMissingInfo()"
            color="#044C90"
            :dark="isDark"
            >发布寻人信息</el-button
          >
        </div>
        <div class="slogen" background-image="../../image/map-test.png">
          千里寻人，你我助力
        </div>
        <Search @onEvent="getSearchInfo"></Search>

        <div style="margin-top: 1%; margin-right: 1%; margin-bottom: 1%">
          <h
            style="
              padding-right: 85%;
              font-size: 8px;
              font-weight: 600;
              color: #c2c2c2;
            "
          >
            共搜索到
            <h style="color: #2e74b6"> {{ searchNum }}条 </h>寻人信息
          </h>
        </div>
        <div class="containerFlex">
          <!-- 使用flex布局 -->
          <div
            class="PhotoContainer"
            v-for="(item, index) in lostInfoList"
            :key="index"
          >
            <!-- 被寻人照片 -->
            <div
              class="PhotoOnly"
              @click="clickPhoto(lostInfoList[index].SearchinfoId)"
            >
              <el-row>
                <el-col :span="8">
                  <div class="thePhoto">
                    <el-image
                      style="
                        width: 100%;
                        height: 220px;
                        border-radius: 10px 10px 0 0;
                      "
                      :src="lostInfoList[index].SearchinfoPhotoURL"
                    >
                    </el-image>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="informationBlock">
                    <div class="line">
                      <h class="tableTitle">类型:</h>
                      <h>{{ lostInfoList[index].SearchType }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">姓名:</h>
                      <h>{{ lostInfoList[index].SoughtPeopleName }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">性别:</h>
                      <h>{{ lostInfoList[index].SoughtPeopleGender }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">出生日期:</h>
                      <h>{{ lostInfoList[index].SoughtPeopleBirthday }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">失散日期:</h>
                      <h>{{ lostInfoList[index].SearchinfoLostdate }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">失散地点/被寻人所在地:</h>
                      <h>{{ lostInfoList[index].LostPlace }}</h>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <!-- <div class="demo-pagination-block">

         <lostInformationBlock :fenyexinxi="LostInfo"></lostInformationBlock> -->
        <!-- 分页器 -->
        <div class="demo-pagination-block">
          <div class="demonstration"></div>
          <el-pagination
            v-model:currentPage="LostInfo.pageNum"
            v-model:page-size="LostInfo.pageSize"
            :small="small"
            :disabled="disabled"
            :background="background"
            :pager-count="5"
            layout="prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

        <div class="last-page">
          <div class="bottom-style">
            <div class="logo-bottom">
              <img class="hand" src="../../image/hand.jpg" />
            </div>
            <div class="total-number">
              <div class="total-item">
                |已发布启事 {{ padding1(itemNum, length) }}个
              </div>
              <div class="total-item">
                |共收到线索 {{ padding1(clueNum, length) }}条
              </div>
              <div class="total-item">
                |累计已帮助 {{ padding1(peopleNum, length) }}人
              </div>
            </div>
          </div>
        </div>
      </el-main>

      <Footer></Footer>
    </el-container>
  </div>
</template>

<script>
//引入的自定义组件命名必须是Xxxx或xxxXxxx
import InfoHeader from "@/views/Frontstage/InfoHeader.vue";
import Footer from "@/views/Frontstage/Footer.vue";
import Search from "@/components/Search.vue";
// import lostInformationBlock from "@/components/lostInformationBlock";
import gaodeMap from "@/components/GaodeMap";
// import { random } from "lodash";
import api from "/src/api/index";
import AMapLoader from "@amap/amap-jsapi-loader";
import { CodeToText } from "element-china-area-data";
import QueryString from "qs";

export default {
  components: {
    Search,
    // lostInformationBlock,
    gaodeMap,
    InfoHeader,
    Footer,
  },
  data() {
    return {
      //是否加载全部信息？
      allInfo: 1,
      //筛选到多少条信息
      searchNum: 130,
      //统计数据保留的位数
      length: 7,
      //统计数据
      itemNum: Math.random() * 10000,
      clueNum: Math.random() * 10000,
      peopleNum: Math.random() * 10000,
      //分页
      total: 90,
      LostInfo: {
        query: "",
        pageNum: 1,
        pageSize: 9,
      },
      //用来保存筛选条件，换页的时候用
      LostInfoDemo: {
        search_type_1: null,
        search_type_2: null,
        search_type_3: null,
        search_type_4: null,
        search_type_5: null,
        search_type_6: null,
        gender: null,
        lostdate: null,
        birthday: null,
        province: null,
        city: null,
        area: null,
        height_low: null,
        height_high: null,
        pageSize: null,
        pageNum: null,
        search: null,
      },
      lostInfoList: [],
    };
  },
  mounted() {
    this.handleCurrentChange(1);
    //已发布启事
    api.GetSearchInfoNum().then((res) => {
      this.itemNum = res.data;
    });
    //共收到线索
    api.GetCluesNum().then((res) => {
      this.clueNum = res.data;
    });
    //累计已帮助
    api.GetFoundInfoNum().then((res) => {
      this.peopleNum = res.data;
    });
  },
  methods: {
    changeString(myData) {
      if (myData) return myData;
      else {
        return "不详";
      }
    },
    codeToText(province, city, area, detail) {
      return (
        CodeToText[province] + CodeToText[city] + CodeToText[area] + detail
      );
    },
    //获取筛选后的信息，分页显示
    getSearchInfo(data) {
      data.pageNum = this.LostInfo.pageNum;
      data.pageSize = this.LostInfo.pageSize;
      this.allInfo = 0;
      // data = JSON.stringify(data);
      console.log(data);
      api
        .ScreenSearchInfo(
          data.search_type_1,
          data.search_type_2,
          data.search_type_3,
          data.search_type_4,
          data.search_type_5,
          data.search_type_6,
          data.gender,
          data.lostdate,
          data.birthday,
          data.province,
          data.city,
          data.area,
          data.height_low,
          data.height_high,
          data.pageSize,
          data.pageNum,
          data.search
        )
        .then((res) => {
          // console.log(this.LostInfo.pageNum);
          console.log("看看后端传回来的id", res);
          this.LostInfoDemo.search_type_1 = data.search_type_1;
          this.LostInfoDemo.search_type_2 = data.search_type_2;
          this.LostInfoDemo.search_type_3 = data.search_type_3;
          this.LostInfoDemo.search_type_4 = data.search_type_4;
          this.LostInfoDemo.search_type_5 = data.search_type_5;
          this.LostInfoDemo.search_type_6 = data.search_type_6;
          this.LostInfoDemo.gender = data.gender;
          this.LostInfoDemo.lostdate = data.lostdate;
          this.LostInfoDemo.birthday = data.birthday;
          this.LostInfoDemo.province = data.province;
          this.LostInfoDemo.city = data.city;
          this.LostInfoDemo.area = data.area;
          this.LostInfoDemo.height_low = data.height_low;
          this.LostInfoDemo.height_high = data.height_high;
          this.LostInfoDemo.pageSize = data.pageSize;
          this.LostInfoDemo.pageNum = data.pageNum;
          this.LostInfoDemo.search = data.search;

          console.log(res.data.data);
          this.searchNum = res.data.data.total;
          this.total = res.data.data.total; //控制分页器的变化
          var i;
          this.lostInfoList = [];
          for (i = 0; i < this.LostInfo.pageSize; i++) {
            console.log("i=");
            console.log(res);
            if (res.data.data.searchInfo_list[i] == null) {
              console.log("i=");
              console.log(i);
              break;
            }
            this.lostInfoList[i] = {
              SearchType: "",
              SearchinfoId: 3,
              SearchinfoLostdate: "",
              SearchinfoPhotoURL: null,
              SoughtPeopleBirthday: "",
              SoughtPeopleGender: "",
              SoughtPeopleName: "",
              LostPlace: null,
            };
            var item = this.lostInfoList[i];
            //寻人信息id
            item.SearchinfoId = res.data.data.searchInfo_list[i].SearchinfoId;
            item.SearchinfoId = this.changeString(item.SearchinfoId);
            //寻人类型
            item.SearchType = res.data.data.searchInfo_list[i].SearchType;
            item.SearchType = this.changeString(item.SearchType);
            //失踪人姓名
            item.SoughtPeopleName =
              res.data.data.searchInfo_list[i].SoughtPeopleName;
            item.SoughtPeopleName = this.changeString(item.SoughtPeopleName);
            //失踪日期
            item.SearchinfoLostdate =
              res.data.data.searchInfo_list[i].SearchinfoLostdate;
            item.SearchinfoLostdate = this.changeString(
              item.SearchinfoLostdate
            );
            //失踪人生日
            item.SoughtPeopleBirthday =
              res.data.data.searchInfo_list[i].SoughtPeopleBirthday;
            item.SoughtPeopleBirthday = this.changeString(
              item.SoughtPeopleBirthday
            );
            //失踪人性别
            item.SoughtPeopleGender =
              res.data.data.searchInfo_list[i].SoughtPeopleGender;
            item.SoughtPeopleGender = this.changeString(
              item.SoughtPeopleGender
            );
            //失踪人照片
            // item.SearchinfoPhotoURL = res.data.data.searchInfo_list[i].SearchinfoPhotoURL;
            if (res.data.data.searchInfo_list[i].SearchinfoPhotoURL != null) {
              item.SearchinfoPhotoURL =
                res.data.data.searchInfo_list[i].SearchinfoPhotoURL;
            }
            // item.SearchinfoPhotoURL = this.changeString(item.SearchinfoPhotoURL);
            // 失踪地点
            item.LostPlace = this.codeToText(
              res.data.data.searchInfo_list[i].Province,
              res.data.data.searchInfo_list[i].City,
              res.data.data.searchInfo_list[i].Area,
              res.data.data.searchInfo_list[i].Detail
            );
            item.LostPlace = this.changeString(item.LostPlace);
          }
        });
    },
    clickPhoto(SearchinfoId) {
      console.log(SearchinfoId);
      //点击跳转到寻人信息的详情页
      this.$router.push({
        path: "/missingpersonInfo",
        query: {
          SearchInfo: SearchinfoId,
        },
      });
    },
    goReleaseMissingInfo() {
      this.$router.push({ path: "/up_missingperson", query: {} });
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      //把最新的页码（newPage）赋值给 动态的 pagenum
      this.LostInfo.pageNum = newPage;
      if (this.allInfo) {
        api
          .GetAllSearchInfo(this.LostInfo.pageNum, this.LostInfo.pageSize)
          .then((res) => {
            // console.log(this.LostInfo.pageSize);
            // console.log(res.data.data);
            this.searchNum = res.data.data.total;
            this.total = res.data.data.total;
            this.lostInfoList = []; //先清空列表
            var i;
            for (i = 0; i < this.LostInfo.pageSize; i++) {
              if (res.data.data.searchInfo_list[i] == null) {
                break;
              }
              this.lostInfoList[i] = {
                SearchType: "",
                SearchinfoId: 3,
                SearchinfoLostdate: "",
                SearchinfoPhotoURL: null,
                SoughtPeopleBirthday: "",
                SoughtPeopleGender: "",
                SoughtPeopleName: "",
                LostPlace: null,
              };
              var item = this.lostInfoList[i];
              //寻人信息id
              item.SearchinfoId = res.data.data.searchInfo_list[i].SearchinfoId;
              item.SearchinfoId = this.changeString(item.SearchinfoId);
              //寻人类型
              item.SearchType = res.data.data.searchInfo_list[i].SearchType;
              item.SearchType = this.changeString(item.SearchType);
              //失踪人姓名
              item.SoughtPeopleName =
                res.data.data.searchInfo_list[i].SoughtPeopleName;
              item.SoughtPeopleName = this.changeString(item.SoughtPeopleName);
              //失踪日期
              item.SearchinfoLostdate =
                res.data.data.searchInfo_list[i].SearchinfoLostdate;
              item.SearchinfoLostdate = this.changeString(
                item.SearchinfoLostdate
              );
              //失踪人生日
              item.SoughtPeopleBirthday =
                res.data.data.searchInfo_list[i].SoughtPeopleBirthday;
              item.SoughtPeopleBirthday = this.changeString(
                item.SoughtPeopleBirthday
              );
              //失踪人性别
              item.SoughtPeopleGender =
                res.data.data.searchInfo_list[i].SoughtPeopleGender;
              item.SoughtPeopleGender = this.changeString(
                item.SoughtPeopleGender
              );
              //失踪人照片
              // item.SearchinfoPhotoURL = res.data.data.searchInfo_list[i].SearchinfoPhotoURL;
              if (res.data.data.searchInfo_list[i].SearchinfoPhotoURL != null) {
                item.SearchinfoPhotoURL =
                  res.data.data.searchInfo_list[i].SearchinfoPhotoURL;
              }
              // document.getElementById("SoughtPeoplePhoto").src = res.data.data.searchInfo_list[i].SearchinfoPhotoURL
              // item.SearchinfoPhotoURL = this.changeString(item.SearchinfoPhotoURL);
              // 失踪地点
              item.LostPlace = this.codeToText(
                res.data.data.searchInfo_list[i].Province,
                res.data.data.searchInfo_list[i].City,
                res.data.data.searchInfo_list[i].Area,
                res.data.data.searchInfo_list[i].Detail
              );
              item.LostPlace = this.changeString(item.LostPlace);
            }
          });
      } else {
        this.getSearchInfo(this.LostInfoDemo);
      }
      // api.GetAllSearchInfo(this.LostInfo.pageNum, this.LostInfo.pageSize).then(res => {
      //   // console.log(this.LostInfo.pageNum);
      //   console.log(res.data.data);
      //   this.searchNum = res.data.data.total;
      //   var i;
      //   for (i = 0; i < this.lostInfoList.length; i++) {
      //     if (res.data.data.searchInfo_list[i] == null)
      //       break;
      //     var item = this.lostInfoList[i];
      //     item.SearchType = res.data.data.searchInfo_list[i].SearchType;
      //     item.SoughtPeopleName = res.data.data.searchInfo_list[i].SoughtPeopleName;
      //     item.SearchinfoLostdate = (res.data.data.searchInfo_list[i].SearchinfoLostdate);
      //     item.SoughtPeopleBirthday = res.data.data.searchInfo_list[i].SoughtPeopleBirthday;
      //     item.SoughtPeopleGender = res.data.data.searchInfo_list[i].SoughtPeopleGender;
      //     item.SearchinfoPhotoURL = res.data.data.searchInfo_list[i].SearchinfoPhotoURL;
      //     item.Detail = res.data.data.searchInfo_list[i].Detail;
      //   }
      // })
    },
    //迭代方法补0
    padding1(num, length) {
      num = parseInt(num);
      for (var len = (num + "").length; len < length; len = num.length) {
        num = "0" + num;
      }
      return num;
    },
  },
};
</script>


<!-- css -->
<style scoped>
#release {
  z-index: 1;
  padding-right: 0;
  /* width: 100%; */
  margin-top: 20px;
  margin-right: 10px;
  text-align: right;
}
.slogen {
  z-index: 1;
  color: #2e74b6;
  padding-left: 30%;
  padding-right: 30%;
  padding-top: 10px;
  font-size: 40px;
  font-weight: bold;
}
.el-row:first-child {
  margin-top: 20px;
}
.el-row:last-child {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  background-color: #2e74b6;
  color: #ffffff;
  font-size: 6px;
  margin-bottom: 5px;
  margin-top: 5px;
  min-height: 36px;
}
.grid-content-right {
  color: #2e74b6;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.last-page {
  margin-top: 40px;
  background-color: #32495e;
}
.last-page .bottom-style {
  padding-top: 100px;
  display: flex;
}
.last-page .bottom-style .logo-bottom {
  width: 60%;
}
.last-page .bottom-style .hand {
  display: flex;
  width: 80%;
  height: 100%;
  margin-bottom: 0;
  margin-left: 40px;
}
.last-page .bottom-style .total-number {
  margin-left: 0;
}
.last-page .bottom-style .total-number .total-item {
  color: #ffffff;
  font-size: 26px;
  font-family: "Oxygen";
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  padding-top: 25px;
}
/* 分页器 */
.demonstration {
  margin: 0 auto;
}
.thePhoto {
  /* height: 100%; */
  height: 100%;
}
.informationBlock {
  padding-left: 5%;
  padding-top: 5%;
  padding-bottom: 8%;
  display: inline-block;
}
.informationBlock .line {
  padding-top: 10px;
  padding-right: 12px;
  float: inline-start;
}
.informationBlock .tableTitle {
  color: #2e74b6;
  font-weight: 700;
}
h {
  font-size: 12px;
}
.containerFlex {
  display: flex;
  flex-direction: row; /*容器内成员的排列方式为从左到右*/
  flex-wrap: wrap; /*换行方式，放不下就换行*/
  justify-content: flex-start; /*项目在主轴上的对齐方式*/
  align-content: flex-start;
}
.PhotoContainer {
  width: 450px;
  height: 220px;
  margin-bottom: 20px;
  margin-left: 25px;
}
.PhotoOnly {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  margin-top: 5px;
  border-radius: 10px !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px !important;
  background-color: #ffffff;
  cursor: pointer;
  /* -webkit-transition: all 200ms ease-in; */
}
.demo-pagination-block {
  /* height: 100px; */
  margin-left: 30%;
  margin-top: 50px;
}
</style>




