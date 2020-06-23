/*
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-05-27 10:29:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-06-01 23:14:47
 */ 
import fetch from 'utils/fetch'

// add the user
export function getlist(data) {
  return fetch({
    url: '/delivery/deliveryList',
    method: 'post',
    data
  })
}
export function changeAmount(data) {
  return fetch({
    url: '/delivery/changeAmount',
    method: 'post',
    data
  })
}
export function getinfo(params) {
   return fetch({
     url: '/delivery/deliveryInfo',
     method: 'get',
     params
   })
 }
  