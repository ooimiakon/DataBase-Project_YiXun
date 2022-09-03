<template>
  <div
    class="search"
    ref="SearchForLost"
  >
    <!--把表单又换回去了-->
    <div class="select-information">
      <div class="select-item">
        <div
          class="type"
          style="border-top-left-radius:10px;border-top-right-radius: 10px"
        >
          寻人类型
        </div>

        <div
          class="type1-content"
          style="padding-top:5px;padding-left: 2%;"
        >
          <el-select
            v-model="whichType"
            multiple
            placeholder="请选择寻人类型"
            style="width: 270%"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="select-item">
        <div class="type">
          失散地点/被寻人所在地
        </div>
        <div
          class="type2-content"
          style="padding-top:5px;padding-left: 2%;"
        >
          <el-cascader
            placeholder="请选择失散地点或被寻人所在地"
            style="width:120%"
            :options="areaOptions"
            v-model="selectedOptions"
          >
          </el-cascader>
        </div>
      </div>
      <div class="select-item">
        <div class="type">
          性别
        </div>
        <div
          class="type3-content"
          style="padding-top:5px;padding-left: 2%;"
        >
          <el-select
            v-model="genderRadio"
            class="m-2"
            placeholder="请选择被寻人性别"
            style="width:100%"
          >
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

      </div>
      <div class="select-item">
        <div class="type">
          出生日期
        </div>
        <div
          class="type4-content"
          style="padding-top:5px;padding-left: 2%;"
        >
          <el-date-picker
            v-model="valueBirthday"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择被寻人出生日期"
            :size="size"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="select-item">
        <div class="type">
          失散日期
        </div>
        <div
          class="type5-content"
          style="padding-top:5px;padding-left: 2%;"
        >
          <el-date-picker
            v-model="valueLostday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择被寻人失散日期"
            :size="size"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="select-item">
        <div class="type">
          身高
        </div>
        <div
          class="type6-content"
          style="padding-top:5px;margin-left: 4%;width:40%;"
        >
          <div class="slider-demo-block">
            <el-slider
              id="heightSlider"
              v-model="personHeight"
              range
              show-stops
              :max="230"
            />
          </div>
        </div>
      </div>
      <div class="select-item">
        <div
          class="type"
          style="border-bottom-left-radius:10px;border-bottom-right-radius: 10px"
        >
          关键字检索
        </div>
        <div
          class="type7-content"
          style="padding-top:5px;padding-left: 2%;width: 70%;"
        >
          <div class="key-input">
            <el-input
              v-model="keyInput"
              placeholder="请输入被寻人关键信息"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="select-button">
    <el-button
      color="#2e74b6"
      style="width:100px;font-size:12px;margin-right:50px;margin-top: 30px;margin-bottom: 30px;"
      @click="SearchForLost"
    >搜索</el-button>
    <el-button
      color="#C2C2C2"
      style="width:100px;font-size:12px;margin-left:50px;margin-top: 30px;margin-bottom: 30px;"
      @click="ClearLostInfo"
    >重置</el-button>
  </div>
</template>
<script>
import { regionData } from "element-china-area-data";
import { ref } from 'vue'
// import { threadId } from 'worker_threads';

