const categoryCol = require('../models/category')
const getCategory = async (ctx, next) => {
  const categoty = await categoryCol.find()
  let cate = []
  categoty.forEach(item => {
    cate.push(item.cate)
  })
  ctx.status = 200
  ctx.body = {
    code: 0,
    msg: 'success',
    data: cate
  }
}
const addCategory = async (ctx, next) => {
  const req = ctx.request.body
  ctx.status = 200
  if (!req.cate || typeof req.cate !== 'string') {
    ctx.status = 401
    ctx.body = {
      msg: 'post request!',
      desc: `parameter error`,
      data: req
    }
    return false
  }
  const cate = await categoryCol.findOne({ cate: req.cate })
  if (cate) {
    ctx.body = {
      code: -1,
      msg: '该类别已存在'
    }
  } else {
    categoryCol.create({
      cate: req.cate
    })
    ctx.body = {
      code: 0,
      msg: 'success'
    }
  }
}

module.exports = {
  getCategory,
  addCategory
}
