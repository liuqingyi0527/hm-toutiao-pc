<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        个人设置
        <!-- <my-bread>个人设置</my-bread> -->
      </div>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{user.id}}</el-form-item>
            <el-form-item label="手机号：">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" :rows="3" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="saveSetting()" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" style="text-align: center;">
          <!-- action属性不能删除，组件做了校验 -->
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="uploadImage"
          >
            <img v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:12px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import auth from "@/utils/auth";
import eventBus from "@/eventBus";
export default {
  name: "app-setting",
  data() {
    return {
      //用户信息
      user: {
        name: "",
        intro: "",
        email: "",
        photo: ""
      }
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 上传图片
    uploadImage({ file }) {
      const user = auth.getUser();
      const fd = new FormData();
      fd.append("photo", file);
      this.$http({
        method: "PATCH",
        url: "/user/photo",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.token
        },
        data: fd
      })
        .then(res => {
          // 预览
          this.user.photo = res.data.data.photo;
          // 本地同步
          user.photo = res.data.data.photo;
          auth.setUser(user);
          // home组件同步
          eventBus.$emit("updateUserPhoto", res.data.data.photo);
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    // 保存设置
    saveSetting() {
      try {
        const user = auth.getUser();
        // 取出后台需要的三个数据
        const { name, intro, email } = this.user;
        this.$http({
          method: "patch",
          url: "/user/profile",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token
          },
          data: { name, intro, email }
        }).then(() => {
          // console.log(user.name);
          this.$message.success("修改用户信息成功");
          user.name = name;
          auth.setUser(user);
          // 同步home组件(在seting组件传用户名称给home组件)
          eventBus.$emit("updateUserName", name);
        });
      } catch (e) {
        this.$message.error("修改用户信息失败");
      }
    },
    // 获取用户信息
    getUserInfo() {
      const user = auth.getUser();
      // console.log(user.token);
      this.$http({
        method: "get",
        url: "/user/profile",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token
        }
      })
        .then(res => {
          // console.log(1111);
          this.user = res.data.data;
        })
        .catch(err => {
          // console.log(err);
        });
    }
  }
};
</script>

<style scoped lang='less'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>