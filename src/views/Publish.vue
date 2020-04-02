<template>
  <div class="publish-container">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <!-- 富文本 -->
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封皮:">
          <el-radio-group @change="articleForm.cover.images=[]" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div style="margin-bottom:10px">
            <!-- 封皮组件 -->
            <!-- 单图 -->
            <div v-if="articleForm.cover.type===1">
              <!-- <my-cover>选择封皮</my-cover> -->
              <!-- 简写 -->
              <my-cover v-model="articleForm.cover.images[0]"></my-cover>
              <!-- <my-cover
                :value="articleForm.cover.images[0]"
                @input="articleForm.cover.images[0]=$event"
              >选择封皮</my-cover>-->
            </div>
            <!-- 封皮组件多图 -->
            <div v-if="articleForm.cover.type===3">
              <my-cover :key="i" v-for="i in 3" v-model="articleForm.cover.images[i-1]"></my-cover>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <!-- 频道组件 -->
          <!-- <my-channel :value="articleForm.channel_id" @input="articleForm.channel_id=$event"></my-channel> -->
          <!-- 简写 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 判断操作按钮 -->
        <el-form-item v-if="$route.query.id">
          <el-button @click="update()" type="success">修改文章</el-button>
        </el-form-item>
        <el-form-item v-else>
          <!-- 传参判断点击的是发布还是草稿 -->
          <el-button @click="addAticle(false)" type="primary">发布文章</el-button>
          <el-button @click="addAticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "my-publish",
  // 注册富文本
  components: {
    quillEditor
  },
  data() {
    return {
      // 文章表单对象
      articleForm: {
        title: null,
        channel_id: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      // 富文本配置
      editorOption: {
        // some quill options
        // 占位配置
        placeholder: "请输入内容",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            ["image"]
          ]
        }
      }
    };
  },
  created() {
    // 当编辑文章跳转到此，获取文章信息填充表单
    if (this.$route.query.id) {
      this.getArticle();
    }
  },
  watch: {
    // 监听地址栏哈希后面id的变化
    '$route.query.id': function () {
      // 监听 this.$route.query.id 的数据变化
      if (this.$route.query.id) {
        // 填充表单
        this.getArticle()
      } else {
        // 清空表单
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    // 修改完成触发按钮
    async update() {
      try {
        await this.$http.put(
          `articles/${this.articleForm.id}?draft=false`,
          this.articleForm
        );
        this.$message.success("修改成功");
        this.$router.push("/articles");
      } catch (e) {
        this.$message.error("修改失败" + e);
      }
    },
    // 获取指定文章接口，渲染到当前表单数据
    async getArticle() {
      const {
        data: { data }
      } = await this.$http.get(`/articles/${this.$route.query.id}`);
      this.articleForm = data;
    },
    // 添加文章 draft===false 发布文章  draft===true  存入草稿
    async addAticle(draft) {
      try {
        // 请求
        await this.$http.post(`/articles?draft=${draft}`, this.articleForm);
        // 提示
        this.$message.success(draft ? "存入草稿成功" : "发布文章成功");
        // 跳转
        this.$router.push("/articles");
      } catch (e) {
        this.$message.error("操作失败"+e );
      }
    }
  }
};
</script>

<style scoped lang='less'></style>