import fetch from 'utils/fetch'

// add the user
export function addUser(data) {
  return fetch({
    url: '/permUser/addPermUser',
    method: 'post',
    data
  })
}

// get the user list
export function fetchList(data) {
  return fetch({
    url: '/permUser/userList',
    method: 'post',
    data
  })
}

// get the user info
export function fetchInfo(params) {
  return fetch({
    url: '/permUser/permUserInfo',
    method: 'get',
    params
  })
}

// modify the user password
export function modifyPassword(data) {
  return fetch({
    url: '/permUser/modifyPassword',
    method: 'post',
    data
  })
}

// modify the user info
export function modifyPermUser(data) {
  return fetch({
    url: '/permUser/modifyPermUser',
    method: 'post',
    data
  })
}

// reset the users password
export function resetPassword(data) {
  return fetch({
    url: '/permUser/resetPassword',
    method: 'post',
    data
  })
}
