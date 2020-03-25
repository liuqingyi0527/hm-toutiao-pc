<template>
  <!-- 全屏容器 -->
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside class="my-aside" :width="isOpen?'200px':'64px'">
      <!-- logo -->
      <div class="logo" :class="{minLogo:!isOpen}"></div>
      <el-col width="200px">
        <!-- 侧边连展开收起 :collapse  ，清楚默认动画:collapse-transition -->
        <el-menu
          :collapse="!isOpen"
          :collapse-transition="false"
          default-active="1"
          background-color="#002233"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <!-- 头部区域 -->
      <el-header class="my-header">
        <!-- 图标 -->
        <span class="el-icon-s-fold icon" @click="toggleAisde()"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="my-dropdown" @command="handelClick">
          <span class="el-dropdown-link">
            <!-- 头像 -->
            <img class="user-avatar" :src="userPhoto" />
            <!-- 名字 -->
            <span class="user-name">{{userName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item @click.native="setting()" icon="el-icon-setting">个人设置</el-dropdown-item> -->
            <!-- <el-dropdown-item @click.native="logout()" icon="el-icon-unlock">退出登录</el-dropdown-item> -->
            <el-dropdown-item command="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 中心主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import auth from "@/utils/auth";
export default {
  name: "my-home",
  data() {
    return {
      //侧边栏默认是展开状态
      isOpen: true,
      // 用户名
      userName: "",
      // 用户头像
      userPhoto: ""
    };
  },
  created() {
    const user = auth.getUser();
    this.userName = user.name;
    this.userPhoto = user.photo;
  },
  methods: {
    // 测点隐藏显示
    toggleAisde() {
      this.isOpen = !this.isOpen;
    },
    // 个人设置
    setting() {
      // alert(111);
      this.$router.push("/setting");
    },
    // 退出登录
    logout() {
      auth.delUser();
      this.$router.push("/login");
    },
    handelClick(command) {
      console.log(command);
      // command正好是处理函数，在此调用
      // console.log(this[command])//相当于取this里的属性;
      this[command]();
    }
  }
};
</script>

<style scoped lang='less'>
// 和浏览器宽高一样的设置方法
.home-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .my-aside {
    background: #002244;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../assets/logo_admin.png) no-repeat center / 140px
        auto;
    }
    .minLogo {
      background-image: url(../assets/logo_admin_01.png);
      // 尺寸宽高
      background-size: 36px auto;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
    .my-dropdown {
      float: right;
      .user-avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .user-name {
        font-weight: bold;
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }
}
</style>