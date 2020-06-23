/*
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-21 22:03:38
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-21 22:15:39
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