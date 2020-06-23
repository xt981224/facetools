import {
  Login,
  Logout,
  fetchInfo
} from 'api/login'
import {
  Message
} from 'element-ui'
import {
  getToken,
  setToken,
  removeToken
} from 'utils/auth'

const user = {
  state: {
    uid: undefined,
    status: '',
    status_group: '',
    email: '',
    mobile: '',
    token: getToken(),
    name: '',
    roles: [],
    gender: '',
    avatar: '',
    introduction: '',
    codes: []
  },
  mutations: {
    SET_UID(state, id) {
      state.uid = id
    },
    SET_STATUS(state, status) {
      state.status = status
    },
    SET_STATUS_GROUP(state, statusGroup) {
      state.status_group = statusGroup
    },
    SET_EMAIL(state, email) {
      state.email = email
    },
    SET_MOBILE(state, mobile) {
      state.mobile = mobile
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    },
    SET_GENDER(state, gender) {
      state.gender = gender
    },
    SET_AVATAR(state, photo) {
      state.avatar = photo
    },
    SET_INTRODUCTION(state, introduction) {
      state.introduction = introduction
    },
    SET_CODES(state, codes) {
      state.codes = codes
    }
  },
  actions: {
    // email login
    Login({
      commit
    }, userInfo) {
      const username = userInfo
        .username
        .trim()
      const password = userInfo.password

      return new Promise((resolve, reject) => {
        Login(username, password).then(response => {
          const resData = response.data
          if (resData.success) {
            setToken(username)
            commit('SET_NAME', username)
            commit('SET_TOKEN', username)
            resolve()
          } else {
            Message({
              message: resData.message,
              type: 'error',
              duration: 5 * 1000
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // get user info
    GetInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        fetchInfo().then(response => {
          const resData = response.data
          if (resData.success) {
            const infoData = resData.data
            commit('SET_NAME', infoData.realName)
            commit('SET_CODES', infoData.permCodes)
            commit('SET_MOBILE', infoData.mobile)
            commit('SET_ROLES', infoData.permRoleNames)
            commit('SET_UID', infoData.id)
            commit('SET_AVATAR', '/static/rabbit.gif')
            resolve(resData)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // logout
    LogOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
        Logout().then(response => {
          const resData = response.data
          if (resData.success) {
            removeToken()
            commit('SET_TOKEN', '')
            commit('SET_CODES', [])
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
