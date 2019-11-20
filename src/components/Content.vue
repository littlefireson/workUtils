<template>
    <div>
        这是新闻详情
    </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "数据"
    };
  },
  mounted() {
    console.log(this.$route.params);
  }
};
</script>

<style lang="scss" scoped>
</style>