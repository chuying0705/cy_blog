const articleCol = require('../models/article')
// 获取文章列表
const getArticleList = async (ctx, next) => {
  const articleList = await articleCol.find({}, { title: 1, desc: 1, from: 1, authorId: 1 })
  ctx.status = 200
  ctx.body = {
    code: 0,
    msg: 'success',
    data: articleList
  }
}
// 获取文章详情
const getArticleDetail = async (ctx, next) => {
  const query = ctx.query
  const user = await articleCol.findOne({ _id: query.id })
  ctx.status = 200
  ctx.body = {
    code: 0,
    msg: 'success',
    data: user
  }
}
// 新增文章
const addArticle = async (ctx, next) => {
  const req = ctx.request.body
  ctx.status = 200
  // req.readCount = 0
  // req.likeCount = 0
  // req.publishTime = new Date()
  articleCol.create(req)
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}
// 修改文章
const updateArticle = async (ctx, next) => {
  const req = ctx.request.body
  ctx.status = 200
  articleCol.findByIdAndUpdate(req._id, req, function (err, data) {
    if (err) console.log(err)
  })
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}
// 删除文章
const removeArticle = async (ctx, next) => {
  const query = ctx.query
  articleCol.findByIdAndRemove(query.id, function (err, data) {
    if (err) console.log(err)
  })
  ctx.status = 200
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}

module.exports = {
  getArticleList,
  getArticleDetail,
  addArticle,
  updateArticle,
  removeArticle
}
