<template>
  <div class="page">
    <header>page-header</header>
    <div class="content">
      <!-- 具名插槽 -->
      <slot name="content" :info="msg" abc="100"></slot>
    </div>
    <footer>
      <!-- 具名插槽 -->
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: '组件内部数据'
    }
  }
}
</script>

<style>

</style>
