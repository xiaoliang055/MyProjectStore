<template>
  <div class="poc-main">
    <div class="poc-header">
     <x-header>交易明细</x-header>
     <group class="group-height" gutter="0.05rem">
      <cell class="" title="账号:" :value="account" ></cell>
      <cell class="cell" title="查询时间:" :value="queryTime" ></cell>
     </group>
    </div>
    <div class="poc-body">
      <template v-for="(item) in listInfo">
        <group class="group-list" gutter="0.05rem" :key="item.transactionTime">
          <cell title="交易时间:" :value="item.transactionTime" ></cell>
          <cell title="交易描述:" :value="item.transactionDescribe" ></cell>
          <cell title="交易金额:" :value="item.transactionMoney" ></cell>
          <cell title="余额:" :value="item.balance" ></cell>
          <cell title="对方账户:" :value="item.otherAcc" ></cell>
          <cell title="对方户名:" :value="item.otherAcctname" ></cell>
          <cell title="交易渠道:" :value="item.transactionChannel" ></cell>
          <cell title="摘要:" :value="item.abstract" ></cell>
        </group>
      </template>
    </div>
  <!--<div class="dy-footer"></div>-->
  </div>
</template>
<script>
// Todo 存单号列表
import { XHeader, Group, Cell } from 'vux'
export default{
  components: {
    XHeader,
    Group,
    Cell
  },
  data () {
    return {
      queryTime: '2018-04-01至2018-05-31',
      account: '6221 **** **** 3515',
      listInfo: [{
        transactionTime: '2018-05-22  09:09:09',
        transactionDescribe: '转账存入',
        transactionMoney: '123.00',
        balance: '391.00',
        otherAcc: '6221 **** **** 8838',
        otherAcctname: '**钱',
        transactionChannel: '手机银行渠道',
        abstract: '还款'
      }]
    }
  },
  created () {
    // 发送查询接口
    // let cardNo = this.$router.query.cardNo
    // let accno = this.$router.query.accno
    // let startDate = this.$router.query.startDateQuery
    // let endDate = this.$router.query.endDateQuery
  },
  methods: {
  }
}
</script>
<style scoped>
  .group-height{
     padding-bottom: 15px;
  }
  .group-list{
    margin-bottom: 10px;
  }
  .group-list .weui-cell:before{
    border: 0;
  }
  .group-list .weui-cell {
    padding: 5px 15px;
  }
</style>
