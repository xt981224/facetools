import fetch from 'utils/fetch'

// get the driver list
export function fetchList(data) {
  return fetch({
    url: '/carrier/carrierList',
    method: 'post',
    data
  })
}

export function carrierOptions(data) {
  return fetch({
    url: '/carrier/carrierOptions',
    method: 'post',
    data
  })
}

// 删除
export function deleteCarrier(params) {
  return fetch({
    url: '/carrier/deleteCarrier',
    method: 'get',
    params
  })
}
// get the driver filter
export function filterDriverList(data) {
  return fetch({
    url: '/carrier/carrierList',
    method: 'post',
    data
  })
}
export function createCarrier(data) {
  return fetch({
    url: '/carrier/createCarrier',
    method: 'post',
    data
  })
}
// get the driver infomation
export function fetchDriverInfo(params) {
  return fetch({
    url: '/carrierInfo/carrierInfo',
    method: 'get',
    params
  })
}
export function bindCarrierWx() {
  return fetch({
    url: '/carrier/bindCarrierWx',
    method: 'get',
  })
}
// update gps
export function updateGps(data) {
  return fetch({
    url: '/carrierInfo/bindOrUpdateCarrierGps',
    method: 'post',
    data
  })
}

// audit drivder pass
export function auditDrivderPass(data) {
  return fetch({
    url: '/carrierInfo/carrierDrivderAuditPass',
    method: 'post',
    data
  })
}

// audit drivder reject
export function auditDrivderReject(data) {
  return fetch({
    url: '/carrierInfo/carrierDrivderAuditReject',
    method: 'post',
    data
  })
}

// audit Card pass
export function auditCardPass(data) {
  return fetch({
    url: '/carrierInfo/carrierCardAuditPass',
    method: 'post',
    data
  })
}

// audit Card reject
export function auditCardReject(data) {
  return fetch({
    url: '/carrierInfo/carrierCardAuditReject',
    method: 'post',
    data
  })
}

// audit Bank pass
export function auditBankPass(data) {
  return fetch({
    url: '/carrierInfo/carrierBankAuditPass',
    method: 'post',
    data
  })
}

// audit Bank reject
export function auditBankReject(data) {
  return fetch({
    url: '/carrierInfo/carrierBankAuditReject',
    method: 'post',
    data
  })
}

// 个人信息通过
export function driverAuditPass(data) {
  return fetch({
    url: '/carrierInfo/carrierDriverAuditPass',
    method: 'post',
    data
  })
}
// 个人信息通过
export function driverAuditReject(data) {
  return fetch({
    url: '/carrierInfo/carrierDriverAuditReject',
    method: 'post',
    data
  })
}
// 获取二维码
export function getWxCodeApi(params) {
  return fetch({
    url: '/carrier/generateQrCode',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
// 详情

export function carrierInfo(params) {
  return fetch({
    url: '/carrierInfo/carrierInfo',
    method: 'get',
    params,
  })
}
export function updateCarrier(data) {
  return fetch({
    url: '/carrier/updateCarrier',
    method: 'post',
    data,
  })
}
