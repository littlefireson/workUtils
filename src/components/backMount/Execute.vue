<template>
  <div>
    <div style="text-indent: 40px;">
      1、请求强制执行被执行人立即偿还申请执行人{{ totalAmount }}元（本金{{
        principal
      }}元 + 利息{{ interest }}元 + 仲裁费{{ arbiFee }}元）；
    </div>
    <div style="text-indent: 40px;">
      2、请求强制执行被执行人偿还申请执行人自{{ beginTime }}起至{{
        endTime
      }}的逾期利息{{ overdueInterest1 }}元（以人民币{{
        principal
      }}元为本金，以年利率{{ yearRate }}%标准，支付至实际给付之日止）；
    </div>
    <div style="text-indent: 40px;">
      3、请求强制执行被执行人偿还申请执行人自{{ endTime }}起至{{
        now
      }}的逾期利息{{ overdueInterest2 }}元（以人民币{{
        principal
      }}元为本金，以年利率{{ yearRate }}%标准，支付至实际给付之日止）；
    </div>
    <div style="text-indent: 40px;">
      4、请求强制执行被执行人偿还申请执行人自{{ endTime }}起至{{
        now
      }}的未按裁决书指定期间履行给付义务的加倍债务利息{{
        debtInterest
      }}元（暂以人民币{{
        sum1
      }}元为基数，以日利率万分之一点七五标准，基数会随申请事项第3项金额变化而变化，并请求被执行人支付至实际给付之日止）；
    </div>
    <div style="text-indent: 40px;">
      5、请求强制执行被执行人偿还欠款总额{{ sum2 }}元；
    </div>
    <div style="text-indent: 40px;">
      6、由被执行人承担本案申请执行费用。
    </div>
    <div v-if='this.jin>sum2'>
      执行申请共计{{ sum2 }}元，被执行人实际还款{{this.jin}}元，已全额结清。
    </div>
    <div v-if='this.jin>totalAmount'>
      1、偿还基础费用{{totalAmount}}元<br/>
      2、剩余为部分逾期利息。
    </div>
    <div v-if='this.jin<totalAmount'>
      由于法院目前未联系上被执行人，暂时只从被执行人银行账户共计划扣{{this.jin}}元，本案目前已终结本次执行程序，后续发现财产后再恢复执行。
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // key: value
      principal: "",
      interest: "",
      arbiFee: "",
      overdueBeginTime: "",
      overdueRateYear: "",
      judgeDocDate: "",
      term: "",
      applyExecuteDate: ""
    };
  },
  computed: {
    totalAmount: function() {
      return this.principal + this.interest + this.arbiFee;
    },
    yearRate: function() {
      return this.overdueRateYear * 100;
    },
    beginTime: function() {
      return this.formatter(this.overdueBeginTime);
    },
    endTime: function() {
      return this.formatter(
        this.dateOperator(this.judgeDocDate, this.term + 1)
      );
    },
    sum1: function() {
      return (
        this.toNumber(this.totalAmount) +
        this.toNumber(this.overdueInterest1) +
        this.toNumber(this.overdueInterest2)
      ).toFixed(2);
    },
    now: function() {
      return this.formatter(this.applyExecuteDate);
    },
    overdueInterest1: function() {
      return (
        ((this.dateDiff(
          this.overdueBeginTime,
          this.dateOperator(this.judgeDocDate, this.term + 1)
        ) *
          this.overdueRateYear) /
          360) *
        this.principal
      ).toFixed(2);
    },
    overdueInterest2: function() {
      return (
        ((this.dateDiff(
          this.dateOperator(this.judgeDocDate, this.term + 1),
          this.applyExecuteDate
        ) *
          this.overdueRateYear) /
          360) *
        this.principal
      ).toFixed(2);
    },
    debtInterest: function() {
      console.log((this.dateDiff(
        this.dateOperator(this.judgeDocDate, this.term + 1),
        this.applyExecuteDate
      )));
       console.log(this.sum1);
      return (((this.dateDiff(
        this.dateOperator(this.judgeDocDate, this.term + 1),
        this.applyExecuteDate
      ) *
        0.000175)) *
        this.sum1).toFixed(2);

    },
    sum2: function() {
      return (parseFloat(this.sum1) + parseFloat(this.debtInterest) ).toFixed(2);
    }
  },
  mounted() {
    this.haha.map((item, i) => {
      if (item.name === "principal") {
        //本金
        this.principal = this.toNumber(item.value);
      } else if (item.name === "interest") {
        //利息
        this.interest = this.toNumber(item.value);
      } else if (item.name === "arbiFee") {
        //仲裁费
        this.arbiFee = this.toNumber(item.value);
      } else if (item.name === "overdueBeginTime") {
        //"逾期利息开始计算时间"
        this.overdueBeginTime = item.value;
      } else if (item.name === "overdueRateYear") {
        //"逾期年利率"
        this.overdueRateYear = this.toNumber(item.value);
      } else if (item.name === "judgeDocDate") {
        //裁决书下发日期
        this.judgeDocDate = item.value;
      } else if (item.name === "term") {
        //"履行期"
        this.term = this.toNumber(item.value);
      } else if (item.name === "applyExecuteDate") {
        //""申请执行日期""
        this.applyExecuteDate = item.value;
      }
      console.log(item);
    });
    if(this.jin<this.totalAmount){

    }
  },
  props: {
    haha: {
      type: Array,
      default: []
    },
    jin:{
      type:String,
      default:''
    }
  },
  methods: {
    toNumber(val) {
      return parseFloat(val);
    },
    dateDiff(beginTime, endTime) {
      var dateBegin = new Date(beginTime.replace(/-/g, "/"));
      var dateEnd = new Date(endTime.replace(/-/g, "/")); //将-转化为/，使用new Date
      var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
      return Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    },
    formatter(da) {
      da = new Date(da);
      var year = da.getFullYear() + "年";
      var month = da.getMonth() + 1 + "月";
      var date = da.getDate() + "日";
      return [year, month, date].join("");
    },
    dateOperator(date, days, operator) {
      date = date.replace(/-/g, "/"); //更改日期格式
      var nd = new Date(date);

      var k = parseInt(days) + parseInt(nd.getDate());
      nd.setDate(k);
      if (nd.getMonth() + 1 < 10) {
        if (nd.getDate() < 10) {
          return (
            nd.getFullYear() + "-0" + (nd.getMonth() + 1) + "-0" + nd.getDate()
          );
        }
        return (
          nd.getFullYear() + "-0" + (nd.getMonth() + 1) + "-" + nd.getDate()
        );
      }
      if (nd.getDate() < 10) {
        return (
          nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-0" + nd.getDate()
        );
      }
      return nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-" + nd.getDate();
    }
  }
};
</script>

<style>
</style>
