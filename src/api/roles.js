import fetch from 'utils/fetch'

// get the role list
export function fetchList(data) {
  return fetch({
    url: '/permRole/roleList',
    method: 'post',
    data
  })
}

// get the role info
export function fetchInfo(params) {
  return fetch({
    url: '/permRole/permRoleInfo',
    method: 'get',
    params
  })
}

// get all roles
export function fetchAllRoles() {
  return fetch({
    url: '/permRole/allPermRole',
    method: 'post'
  })
}

// add the role
export function addRole(data) {
  return fetch({
    url: '/permRole/addOrUpdatePermRole',
    method: 'post',
    data
  })
}

// delete the role
export function deleteRole(data) {
  return fetch({
    url: '/permRole/deletePermRole',
    method: 'post',
    data
  })
}

// fetch the user role
export function fetchUserRole(data) {
  return fetch({
    url: '/permUserRole/permUserRoles',
    method: 'post',
    data
  })
}

// modify the user role
export function modifyRole(data) {
  return fetch({
    url: '/permUserRole/modifyRoleForUser',
    method: 'post',
    data
  })
}
