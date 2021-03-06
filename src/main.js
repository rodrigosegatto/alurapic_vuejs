import Vue from 'vue';
import App from './App.vue';
import {routes} from './routes';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import './directives/Transform';
import msg from './pt_BR';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';
Vue.use(VueRouter);

import VeeValidate from 'vee-validate';

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
