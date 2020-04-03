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
        <!-- 上传组件 -->
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
      //用户信息(注意编辑用户信息，主需要三个参数)
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
    async uploadImage({ file }) {
      // 选择图片之后，触发这个函数，把包含图片信息的对象传入进来
      // 自己上传  使用axios进行  所有不需要额外的去配置组件了。
      // 选择图片后获取file对象，封装成formdata数据对象，使用axios进行提交。
      const fd = new FormData();
      fd.append("photo", file);
      const {
        data: { data }
      } = await this.$http.patch("/user/photo", fd);
      // 预览
      this.user.photo = data.photo;
      // 本地同步
      const user = auth.getUser();
      user.photo = data.photo;
      auth.setUser(user);
      // home组件同步
      eventBus.$emit("updateUserPhoto", data.photo);
      // 提示
      this.$message.success("修改用户头像成功");
    },
    // 保存设置按钮
    async saveSetting() {
      try {
        // 取出后台需要的三个数据（解构三个数据）
        const { name, intro, email } = this.user;
        // 编辑用户的接口（只需要user里的三个数据为参数）
        await this.$http.patch("/user/profile", { name, intro, email });
        this.$message.success("修改用户信息成功");
        // 同步home组件(在seting组件传用户名称给home组件，将改完的用户名传过去)
        eventBus.$emit("updateUserName", name);
        // 同步本地存储
        // 1. 获取本地用户信息
        // 2. 修改拿到的用户信息用户名称
        // 3. 在把修改好数据存储起来
        const user = auth.getUser();
        user.name = name;
        auth.setUser(user);
      } catch (e) {
        console.log(e);
        
        console.log(e.response);
        if (e.response && e.response.status === 409) {
          this.$message.error("媒体名重复");
        } else {
          this.$message.error("修改用户信息失败" + e);
        }
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const {
        data: { data }
      } = await this.$http.get("/user/profile");
      // 用户信息  头像  数据
      this.user = data;
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