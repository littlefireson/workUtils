<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="贷款金额">
        <el-input v-model="form.mount">

        </el-input>
      </el-form-item>
      <el-form-item label="贷款期数">
        <el-input type="toNumber" v-model="form.count">

        </el-input>
      </el-form-item>
      <el-form-item label="开始时间">

        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>

      </el-form-item>
      <el-form-item label="贷款利率">
        <el-input v-model="form.persent">

        </el-input>
      </el-form-item>
      <el-form-item label="逾期期数">
        <el-input v-model="form.index">

        </el-input>
      </el-form-item>
      <el-form-item label="逾期当期已还金额">
        <el-input v-model="form.yihuan">

        </el-input>
      </el-form-item>
      <el-form-item label="计算至时间">
        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-form>
    <el-button @click="meiyue">计算还款计划表</el-button>
    <el-button v-if='btnVisible2' @click="yuqi">计算逾期金额</el-button>
    <el-button v-if="btnVisible3" @click="fuli">计算复利</el-button>

    <el-table :header-cell-style='cellStyle' class="table-ind" v-show='tableVisible1' :data="form.list" style="width: 100%">
      <el-table-column prop="index" label="期数">
      </el-table-column>
      <el-table-column prop="date1" label="计划还款日">
      </el-table-column>
      <el-table-column prop="yBj" label="计划还本金">
      </el-table-column>
      <el-table-column prop="yLx" label="计划还利息">
      </el-table-column>
      <el-table-column prop="mBj" label="计划还总额">
      </el-table-column>
      <el-table-column prop="shenBj" label="剩余本金">
      </el-table-column>
    </el-table>

    <el-table :header-cell-style='cellStyle'  class="table-ind" v-show='tableVisible2' :data="list2" style="width: 100%">
      <el-table-column prop="index" label="逾期期数">
      </el-table-column>
      <el-table-column prop="startTime" label="逾期开始时间">
      </el-table-column>
      <el-table-column prop="endTime" label="逾期计算至时间">
      </el-table-column>
      <el-table-column width="100" prop="dateDiff" label="时间差(天)">
      </el-table-column>
      <el-table-column prop="days" label="时间差累计(天)">
      </el-table-column>
      <el-table-column prop="bj" label="当期应还本金">
      </el-table-column>
      <el-table-column prop="jiner" label="当期逾期违约金-本金">
      </el-table-column>
      <el-table-column prop="leiji" label="当期逾期违约金-累计金额">
      </el-table-column>
    </el-table>
    <el-table :header-cell-style='cellStyle'  class="table-ind" v-show='tableVisible3' :data="list3" style="width: 100%">
      <el-table-column prop="index" label="逾期期数">
      </el-table-column>
      <el-table-column prop="startTime" label="逾期开始时间">
      </el-table-column>
      <el-table-column prop="endTime" label="最后一期应还款日">
      </el-table-column>
      <el-table-column width="100" prop="dateDiff" label="天数">
      </el-table-column>
      <el-table-column prop="bj" label="当期应还利息">
      </el-table-column>
      <!-- <el-table-column prop="lixileiji" label="利息累计和">
      </el-table-column> -->
      <el-table-column prop="jiner" label="贷款期内每期复利">
      </el-table-column>
      <!-- <el-table-column prop="lixiHe" label="利息和逾期利息">
      </el-table-column> -->
      <!-- <el-table-column prop="leiji" label="累计利息复利">
      </el-table-column> -->
    </el-table>

  </div>
</template>

<script>

