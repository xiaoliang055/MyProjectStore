import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const AccountBinding = r => require.ensure([], () => r(require('../pages/AccountBinding')), 'AccountBinding')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/AccountBinding',
      name: 'AccountBinding',
      component: AccountBinding
    }
  ]
})
