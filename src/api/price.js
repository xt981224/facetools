import fetch from 'utils/fetch'

// get the route price list
export function fetchList(data) {
  return fetch({
    url: '/basicRoutePrice/routePriceList',
    method: 'post',
    data
  })
}

// get the route price info
export function fetchInfo(params) {
  return fetch({
    url: '/basicRoutePrice/basicRoutePriceInfo',
    method: 'get',
    params
  })
}

// add the route price
export function createPrice(data) {
  return fetch({
    url: '/basicRoutePrice/saveRoutePrice',
    method: 'post',
    data
  })
}

// modify the route price
export function updatePrice(data) {
  return fetch({
    url: '/basicRoutePrice/updateRoutePrice',
    method: 'post',
    data
  })
}

// delete the route price
export function deletePrice(data) {
  return fetch({
    url: '/basicRoutePrice/deleteRoutePrice',
    method: 'post',
    data
  })
}

// on the route price
export function onRoutePrice(data) {
  return fetch({
    url: '/basicRoutePrice/basicRoutePriceOn',
    method: 'post',
    data
  })
}

// off the route price
export function offRoutePrice(data) {
  return fetch({
    url: '/basicRoutePrice/basicRoutePriceOff',
    method: 'post',
    data
  })
}
