/* eslint-disable */
// 是否是公司邮箱
export function isEmail(str) {
  const reg = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
  return reg.test(str.trim())
}

// 是否是手机号码
export function isMobile(str) {
  const reg = /0?(13|14|15|17|18)[0-9]{9}$/
  return reg.test(str.trim())
}
