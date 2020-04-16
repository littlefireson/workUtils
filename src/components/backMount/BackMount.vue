<template>
  <div class="hello">
    <!-- <button v-on:click="addList">增加</button> -->
    <p v-for="(item, key) in inputList" :key="key">
      <input type="text" v-on:change="handleChange" />
      <textarea type="text" v-on:change="handleChange"></textarea>
      <!-- <textarea name="" id="" cols="30" rows="10" v-on:change='textAreaChange'></textarea> -->
      <button v-on:click="product">生成</button>
      <button v-on:click="deleteAll">删除全部</button>
      <button @click="show">显示删除按钮</button>
    </p>

    <div
      v-for="(item, key) in list"
      :key="item.id"
      style="margin-bottom:50px;text-align:left;"
    >
      第{{ key + 1 }}笔：{{ item.sqrName }}与{{ item.bsqrName }}（身份证：{{
        item.bsqrIdCard
      }}）一案，仲裁案号：{{ item.zcCaseNo }}，执行案号：{{
        item.zxCaseNo
      }}，已于{{ item.time }}通过{{ item.fayuan }}执行回款{{
        item.amout
      }}元，回款由法院转到{{ item.sqrName }}建行卡（卡号：6217 0001 3005 0109
      023），该案件已结清，请知悉并确认。
      <br />
      附回款明细：

      <br />
      <!-- <Children v-if="item.balabala" :haha="item.balabala"></Children> -->
      <Executea :jin="item.amout" :haha="item.hahahha"></Executea>
      <p>&nbsp;&nbsp;&nbsp;</p>
      <p>&nbsp;&nbsp;&nbsp;</p>
      <p>&nbsp;&nbsp;&nbsp;</p>
      <!-- {{item.balabala}} -->
      <a v-show="showFlag" v-on:click="del(key)">删除</a>
    </div>
  </div>
</template>

<script>
import Children from "./Children.vue";
import Executea from "./Execute.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      // sqrName:'',
      // bsqrName:'',
      // bsqrIdCard:'',
      inputList: ["hahh"],
      list: JSON.parse(localStorage.getItem("list")) || [],
      obj: {},
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = !this.showFlag;
    },
    deleteAll() {
      localStorage.clear();
      this.list = [];
    },
    handleChange(v) {
      const value = v.target.value;
      console.log(value);
      debugger;
      const arr1 = value.split("\n");
      arr1.map((arr, i) => {
        // debugger;
        // const obj = {}
        if (arr !== "") {
          arr = arr.split("	");
          console.log(arr);
          this.obj.sqrName = arr[0];
          this.obj.bsqrName = arr[1];
          this.obj.bsqrIdCard = arr[2];
          this.obj.time = arr[3];
          this.obj.amout = arr[4];
          this.obj.zcCaseNo = arr[5];
          this.obj.zxCaseNo = arr[6];
          this.obj.fayuan = arr[7];

          // this.obj.balabala = arr[8];
          if (arr[8].search(/请求强制执行被执行人立即偿还/) != -1) {
            arr[8] = arr[8].replace(/"/g, "");
            var cc = arr[8].search(/请求强制执行被执行人立即偿还申请执行人/);
            var dd = arr[8].search(/2、/);
            var benjin = arr[8].slice(cc + 19, dd);
            var aa = arr[8].search(/欠款总额/);
            var bb = arr[8].search(/元；/);
            var jin = parseFloat(arr[8].slice(aa + 4, bb).replace(/,/g, ""));
            var arr1 = arr[8].split(/；/g);
            debugger;
            if (jin <= arr[4]) {
              this.obj.balabala = [
                ...arr1,
                ...[
                  `执行申请共计${jin}元，被执行人实际还款${
                    arr[4]
                  }元，已全额结清。`
                ]
              ];
            } else {
              this.obj.balabala = [
                `1、偿还基础费用${benjin} `,
                "2、剩余为部分逾期利息。"
              ];
            }
          } else if (
            arr[8].search(/由于法院目前未联系上被执行人/) != -1 ||
            arr[8].search(/终本/) != -1
          ) {
            arr[8] = arr[8].replace(/"/g, "");
            this.obj.balabala = [
              `由于法院目前未联系上被执行人，暂时只从被执行人银行账户共计划扣${
                arr[4]
              }元，本案目前已终结本次执行程序，后续发现财产后再恢复执行。`
            ];
          } else if (arr[8].search(/dataType/) != -1) {
            this.obj.hahahha = JSON.parse(arr[8]);
          }
          this.product();
        }
      });
    },
    addList() {
      this.inputList.push("hahh");
    },
    textAreaChange(v) {
      this.obj.balabala = v.target.value;
    },
    product() {
      this.list.push(this.obj);
      localStorage.setItem("list", JSON.stringify(this.list));
      this.obj = {};
    },
    del(key) {
      this.list.splice(key, 1);
      localStorage.setItem("list", JSON.stringify(this.list));
    }
  },
  components: {
    Children: Children,
    Executea: Executea
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