export default {
  data () {
    return {
      form: {
        mount: '',
        count: '',
        date1: '2016-05-01',
        date2: '',
        persent: 8.5,
        list: JSON.parse(localStorage.getItem('list1')) || [],
        index: '',
        yihuan: ''
      },
      cellStyle:{'user-select': 'initial'},
      huanEndTime: '',
      list2: [],
      list3: [],
      btnVisible2: false,
      btnVisible3: false,
      tableVisible1: false,
      tableVisible2: false,
      tableVisible3: false,
    }
  },
  computed: {
    // toNumber(res){
    //     return parseInt(res)
    // }
  },
  methods: {
    // toNumber(res){
    //     return parseInt(res)
    // },
    dateOperator (date, days, operator) {
      date = date.replace(/-/g, "/"); //更改日期格式
      var nd = new Date(date);
      var k = parseInt(days) + parseInt(nd.getMonth());
      nd.setMonth(k);
      if (nd.getMonth() + 1 < 10) {
        if (nd.getDate() < 10) {
          return nd.getFullYear() + "-0" + (nd.getMonth() + 1) + "-0" + nd.getDate();
        }
        return nd.getFullYear() + "-0" + (nd.getMonth() + 1) + "-" + nd.getDate();
      }
      if (nd.getDate() < 10) {
        return nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-0" + nd.getDate();
      }
      return nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-" + nd.getDate();
    },
    dateDiff (beginTime, endTime) {
      var dateBegin = new Date(beginTime.replace(/-/g, "/"));
      var dateEnd = new Date(endTime.replace(/-/g, "/"));//将-转化为/，使用new Date
      var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
      return Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    },
    meiyue () {
      this.tableVisible1 = true;
      this.btnVisible2 = true;
      this.btnVisible3 = true;
      const yuelilv = this.form.persent / 1200
      let Bx = (this.form.mount * yuelilv * Math.pow((1 + yuelilv), this.form.count) / (Math.pow((1 + yuelilv), this.form.count) - 1)).toFixed(2)
      var bridge = this.form.mount;
      for (var i = 0; i < this.form.count; i++) {
        var returnInterest = (bridge * yuelilv).toFixed(2);  //计算当期的应还利息
        var returnPrincipal = (Bx - returnInterest).toFixed(2);  //计算当期的应还本金
        var residualPrincipal = bridge - returnPrincipal;     //计算当期的剩余本金
        bridge = residualPrincipal;
        var date2 = this.dateOperator(this.form.date1, i + 1)
        if (i == this.form.count - 1) {
          this.huanEndTime = date2
        }
        this.form.list.push({ index: `第${i + 1}期`, mBj: Bx, shenBj: residualPrincipal.toFixed(2), yBj: returnPrincipal, yLx: returnInterest, date1: date2 })

      }
      this.$set(this.form.list, this.form.list.length - 1, { yBj: this.form.list[this.form.list.length - 2].shenBj, yLx: (Bx - this.form.list[this.form.list.length - 2].shenBj).toFixed(2), shenBj: 0, mBj: Bx, date1: this.dateOperator(this.form.date1, this.form.count), index: `第${this.form.count}期` })
    },
    yuqi () {
      this.tableVisible2 = true;
      this.tableVisible1 = false;
      this.tableVisible3 = false;
      var zongjie = 0;
      var days = 0;
      console.log(this.form.yihuan)
      var a = this.form.list.map((item, i) => {
        if (i + 1 >= this.form.index) {
          var startTime = new Date(item.date1.replace(/-/g, "/"));
          startTime = startTime.getFullYear() + "-" + parseInt(startTime.getMonth() + 1) + "-" + (startTime.getDate() + 1);
          // console.log(startTime);
          var bj = item.yBj;
          var yh = 0;
          debugger;
          if (i + 1 == this.form.index) {
            bj = (item.yBj - this.form.yihuan).toFixed(2)
            yh = this.form.yihuan
          }
          days += this.dateDiff(startTime, this.form.date2)
          zongjie += this.dateDiff(startTime, this.form.date2) * 0.1275 / 360 * bj
          this.list2.push({
            index: `第${i + 1}期`,
            startTime: startTime,
            endTime: this.form.date2,
            bj: bj,
            dateDiff: this.dateDiff(startTime, this.form.date2),
            jiner: (this.dateDiff(startTime, this.form.date2) * 0.1275 / 360 * bj).toFixed(2),
            leiji: zongjie.toFixed(2),
            days: days
          })
        }
      })

      // localStorage.setItem('list2',JSON.stringify(this.list2));
      // this.dateDiff(this.form.list)
    }
    ,
    fuli () {
      this.tableVisible3 = true;
      this.tableVisible1 = false;
      this.tableVisible2 = false;
      var zongjie = 0;
      var days = 0;
      var lixiHe = 0;
      var a = this.form.list.map((item, i) => {
        if (i + 1 >= this.form.index) {
          var startTime = new Date(item.date1.replace(/-/g, "/"));
          startTime = startTime.getFullYear() + "-" + parseInt(startTime.getMonth() + 1) + "-" + (startTime.getDate() + 1);
          // console.log(startTime);
          var bj = item.yLx;
          var yh = 0;

          lixiHe += Math.round(item.yLx * 100) / 100;

          var riqic = (i == this.form.list.length - 1) ? 0 : this.dateDiff(startTime, this.huanEndTime)
          days += riqic
          var lixiweiyue = (i == this.form.list.length - 1) ? 0 : (this.dateDiff(startTime, this.huanEndTime) * this.form.persent / 100 / 360 * bj)
          zongjie += lixiweiyue
          if (i == (this.form.list.length - 1)) {
            // console.log(this.dateDiff(this.huanEndTime, this.form.date2),lixiHe)
            var lixiHeLiLv = (lixiHe * 0.1275 / 360 * this.dateDiff(startTime, this.form.date2)).toFixed(2);
            var aa = (parseFloat(lixiHeLiLv) + parseFloat(zongjie)).toFixed(2);
          }
          this.list3.push({
            index: `第${i + 1}期`,
            startTime: startTime,
            endTime: this.huanEndTime,
            bj: bj,
            dateDiff: riqic,
            jiner: lixiweiyue.toFixed(2),
            leiji: (i == this.form.list.length - 1) ? `${aa}(${zongjie.toFixed(2)}+${lixiHeLiLv})` : zongjie.toFixed(2),
            days: days,
            lixiHe: lixiHeLiLv || 0,
            lixileiji: Math.round(lixiHe * 100) / 100
          })
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.el-table.table-ind th {
  user-select: initial;
}
</style>
