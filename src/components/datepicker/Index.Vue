<template>
  <div>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker v-model="value1" @change='daterange' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div>{{daysDiff}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',daysDiff:''
    }
  },
  methods: {
     dateDiff (beginTime, endTime) {
      var dateBegin = new Date(beginTime);
      var dateEnd = new Date(endTime);//将-转化为/，使用new Date
      var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
      return Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    },
    daterange() {
      this.daysDiff =  this.dateDiff(this.value1[0],this.value1[1])
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
