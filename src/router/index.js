import Vue from 'vue';
import Router from 'vue-router';

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const Home = r => require.ensure([], () => r(require('../components/common/Home')), 'Home')
const index = r => require.ensure([], () => r(require('../components/page/index')), 'index')

const article = r => require.ensure([], () => r(require('../components/page/article')), 'article')

const member = r => require.ensure([], () => r(require('../components/page/jurisdiction/member')), 'member')
const group = r => require.ensure([], () => r(require('../components/page/jurisdiction/group')), 'group')
const permissions = r => require.ensure([], () => r(require('../components/page/jurisdiction/permissions')), 'permissions')
const peoplemanagement = r => require.ensure([], () => r(require('../components/page/jurisdiction/peoplemanagement')), 'peoplemanagement')
const jurisdictionList = r => require.ensure([], () => r(require('../components/page/jurisdiction/jurisdictionList')), 'jurisdictionList')

const login = r => require.ensure([], () => r(require('../components/login/login')), 'login')

const modifyPwd = r => require.ensure([], () => r(require('../components/page/jurisdiction/modifyPwd')), 'modifyPwd')

const servePay = r => require.ensure([], () => r(require('../components/page/service/servePay')), 'servePay')
// const serve = r => require.ensure([],()=>r(require('../components/page/service/serveList')),'serveList')
// const serve = r => require.ensure([], () => r(require('../components/page/service/serve')), 'serve')
const qualification = r => require.ensure([], () => r(require('../components/page/service/qualification')), 'qualification')
const service = r => require.ensure([], () => r(require('../components/page/service/service')), 'service')
const qualificationDetail = r => require.ensure([], () => r(require('../components/page/service/qualificationDetail')), 'qualificationDetail')
const access = r => require.ensure([], () => r(require('../components/page/service/access')), 'access')

const account = r => require.ensure([], () => r(require('../components/page/account/account')), 'account')


Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: '/',
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '',
      component: index
    }, {
      path: '/index',
      component: index
    }, {
      path: '/member',
      component: member
    }, {
      path: '/group',
      component: group,
    }, {
      path: '/group/permissions',
      component: permissions
    }, {
      path: '/group/peoplemanagement',
      component: peoplemanagement
    }, {
      path: '/jurisdictionList',
      component: jurisdictionList
    },
      {
        path: '/modifyPwd',
        component: modifyPwd
      },
      {
        path: '/servePay',
        component: servePay
      }, {
        path: '/service',
        component: service
      }, {
        path: '/qualification',
        component: qualification
      }, {
        path: '/qualificationDetail',
        component: qualificationDetail
      }, {
        path: '/account',
        component: account
      }, {
        path: '/access',
        component: access
      }]
  }, {
    path: '/login',
    component: login
  }]
})
