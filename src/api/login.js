import fetch from 'utils/fetch'

// check the user login
export function Login(username, password) {
  const data = {
    username,
    password
  }
  return fetch({
    url: '/login',
    method: 'post',
    data
  })
}

// logout
export function Logout() {
  return fetch({
    url: '/logout',
    method: 'post'
  })
}

// get the user infomation
export function fetchInfo() {
  return fetch({
    url: '/permUser/me',
    method: 'post'
  })
}
