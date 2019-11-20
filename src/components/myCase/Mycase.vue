<template>
  <div class='main'>
    <div class="table-box">
      <el-table :data="tableData" stripe>
        <el-table-column type="index" width="100">
        </el-table-column>
        <el-table-column prop="caseNo" label="案件编号">
        </el-table-column>
        <el-table-column prop="defendantName" label="被申请人" width="100">
        </el-table-column>
        <el-table-column prop="agentName" label="我的代理人" width="100">
        </el-table-column>
        <el-table-column prop="secretaryName" label="秘书" width="100">
        </el-table-column>+
        <el-table-column prop="status" label="案件状态" width="100">
        </el-table-column>
        <el-table-column prop="caseCompleteTime" label="结案时间">
        </el-table-column>
        <el-table-column prop="caseApplyTime" label="立案时间">
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="150">
        </el-table-column>

      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="8" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from "../../model/config.js";
import http from "../../model/http.js";
export default {
  data () {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 8,
      total: 0,
      token: localStorage.getItem("token")
    };
  },
  methods: {
    handleSizeChange (val) {
      this.getCaseList(val, this.pageSize, this.token);
    },
    handleCurrentChange (val) {
      this.getCaseList(val, this.pageSize, this.token);
    },
    getCaseList (pageNum, pageSize, token) {
      http
        .get("/litigant/case", {
          pageNum,
          pageSize,
          currentRole: 0,
          status,
          fifterCondition: ""
        })
        .then(res => {
          this.total = res.total;
          var arr = [];
          const statusList = {
            0: "待提交",
            1: "待审核",
            2: "立案失败",
            3: "待缴费",
            4: "答辩期",
            5: "审理期",
            6: "裁决期",
            7: "已结案",
            8: "补正期",
            9: "案件转线下",
            10: "和解中",
            11: "案件中止",
            12: "已撤案"
          };
          res.list.map((item, index) => {
            var obj = {};
            obj.key = index;
            obj.id = item.id;
            obj.orderNumber = index + 1;
            obj.caseNo = item.caseNo || "--";
            obj.defendantName = item.defendantName || "--";
            obj.proposerName = item.proposerName || "--";
            obj.secretaryName = item.secretaryName || "--";
            obj.status = statusList[item.status] || "--";
            obj.caseCompleteTime = item.caseCompleteTime || "--";
            obj.caseApplyTime = item.caseApplyTime || "--";
            obj.agentName = item.agentName || "--";
            obj.operation = ["处理案件"];
            obj.confirmStatus = item.confirmStatus;
            if ((item.status < 7 || item.status == 10) && item.status != 2) {
              obj.operation = !item.hasAgent
                ? obj.operation.concat(["委托代理"])
                : obj.operation.concat(["变更权限", "变更代理", "取消代理"]);
            } else if (item.status != 2) {
              obj.operation =
                item.status == 8 ? ["案件详情", "补正"] : ["案件详情"];
            } else if (item.status == 2) {
              obj.operation = obj.operation.concat(["删除"]);
            }
            arr.push(obj);
          });
          this.tableData = arr;
        })
        .catch(err => {
          alert(err.msg);
        });
    }
  },
  created () {
    this.getCaseList(this.pageNum, this.pageSize, this.token);
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding: 60px;
  min-height: 460px;
  background: #f8f8f8;
  .table-box {
    background: #fff;
    padding: 20px;
    .el-pagination {
      padding-top: 20px;
      text-align: center;
    }
  }
}
</style>
