/*
 * @Descripttion: 
 * @version: 
 * @Author: 邢腾
 * @Date: 2020-06-27 09:49:32
 * @LastEditors: xingteng
 * @LastEditTime: 2020-06-27 09:49:42
 */ 
export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}