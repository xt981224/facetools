import {
  asyncRouterMap,
  constantRouterMap
} from 'src/router';
import {
  deepClone
} from 'utils'

/**
 * Judge if the user has permissions by 'meta.codes'
 * @param codes
 * @param route
 */

function hasPermission(codes, route) {
  if (route.meta && route.meta.codes) {
    return codes.some(code => route.meta.codes.indexOf(code) >= 0)
  } else {
    return true
  }
}

/**
 * Filter asyncRouterMap, get the user roters
 * @param asyncRouterMap
 * @param codes
 */
function filterAsyncRouter(asyncRouterMap, codes) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(codes, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, codes)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },

  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = deepClone(routers)
      state.routers = deepClone(constantRouterMap.concat(routers))
    }
  },

  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          codes
        } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, codes)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission;
