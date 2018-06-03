<template>
    <div>
        <x-header title="账户绑定"></x-header>
        <div class='content'>
          <group class="group" gutter="0.05rem">
            <cell class="cell" title="微信用户：" :value="weixinId"></cell>
            <x-input title="签约账号：" placeholder="请输入签约账号" v-model="accno"></x-input>
            <popup-picker class='picker' popup-title="证件类型" title="证件类型：" :data="certList" v-model="certType" placeholder="请选择"></popup-picker>
            <x-input title="证件号码：" placeholder="请输入证件号码" v-model="certId"></x-input>
            <x-input title="签约手机：" placeholder="请输入签约手机号" v-model="mobile"></x-input>
            <x-input v-show="isGetVerifyCode === true" title="验证码：" placeholder="请输入验证码" v-model="verifyCode">
               <x-button slot="right" type="primary" @click="againVerifyCode" mini>{{count_show}}</x-button>
            </x-input>
            <cell class="cell" v-show="isGetVerifyCode === false" title="验证码：" @click.native="getVerifyCode">
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
              <div class="blue" @click="showAgreement">《成都银行微信金融服务协议》</div>
              <div class="blue" @click="showAgreement">《成都银行安全提示》</div>
          </div>
          <x-button type="primary" action-type="button" @click.native="submit">确定</x-button>
        </div>
        <toast v-model="showPositionValue" type="text" time="1200" is-show-mask :text="toastText"></toast>
    </div>
</template>

<script>
import { XHeader, XButton, Group, Cell, XInput, PopupPicker, Toast } from 'vux'

export default {
  data () {
    return {
      accno: '',
      weixinId: 'weixinId',
      certList: [['身份证', '户口本']],
      certType: ['身份证'],
      certId: '',
      mobile: '',
      verifyCode: '',
      isGetVerifyCode: false,
      checked: false,
      count: 0,
      toastText: '',
      showPositionValue: false
    }
  },
  components: {
    XHeader,
    XButton,
    Group,
    Cell,
    XInput,
    PopupPicker,
    Toast
  },
  computed: {
    count_show () {
      return this.count === 0 ? '重新获取' : `(${this.count}s)`
    }
  },
  watch: {
    count: function (val) {
      if (val > 0) {
        setTimeout(() => {
          this.count = this.count - 1
        }, 1000)
      }
    }
  },
  methods: {
    getVerifyCode () {
      if (this.mobile === '') {
        this.showToast('请输入签约手机号')
      } else {
        // 发送获取验证码接口
        this.isGetVerifyCode = true
        this.count = 60
      }
    },
    againVerifyCode () {
      if (this.count === '' || this.count === 0) {
        this.count = 60
        // 发送获取验证码接口
        // let param = {mobileNum: this.mobile, bizType: 'REGISTER'}
        // this.$request.post('common/verify_code', param, (data) => {
        //   this.count = 60
        // }, (data) => {
        //   this.count = 60
        // })
      }
    },
    submit () {
      if (this.accno === '') {
        this.showToast('请输入签约账号')
        return
      }
      if (this.certId === '') {
        this.showToast('请输入证件号码')
        return
      }
      if (!this.checked) {
        this.showToast('请勾选签约协议')
        return
      }
      // 发送签约接口
      this.$router.push('DetailsQuery')
    },
    clickCheck () {
      this.checked = !this.checked
    },
    showAgreement () {
    },
    showToast (text) {
      this.toastText = text
      this.showPositionValue = true
    },
    getCertType (text) {
      let certType = {
        '身份证': '1'
      }
      return certType[text]
    }
  }
}
</script>

<style scoped>
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
    width:13px;
    height:13px;
    border:1px solid #13bc4d;
    border-radius:2px;
  }
  .is-checked{
    width:15px;
    height:15px;
    background-color: #13bc4d;
    background:  url(../assets/image/blank_btn.png) no-repeat center center #FFF;
    background-size:100%;
  }
  .check-agreement .text{
    margin-left: 10px;
  }
  .agreement{
    text-align: left;
    margin: 0 0 20px 15px;
  }
  .weui-cell {
    text-align: left;
    padding: 15px 15px 13px 15px !important;
    font-size: 15px;
  }
  .vux-cell-box .weui-cell{
    padding: 15px 15px 13px 15px !important;
  }
</style>
