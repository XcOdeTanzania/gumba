import { Mock, Constant, } from './_utils';


const { ApiPrefix } = Constant

let questionsListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@title',
      description: '@word',
      address:  () => {
        return Mock.mock(
          '@pick(["Dar Es Salaam",' + '"Arusha", ' + '"Moshi", ' + '"Iringa", ' + '"Mbeya"])'
        )
      } ,
      privacy: () => {
        return Mock.mock(
          '@pick(["Public",' + '"Protected", ' + '"Private"])'
        )
      },
      createTime: '@datetime',
      image() {
        return Mock.Random.image(
          '100x100',
          Mock.Random.color(),
          '#757575',
          'png',
          this.name.substr(0, 1)
        )
      },
    },
  ],
})

let database = questionsListData.data





const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {
  //  [`GET ${ApiPrefix}/questions`](req, res) {
  //   const { query } = req
  //   let { pageSize, page, ...other } = query
  //   pageSize = pageSize || 10
  //   page = page || 1

  //   let newData = database
  //   for (let key in other) {
  //     if ({}.hasOwnProperty.call(other, key)) {
  //       newData = newData.filter(item => {ß
  //         if ({}.hasOwnProperty.call(item, key)) {
  //           if (key === 'address') {
  //             return other[key].every(itemData => item[key].indexOf(itemData) > -1)
  //           } else if (key === 'createTime') {
  //             const start = new Date(other[key][0]).getTime()
  //             const end = new Date(other[key][1]).getTime()
  //             const now = new Date(item[key]).getTime()

  //             if (start && end) {
  //               return now >= start && now <= end
  //             }
  //             return true
  //           }
  //           return (
  //             String(item[key])
  //               .trim()
  //               .indexOf(decodeURI(other[key]).trim()) > -1
  //           )
  //         }
  //         return true
  //       })
  //     }
  //   }

  //   res.status(200).json({
  //     data: newData.slice((page - 1) * pageSize, page * pageSize),
  //     total: newData.length,
  //   })
  // },

  [`POST ${ApiPrefix}/questions/delete`](req, res) {
    const { ids=[] } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },

  // [`POST ${ApiPrefix}/question`](req, res) {
  //   const newData = req.body
  //   newData.createTime = Mock.mock('@now')
  //   newData.image =
  //     newData.image ||
  //     Mock.Random.image(
  //       '100x100',
  //       Mock.Random.color(),
  //       '#757575',
  //       'png',
  //       newData.name.substr(0, 1)
  //     )
  //   newData.id = Mock.mock('@id')
  //
  //   database.unshift(newData)
  //
  //   res.status(200).end()
  // },

  // [`GET ${ApiPrefix}/questions/:id`](req, res) {
  //   const { id } = req.params
  //   const data = queryArray(database, id, 'id')
  //   if (data) {
  //     res.status(200).json(data)
  //   } else {
  //     res.status(200).json(NOTFOUND)
  //   }
  // },

  [`DELETE ${ApiPrefix}/question/:id`](req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(200).json(NOTFOUND)
    }
  },

  // [`PATCH ${ApiPrefix}/question/:id`](req, res) {
  //   const { id } = req.params
  //   const editItem = req.body
  //   let isExist = false
  //
  //   database = database.map(item => {
  //     if (item.id === id) {
  //       isExist = true
  //       return Object.assign({}, item, editItem)
  //     }
  //     return item
  //   })
  //
  //   if (isExist) {
  //     res.status(201).end()
  //   } else {
  //     res.status(200).json(NOTFOUND)
  //   }
  // },


}
