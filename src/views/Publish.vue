<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="200px">
        <el-form-item label="标题">
          <el-input v-model="articleForm.title" style="width:400px" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          富文本
        </el-form-item>
        <el-form-item label="封皮">
           <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道"></el-form-item>
        <el-button type="primary">发布</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-publish",
  data(){
    return {
      // 文章表单对象
      articleForm:{
        title:'',
        content:'',
        cover:{
          type:1,
          image:[],
        },
        channel_id:null
      }
    }
  }
};
</script>

<style scoped lang='less'></style>