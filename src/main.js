// vue module
import Vue from "vue";
import router from "./router";
import store from "./store";
import { getToken } from "utils/auth";

// Progress&style
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Moment from "moment";
Vue.prototype.moment = Moment;
// element depend
import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
import 'element-ui/lib/theme-default/index.css'

import "assets/custom-theme/index.css";

// global css reset
import "styles/index.less";
// import 'assets/iconfont'

// tree-grid
import ElTreeGrid from "element-tree-grid";
Vue.component(ElTreeGrid.name, ElTreeGrid);

// silentbox
import Silentbox from "vue-silentbox";

// assets
import Waves from "vue-directive-waves";
import IconSvg from "components/Icon-svg";

import "../src/utils/filters";

import App from "./App";

Vue.component("icon-svg", IconSvg);
Vue.use(ElementUI);
Vue.use(Waves);
Vue.use(Silentbox);

// permissiom judge
function hasPermission(codes, permissioncodes) {
  if (!permissioncodes) return true;
  return codes.some((role) => permissioncodes.indexOf(role) >= 0);
}

// register global progress
const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  // alert(to.path)
  NProgress.start();
  if(to.path ==='/addWorkLogH5'){
     next();
 }else {
    if (getToken()) {
      if (to.path === "/login") {
        next({
          path: "/",
        });
      } else {
        if (store.getters.codes.length === 0) {
          store
            .dispatch("GetInfo")
            .then((res) => {
              const codes = res.data.permCodes;
              // button control
              Vue.directive("handle", {
                bind: (el, binding) => {
                  // console.log(vnode)
                  if (codes.indexOf(binding.value) < 0) {
                    el.style.display = "none";

                  }
                },
              });
              store
                .dispatch("GenerateRoutes", {
                  codes,
                })
                .then(() => {
                    router.addRoutes(store.getters.addRouters);
                    next({...to});
                 
                });
            })
            .catch(() => {
              store.dispatch("FedLogOut").then(() => {
                next({
                  path: "/login",
                });
              });
            });
        } else {
          if (hasPermission(store.getters.codes, to.meta.role)) {
            next();
          } else {
            next({
              path: "/401",
              query: {
                noGoBack: true,
              },
            });
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        NProgress.done();
        next("/login");
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  ...App,
});
