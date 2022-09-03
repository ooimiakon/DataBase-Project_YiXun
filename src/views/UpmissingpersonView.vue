<!-- @author:刘睿萌-详情界面的模板 -->
<!-- 菜单没写回调函数 -->
<template>
  <el-container style="height: fit-content">
    <el-header style="padding: 0">
      <InfoHeader />
    </el-header>

    <el-main>
      <!-- 这里是页面内容 -->
      <!-- @author:郭静静-发布寻人信息界面内容 -->
      <!-- <el-page-header :icon="ArrowLeft" /> -->
      <div style="padding: 5px 10px 15px 500px">
        <el-form
          ref="upForm"
          :model="form"
          label-width="120px"
          justify="center"
          style="max-width: 500px"
          :rules="rules"
        >
          <el-form-item label="寻人类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择寻人类型">
              <el-option label="寻找亲人" value="寻找亲人" />
              <el-option label="亲人寻家" value="亲人寻家" />
              <el-option label="寻找朋友" value="寻找朋友" />
              <el-option label="寻找恩人" value="寻找恩人" />
              <el-option label="寻找战友" value="寻找战友" />
              <el-option label="其它寻人" value="其它寻人" />
            </el-select>
          </el-form-item>

          <el-form-item label="被寻人真实姓名 ">
            <el-input v-model="form.name" />
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="出生日期">
            <el-col :span="24">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="请选择日期"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="身高(厘米)">
            <el-input-number
              v-model="form.height"
              :min="1"
              :max="250"
              controls-position="right"
              @change="handleChange"
            />
          </el-form-item>

          <!-- <el-form-item label="上传照片">
            <el-upload class="upload-demo" action="http://8.130.101.207:1827/api/UserOperation/AddSearchPeopleInfo"
              :on-change="handleChange" :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-form-item> -->

          <el-form-item label="上传照片">
            <div style="text-align: left">
              <el-upload
                class="avatar-uploader"
                action
                :auto-upload="false"
                ref="upload"
                :show-file-list="false"
                :on-change="onUploadChange"
              >
                <img
                  v-if="this.form.imageurl"
                  :src="this.form.imageurl"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过5M
              </div>
            </div>
          </el-form-item>

          <el-form-item label="特征描述" prop="features">
            <el-input v-model="form.features" type="textarea" />
          </el-form-item>

          <el-form-item label="是否报案">
            <el-radio-group v-model="form.y_n_report">
              <el-radio label="是" />
              <el-radio label="否" />
            </el-radio-group>
          </el-form-item>

          <!-- <el-form-item label="失散日期">
            <el-col :span="24">
              <el-date-picker v-model="form.date" type="date" placeholder="请选择日期" style="width: 100%" />
            </el-col>
          </el-form-item> -->

          <el-form-item label="失散日期">
            <el-col :span="24">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="选择失散地点">
            <el-cascader
              placeholder="请选择地区"
              size="default"
              :options="options"
              v-model="form.selectedOptions"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>

          <el-form-item label="详细失散地点">
            <el-input v-model="form.address" />
          </el-form-item>

          <el-form-item label="联系人" prop="linkman">
            <el-input v-model="form.linkman" placeholder="请输入联系人姓名" />
          </el-form-item>

          <el-form-item label="联系方式" prop="telephone">
            <el-input
              v-model="form.telephone"
              placeholder="请输入联系人手机号"
            />
          </el-form-item>

          <div style="text-align: center; padding: 5px 10px 15px 150px">
            <el-form-item>
              <el-button type="primary" @click="onSubmit('upForm')"
                >发布</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-main>

    <Footer></Footer>
  </el-container>
</template>

<script>
//放一些引入的量  如const url =‘balabala'
// import { ref } from 'vue'
// const activeIndex = ref('1')
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
import { reactive, ref } from "vue";

import InfoHeader from "@/views/Frontstage/InfoHeader.vue";
import Footer from "@/views/Frontstage/Footer.vue";
import { regionData } from "element-china-area-data";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "/src/api/index";

export default {
  name: "upMissingperson",
  data() {
    return {
      options: regionData,
      form: reactive({
        name: "",
        type: "",
        sex: "",
        birthday: "",
        height: "",
        features: "",
        y_n_report: "",
        date: "",
        selectedOptions: [],
        address: "",
        linkman: "",
        telephone: "",
        imageurl: "",
        id: "",
      }),
      rules: {
        type: [{ required: true, message: "此项不能为空", trigger: "change" }],
        // name: [
        //   { required: true, message: "此项不能为空", trigger: "blur" }
        // ],
        sex: [{ required: true, message: "此项不能为空", trigger: "change" }],
        linkman: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        telephone: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        features: [
          { required: true, message: "此项不能为空", trigger: "blur" },
        ],
      },
      upForm: ref(),
    };
  },
  components: {
    InfoHeader,
  },
  methods: {
    //三级地址选择方法
    handleChange(value) {
      console.log("区域码", value);
    },
    //提交表单
    onSubmit(formEl) {
      console.log(this.form);

      this.$refs[formEl].validate((valid) => {
        if (!valid) {
          // alert('submit!');
          console.log("error submit!!");
          return false;
        } else {
          this.form.height = this.form.height + "";
          this.form.birthday = this.formatLongDate(this.form.birthday);
          this.form.date = this.formatLongDate(this.form.date);
          console.log("传入的数据是", this.form.selectedOptions[0]);
          api
            .upMissperson(
              4, //用户id
              this.form.type,
              this.form.name,
              this.form.sex,
              this.form.height,
              this.form.features,
              this.form.birthday,
              "未找到",
              this.form.y_n_report,
              this.form.date,
              this.form.telephone,
              this.form.selectedOptions[0],
              this.form.selectedOptions[1],
              this.form.selectedOptions[2],
              this.form.address
            )
            .then((res) => {
              this.form.id = res.data.data.searchInfo_id;
              console.log(res.data.data.searchInfo_id);
              api.addPicture(this.form.id, this.form.imageurl).then((res) => {
                Object.assign(this.$data, this.$options.data.call(this));
              });
            });
          ElMessage({
            message: "提交成功",
            type: "success",
          });
        }
      });
    },
    //选择上传图片
    onUploadChange(file) {
      const isIMAGE =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/png" ||
        file.raw.type === "image/gif";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = (e) => {
        this.form.imageurl = e.target.result;
        console.log(this.form.imageurl); //图片的base64数据
      };
    },
    //时间转化封装
    formatLongDate(date) {
      let myyear = date.getFullYear();
      let mymonth = date.getMonth() + 1;
      let myweekday = date.getDate();
      let myHour = date.getHours();
      let myMin = date.getMinutes();
      let mySec = date.getSeconds();

      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      if (myHour < 10) {
        myHour = "0" + myHour;
      }
      if (myMin < 10) {
        myMin = "0" + myMin;
      }
      if (mySec < 10) {
        mySec = "0" + mySec;
      }
      return myyear + "-" + mymonth + "-" + myweekday;
    },
  },
};
</script>


<!-- css -->
<style scoped>
.el-main {
  background-color: #f4f6f9;
}

.biaodtext {
  padding: 5px 10px 15px 500px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>