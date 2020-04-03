<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <!-- 最大安全数的问题，这里的id被转成了对象，所以要转回字符串 -->
            <div class="fans_item" v-for="item in list" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>tony</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="img">
          <div style="width:600px;height:400px" ref="dom"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "fans-count",
  data() {
    return {
      reqParams: {
        page: 1,
        per_page: 24
      },
      list: [],
      total: 0,
      // tabs的当前激活选项卡的name属性值
      activeName: "list"
      // 测试头像
      // circleUrl:
      //   "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  created() {
    this.getFansList();
  },
  // dom生成完毕后会执行的钩子函数（回调函数）
  mounted() {
    this.initBar();
  },
  methods: {
    // 初始化 柱状图
    async initBar() {
      const myChart = echarts.init(this.$refs.dom);
      const option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          // 调取接口X坐标刻度说明文字
          data:[],
           axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            // data: [10, 52, 200, 334, 390, 330, 220]
          // 图标的每一个柱子需要数据
          data:[]
          }
        ]
      };
      // 1、获取后台统计数据
      const {data:{data}}=await this.$http.get('/statistics/followers')
    // 2、修改配置项中的数据
     // data: {gender: {male: 79, female: 71}, age: {le18: 72, le23: 67, le30: 91, le40: 53, le50: 90, gt50: 70},…}
      // xAxis[0].data 追加选项  series[0].data 追加选项
   for(const key in data.age){
    //  xAxis是个数组，取配置项中的第一个项
     option.xAxis[0].data.push(key.replace('le', '小于').replace('gt', '大于') + '岁')
     option.series[0].data.push(data.age[key])
   }
  //  使用配置绘制图标
    myChart.setOption(option);
   },
    // 分页
    changePager(newPage) {
      this.reqParams.page = newPage;
      this.getFansList();
    },
    async getFansList() {
      try {
        const {
          data: { data }
        } = await this.$http.get("/followers", { params: this.reqParams });
        this.list = data.results;
        this.total = data.total_count;
      } catch (e) {
        this.$message.error("出现异常" + e);
      }
    }
  }
};
</script>

<style scoped lang='less'>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>