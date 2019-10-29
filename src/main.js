// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import { request } from './assets/js/ajax'
import { glbalData } from './assets/js/globalData'
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$request = request
Vue.prototype.$glbalData = glbalData

Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})