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

// const userRouter = require('./server/routes/user')
// app.use(userRouter.routes()).use(userRouter.allowedMethods())
const router = require('./server/routes/index')
app.use(router.routes(), router.allowedMethods())

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

app.listen(config.port, () => {
  console.log(`Koa is listening in ${config.port}`)
})

module.exports = app
