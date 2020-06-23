/*
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-05-20 12:02:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-21 22:15:57
 */ 
import fetch from 'utils/fetch'

// get the brand list
export function fetchList(data) {
  return fetch({
    url: '/vehicleBrand/vehicleBrandList',
    method: 'post',
    data
  })
}
export function fetchListbrand(data) {
  return fetch({
    url: '/vehicleBrand/vehicleBrandOptions',
    method: 'post',
    data
  })
}
// get the brand info
export function fetchInfo(params) {
  return fetch({
    url: '/vehicleBrand/vehicleBrandInfo',
    method: 'get',
    params
  })
}

// add the brand
export function createBrand(data) {
  return fetch({
    url: '/vehicleBrand/saveVehicleBrand',
    method: 'post',
    data
  })
}

// modify the brand
export function modifyBrand(data) {
  return fetch({
    url: '/vehicleBrand/updateVehicleBrand',
    method: 'post',
    data
  })
}

// delete the brand
export function deleteBrand(data) {
  return fetch({
    url: '/vehicleBrand/deleteVehicleBrand',
    method: 'post',
    data
  })
}
