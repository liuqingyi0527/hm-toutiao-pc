<template>
  <div class="artticle-container">
    <!-- 筛选条件区域 -->
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <!-- 使用面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select
            @change="changeChannel"
            clearable
            v-model="reqParams.channel_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="filterArticle" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到{{total}}条结果</div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封皮">
          <template slot-scope="scope">
            <el-image
              fit="cover"
              :src="scope.row.cover.images[0]"
              style="width:150px;height:100px"
              lazy
            >
              <div slot="error">
                <img src="@/assets/error.gif" style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <!-- 使用elementUi 里面的tab组件处理字体颜色 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="toEditArticle(scope.row.id)"
              plain
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              @click="delArticle(scope.row.id)"
              plain
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- total 指定总条数 -->
      <!-- page-size 设置每一页显示多少条，默认是10条 -->
      <!-- cyrrent-page 指定当前是第几页 -->
      <!-- current-change 是事件changePagerpager 是函数 -->
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-article",
  data() {
    return {
      total: 0,
      // 筛选条件对象数据
      reqParams: {
        // 当字段的值为null的时候，这个不会发送给后台(null和""的区别)
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1, // 默认第一页
        per_page: 20
      },
      articles: [],
      dateArr: [],
      // 频道下拉选项数据
      channelOptions: []
      // 日期范围数据 [起始日期,结束日期]
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticles();
  },
  methods: {
      // 删除文章
    delArticle(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            // console.log(id); //number
            await this.$http.delete(`/articles/${id}`);
            this.$message.success("删除成功");
            this.getArticles();
          } catch (e) {
            this.$message.error("出现异常" + e);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑文章
    toEditArticle(id) {
      this.$router.push(`/publish?id=${id}`);
    },
    // 清空频道
    changeChannel(value) {
      if (value == "") {
        this.reqParams.channel_id = null;
      }
    },
    // 筛选文章
    filterArticle() {
      // 回到第一页
      this.reqParams.page = 1;
      // 根据resParams筛选
      this.getArticles();
    },
    // 获取频道下拉选项数据
    async getChannelOptions() {
      // 对象的解构,相当于拿到res.data.data
      const {
        data: { data }
      } = await this.$http.get("/channels");
      // console.log(data.channels);
      this.channelOptions = data.channels;
    },
    // 选择日期范围
    changeDate(dateArr) {
      if (dateArr) {
        // console.log(dateArr);
        this.reqParams.begin_pubdate = dateArr[0];
        this.reqParams.end_pubdate = dateArr[1];
      } else {
        // 清空的时候点X号
        this.reqParams.begin_pubdate = null;
        this.reqParams.end_pubdate = null;
      }
    },
    // 获取文章数据
    async getArticles(id) {
      // res ={data:{data:{result[]}}}
      const {
        data: { data }
      } = await this.$http.get("/articles", { params: this.reqParams });
      this.articles = data.results;
      // console.log(this.articles);
      // console.log(data);data是包裹着result的对象
      // 设置总条数
      this.total = data.total_count;
    },
  
    // 分页切(current-change的对调参数默认是当前页,再次传参然后渲染)
    changePager(newPage) {
      // 修改参数
      this.reqParams.page = newPage;
      this.getArticles();
    }
  }
};
</script>

<style scoped lang='less'></style>