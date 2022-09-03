<template>
  <div id="container"></div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";
import api from "/src/api/index";
import { CodeToText } from "element-china-area-data";
import { forEach, random } from "lodash";
export default {
  name: "gaodeMap",
  setup() {
    const map = shallowRef(null);
    return {
      map,
    };
  },
  methods: {
    codeToText(province, city, area, detail) {
      return (
        CodeToText[province] + CodeToText[city] + CodeToText[area] + detail
      );
    },
    clickPoint(index) {
      console.log("我是点击事件");
      //路径 前往对应的寻人事件
      //点击跳转到寻人信息的详情页
      this.$router.push({
        path: "/missingpersonInfo",
        query: {
          SearchInfo: index,
        },
      });
    },
    mouseoverPoint(e) {
      AMapLoader.load({}).then((AMap) => {
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30),
        });
        console.log(e);
        infoWindow.setContent(e.target.content);
        infoWindow.open(this.map, e.target.getPosition());
      });
    },
    initMap() {
      AMapLoader.load({
        key: "a8eaad565d2a2a529b5d8093f8e19e98", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        // plugins: ['AMap.Geolocation', 'AMap.Geocoder'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            // viewMode: "3D",
            zoom: 12,
            zooms: [2, 22],
            // center: [105.602725, 37.076636],
            mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
          });
          // this.map.setMapStyle("amap://styles/46614e92f13c9e88edb6aa4c64eed3a4");
        })
        .catch((e) => {
          console.log(e);
        });
      //试试用Promise能不能调整顺序,可以！
      var positionCenter = [116, 35];
      var localAd = "上海市";
      // var positionArr = ;//positionArr[0]存放当前定位中心点坐标

      new Promise((resolve) => {
        var options = {
          showMarker: false, //是否显示定位点
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          position: "RB", //定位按钮的停靠位置
          offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
          showCircle: false,
          // circleOptions: {
          //   // radius: 10,
          //   fillOpacity: 0.1
          // }
        };
        //高精度定位
        AMapLoader.load({
          //可多次调用load
          plugins: ["AMap.Geolocation"],
        }).then((AMap) => {
          //进行精确定位
          var geolocation = new AMap.Geolocation(options);
          this.map.addControl(geolocation);
          // var positionCenter = [118, 33];
          geolocation.getCurrentPosition(function (status, result) {
            //打印当前定位点的信息
            positionCenter[0] = result.position.lng;
            positionCenter[1] = result.position.lat;
            // positionCenter[0] = result.position.KL;
            // positionCenter[1] = result.position.kT;
            // console.log(positionCenter);
          });
        });
        setTimeout(() => {
          resolve(positionCenter); //是当前定位的中心点坐标
        }, 2000);
      })
        .then((val) => {
          console.log(val); //  参数val 是当前定位的中心点坐标
          // positionArr[0] = val;
          return new Promise((resolve) => {
            AMapLoader.load({
              //可多次调用load
              plugins: ["AMap.Geocoder"],
            }).then((AMap) => {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: "010",
              }); //从坐标获得adcode
              geocoder.getAddress(val, function (status, result) {
                if (status === "complete" && result.info === "OK") {
                  // result为对应的地理位置详细信息
                  console.log(2);
                  console.log(result);
                  //得到定位点的详细地址
                  localAd = result.regeocode.addressComponent.adcode;
                  // console.log(result.regeocode.formattedAddress)
                  resolve(localAd);
                  // console.log(localAd)
                } else {
                  console.log("转换失败为什么");
                }
              });
            });
            // resolve(localAdcode);
          });
        })
        .then((val) => {
          // var adText = CodeToText[val];//当前定位点的adcode转的文字
          // console.log(adText);
          console.log(val); //当前定位点adcode
          api.GetSearchInfoPos(val).then((res) => {
            console.log("地图api");
            console.log(res.data.data.aroundSearchInfo); //周围的寻人信息数组
            // let positionArr = [];
            var markerNum = res.data.data.aroundSearchInfo.length;
            var i = 1;
            for (i = 1; i <= markerNum; i++) {
              var jingdu = positionCenter[0] + random() - random();
              var weidu = positionCenter[0] + random() - random();
              let marker = new AMap.Marker({
                position: [jingdu, weidu],
              });
              this.map.add(marker);
              marker.content =
                "点击查看您周边第" +
                res.data.data.aroundSearchInfo[i].search_info_id +
                "号寻人信息详情";
              marker.on(
                "click",
                this.clickPoint(
                  res.data.data.aroundSearchInfo[i].search_info_id
                )
              );
              marker.on("mouseover", this.mouseoverPoint);
              // marker.on('mouseout', this.mouseoutPoint);
            }
            this.map.setFitView(null, false, [150, 60, 100, 60]);
          });
        })
        .then(() => {});
    },
  },
  // },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap();
  },
};
</script>

<style scoped>
#container {
  height: 300px;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
</style>




