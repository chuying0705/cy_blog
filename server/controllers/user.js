const userCol = require('../models/user')
const getUser = async (ctx, next) => {
  const req = ctx.request.body
  console.log(req)
  const query = ctx.query
  const user = await userCol.findOne({ name: query.name })
  ctx.status = 200
  ctx.body = {
    code: 0,
    msg: 'success',
    data: user
  }
}
const postUser = async (ctx, next) => {
  const req = ctx.request.body
  ctx.status = 200
  if (!req.name || typeof req.name !== 'string') {
    ctx.status = 401
    ctx.body = {
      msg: 'post request!',
      desc: `parameter error！！name: ${req.name}`,
      data: req
    }
    return false
  }
  userCol.create({
    name: req.name,
    password: req.password
  })
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}

module.exports = {
  getUser,
  postUser
}
