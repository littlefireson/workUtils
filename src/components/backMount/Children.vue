<template>
  <div>
    <div style="text-indent:2em" v-for='item in haha' :key='item.id'>{{item}}</div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        // key: value
      }
    },
    props: {
      haha: {
        type: Array,
        default: ''
      }
    },
  }
</script>

<style>

</style>
