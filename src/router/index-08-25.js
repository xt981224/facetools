import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// layout
import Layout from 'views/layout/Layout'
import AppMain from 'views/layout/AppMain'

// login
import Login from 'views/login'

// menus
import menus from 'views/menus'
import createMenu from 'views/menus/createMenu'

// accounts
import accounts from 'views/accounts'
import createAccount from 'views/accounts/createAccount'
import modifyAccount from 'views/accounts/modifyAccount'
import modifyPassword from 'views/accounts/modifyPassword'
import resetPassword from 'views/accounts/resetPassword'

// roles
import roles from 'views/roles'
import createRole from 'views/roles/createRole'

// clients
import clients from 'views/clients'
import clientInfos from 'views/clients/clientInfos'
import clientOrders from 'views/clients/clientOrders'

// dashboard
import Dashboard from 'views/dashboard'

// drives
import drivers from 'views/drivers'
import driverInfo from 'views/drivers/driverInfo'
import vehicleInfo from 'views/drivers/vehicleInfo'
import driversEditInfo from 'views/drivers/editInfo'
import vehicleLocation from 'views/drivers/vehicleLocation'

import driversOrders from 'views/drivers/orders'
import driversOrdersPayStatus from 'views/drivers/orders/payStatus'
import driversOrdersComment from 'views/drivers/orders/comment'
import driversOrdersLocation from 'views/drivers/orders/location'

// brands
import brands from 'views/brands'
import createBrand from 'views/brands/createBrand'
import modifyBrand from 'views/brands/modifyBrand'
import brandInfo from 'views/brands/brandInfo'

// colors
import colors from 'views/colors'
import createColor from 'views/colors/createColor'
import modifyColor from 'views/colors/modifyColor'
import colorInfo from 'views/colors/colorInfo'

// oilCards
import oilCards from 'views/oilCards'
import oilCardscreateCard from 'views/oilCards/createCard'

// orders
import orders from 'views/orders'
import ordersBillInfo from 'views/orders/billInfo'
// import ordersConfirmReceipt from 'views/orders/confirmReceipt'
import ordersTransport from 'views/orders/transport'

import ordersPayMode from 'views/orders/payMode'
import ordersPayModeAdvance from 'views/orders/payMode/advancePay'
import ordersPayModeCash from 'views/orders/payMode/cashPay'
import ordersPayModeDeposit from 'views/orders/payMode/depositPay'

// price
import prices from 'views/prices'
import priceInfo from 'views/prices/priceInfo'
import createPrice from 'views/prices/createPrice'

// error page
import Err404 from 'views/error/404'
import Err403 from 'views/error/403'

// error log
import ErrLog from 'views/errlog'

export const constantRouterMap = [{
  path: '/login',
  component: Login,
  name: '登录',
  hidden: true
}, {
  path: '/404',
  component: Err404,
  hidden: true
}, {
  path: '/403',
  component: Err403,
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: '首页',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: Dashboard
  }]
}]

