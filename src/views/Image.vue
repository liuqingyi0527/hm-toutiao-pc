<template>
  <div class="images-container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮栏 -->
      <div class="btn_box">
        <el-radio-group @change="changeCollect()" v-model="reqParams.collect" size="small">
          <!-- 加冒号才解析问Boolean类型 -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openAddDialog()" type="success" size="small" style="float:right">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <!-- 控制收藏和删除的显示 -->
          <div class="option" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red: item.is_collected}"
            ></span>
            <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="30%">
      <!-- 提交给文件数据名称name='image -->
      <!-- 不是axios请求，还要根据elementUi文档配置请求头等 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <!--v-if 和v-else  -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/auth";
export default {
  name: "my-image",
  data() {
    return {
      reqParams: {
        // 默认查询全局 false 收藏 true
        collect: false,
        page: 1,
        per_page: 10
      },
      total: 1,
      images: {},
      // 控制对话框显示隐藏
      dialogVisible: false,
      imageUrl: null,
      // 上传组件的请求头
      headers: {
        Authorization: `Bearer ${auth.getUser().token}`
      }
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    // 添加素材
    openAddDialog() {
      this.dialogVisible = true;
      // 准备对话框
      // 打开
    },
    // 上传成功
    handleAvatarSuccess(res) {
      // 提示
      this.$message.success("上传成功");
      // 预览
      this.imageUrl = res.data.url;
      // 关闭对话框 + 更新当前列表
      window.setTimeout(() => {
        this.dialogVisible = false;
        this.getImages();
        // 清空预览图
        this.imageUrl = null;
      }, 3000);
    },
    // 删除图片素材
    deleteImage(id) {
      this.$confirm("此操作将永久删除该图片素材, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`/user/images/${id}`);
            this.$message.success("删除成功");
            this.getImages();
          } catch (e) {
            // 失败提示
            this.$message.error("出现异常" + e);
          }
        })
        .catch(() => {});
    },
    // 切换分页
    changePager(newPage) {
      // 修改参数
      this.reqParams.page = newPage;
      this.getImages();
    },
    // 切换添加收藏与取消收藏
    async toggleStatus(item) {
      try {
        // 获取接口里有一个is_collected：表示是否收藏
        const {
          data: { data }
        } = await this.$http.put(`/user/images/${item.id}`, {
          collect: !item.is_collected
        });
        // console.log(data);
        this.$message.success(data.collect ? "添加收藏成功" : "取消收藏成功");
        //视图：收藏按钮颜色样式 修改item
        item.is_collected = data.collect;
      } catch (e) {
        this.$message.error("操作失败" + e);
      }
    },
    // 获取素材
    async getImages() {
      //res值为 {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
      // res.data 为{data:{data:{total_count: 0, page: 1, per_page: 10, results: Array(0)}}}
      const {
        data: { data }
      } = await this.$http.get("/user/images", {
        params: this.reqParams
      });
      // console.log(data);
      this.images = data.results;
      // // console.log(this.images);
      this.total = data.total_count;
    },
    // 改变单选按钮触发
    changeCollect() {
      // this.collect = !this.collect;
      this.reqParams.page = 1;
      this.getImages();
    }
  }
};
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    display: inline-block;
    position: relative;
    margin-right: 50px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      color: #fff;
      span {
        margin: 0 30px;
      }
    }
  }
}
.red {
  color: red;
}
</style>