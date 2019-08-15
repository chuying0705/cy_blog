const fs = require('fs')
const path = require('path')
const upload = async (ctx, next) => {
  // 获取上传文件
  const file = ctx.request.files.file
  // 创建可读流
  const reader = fs.createReadStream(file.path)
  // 随机名称，防止同名覆盖
  const ext = file.name.split('.').pop()
  const fileName = `${new Date().toLocaleString().substr(0, 19).replace('T', '').replace(/-/g, '').replace(/:/g, '').replace(/ /g, '')}${parseInt(Math.random() * 10000)}.${ext}`
  console.log(fileName)
  let filePath = path.join(`public/upload/${fileName}`)
  // 创建可写
  const upStream = fs.createWriteStream(filePath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  // ctx.status = 200
  // ctx.body = {
  //   code: 0,
  //   msg: 'success'
  // }
  ctx.body = filePath
}

const getFile = async (ctx, next) => {
  const req = ctx.request
  console.log(req)
  // req.sendFile(__dirname + '/' + req.url)
  // console.log('Request for ' + req.url + ' received.')
  let content = fs.readFileSync('public/upload/20198151540253805.jpg', 'binary')
  return content
}

module.exports = {
  upload,
  getFile
}
