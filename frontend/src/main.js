import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueRouter from "vue-router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => {
      return import("./components/HomeContainer.vue");
    }
  },
  {
    path: "/what",
    name: "what",
    component: () => {
      return import("./components/WhatContainer.vue");
    }
  },
  {
    path: "/:id",
    name: "home",
    component: () => {
      return import("./components/HomeContainer.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

new Vue({
  router,
  store,
  vuetify,
  Vuex,
  render: h => h(App)
}).$mount("#app");
