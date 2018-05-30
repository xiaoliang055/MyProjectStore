<template>
  <div class="dy-main">
    <div class="dy-header">
      <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true" :left-options="{preventGoBack:true}" @on-click-back="back">预约转账</x-header>
      <div class="tabWrap">
        <button-tab v-model="tabSelected">
          <button-tab-item @on-item-click="tabShow = '1'">我要预约</button-tab-item>
          <button-tab-item @on-item-click="tabShow = '2'">预约查询和撤销</button-tab-item>
        </button-tab>
      </div>
    </div>
    <div class="dy-body">
      <div class="tabContent" v-show="tabShow === '1'">
        <div class="title">付款方信息</div>
        <group class="group" gutter="0.05rem">
          <popup-picker class="f15" popup-title="请选择" title="付款账号" :data="cardList" v-model="cardNo" placeholder="请选择账号" ></popup-picker>
          <cell title="别名" :value="cardAlias" ></cell>
          <cell title="币种" :value="currType" ></cell>
          <x-input title="转帐金额" placeholder="输入转账金额" v-model="tranAmt" placeholder-align="right" text-align="right" ></x-input>
          <cell title="金额大写" :value="uppercaseAmt" ></cell>
        </group>
        <div class="title">收款方信息</div>
        <group class="group" gutter="0.05rem">
          <x-input title="收款人" placeholder="请输入收款人名称" v-model="payeeName" placeholder-align="right" text-align="right" ></x-input>
          <x-input title="收款人账号" placeholder="请输入收款人账号" v-model="payeeAccno" placeholder-align="right" text-align="right" ></x-input>
          <cell title="保持收款人" :value="uppercaseAmt" ></cell>
        </group>
        <div class="title">其它信息</div>
        <group class="group" gutter="0.05rem">
          <popup-picker popup-title="选择录入" title="付款用途" :data="purposeList" v-model="purpose" placeholder="请选择"></popup-picker>
          <popup-picker  title="请选择" :data="selectTypeList" v-model="selectType" placeholder="请选择"></popup-picker>
          <popup-picker  title="定时种类" :data="intervalTypeList" v-model="intervalType" placeholder="请选择"></popup-picker>
          <datetime v-model="startDate" @on-change="change" title="起始时间"></datetime>
        </group>
        <x-button type="default" class="sure" @click.native="gotoNext">下一步</x-button>
        <div class="warm">
          <p>温馨提示</p>
          <p>1、您可以对将要办理的行内转账汇款业务进行预约设置。</p>
        </div>
      </div>
      <div class="tabContent" v-show="tabShow === '2'">
        <group class="group" gutter="0.05rem">
            <popup-picker class="f15" popup-title="请选择" title="付款账号"  :data="cardList" v-model="cardNoQuery" placeholder="请选择账号" ></popup-picker>
            <popup-picker  title="定时种类" :data="intervalTypeList" v-model="intervalTypeQuery" placeholder="请选择"></popup-picker>
            <datetime v-model="startDateQuery" @on-change="changeStart" title="起始时间"></datetime>
            <datetime v-model="endDateQuery" @on-change="changeEnd" title="终止时间"></datetime>
        </group>
        <div class="title">*查询期限为一个月</div>
        <x-button type="default" class="sure" @click.native="gotoQuery">查询</x-button>
        <div class="warm">
          <p>温馨提示</p>
          <p>1、您可以查询您的预约转账记录，对尚未处理的预约转账记录进行撤销。</p>
        </div>
      </div>
    </div>
    
    <!--<div class="dy-footer"></div>-->
  </div>
</template>
<script>
// Todo 存单号列表
export default{
  data () {
    return {
      cardList: [['6210 **** **** 1219', '6210 **** **** 3341','6210 **** **** 2567']],
      purposeList: [['还款','消费','转账']],//付款用途
      selectTypeList: [['还款']],//选择种类
      intervalTypeList: [['一次','两次']],//定时种类
      purpose: ['消费'],
      selectType: ['还款'],
      intervalType:['一次'],
      intervalTypeQuery:[],
      tabSelected: 0,
      tabShow: '1',
      cardNo: ['6210 **** **** 1219'], // 卡号
      cardNoQuery: [],//查询记录是选卡
      cardAlias: '银行卡',//别名
      currType: '人民币', // 币种
      tranAmt: '1000.00', // 转出金额
      uppercaseAmt: '壹仟元',//大写金额
      payeeName: '',//收款人/
      payeeAccno: '',//收款人账号/
      startDate: '2018-05-20',
      startDateQuery: '2018-04-20',
      endDateQuery: '2018-05-20'
    }
  },
  methods: {
    back () {
      // this.ppp = '返回'
      this.$publicFun.goBack(this)
    },
    submit (val) {
      this.tipsShow = true
    },
    gotoNext () { // 1活转定 2定转活
      let that = this
      this.$router.push({path: 'ReserveRemitSure', query: {cardNo: this.cardNo[0], tranAmt: this.tranAmt, payeeName: this.payeeName, payeeAccno: this.payeeAccno,intervalType:this.intervalType[0], purpose: this.purpose[0], startDate: this.startDate}})
    },
    gotoQuery () {
      console.log('调用查询接口')
    },
    change (val){
      this.startDate = val
    },
    changeStart (val){
      this.startDateQuery = val
    },
    changeEnd (val){
      this.endDateQuery = val
    }
  }
}
</script>
<style lang="less" scoped>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .dy-main {
    width: 100%;
    height: 100%;
    font-size: .28rem;
    .dy-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2.28rem;
      .tabWrap {
        padding: .2rem 1rem;
        background-color: #f7f8fa;
        .vux-button-group > a {
          color: #ec1b30;
        }
        .vux-button-group > a.vux-button-group-current {
          color: #fff;
        }
        .vux-button-group > a.vux-button-tab-item-first {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        .vux-button-group > a.vux-button-tab-item-first:after {
          border: 1px solid #ec1b30;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
          color: #ec1b30;
        }
        .vux-button-group > a.vux-button-tab-item-last {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        .vux-button-group > a.vux-button-tab-item-last:after {
          border: 1px solid #ec1b30;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
          color: #ec1b30;
        }
        .vux-button-group > a.vux-button-group-current {
          background: #ec1b30;
        }
        .vux-button-group > a.vux-button-tab-item{
            font-size: 15px;
        }
      }
    }
    .dy-body {
      width: 100%;
      height: 100%;
      padding-top: 2.28rem;
      overflow: auto;
      .tabContent {
          .title {
            font-size: 15px;
            padding:0 0 10px 0;
            margin-left:5px;
          }
          .group {
            margin:0 0 10px 0;
          }
          .weui-cell {
            padding: 13px 15px;
            font-size: 15px;
          }
          .vux-cell-box{
              font-size:15px;
          }
      }
    }
    .sure{
      line-height:0.88rem;
      width:6.9rem;
      margin-top: 0.49rem;
      background: #EC1B30;
      font-size: 0.3rem;
      border-radius: 0.06rem;
      color: white;
      &.forbiden{
        opacity: .5;
      }
    }
    .warm{
      width: 100%;
      padding: .36rem .3rem;
      color: #999;
      &>p{
        padding-bottom: .27rem;
      }
    }
  }

</style>

