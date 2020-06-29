/*
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-21 22:03:38
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-26 12:24:00
 */ 
import fetch from 'utils/fetch'
export function deviceList (params) {
  return fetch({
    url: '/deviceList ',
    method: 'get',
    params
  })
}
export function deviceQrcode (params) {
  return fetch({
    url: '/deviceQrcode',
    method: 'get',
    responseType: 'blob',
    params
  })
}

export function deviceUser (params) {
  return fetch({
    url: '/deviceUser',
    method: 'get',
   
    params
  })
}