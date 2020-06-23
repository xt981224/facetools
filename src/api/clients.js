import fetch from 'utils/fetch';

// get the client list
export function fetchList(data) {
  return fetch({
    url: '/customer/customerList',
    method: 'post',
    data
  });
}

// get the client infomation
export function fetchInfo(params) {
  return fetch({
    url: '/customer/customerInfo',
    method: 'get',
    params
  });
}

// reset the client password
export function resetPassword(data) {
  return fetch({
    url: '/customer/resetPassword',
    method: 'post',
    data
  });
}

// the person one step audit pass
export function auditPassPersonOne(data) {
  return fetch({
    url: '/customer/auditPassPersonalPartOne',
    method: 'post',
    data
  });
}

// the person two step audit pass
export function auditPassPersonTwo(data) {
  return fetch({
    url: '/customer/auditPassPersonalPartTwo',
    method: 'post',
    data
  });
}

// the person one step audit reject
export function auditRejectPersonOne(data) {
  return fetch({
    url: '/customer/auditRejectPersonalPartOne',
    method: 'post',
    data
  });
}

// the person two step audit reject
export function auditRejectPersonTwo(data) {
  return fetch({
    url: '/customer/auditRejectPersonalPartTwo',
    method: 'post',
    data
  });
}

// the business one step audit pass
export function auditPassBusinessOne(data) {
  return fetch({
    url: '/customer/auditPassBusinessPartOne',
    method: 'post',
    data
  });
}

// the business two step audit pass
export function auditPassBusinessTwo(data) {
  return fetch({
    url: '/customer/auditPassBusinessPartTwo',
    method: 'post',
    data
  });
}

// the business three step audit pass
export function auditPassBusinessThree(data) {
  return fetch({
    url: '/customer/auditPassBusinessPartThree',
    method: 'post',
    data
  });
}

// the business one step audit reject
export function auditRejectBusinessOne(data) {
  return fetch({
    url: '/customer/auditRejectBusinessPartOne',
    method: 'post',
    data
  });
}

// the business two step audit reject
export function auditRejectBusinessTwo(data) {
  return fetch({
    url: '/customer/auditRejectBusinessPartTwo',
    method: 'post',
    data
  });
}

// the business three step audit reject
export function auditRejectBusinessThree(data) {
  return fetch({
    url: '/customer/auditRejectBusinessPartThree',
    method: 'post',
    data
  });
}

/**
 *
 * @description 客户等级列表
 * @param {id (integer, optional): 等级ID,
          starLevel (string, optional): 星级,
          discountFactor (number, optional): 折扣系数
        } data
 */
export function getCustomerLevels(data) {
  return fetch({
    url: '/customerLevel/customerLevelList',
    method: 'post',
    data
  });
}

/**
 * @description 删除客户等级
 * @export
 * @param {ids:[]} data
 * @returns
 */
export function deleteCustomerLevel(data) {
  return fetch({
    url: '/customerLevel/deleteCustomerLevel',
    method: 'post',
    data
  });
}

/**
 * @description 添加客户等级
 * @export
 * @param { id (integer, optional): 等级ID,
            starLevel (string, optional): 星级,
            discountFactor (number, optional): 折扣系数
          } data
 * @returns
 */
export function saveCustomerLevel(data) {
  return fetch({
    url: '/customerLevel/saveCustomerLevel',
    method: 'post',
    data
  });
}

/**
 * @description 客户星级匹配
 * @export
 * @param {any} data
 * @returns
 */
export function getStarLevelList(params) {
  return fetch({
    url: '/customer/getStarLevelList',
    method: 'get',
    params
  });
}


/**
 * @description 绑定或更新客户星级
 * @export
 * @param {any} data
 * @returns
 */
export function bindOrUpdateCustomerLevel(data) {
  return fetch({
    url: '/customer/bindOrUpdateCustomerLevel',
    method: 'post',
    data
  });
}
