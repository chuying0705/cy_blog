const Koa = require('koa')
const app = new Koa()
const config = require('./server/config/config')
const mongoose = require('mongoose')
mongoose.connect(config.db, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('Faild to connet to database')
  } else {
    console.log('Conneting database successfully')
  }
})
// const Router = require('koa-router')
// const router = new Router({
//   // prefix: '/api'
// })
// koa-bodyparser 和 koa-body同时使用会使post请求abort
// const bodyParser = require('koa-bodyparser')
// app.use(bodyParser({ multipart: true }))

const cors = require('koa2-cors')
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return '*'
    }
    return 'http://localhost:8080'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

const koaBody = require('koa-body')
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024
  }
}))

// josnwebtoken
const koajwt = require('koa-jwt')
app.use(koajwt({
  secret: 'SeniorChu'
}).unless({
  path: [/\/user\/login/, /\/user\/register/, /\/public/, /\/file/ ]
}))
const errorHandle = require('./server/middlewares/errorHandle')
app.use(errorHandle())

// const userRouter = require('./server/routes/user')
// app.use(userRouter.routes()).use(userRouter.allowedMethods())
const router = require('./server/routes/index')
app.use(router.routes(), router.allowedMethods())

// 设置静态资源文件夹
const Static = require('koa-static')
const path = require('path')
let staticPath = path.join(__dirname)
app.use(Static(staticPath))

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

app.listen(config.port, () => {
  console.log(`Koa is listening in ${config.port}`)
})

module.exports = app
