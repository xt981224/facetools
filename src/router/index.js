import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// layout
import Layout from 'views/layout/Layout';
import AppMain from 'views/layout/AppMain';

// login
import Login from 'views/login';

// menus
import menus from 'views/menus';
import createMenu from 'views/menus/createMenu';

// accounts
import accounts from 'views/accounts';
import createAccount from 'views/accounts/createAccount';
import modifyAccount from 'views/accounts/modifyAccount';
import modifyPassword from 'views/accounts/modifyPassword';
import resetPassword from 'views/accounts/resetPassword';

// roles
import roles from 'views/roles';
import createRole from 'views/roles/createRole';

// clients
// import clients from 'views/clients';
// import clientInfos from 'views/clients/clientInfos';
// import clientLevels from 'views/clients/clientLevels';
// import createLevels from 'views/clients/createLevels';
//shipper
// import shipper from 'views/shipper';
// import shipperList from 'views/shipper/ShipperList';
// import addShipper from 'views/shipper/addShipper';
// import shipperInfo from 'views/shipper/shipperInfo'
// import updateShipper from 'views/shipper/updateShipper'


// dashboard
import Dashboard from 'views/dashboard';
import confirmBind from 'views/dashboard/ceshi';
// vehicle
// import vehicleList from 'views/vehicle/vehicleList';
// import createdVehicle from 'views/vehicle/createdVehicle';
// import vehicleInfo from 'views/vehicle/vehicleInfo';
// import updateVehicle from 'views/vehicle/updateVehicle';

// drives
// import drivers from 'views/drivers';
// import driverInfo from 'views/drivers/driverInfo';
// // import vehicleInfo from 'views/drivers/vehicleInfo'
// // import driversEditInfo from 'views/drivers/editInfo'
// import vehicleLocation from 'views/drivers/vehicleLocation';
// // carrier
// import carrierList from 'views/carrier/carrierList';
// import createCarrier from 'views/carrier/createCarrier';

// import carrierInfo from 'views/carrier/carrierInfo';
// import updateCarrier from 'views/carrier/updateCarrier';
// // import driversOrders from 'views/drivers/orders'
// // import driversOrdersPayStatus from 'views/drivers/orders/payStatus'
// // import driversOrdersComment from 'views/drivers/orders/comment'
// // import driversOrdersLocation from 'views/drivers/orders/location'

// // brands
// import brands from 'views/brands';
// import createBrand from 'views/brands/createBrand';
// import modifyBrand from 'views/brands/modifyBrand';
// import brandInfo from 'views/brands/brandInfo';

// delivery配送列表
// import deliveryList from 'views/delivery/deliveryList';
// import deliveryinfo from 'views/delivery/deliveryinfo';
// colors
// import colors from 'views/colors';
// import createColor from 'views/colors/createColor';
// import modifyColor from 'views/colors/modifyColor';
// import colorInfo from 'views/colors/colorInfo';

// oilCards
// import oilCards from 'views/oilCards'
// import oilCardscreateCard from 'views/oilCards/createCard'

// orders
// import orders from 'views/orders';
// import orderDetail from 'views/orders/orderDetail';
// import orderslist from 'views/orders/ordersList';
// import submitOrderUserPrice from 'views/orders/submitOrderUserPrice';
// import createDelivery from 'views/orders/createDelivery';
// import createDelivery2 from 'views/orders/createDelivery2';
// import updateweight from 'views/delivery/updateweight';

// price
// import prices from 'views/prices';
// import createPrice from 'views/prices/createPrice';

// route
// import routes from 'views/routes';
// import createRoute from 'views/routes/createRoute';
// 工器具
import index from 'views/gqjgl/index';
// import addgqjgl from 'views/gqjgl/addgqjgl';
import addgqjgl from 'views/gqjgl/addTool';
import toolsinfo from 'views/gqjgl/ToolInfo';




// 人员出入
// import ryadd from 'views/rygl/ryadd';
import ryadd from 'views/rygl/ryadd2';

import addWorkLogH5 from 'views/rygl/addWorkLogH5';

import workLogPage from 'views/rygl/workLogPage';
import workloginfo from 'views/rygl/workloginfo';
import retriveworklog from 'views/rygl/retriveworklog';

import deviceentry from 'views/rygl/deviceentry';


// 人员管理

import indexfaceuser from 'views/faceuser/index';
import faceuserinfo from 'views/faceuser/faceuserinfo';
import updatetime from 'views/faceuser/updateTime';
import dyfaceinfo from 'views/faceuser/dyfaceInfo';

import indexlist from 'views/device/index';




// error page
import Err404 from 'views/error/404';
import Err403 from 'views/error/403';

// error log
// import ErrLog from 'views/errlog'

export const constantRouterMap = [
  {
    path: '/addWorkLogH5/:id*',
    component: addWorkLogH5,
    hidden: true,
  },
  {
    path: '/login',
    component: Login,
    name: '登录',
    hidden: true
  },
  {
    path: '/404',
    component: Err404,
    hidden: true
  },
  {
    path: '/403',
    component: Err403,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'confirmBind',
        component: confirmBind
      }
    ]
  },
];

