const getters = {
  sidebar: state => state.app.sidebar,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  id: state => state.user.id,
  status: state => state.user.status,
  status_group: state => state.user.status_group,
  email: state => state.user.email,
  mobile: state => state.user.mobile,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  gender: state => state.user.gender,
  avatar: state => state.user.avatar,
  introduction: state => state.user.introduction,
  codes: state => state.user.codes,
  setting: state => state.user.setting
}

export default getters
