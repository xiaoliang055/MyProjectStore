// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import { MessageBox, Indicator } from 'mint-ui'

// axios.defaults.withCredentials = true

var gcParam = {
  status: false,
  xAuthToken: '',
  params: {
    faceFlag: '',
    cardFlag: '',
    scCodeFlag: '',
    pwdKey: '',
    bussPubKey: ''
  }
}
// var gcParam = {
//   status: 200,
//   params: {
//     faceFlag: '云从',
//     cardFlag: '旷视',
//     scCodeFlag: '百融',
//     pwdKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlq9XF3300dMlNtkSFVAveJThOjiM7oYB51gCyZ5PqHg4VMyP3un7aq3qGetVYDKdBxTM7lZZCVW3TTS7zkYzuapf6oRmfI7U0d1DS2hVw0XEgnx67PfqXCAMYsl1V+lO71Tb3pUDhd+/Zj6E1vti6E3BV0es37hvEcjkKd+DvIQIDAQAB',
//     bussPubKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlq9XF3300dMlNtkSFVAveJThOjiM7oYB51gCyZ5PqHg4VMyP3un7aq3qGetVYDKdBxTM7lZZCVW3TTS7zkYzuapf6oRmfI7U0d1DS2hVw0XEgnx67PfqXCAMYsl1V+lO71Tb3pUDhd+/Zj6E1vti6E3BV0es37hvEcjkKd+DvIQIDAQAB'
//   }
// }

var showAlert = function (data, cb) {
  MessageBox({title: '提示', message: data.status + ': ' + data.message, closeOnClickModal: false})
  cb(data)
}
// var dateFormat = function (value, fmt) {
//   var o = {
//     'M+': value.getMonth() + 1, // 月份
//     'd+': value.getDate(), // 日
//     'h+': value.getHours(), // 小时
//     'm+': value.getMinutes(), // 分
//     's+': value.getSeconds(), // 秒
//     'q+': Math.floor((value.getMonth() + 3) / 3), // 季度
//     'S': value.getMilliseconds() // 毫秒
//   }
//   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
//   for (var k in o) {
//     if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
//   }
//   return fmt
// }

// 获取公共参数请求
var webPostConsultPassword = function (param, success, error) {
  // console.log('获取公共参数请求')
  var option = {
    method: 'post',
    url: 'common/params',
    data: {},
    headers: {
      'X-Channel-Id': 'CHN5580001'
    }
  }
  axios(option).then(function (response) {
    var data = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
    if (data.status === 200) {
      gcParam.status = true
      gcParam.params = data.data
      success()
    } else {
      showAlert(data, error)
    }
  }).catch(function (data) {
    Indicator.close()
    showAlert({status: 'gcGetError', message: '获取公共参数错误'}, error)
    console.log(data)
  })
}

// 普通通信请求
var webPost = function (action, param, success, error) {
  // 公共参数未获取
  if (!gcParam.status) {
    // 获取公共参数请求
    webPostConsultPassword({}, function (data) {
      // 获取公共参数成功
      webPost(action, param, success, error)
    }, function (data) {
      error(data)
    })
    return
  }
  // console.log('普通通信请求')
  var option = {
    method: 'post',
    url: action,
    data: param,
    headers: {
      'X-Channel-Id': 'CHN5580001'
    }
  }
  if (gcParam.xAuthToken) {
    option.headers['X-Auth-Token'] = gcParam.xAuthToken
  }
  // 会话状态正常
  axios(option).then(function (response) {
    var data = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
    if (data.status === 200) {
      if ((action === 'user/login') || (action === 'user/auto_login' && data.data && data.data.isPass === '1')) {
        gcParam.xAuthToken = response.headers['x-auth-token']
      }
      success(data.data)
    } else {
      showAlert(data, error)
    }
  }).catch(function (data) {
    Indicator.close()
    showAlert({errCode: 'normalGetError', errMsg: '普通请求错误'}, error)
    console.log(data)
  })
}

// 初始化BaseUrl
var baseUrl = '/alphafin_loan/api/v1/'
var http = {}
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.url = baseUrl + config.url
  Indicator.open()
  return config
})
axios.interceptors.response.use(function (response) {
  // Do something before response is receive
  Indicator.close()
  return response
})
http.consultPassword = webPostConsultPassword
http.post = webPost
http.gcParam = gcParam
Vue.prototype.$request = http

export default {
  http
}

