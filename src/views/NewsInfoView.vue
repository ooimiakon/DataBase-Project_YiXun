<!-- @author:杨芾卉-寻人信息详情页面 -->
<template>
  <el-container style="height: fit-content">
    <el-header style="padding: 0">
      <InfoHeader />
    </el-header>
    <el-main>
      <!-- 这里是页面内容 -->
      <!--ReportInfoView></!--ReportInfoView-->
      <div class="container">
        <div class="box">
          <div class="quit" onclick="window.open('/news','_self')">
            {{ icon }}<span>返回</span>
          </div>
          <div class="title">
            {{ this.newstitle }}
          </div>
          <div class="time">发布时间：{{ this.newstime }}</div>
          <div class="line"></div>
          <div class="text mt_20">
            寻亲人员可不受户籍地域限制，就近免费采集信息：
          </div>
          <div class="text">
            7月4日，澎海新闻从公安部获悉，在夏季治安打击整治“百日行动”中，为深入推进打击拐卖妇女儿童犯罪专项行动，充分运用科技
            力量打拐寻亲，公安部近日公布全国5000余个免费采血点信息，进一步便利广大群众及时就近采血，助力被拐家庭早日实现团圆。
          </div>
          <div class="text">
            近年来，公安部坚决贯彻党中央决策部署，充分发挥国务院反拐部际联席会议牵头部內作用，会同有关部內依法严厉打击拐卖犯
            罪，切实维护了妇女儿童合法权益。工作中，各地公安机关始终坚持以人民为中心的发展思想，创新工作方法，强化科技支撑，
            计设置3000余个免费采血点，并向社会公布地址、联系电话，为协助案件侦办、帮助群众寻亲发挥了积极作用，帮助一大批离散家
            庭实现了团圆。
          </div>
        </div>
      </div>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<script>
//import ReportInfoView from "./ReportInfoView.vue";
import InfoHeader from "@/views/Frontstage/InfoHeader.vue";
import Footer from "@/views/Frontstage/Footer.vue";
import { useRoute } from "vue-router";
import api from "/src/api/index";

export default {
  data() {
    return {
      icon: "<<",
      newsid: null,
      newscontent: "",
      newstime: "",
      newstitle: "",
    };
  },

  components: { InfoHeader, Footer },

  methods: {
    getNewsDetail() {
      api
        .newsInfo(this.newsid)
        .then((res) => {
          console.log("请求成功", res.data);
          this.newscontent = res.data.data.news_content;
          this.newstitle = res.data.data.news_title;
          this.newstime = res.data.data.news_time;
          //console.log("获取数据", this.news_list);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.newsid = this.$route.query.NewsId;
    console.log("mounted接收到的id：", this.newsid);
    this.getNewsDetail();
  },
  setup() {
    // const route = useRoute();
    // const NewsId = route.query.NewsId; //接收主页面传来的参数
  },
};
</script>

<style scoped>
.el-main {
  background-color: #f4f6f9;
  min-height: 600px;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box {
  width: 50%;
}
.quit {
  text-align: left;
}
.title {
  text-align: left;
  font-size: 32px;
  font-weight: 700;
}
.line {
  width: 100%;
  border-top: 1px solid #ccc;
}
.time {
  display: flex;
  justify-content: center;
  color: #888;
}
.text {
  text-align: left;
}
.mt_20 {
  margin-top: 20px;
}
.quit {
  width: 60px;
  cursor: pointer;
}
</style>
