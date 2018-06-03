<template>
  <div class="poc-main">
    <div class="poc-header">
      <x-header title="明细查询"></x-header>
      <div class="tabWrap">
        <button-tab v-model="tabSelected">
          <button-tab-item @on-item-click="tabShow = '1'">账户一览</button-tab-item>
          <button-tab-item @on-item-click="tabShow = '2'">交易明细</button-tab-item>
        </button-tab>
      </div>
    </div>
    <div class="poc-body">
      <div class="tabContent" v-show="tabShow === '1'">
        <template  v-for="(item, index) in cardInfoList">
          <group class="group cells" gutter="0" v-bind:key="item.accno">
            <cell title="我的储蓄卡">
              <x-icon type="ios-plus" class="cell-x-icon" @click="addAccount"></x-icon>
            </cell>
            <cell :title="item.accno_show" :value="item.accountType" ></cell>
            <cell title="余额" :value="item.balance" ></cell>
            <flexbox class="flexMenu">
              <flexbox-item><div class="flex-item flex-item-border" @click="btnClick('info', index)">详细信息</div></flexbox-item>
              <flexbox-item><div class="flex-item flex-item-border" @click="btnClick('week')">一周明细</div></flexbox-item>
              <flexbox-item><div class="flex-item" @click="btnClick('history')">历史明细</div></flexbox-item>
            </flexbox>
          </group>
        </template>
        <div class="warm">
          <p class="title">温馨提示:</p>
          <p>1、您可以查询指定账户的币种、余额、开户日期、账户状态等信息。</p>
        </div>
      </div>
      <div class="tabContent" v-show="tabShow === '2'">
        <group class="marginT10" gutter="0">
          <popup-picker class="f15" popup-title="请选择:" title="付款账号:" :data="cardList" v-model="cardNo" placeholder="请选择账号" ></popup-picker>
          <cell title="币种:" :value="currType" ></cell>
          <datetime v-model="startDateQuery" @on-change="changeStart" title="起始时间:"></datetime>
          <datetime v-model="endDateQuery" @on-change="changeEnd" title="终止时间:"></datetime>
          <div class="label-text color1">*查询期限为一个月</div>
          <flexbox class="flexMenu">
            <flexbox-item><div class="flex-item flex-item-border">今日明细</div></flexbox-item>
            <flexbox-item><div class="flex-item">一周明细</div></flexbox-item>
          </flexbox>
        </group>
        <x-button type="primary" class="btn" action-type="button" @click.native="gotoQuery">查询</x-button>
      </div>
    </div>
  <!--<div class="dy-footer"></div>-->
  </div>
</template>
<script>
// Todo 存单号列表
import { XHeader, ButtonTab, ButtonTabItem, Group, XInput, Cell, PopupPicker, Datetime, XButton, Flexbox, FlexboxItem } from 'vux'
export default{
  components: {
    XHeader,
    ButtonTab,
    ButtonTabItem,
    Group,
    XInput,
    Cell,
    PopupPicker,
    Datetime,
    XButton,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      cardList: [['6210 **** **** 1219', '6210 **** **** 3341', '6210 **** **** 2567']],
      tabSelected: 0,
      tabShow: '1',
      cardNo: ['6210 **** **** 1219'], // 卡号
      cardInfoList: [
        {
          accno: '',
          accno_show: '6210 **** **** 1219',
          cartType: '储蓄卡',
          balance: '23000.00',
          accountType: 'Ⅰ类'
        }
      ],
      currType: '人民币',
      startDateQuery: '2018-04-20',
      endDateQuery: '2018-05-20'
    }
  },
  created () {
    // 发送获取签约账号列表接口，返回结果处理数据
  },
  computed: {
  },
  watch: {
    $router (now, old) {
    }
  },
  methods: {
    submit (val) {
      this.tipsShow = true
    },
    gotoQuery () {
      // 跳转列表页面，在列表页面查询接口
      this.$router.push({path: 'TransactionDetails', query: {cardNo: this.cardNo[0], accno: this.accno, startDate: this.startDateQuery, endDate: this.endDateQuery}})
    },
    changeStart (val) {
      this.startDateQuery = val
    },
    changeEnd (val) {
      this.endDateQuery = val
    },
    addAccount () {
      console.log('添加银行卡')
    },
    btnClick (type, index) {
      switch (type) {
        case 'info':
          this.$router.push({path: 'AccountDetails', query: {accno: ''}})
          break
        case 'week':
          this.tabSelected = 1
          this.tabShow = '2'
          break
        case 'history':
          this.tabSelected = 1
          this.tabShow = '2'
          break
        default: break
      }
    }
  }
}
</script>

<style scoped>
  .tabContent {
    margin: 0 8px;
  }
  .tabWrap{
    padding: .5rem 1rem;
  }
  .tabWrap .vux-button-group > a.vux-button-group-current {
    background:#11ACF4;
  }
  .tabWrap .vux-button-group > a.vux-button-tab-item-first {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .tabWrap .vux-button-group > a.vux-button-tab-item-first:after {
    border: 1px solid #11ACF4;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    color: #11ACF4;
  }
  .tabWrap .vux-button-group > a.vux-button-tab-item-last {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .tabWrap .vux-button-group > a.vux-button-tab-item-last:after {
    border: 1px solid #11ACF4;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    color: #11ACF4;
  }
  .tabWrap .vux-button-group > a.vux-button-tab-item{
    font-size: 15px;
  }
  .weui-cell {
    text-align: left;
    padding: 15px 15px 13px 15px;
    font-size: 15px;
  }
  .group .weui-cell {
    text-align: left;
    padding: 10px 15px;
    font-size: 15px;
  }
  .group .weui-cell:before{
    border: 0;
  }
  .flexMenu{
    padding: 10px 0;
  }
  .flex-item{
    text-align: center;
    font-size:15px;
    color:#11ACF4;
  }
  .flex-item-border{
    border-right: 1px solid #D9D9D9;
  }
  .warm{
    padding: .36rem .3rem;
    color: #999;
    text-align: left;
  }
  .warm > P{
    padding-bottom: .27rem;
  }
</style>
