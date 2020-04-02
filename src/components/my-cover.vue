<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog()">
      <!-- 默认图或者父组件穿过来的图 -->
         <img :src="value||coverImage" alt />
    </div>
    <!-- 对话框  -->
    <el-dialog :visible.sync="dialogVisible" width="720px">
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!--素材库里的切换按钮-->
          <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 素材列表 -->
          <div class="img_list">
            <div
              @click="selectedImage(item.url)"
              class="img_item"
              :class="{selected:selectedImageUrl===item.url}"
              v-for="item in images"
              :key="item.id"
            >
              <!-- 注意src属性加  ： -->
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页组件 -->
          <!--  hide-on-single-page有一页时忽略分页组件 -->
          <el-pagination
            background
            layout="prev, pager, next"
            hide-on-single-page
            @current-change="pager"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图片 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            name="image"
            :headers="headers"
            :show-file-list="false"
            :on-success="uploadSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/auth";
import defaultImg from "@/assets/default.png";
export default {
  name: "my-cover",
  props: ["value"],
  data() {
    return {
      coverImage: defaultImg,
      //   选择的图片
      selectedImageUrl: null,
      //   控制对话框显示隐藏
      dialogVisible: false,
      // tab组件选项卡name的属性
      activeName: "image",
      // 上传图片返回url
      imageUrl: "",
      // 上传图片请求头
      headers: {
        Authorization: `Bearer ${auth.getUser().token}`
      },
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0
    };
  },

  methods: {
    //  选择图片
    selectedImage(url) {
      this.selectedImageUrl = url;
    },
    //   确认图片
    confirmImage() {
      if (this.activeName === "image") {
        //  素材库
        if (!this.selectedImageUrl)
          return this.$message.warning("请选中一张素材图片");
        //把选中的图片放到图片按钮位置
        // this.coverImage = this.selectedImageUrl;
        //提交到父组件
        this.$emit("input", this.selectedImageUrl);
      }
      if (this.activeName === "upload") {
        //   上传图片
        if (!this.imageUrl) return this.$message.warning("请选中一张上传图片");
        //预览 点击确认封皮上显示（只能内部显示，应该交给父组件）
        // this.coverImage = this.imageUrl;
        //提交到父组件
        this.$emit("input", this.imageUrl);
      }
      this.dialogVisible = false;
    },
    // 切换全部与收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    // 分页函数
    pager(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    //   打开上传封皮对话框
    openDialog() {
      // 再次打开对话框重置操作
      this.selectedImageUrl = null;
      this.imageUrl = null;
      this.activeName = "image";
      this.dialogVisible = true;
      //   获取数据，只有打开对话框的时候才有获取图片的需求
      this.getImages();
    },
    // 上传图片成功
    uploadSuccess(res) {
      //  console.log(res);
      const { data } = res;
      //   console.log(data);
      this.imageUrl = data.url;
      this.$message.success("上传成功");
    },
    // 获取图片素材
    async getImages() {
      const {
        data: { data }
      } = await this.$http.get("/user/images", { params: this.reqParams });
      //   console.log(data);
      this.images = data.results;
      // 总条数
      this.total = data.total_count;
    }
  }
};
</script>
<style scoped lang='less'>
// 图片按钮
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img_list {
  margin-top: 15px;
  .img_item {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center/ 50px auto;
    }
  }
}
</style>