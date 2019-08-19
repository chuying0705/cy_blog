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
const bodyParser = require('koa-bodyparser')
app.use(bodyParser({ multipart: true }))

const koaBody = require('koa-body')
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024
  }
}))

// const userRouter = require('./server/routes/user')
// app.use(userRouter.routes()).use(userRouter.allowedMethods())
const router = require('./server/routes/index')
app.use(router.routes(), router.allowedMethods())

// 设置静态资源文件夹
const Static = require('koa-static')
const path = require('path')
let staticPath = path.join(__dirname)
app.use(Static(staticPath))

// josnwebtoken
// const jwt = require('koa-jwt')
// app.use(jwt({
//   secret: 'SeniorChu'
// }).unless({
//   path: [/\/user\/login/, /\/user\/register/]
// }))
// app.use((ctx, next) => {
//   return next().catch(err => {
//     if (err.status === 401) {
//       ctx.status = '401'
//       ctx.body = 'Protected resource, use Authorization header to get access\\n'
//     } else {
//       throw err
//     }
//   })
// })

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

app.listen(config.port, () => {
  console.log(`Koa is listening in ${config.port}`)
})

module.exports = app