export default ({
  data () {
    return {
      searchForm: {
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
        search: null
      },
      whichType: [],
      genderRadio: null,
      valueBirthday: null,
      valueLostday: null,
      personHeight: [0, 230],
      selectedOptions: [],
      keyInput: "",

      areaOptions: regionData,
      typeOptions: [
        {
          value: '寻找亲人',
          label: '家寻亲人',
        },
        {
          value: '寻找朋友',
          label: '寻找朋友',
        },
        {
          value: '寻找战友',
          label: '寻找战友',
        },
        {
          value: '亲人寻家',
          label: '亲人寻家',
        },
        {
          value: '寻找恩人',
          label: '寻找恩人',
        },
        {
          value: '其它寻人',
          label: '其它寻人',
        },
      ],
      genderOptions: [
        {
          value: '不详',
          label: '不详',
        },
        {
          value: '男',
          label: '男',
        },
        {
          value: '女',
          label: '女',
        },
      ],

    };
  },
  methods: {
    SearchForLost () {
      // console.log(this.searchForm);
      // console.log(this.whichType[0]);
      for (var i = 0; ; i++) {
        console.log('能进循环');
        if (this.whichType[i] != null) {
          console.log('能进循环，能比较大小')
          if (this.whichType[i] == "寻找亲人") {
            console.log("寻找亲人比较成功了")
            this.searchForm.search_type_1 = "寻找亲人";
          } else if (this.whichType[i] == '寻找朋友') {
            this.searchForm.search_type_2 = "寻找朋友";
          } else if (this.whichType[i] == '寻找战友') {
            this.searchForm.search_type_3 = "寻找战友";
          } else if (this.whichType[i] == '亲人寻家') {
            this.searchForm.search_type_4 = "亲人寻家";
          } else if (this.whichType[i] == '寻找恩人') {
            this.searchForm.search_type_5 = "寻找恩人";
          } else if (this.whichType[i] == '其它寻人') {
            this.searchForm.search_type_6 = "其它寻人";
          }
        }
        else {
          break;
        }
      }

      // var province=this.selectedOptions[0];
      // var city=this.selectedOptions[1];
      // var area=this.selectedOptions[2];
      // var height_low=this.personHeight[0];
      // var height_high=this.personHeight[1];
      // this.searchForm.search_type_1 = type1;
      // this.searchForm.search_type_2 = type2;
      // this.searchForm.search_type_3 = type3;
      // this.searchForm.search_type_4 = type4;
      // this.searchForm.search_type_5 = type5;
      // this.searchForm.search_type_6 = type6;
      this.searchForm.gender = this.genderRadio;
      this.searchForm.lostdate = this.valueLostday;
      this.searchForm.birthday = this.valueBirthday;
      if (this.selectedOptions[0]) this.searchForm.province = this.selectedOptions[0];
      if (this.selectedOptions[1]) this.searchForm.city = this.selectedOptions[1];
      if (this.selectedOptions[2]) this.searchForm.area = this.selectedOptions[2];
      this.searchForm.height_low = this.personHeight[0];
      this.searchForm.height_high = this.personHeight[1];
      this.searchForm.search = this.keyInput;
      this.searchForm.pageNum = 1;//搜索的时候重新显示第一页的数据
      //试着把上面那个searchForm传给父组件CoverView
      this.$emit('onEvent', this.searchForm);
    },
    ClearLostInfo () {
      // Object.assign(this.$data, this.$options.data.call(this));
      this.whichType = [];//寻人类型
      this.selectedOptions = [];//失散地点/被寻人所在地
      this.genderRadio = '';//性别
      this.valueBirthday = '';//出生日期
      this.valueLostday = '';//失散日期
      this.personHeight = [0, 230];//身高
      this.keyInput = '';
      //因为为空不会在按了搜索键以后被赋值
      this.searchForm.search_type_1 = null;
      this.searchForm.search_type_2 = null;
      this.searchForm.search_type_3 = null;
      this.searchForm.search_type_4 = null;
      this.searchForm.search_type_5 = null;
      this.searchForm.search_type_6 = null;
      this.searchForm.province = null;
      this.searchForm.city = null;
      this.searchForm.area = null;
    }

  },
});
</script>

<style scoped>
.search {
  background-color: #ffffff;
  border-radius: 20px;
  border-style: hidden;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 2%;
  position: relative;
}
.search .select-information {
  margin-left: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
}
.search .select-information .select-item {
  display: flex;
  min-height: 45px;
}
.search .select-information .select-item .type {
  width: 20%;
  font-weight: 600;
  font-size: 12px;
  margin: 2px;
  padding-top: 9px;
  color: #ffffff;
  background-color: #2e74b6;
}

/* .search .select-button {
  display: flex;
  height: 80px;
  margin-bottom: 30px;
} */

/* 新的表单 */
/* .all-choose-information {
  margin-left: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
}

.all-choose-information .type {
  font-weight: 600;
  font-size: 13px;
  margin: 2px;
  padding-top: 9px;
  color: #ffffff;
  background-color: #2e74b6;
  min-height: 35px;
}
.all-choose-information .search-form {
  width: 210%;
}
.all-choose-information .submit-button {
  display: flex;
  height: 80px;
}
#heightSlider {
  padding-left: 2%;
  width: 50%;
} */
</style>