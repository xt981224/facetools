import fetch from 'utils/fetch'

// get the order list
export function fetchList(data) {
  return fetch({
    // url: '/orders/orderList',
    url: '/order/page',
    
    method: 'post',
    data
  })
}

export function submitOrderUserPrice(data) {
  return fetch({
    url: '/order/submitOrderUserPrice',
    method: 'post',
    data
  })
}
export function submitcreateDelivery(data) {
  return fetch({
    url: '/delivery/createDelivery',
    method: 'post',
    data
  })
} 
export function createDeliveryDirect(data) {
  return fetch({
    url: '/delivery/createDeliveryDirect',
    method: 'post',
    data
  })
}
export function getqueryForDelivery(params) {
  return fetch({
    url: '/order/queryForDelivery',
    method: 'get',
    params
  })
}
// get the order detail
export function fetchOrderInfo(params) {
  return fetch({
    url: '/order/detail',
    method: 'get',
    params
  })
}

// dispatch driver
export function dispatchDriver(data) {
  return fetch({
    url: '/orders/bindOrderCarrier',
    method: 'post',
    data
  })
}
