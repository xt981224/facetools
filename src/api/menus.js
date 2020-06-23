import fetch from 'utils/fetch'

// get the menu list
export function fetchList(data) {
  return fetch({
    url: '/permMenu/permMenuList',
    method: 'post',
    data
  })
}

// get the menu info
export function fetchInfo(params) {
  return fetch({
    url: '/permMenu/permMenuInfo',
    method: 'get',
    params
  })
}

// add the menu
export function addMenu(data) {
  return fetch({
    url: '/permMenu/addOrUpdatePermMenu',
    method: 'post',
    data
  })
}

// modify the menu
export function modifyPermMenu(data) {
  return fetch({
    url: '/permMenu/modifyPermMenu',
    method: 'post',
    data
  })
}

// delete the menu
export function deleteMenu(data) {
  return fetch({
    url: '/permMenu/deletePermMenu',
    method: 'post',
    data
  })
}

// fetch the role menu
export function fetchRoleMenu(data) {
  return fetch({
    url: '/permRoleMenu/permRoleMenus',
    method: 'post',
    data
  })
}

// modify the role menu
export function modifyRoleMenu(data) {
  return fetch({
    url: '/permRoleMenu/modifyRoleMenu',
    method: 'post',
    data
  })
}
