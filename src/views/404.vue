<template>
  <div class="container"></div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
//依次的顺序为：背景颜色 背景图片 背景图片是否重复 背景图片的位置（位置可用像素及方位名称）/背景图片的宽高
  background: url(../assets/404.png) no-repeat center / cover;
}
</style>