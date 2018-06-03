<template>
  <div class="poc-main">
    <div class="poc-header">
     <x-header>详细信息</x-header>
    </div>
    <div class="poc-body">
        <group gutter="0.05rem">
            <cell title="账号:" :value="account" ></cell>
            <cell title="存款类型:" :value="depositType" ></cell>
            <cell title="账面余额:" :value="accountBalance" ></cell>
            <cell title="可用余额:" :value="availableBalance" ></cell>
            <cell title="开户日期:" :value="openAccDate" ></cell>
            <cell title="账户状态:" :value="accountStatus" ></cell>
        </group>
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
      account: '6221 **** **** 8838',
      accno: '',
      depositType: '活期/人民币',
      accountBalance: '123.00',
      availableBalance: '391.00',
      openAccDate: '2018-05-03',
      accountStatus: '活动'
    }
  },
  created () {
    this.accno = this.$router.query.accno
    // 请求账户详情接口
  },
  methods: {
  }
}
</script>
<style scoped>
  .weui-cell {
    text-align: left;
    padding: 15px 15px 13px 15px !important;
    font-size: 15px;
  }
</style>
