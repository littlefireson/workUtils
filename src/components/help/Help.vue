<template>
  <div>
    <el-form :inline="true" class="form" ref="form" label-width="140px">
      <el-form-item label="贷款金额">
        <el-input v-model="form.mount">

        </el-input>
      </el-form-item>
      <el-form-item label="贷款期数">
        <el-input type="toNumber" v-model="form.count">

        </el-input>
      </el-form-item>
       <el-form-item label="贷款年利率">
        <el-input v-model="form.persent">

        </el-input>
      </el-form-item>
      <el-form-item label="合同签订时间">

        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>

      </el-form-item>


      <el-form-item label="逾期期数">
        <el-input v-model="form.index">

        </el-input>
      </el-form-item>
      <el-form-item label="逾期当期已还金额">
        <el-input v-model="form.yihuan">

        </el-input>
      </el-form-item>
       <el-form-item label="最后一次还款时间">
        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.date3" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="诉讼申请时间">
        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-form>
    <el-button @click="meiyue">计算还款计划表</el-button>
    <el-button v-if='btnVisible2Btn' @click="yuqi">计算罚息</el-button>
    <el-button v-if="btnVisible3Btn" @click="fuli">计算复利</el-button>

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

    <el-table :header-cell-style='cellStyle' class="table-ind" v-show='tableVisible2' :data="list2" style="width: 100%">
      <el-table-column prop="index" label="逾期期数">
      </el-table-column>
      <el-table-column prop="startTime" label="逾期开始时间">
      </el-table-column>
      <el-table-column prop="endTime" label="逾期计算至时间">
      </el-table-column>
      <el-table-column width="100" prop="dateDiff" label="时间差(天)">
      </el-table-column>
      <!-- <el-table-column prop="days" label="时间差累计(天)">
      </el-table-column> -->
      <el-table-column prop="bj" label="当期应还本息">
      </el-table-column>
      <el-table-column prop="jiner" label="当期罚息">
      </el-table-column>
      <el-table-column prop="leiji" label="罚息-累计金额">
      </el-table-column>
    </el-table>
    <el-table :header-cell-style='cellStyle' class="table-ind" v-show='tableVisible3' :data="list3" style="width: 100%">
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
      <el-table-column prop="lixileiji" label="总共应还利息">
      </el-table-column>
      <el-table-column prop="jiner" label="贷款期内每期复利">
      </el-table-column>
      <el-table-column prop="lixiHe" label="利息和逾期利息">
      </el-table-column>
      <el-table-column prop="leiji" label="累计利息复利">
      </el-table-column>
    </el-table>
    <p v-show='tableVisible3'>
      总计应还利息 = {{this.list3.length>0?this.list3[this.list3.length-1].lixileiji:''}}
    </p>
    <p v-show='tableVisible3'>
      总计应还利息 = {{this.list3.length>0?this.list3[this.list3.length-1].leiji:''}}
    </p>
     <p v-show='tableVisible2'>
      剩余应还本金={{this.shenben}}
    </p>
    <p v-show='tableVisible2'>
      罚息共计={{this.list2.length>0?this.list2[this.list2.length-1].leiji:''}}
    </p>
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
        list: [],
        index: '',
        yihuan: '',
        date3: '2016-05-01'
      },
      cellStyle: { 'user-select': 'initial' },
      huanEndTime: '',
      list2: [],
      list3: [],
      btnVisible2Btn:false,
      btnVisible3Btn:false,
      btnVisible2: false,
      btnVisible3: false,
      tableVisible1: false,
      tableVisible2: false,
      tableVisible3: false,
      shenben:''
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
      this.form.list = [];
      this.tableVisible1 = true;
      this.btnVisible2Btn = true;
      this.btnVisible3Btn = true;
      this.tableVisible2 = false;
      this.tableVisible3 = false;
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
      this.list2 = [];
      this.tableVisible2 = true;
      this.tableVisible1 = false;
      this.tableVisible3 = false;
      var zongjie = 0;
      var days = 0;
      console.log(this.form.yihuan)
      var a = this.form.list.map((item, i) => {
        if (i + 1 == this.form.index-1){
            this.shenben = item.shenBj
          }
        if (i + 1 >= this.form.index) {
          var startTime = new Date(item.date1.replace(/-/g, "/"));
          var bj = item.mBj;
          var yh = 0;


          if (i + 1 == this.form.index) {
            startTime = this.form.yihuan !=0 ?  new Date(this.form.date3.replace(/-/g, "/")) : startTime;
            bj = (item.mBj - this.form.yihuan) > 0 ? (item.mBj - this.form.yihuan).toFixed(2) : 0
            yh = this.form.yihuan
            console.log(this.shenben)
            this.shenben = (item.yBj - this.form.yihuan) > 0 ? (this.shenben - this.form.yihuan).toFixed(2):item.shenBj
          }

          startTime = startTime.getFullYear() + "-" + parseInt(startTime.getMonth() + 1) + "-" + (startTime.getDate());
          // console.log(startTime);
          var timeCha = this.dateDiff(startTime, this.form.date2);
          // days += this.dateDiff(startTime, this.form.date2)

          var jiner = timeCha* bj * this.form.persent*1.5 / 36000
          console.log(`时间差：${timeCha},${bj},${this.form.persent},${jiner}`)
          zongjie +=jiner
          this.list2.push({
            index: `第${i + 1}期`,
            startTime: startTime,
            endTime: this.form.date2,
            bj: bj,
            dateDiff: timeCha,
            jiner: (jiner).toFixed(2),
            leiji: zongjie.toFixed(2),
            // days: days
          })
        }
      })

      // localStorage.setItem('list2',JSON.stringify(this.list2));
      // this.dateDiff(this.form.list)
    }
    ,
    fuli () {
      this.list3 = [];
      this.tableVisible3 = true;
      this.tableVisible1 = false;
      this.tableVisible2 = false;
      var zongjie = 0;
      var days = 0;
      var lixiHe = 0;
      var a = this.form.list.map((item, i) => {

        if (i + 1 >= this.form.index) {
          var startTime = new Date(item.date1.replace(/-/g, "/"));
          var bj = item.yLx;
          var yh = 0;
          if (i + 1 == this.form.index) {
            startTime = this.form.yihuan !=0 ?  new Date(this.form.date3.replace(/-/g, "/")) : startTime;
            bj = (item.yBj - this.form.yihuan) >= 0 ? item.yLx: (item.mBj - this.form.yihuan).toFixed(2)
          }
          startTime = startTime.getFullYear() + "-" + parseInt(startTime.getMonth() + 1) + "-" + (startTime.getDate());
          // console.log(startTime);


          lixiHe += Math.round(bj * 100) / 100;

          var riqic = (i == this.form.list.length - 1) ? 0 : this.dateDiff(startTime, this.huanEndTime)
          // days += riqic

          var lixiweiyue = (i == this.form.list.length - 1) ? 0 : (this.dateDiff(startTime, this.huanEndTime) * bj * this.form.persent *1.5/ 100 / 360)
          console.log(this.form.persent)
          zongjie += lixiweiyue
          if (i == (this.form.list.length - 1)) {
            // console.log(this.dateDiff(this.huanEndTime, this.form.date2),lixiHe)
            console.log(`基数：${lixiHe},开始时间:${startTime},结束时间:${this.form.date2}`)
            var lixiHeLiLv = (lixiHe * this.form.persent*1.5 / 36000 * this.dateDiff(startTime, this.form.date2)).toFixed(2);
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
            // days: days,
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
.form{
  // width:400px;
  // margin:0 auto;
  // padding:20px 60px;
}
</style>