export default new Router({
  mode: 'history',
  base: '/all',
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/competence',
    component: Layout,
    name: '权限管理',
    icon: 'mobankuangjia',
    children: [
      {
        path: '/menus',
        component: AppMain,
        redirect: '/menus/index',
        noDropdown: true,
        meta: {
          codes: ['menus']
        },
        children: [
          {
            path: 'index',
            component: menus,
            name: '菜单管理',
            meta: {
              codes: ['menus']
            }
          },
          {
            path: 'createMenu',
            component: createMenu,
            hidden: true,
            name: '新增菜单',
            meta: {
              codes: ['menus:create']
            }
          },
          {
            path: 'modifyMenu/:id*',
            component: createMenu,
            hidden: true,
            name: '修改菜单',
            meta: {
              codes: ['menus:modify']
            }
          },
          {
            path: '#',
            component: AppMain,
            hidden: true,
            name: '删除菜单',
            meta: {
              codes: ['menus:delete']
            }
          }
        ]
      },
      {
        path: '/accounts',
        component: AppMain,
        redirect: '/accounts/index',
        noDropdown: true,
        meta: {
          codes: ['accounts']
        },
        children: [
          {
            path: 'index',
            component: accounts,
            name: '账号管理',
            meta: {
              codes: ['accounts']
            },
            hidden: true
          },
          {
            path: 'createAccount',
            component: createAccount,
            name: '新增账号',
            meta: {
              codes: ['accounts:create']
            },
            hidden: true
          },
          {
            path: 'modifyAccount/:id*',
            component: modifyAccount,
            name: '修改账号',
            meta: {
              codes: ['accounts:modify']
            },
            hidden: true
          },
          {
            path: 'modifyPassword/:id*',
            component: modifyPassword,
            name: '修改密码',
            hidden: true
          },
          {
            path: 'resetPassword/:id*',
            component: resetPassword,
            name: '账号重置密码',
            meta: {
              codes: ['accounts:resetPassword']
            },
            hidden: true
          }
        ]
      },
      {
        path: '/roles',
        component: AppMain,
        redirect: '/roles/index',
        noDropdown: true,
        meta: {
          codes: ['roles']
        },
        children: [
          {
            path: 'index',
            component: roles,
            name: '角色管理',
            meta: {
              codes: ['roles']
            }
          },
          {
            path: 'createRole',
            component: createRole,
            name: '新增角色',
            meta: {
              codes: ['roles:create']
            },
            hidden: true
          },
          {
            path: 'modifyRole/:id*',
            component: createRole,
            name: '修改角色',
            meta: {
              codes: ['roles:modify']
            },
            hidden: true
          },
          {
            path: '#',
            component: AppMain,
            hidden: true,
            name: '删除角色',
            meta: {
              codes: ['roles:delete']
            }
          }
        ]
      }
    ]
  },
  {
    path: "/gqjgl",
    component: Layout,
    redirect: "/gqjgl/index",
    name: "工器具管理",
    icon: "jiesuan",
    meta: {
      codes: ["delivery:deliveryList"],
    },
    children: [
      {
        path: "index",
        component: index,
        name: "工器具列表",
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      {
        path: "addgqjgl",
        component: addgqjgl,
        name: "新增工器具",
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      {
        path: "toolsinfo/:id*",
        component: toolsinfo,
        name: "工器具详情",
        hidden: true,
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
    ]
  },
  {
    path: "/rygl",
    component: Layout,
    redirect: "/rygl/list",
    name: "出入登记管理",
    icon: "jiesuan",
    meta: {
      codes: ["delivery:deliveryList"],
    },
    children: [
      {
        path: "index/:id*",
        component: ryadd,
        name: "进入登记",
        hidden: true,
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      {
        path: "deviceentry/list",
        component: deviceentry,
        name: "刷卡记录",
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      {
        path: "list",
        component: workLogPage,
        name: "出入登记列表",
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      {
        path: "workloginfo/:id*",
        component: workloginfo,
        name: "人员详情",
        hidden: true,
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      {
        path: "retriveworklog/:id*",
        component: retriveworklog,
        name: "撤销人员",
        hidden: true,
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
    ]
  },
  {
    path: "/dyfaceinfo",
    component: dyfaceinfo,
    name: "打印详情",
    hidden: true,

    meta: {
      codes: ["delivery:deliveryList"],
    },
  },
  {
    path: "/faceuser",
    component: Layout,
    redirect: "/faceuser/list",
    name: "人员管理",
    icon: "jiesuan",
    meta: {
      codes: ["delivery:deliveryList"],
    },
    children: [
      {
        path: "list",
        component: indexfaceuser,
        name: "人员列表",
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      {
        path: "updatetime",
        component: updatetime,
        name: "编辑授权时间",
        hidden: true,
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      
      {
        path: "faceinfo/:id*",
        component: faceuserinfo,
        name: "人员详情",
        hidden: true,
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      
    ]
  },
  {
    path: "/device",
    component: Layout,
    redirect: "/erweima/list",
    name: "二维码管理",
    icon: "jiesuan",
    meta: {
      codes: ["delivery:deliveryList"],
    },
    children: [
      {
        path: "list",
        component: indexlist,
        name: "二维码列表",
        meta: {
          codes: ["delivery:deliveryList"],
        },
      },
      
      
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];
