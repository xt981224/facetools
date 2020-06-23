/*
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-05-20 12:02:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-24 15:46:59
 */ 
import fetch from 'utils/fetch'

// get the color list
export function fetchList(data) {
  return fetch({
    url: '/vehicleColour/vehicleColourList',
    method: 'post',
    data
  })
}

// get the color info
export function fetchInfo(params) {
  return fetch({
    url: '/vehicleColour/vehicleColourInfo',
    method: 'get',
    params
  })
}

// add the color
export function createColor(data) {
  return fetch({
    url: '/vehicleColour/saveVehicleColour',
    method: 'post',
    data
  })
}

// modify the color
export function modifyColor(data) {
  return fetch({
    url: '/vehicleColour/updateVehicleColour',
    method: 'post',
    data
  })
}

// delete the color
export function deleteColor(data) {
  return fetch({
    url: '/vehicleColour/deleteVehicleColour',
    method: 'post',
    data
  })
}
export function vehicleColourOptions(data) {
  return fetch({
    url: '/vehicleColour/vehicleColourOptions',
    method: 'post',
    data
  })
}

