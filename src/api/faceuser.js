/*
 * @Descripttion: 工器具
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-17 16:38:17
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-21 15:16:44
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
export function UserPage(data) {
  return fetch({
    url: '/faceUser/page',
    method: 'post',
    data
  })
}
export function updateUser(data) {
  return fetch({
    url: 'faceUser/POST',
    method: 'post',
    data
  })
}
export function deleteFaceUser(params) {
  return fetch({
    url: '/faceUser/deleteFaceUser',
    method: 'get',
    params
  })
}
export function getimg(params) {
  return fetch({
    url: '/qrcode',
    method: 'get',
    params
  })
}
export function getFaceUser(params) {
  return fetch({
    url: '/faceUser/get',
	  method: 'get',
    params
  });
}