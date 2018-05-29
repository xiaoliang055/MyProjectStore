<template>
    <div>
        <x-header title="账户绑定"></x-header>
        <div class='content'>
          <group class="group">
            <cell class="cell" title="微信用户：" :value="weixinId"></cell>
            <x-input title="签约账号：" placeholder="请输入签约账号" v-model="accno"></x-input>
            <popup-picker class='picker' popup-title="证件类型" title="证件类型：" :data="certList" v-model="certType" placeholder="请选择"></popup-picker>
            <x-input title="证件号码：" placeholder="请输入证件号码" v-model="certId"></x-input>
            <x-input title="签约手机：" placeholder="请输入签约手机号" v-model="accno"></x-input>
            <x-input v-show="isGetVerifyCode" title="验证码：" placeholder="请输入验证码" v-model="verifyCode"></x-input>
            <cell class="cell" v-show="!isGetVerifyCode" title="验证码：" @click.native="getVerifyCode">
              <div>
                <span class="color1">点击此处获取短信验证码</span>
              </div>
            </cell>
          </group>
          <div class="check-agreement">
              <div :class="checked ? 'is-checked':'not-check'" @click="clickCheck"></div>
              <div class="text">我已经阅读并同意</div>
          </div>
          <div class="agreement">
              <div class="green" @click="showAgreement">《成都银行微信金融服务协议》</div>
              <div class="green" @click="showAgreement">《成都银行安全提示》</div>
          </div>
          <x-button type="primary" action-type="button" @click.native="submit">确定</x-button>
        </div>
    </div>
</template>

<script>
import { XHeader, XButton, Group, Cell, XInput, PopupPicker } from 'vux'

export default {
  data () {
    return {
      accno: '',
      weixinId: 'weixinId',
      certList: [['身份证', '户口本']],
      certType: ['身份证'],
      certId: '',
      verifyCode: '',
      isGetVerifyCode: false
    }
  },
  components: {
    XHeader,
    XButton,
    Group,
    Cell,
    XInput,
    PopupPicker
  },
  methods: {
    getVerifyCode () {
      alert(2)
      this.isGetVerifyCode = true
    },
    submit () {
      alert(1)
    }
  }
}
</script>

<style>
  .content{
    margin: 0 8px;
  }
  .group{
    background-color: white;
    border-radius: 5px;
  }
  .group .weui-cells{
    border-radius: 5px;
  }
  .check-agreement{
    display: flex;
    display: -webkit-flex;
    align-items:center;
    justify-content:flex-start;
    margin:20px 0 0 0;
  }
  .not-check{
    width:15px;
    height:15px;
    border:1px solid #13bc4d;
    border-radius:2px;
  }
  .is-checked{
    width:15px;
    height:15px;
    background:  url(../assets/image/blank_btn.png) no-repeat center center #FFF;
    background-size:100%;
  }
  .check-agreement .text{
    margin-left: 10px;
  }
  .agreement{
    text-align: left;
    margin: 0 0 10px 15px;
  }
  .weui-cell {
    text-align: left;
    padding: 15px 15px 13px 15px !important;
    font-size: 15px;
  }
  .cell .vux-cell-primary{
    width: 6em;
    flex: none !important;
  }
  .picker .weui-label{
    width: 6em !important;
  }
  .picker .vux-popup-picker-select{
    text-align: left !important;
  }
  .vux-cell-box{
    font-size:15px;
  }
  .color1{
    color:coral;
  }
  .green{
    color:#13bc4d;
  }
</style>
