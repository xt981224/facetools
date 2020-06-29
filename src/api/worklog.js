/*
 * @Descripttion: 工器具
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-17 16:38:17
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-26 21:54:14
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
export function deviceentry(params) {
  return fetch({
    url: '/deviceentry/list',
    method: 'get',
    params
  })
}

export function recorddeviceentry(params) {
  return fetch({
    url: '/deviceentry/record',
    method: 'get',
    params
  })
}
export function deleteById(params) {
  return fetch({
    url: '/deviceentry/deleteById',
    method: 'get',
    params
  })
}

export function deviceList(params) {
  return fetch({
    url: '/deviceList',
    method: 'get',
    params
  })
}

export function deleteWorkLog(params) {
  return fetch({
    url: '/workLog/deleteWorkLog',
    method: 'get',
    params
  })
}
export function getLatest(params) {
  return fetch({
    url: '/deviceentry/getLatest',
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
export function retrive(params) {
  return fetch({
    url: '/workLog/retrive',
	  method: 'get',
    params
  });
}

export function workLoginfo(params) {
  return fetch({
    url: '/workLog/info',
	  method: 'get',
    params
  });
}
export function addOrUpdateWorkLog(data) {
  return fetch({
    url: '/workLog/addOrUpdateWorkLog?entryId='+data.entryId,
	  method: 'post',
    data
  });
}