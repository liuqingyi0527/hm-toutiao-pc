<template>
  <el-card>
    <div solt="header">
      <my-bread>评论管理</my-bread>
    </div>
    <!-- 表格 -->
    <el-table :data="comments" style="width: 100%">
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="评论状态">
        <!-- 自定义列需要用插槽  -->
        <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
         <!-- 自定义列需要用插槽  -->
        <template slot-scope="scope">
          <el-button
            @click="toggleStatus(scope.row)"
            size="small"
            v-if="scope.row.comment_status"
            type="danger"
          >关闭评论</el-button>
          <el-button @click="toggleStatus(scope.row)" size="small" v-else type="success">打开评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      @current-change="pager"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "app-comment",
  data() {
    return {
      // 评论列表（文章列表接口，直接请求参数不一样）
      comments: [],
      reqParams: {
        response_type: "comment",
        page: 1,
        per_page: 20
      },
      // 总条数
      total: 0
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    //  评论操作
    toggleStatus(row) {
      // row 其实就是comments数组遍历后的每一个对象。
      const text1 =
        "您是否确定要关闭该文章的评论功能，关闭后用户无法对文章进行评论。";
      const text2 = "您是否确定要打开该文章的评论功能。";
      this.$confirm(row.comment_status ? text1 : text2, "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            // 请求
            const {
              data: { data }
            } = await this.$http.put(`/comments/status?article_id=${row.id}`, {
              allow_comment: !row.comment_status
            });
            // 提示
            this.$message.success(
              data.allow_comment ? "打开评论成功" : "关闭评论成功"
            );
            // 修改当前行文章的评论状态（更新视图）
            row.comment_status = data.allow_comment;
          } catch (e) {
            this.$message.error("操作失败");
          }
        })
        .catch(() => {});
    },
    //   分页
    pager(newPage) {
      this.reqParams.page = newPage;
      this.getComments();
    },
    //   获取评论列表
    async getComments() {
      const {
        data: { data }
      } = await this.$http.get("/articles", { params: this.reqParams });
      this.comments = data.results;

      this.total = data.total_count;
    }
  }
};
</script>

<style scoped lang='less'></style>