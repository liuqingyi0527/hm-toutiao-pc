<template>
  <div class="fans-container">
    <el-card>
      <div solt="header">
        <my-bread>粉丝管理</my-bread>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="粉丝列表" name="first">粉丝列表</el-tab-pane>
          <el-tab-pane label="粉丝画像" name="second">粉丝画像</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "fans-count",
  data() {
    return {
      activeName: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped lang='less'></style>