/*
 * @Descripttion: 工器具
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-17 16:38:17
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-25 13:27:16
 */ 
import fetch from 'utils/fetch'
// 新增 编辑
export function addTool(data) {
  return fetch({
    url: '/tools/addOrUpdateTool',
    method: 'post',
    data
  })
}
export function toolsPage(data) {
  return fetch({
    url: '/tools/page',
    method: 'post',
    data
  })
}
export function toolsList(params) {
  return fetch({
    url: 'tools/list',
    method: 'get',
    params
  })
}
export function toolsListss(params) {
  return fetch({
    url: 'tools/list',
    method: 'get',
    params
  })
}
export function deleteTool(params) {
  return fetch({
    url: '/tools/deleteTool',
    method: 'get',
    params
  })
}

export function uolad(data) {
  return fetch({
    url: '/upload/uploadSingle',
	  method: 'post',
    data
  });
}
export function getTools(params) {
  return fetch({
    url: '/tools/get',
	  method: 'get',
    params
  });
}
