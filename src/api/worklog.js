/*
 * @Descripttion: 工器具
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-17 16:38:17
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-18 22:29:07
 */ 
import fetch from 'utils/fetch'
// 新增 编辑
// export function addTool(data) {
//   return fetch({
//     url: '/tools/addOrUpdateTool',
//     method: 'post',
//     data
//   })
// }
export function workLogPage(data) {
  return fetch({
    url: '/workLog/page',
    method: 'post',
    data
  })
}

export function deleteWorkLog(params) {
  return fetch({
    url: '/workLog/deleteWorkLog',
    method: 'get',
    params
  })
}
export function getworkLog(params) {
  return fetch({
    url: '/workLog/get',
	  method: 'get',
    params
  });
}
export function addOrUpdateWorkLog(data) {
  return fetch({
    url: '/workLog/addOrUpdateWorkLog',
	  method: 'post',
    data
  });
}