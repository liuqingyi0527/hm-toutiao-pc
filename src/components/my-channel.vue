<template>
  <!-- v-model="value" 既能赋值，又改值，现在value数据仅读，所有不能使用v-model -->
  <!-- 只能使用 :value 给el-select赋值 -->
  <el-select @change="changeChannel" :value="value" placeholder="请选择" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
    <!-- label 选项文字  value 选项的值 当你选择某个选项后，该选项的值提供v-model -->
  </el-select>
</template>

<script>
export default {
  name: "my-channel",
  //   组件内部通过props接收传递过来的值 (传过来的Activity里reqParams的channel_id),这个值只能读不能改
  props: ["value"],
  data() {
    return {
      // 频道ID
      // channelId: null,
      // 所有的下拉选项
      channelOptions: []
    };
  },
  created() {
    this.getChannelOptions();
  },
  methods: {
    //1、value 是选择频道后的频道ID
    changeChannel(value) {
      if (value === "") {
        // this.channelId = null;
        // 注意这里一定是value，这是传给父组件的值
        value = null;
      }
      // 把 value 数据提交给父组件，让父组件给 reqParams.channel_id赋值
      this.$emit("input", value);
    },
    //2、 获取频道数据
    // 获取频道下拉选项数据
    async getChannelOptions() {
      // 解构是针对res的，那么res的数据结构 {data:{message:'OK',data:{channels:[]}}}
      // const {data} = res 现在：data响应主体  res.data
      // const { data: { data } } = res  现在：data具体data字段对应数据，res.data.data
      const {
        data: { data }
      } = await this.$http.get("channels");
      // this.channelOptions = [{id:'频道ID',name:'频道名称'},...]
      this.channelOptions = data.channels;
    }
  }
};
</script>

<style scoped lang='less'></style>