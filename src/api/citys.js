import fetch from 'utils/fetch'

// get all city list
export function fetchAllCitys() {
  return fetch({
    url: 'basicRegion/allCitys',
    method: 'get'
  })
}

// get province list
export function fetchCitys(params) {
  return fetch({
    url: 'basicRegion/basicRegionList',
    method: 'get',
    params
  })
}

// get city list
export function fetchProvince() {
  return fetch({
    url: 'basicRegion/provinceBasicRegionList',
    method: 'get'
  })
}
