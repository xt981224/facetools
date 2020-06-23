import * as moment from 'moment'

// upload file action uri
export const uploadUri = process.env.BASE_FILE + '/upload/uploadSingle'

// format date
export function parseTime(timeValue, formatOpt) {
  if (arguments.length === 0 || !timeValue) {
    return null
  }

  const mFormat = formatOpt || 'YYYY-MM-DD HH:mm:ss'
  const mTime = timeValue

  return moment(mTime).format(mFormat)
}

// get driver status
export function statusTagType(sid) {
  switch (sid) {
    case 1:
      return 'warning'
    case 2:
      return 'primary'
    case 3:
      return 'success'
    case 4:
      return 'danger'
    default:
  }
}

// get driver status
export function getStatusText(sid) {
  switch (sid) {
    case 1:
      return '待填写'
    case 2:
      return '待审核'
    case 3:
      return '审核已通过'
    case 4:
      return '审核未通过'
    case 5:
      return '可接单'
    default:
  }
}

// format select
export function formatSelect(datas = []) {
  const selectData = []
  datas.forEach(item => {
    selectData.push({
      value: item.id,
      label: item.name
    })
  })

  return selectData
}

// format tree
export function formatTree(datas) {
  const treeNodeData = []

  for (const item of datas) {
    if (item.pid === 0) {
      treeNodeData.push({
        id: item.id,
        label: item.name,
        level: 0
      })
    } else {
      const _filterTree = nodeChildren => {
        for (const node of nodeChildren) {
          if (node.id === item.pid) {
            if (!node.children) node.children = []
            let depthLevel = node.level
            depthLevel++
            node.children.push({
              id: item.id,
              label: item.name,
              level: depthLevel
            })
          }
          if (node.children && node.children.length > 0) _filterTree(node.children)
        }
      }
      _filterTree(treeNodeData)
    }
  }

  return treeNodeData
}

// format tree
export function formatListTree(datas) {
  const treeNodeData = []

  for (const item of datas) {
    if (item.pid === 0) {
      item.parentName = '顶级菜单'
      item.parent_id = 0
      item.depth = 0
      treeNodeData.push(item)
    } else {
      const _filterTree = nodeChildren => {
        for (const node of nodeChildren) {
          if (node.id === item.pid) {
            if (!node.children) node.children = []
            item.parentName = node.name
            item.parent_id = node.id
            item.depth = node.depth
            item.depth++
            node.children.push(item)
          }
          if (node.children && node.children.length > 0) _filterTree(node.children)
        }
      }
      _filterTree(treeNodeData)
    }
  }

  return treeNodeData
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object') {
        targetObj[key] = source[key].constructor === Array ? [] : {}
        targetObj[key] = deepClone(source[key])
      } else {
        targetObj[key] = source[key]
      }
    }
  }
  return targetObj
}
