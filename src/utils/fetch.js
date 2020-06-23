import axios from 'axios'
import {
  Message
} from 'element-ui'
import router from '../router';
import store from '../store'
// create axios
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

// request block
service.interceptors.request.use(config => config, error => {
  // Do something with request error
  console.log(error) // for debug
})

// response block
service.interceptors.response.use(response => response, error => {
  Message({
    message: error.message,
    type: 'error'
  })

  const status = error.response.status
  if (status === 401) {
    store.dispatch('FedLogOut').then(() => {
      location.reload()
    })
  }
  if (status === 403) {
    router.push('/403')
  }
  return Promise.reject(error)
})

export default service