export default new Router({
  mode: 'history',
  base: '/all',
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/competence',
  component: Layout,
  name: '权限管理',
  icon: 'mobankuangjia',
  children: [{
    path: '/menus',
    component: AppMain,
    redirect: '/menus/index',
    noDropdown: true,
    meta: {
      codes: ['menus']
    },
    children: [{
      path: 'index',
      component: menus,
      name: '菜单管理',
      meta: {
        codes: ['menus']
      }
    }, {
      path: 'createMenu',
      component: createMenu,
      hidden: true,
      name: '新增菜单',
      meta: {
        codes: ['menus:create']
      }
    }, {
      path: 'modifyMenu/:id*',
      component: createMenu,
      hidden: true,
      name: '修改菜单',
      meta: {
        codes: ['menus:modify']
      }
    },
    {
      path: '',
      component: AppMain,
      hidden: true,
      name: '删除菜单',
      meta: {
        codes: ['menus:delete']
      }
    }
    ]
  }, {
    path: '/accounts',
    component: AppMain,
    redirect: '/accounts/index',
    noDropdown: true,
    meta: {
      codes: ['accounts']
    },
    children: [{
      path: 'index',
      component: accounts,
      name: '账号管理',
      meta: {
        codes: ['accounts']
      },
      hidden: true
    }, {
      path: 'createAccount',
      component: createAccount,
      name: '新增账号',
      meta: {
        codes: ['accounts:create']
      },
      hidden: true
    }, {
      path: 'modifyAccount/:id*',
      component: modifyAccount,
      name: '修改账号',
      meta: {
        codes: ['accounts:modifyAccount']
      },
      hidden: true

    }, {
      path: 'modifyPassword/:id*',
      component: modifyPassword,
      name: '修改密码',
      meta: {
        codes: ['accounts:modifyPassword']
      },
      hidden: true
    },
    {
      path: 'resetPassword/:id*',
      component: resetPassword,
      name: '重置密码',
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
    children: [{
      path: 'index',
      component: roles,
      name: '角色管理',
      meta: {
        codes: ['roles']
      }
    }, {
      path: 'createRole',
      component: createRole,
      name: '新增角色',
      meta: {
        codes: ['roles:create']
      },
      hidden: true
    }, {
      path: 'modifyRole/:id*',
      component: createRole,
      name: '修改角色',
      meta: {
        codes: ['roles:modify']
      },
      hidden: true
    }, {
      path: '',
      component: AppMain,
      hidden: true,
      name: '删除角色',
      meta: {
        codes: ['roles:delete']
      }
    }]
  }
  ]
},
{
  path: '/clients',
  component: Layout,
  redirect: '/clients/index',
  name: '客户管理',
  icon: 'yonghuziliao',
  children: [{
    path: 'index',
    component: clients,
    name: '客户列表',
    meta: {
      codes: ['clients']
    }
  }, {
    path: 'clientInfos/:id*',
    component: clientInfos,
    hidden: true,
    name: '客户信息',
    meta: {
      codes: ['clients:info']
    }
  }, {
    path: 'orders',
    component: clientOrders,
    name: '客户订单',
    meta: {
      codes: ['clients:orders']
    }
  }]
}, {
  path: '/drivers',
  component: Layout,
  redirect: '/drivers/index',
  name: '车主管理',
  icon: 'yunshuzhongwuliu',
  children: [{
    path: 'index',
    component: drivers,
    name: '车主列表',
    meta: {
      codes: ['drivers']
    }
  },
  {
    path: 'driverInfo/:id*',
    component: driverInfo,
    name: '车主信息',
    meta: {
      codes: ['drivers:info']
    },
    hidden: true
  },
  {
    path: 'vehicleInfo/:id*',
    component: vehicleInfo,
    name: '车辆信息',
    meta: {
      codes: ['drivers:vehicleInfo']
    },
    hidden: true
  },
  {
    path: 'vehicleLocation/:gpsNo*',
    component: vehicleLocation,
    name: '车辆位置',
    meta: {
      codes: ['drivers:vehicleLocation']
    },
    hidden: true
  }, {
    path: 'editInfo',
    component: driversEditInfo,
    name: '车主信息修改',
    meta: {
      codes: ['drivers:editInfo']
    },
    hidden: true
  }, {
    path: '/drivers/orders',
    redirect: 'index',
    component: AppMain,
    name: '车主订单管理',
    meta: {
      codes: ['drivers:orders']
    },
    children: [{
      path: 'index',
      component: driversOrders,
      name: '车主订单',
      meta: {
        codes: ['drivers:orders']
      }
    }, {
      path: 'location',
      component: driversOrdersLocation,
      name: 'GPS定位',
      meta: {
        codes: ['drivers:orders:location']
      }
    }, {
      path: 'payStatus',
      component: driversOrdersPayStatus,
      name: '付款情况',
      meta: {
        codes: ['drivers:orders:payStatus']
      }
    }, {
      path: 'comment',
      component: driversOrdersComment,
      name: '客户点评',
      meta: {
        codes: ['drivers:orders:comment']
      }
    }]
  }
  ]
},
{
  path: '/price',
  component: Layout,
  redirect: '/price/index',
  name: '线路价格管理',
  icon: 'zhangdan',
  children: [{
    path: 'index',
    component: prices,
    name: '线路价格列表',
    meta: {
      codes: ['prices']
    }
  },
  {
    path: 'priceInfo',
    component: priceInfo,
    name: '线路价格详情',
    hidden: true,
    meta: {
      codes: ['priceInfo']
    }
  },
  {
    path: 'createPrice',
    component: createPrice,
    name: '创建线路价格',
    hidden: true,
    meta: {
      codes: ['createPrice']
    }
  },
  {
    path: 'updatePrice',
    component: createPrice,
    name: '更新线路价格',
    hidden: true,
    meta: {
      codes: ['updatePrice']
    }
  }
  ]
},
{
  path: '/brands',
  component: Layout,
  redirect: '/brands/index',
  name: '车辆品牌管理',
  icon: 'ziyuan',
  children: [{
    path: 'index',
    component: brands,
    name: '车辆品牌列表',
    meta: {
      codes: ['brands']
    }
  }, {
    path: 'createBrand',
    component: createBrand,
    name: '新增车辆品牌',
    meta: {
      codes: ['brands:create']
    },
    hidden: true
  }, {
    path: 'modifyBrand/:id*',
    component: modifyBrand,
    name: '修改车辆品牌',
    meta: {
      codes: ['brands:modify']
    },
    hidden: true
  }, {
    path: 'brandInfo/:id*',
    component: brandInfo,
    name: '品牌车辆详情',
    meta: {
      codes: ['brands:info']
    },
    hidden: true
  }]
}, {
  path: '/colors',
  component: Layout,
  redirect: '/colors/index',
  name: '车辆颜色管理',
  icon: 'renwu',
  children: [{
    path: 'index',
    component: colors,
    name: '车辆颜色列表',
    meta: {
      codes: ['colors']
    }
  }, {
    path: 'createColor',
    component: createColor,
    name: '新增车辆颜色',
    meta: {
      codes: ['colors:create']
    },
    hidden: true
  }, {
    path: 'modifyColor/:id*',
    component: modifyColor,
    name: '修改车辆颜色',
    meta: {
      codes: ['colors:modify']
    },
    hidden: true
  }, {
    path: 'colorInfo/:id*',
    component: colorInfo,
    name: '车辆颜色详情',
    meta: {
      codes: ['colors:info']
    },
    hidden: true
  }]
}, {
  path: '/oilCards',
  component: Layout,
  redirect: '/oilCards/index',
  name: '油卡管理',
  icon: 'yinhangqia',
  children: [{
    path: 'index',
    component: oilCards,
    name: '油卡列表',
    meta: {
      codes: ['oilCards']
    }
  }, {
    path: 'createCard',
    component: oilCardscreateCard,
    name: '新增油卡',
    meta: {
      codes: ['oilCards:create']
    }
  }]
}, {
  path: '/orders',
  component: Layout,
  redirect: '/orders/index',
  name: '订单管理',
  icon: 'jiesuan',
  children: [{
    path: 'index',
    component: orders,
    name: '订单列表',
    meta: {
      codes: ['orders']
    }
  }, {
    path: 'billInfo',
    component: ordersBillInfo,
    name: '应开票资料',
    meta: {
      codes: ['orders:billInfo']
    }
  }, {
    path: 'transport',
    component: ordersTransport,
    name: '运单运输情况',
    meta: {
      codes: ['orders:transport']
    }
  }, {
    path: 'payMode',
    component: ordersPayMode,
    name: '收付款情况',
    meta: {
      codes: ['orders:transport:payMode']
    },
    children: [{
      path: 'advancePay',
      component: ordersPayModeAdvance,
      name: '预付款',
      meta: {
        codes: ['orders:transport:payMode:advancePay']
      }
    }, {
      path: 'cashPay',
      component: ordersPayModeCash,
      name: '货到付款',
      meta: {
        codes: ['orders:transport:payMode:cashPay']
      }
    }, {
      path: 'depositPay',
      component: ordersPayModeDeposit,
      name: '回单押金付款',
      meta: {
        codes: ['orders:transport:payMode:depositPay']
      }
    }]
  }]
}, {
  path: '/errlog',
  component: Layout,
  redirect: 'noredirect',
  name: 'errlog',
  icon: 'wenti',
  noDropdown: true,
  children: [{
    path: 'log',
    component: ErrLog,
    name: '错误日志',
    meta: {
      codes: ['errlog:log']
    }
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}
]
