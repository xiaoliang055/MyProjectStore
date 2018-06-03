import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const AccountBinding = r => require.ensure([], () => r(require('../pages/AccountBinding')), 'AccountBinding')
const DetailsQuery = r => require.ensure([], () => r(require('../pages/DetailsQuery')), 'DetailsQuery')
const AccountDetails = r => require.ensure([], () => r(require('../pages/AccountDetails')), 'AccountDetails')
const TransactionDetails = r => require.ensure([], () => r(require('../pages/TransactionDetails')), 'TransactionDetails')
const ReserveRemittance = r => require.ensure([], () => r(require('../demo/ReserveRemittance')), 'ReserveRemittance')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AccountBinding',
      component: AccountBinding
    },
    {
      path: '/DetailsQuery',
      name: 'DetailsQuery',
      component: DetailsQuery
    },
    {
      path: '/AccountDetails',
      name: 'AccountDetails',
      component: AccountDetails
    },
    {
      path: '/TransactionDetails',
      name: 'TransactionDetails',
      component: TransactionDetails
    },
    {
      path: '/ReserveRemittance',
      name: 'ReserveRemittance',
      component: ReserveRemittance
    }
  ]
})
