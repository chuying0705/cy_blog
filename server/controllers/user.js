const userCol = require('../models/user')
const getUser = async (ctx, next) => {
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
  const email = await userCol.findOne({ email: req.email })
  if (email) {
    ctx.body = {
      code: -1,
      msg: '该邮箱已注册'
    }
  } else {
    userCol.create({
      name: req.name,
      password: req.password,
      email: req.email
    })
    ctx.body = {
      code: 0,
      msg: 'success'
    }
  }
}
const userLogin = async (ctx, next) => {
  const req = ctx.request.body
  const user = await userCol.findOne({ email: req.email })
  console.log(req)
  console.log(user)
  if (user) {
    if (user.password === req.password) {
      ctx.body = {
        code: 0,
        msg: 'success',
        data: user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '用户名或密码错误'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '用户不存在'
    }
  }
  ctx.status = 200
}

module.exports = {
  getUser,
  postUser,
  userLogin
}
