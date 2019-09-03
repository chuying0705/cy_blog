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
  const article = await articleCol.findById({ _id: query.id }, (err, data) => {
    if (err) console.log(err)
  })
  ctx.status = 200
  if (article) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data: article
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '未查询到数据'
    }
  }
}
// 新增文章
const addArticle = async (ctx, next) => {
  const req = ctx.request.body
  // req.readCount = 0
  // req.likeCount = 0
  // req.publishTime = new Date()
  articleCol.create(req, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
  })
  ctx.status = 200
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
    if (err) {
      console.log(err)
      // ctx.body = {
      //   code: -1,
      //   msg: err
      // }
      return err
    }
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
// 新增文章内容
const addArticleContent = async (ctx, next) => {
  const req = ctx.request.body
  ctx.status = 200
  // req.readCount = 0
  // req.likeCount = 0
  // req.publishTime = new Date()
  articleCol.update({ _id: req.id }, { content: req.content }, function (err, data) {
    if (err) console.log(err)
  })
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}
// 增加文章阅读数
const addReadCount = async (ctx, next) => {
  const query = ctx.query
  ctx.status = 200
  articleCol.update({ _id: query.id }, { $inc: { readCount: 1 } }, function (err, data) {
    if (err) console.log(err)
  })
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}
// 文章点赞数
const addLikeCount = async (ctx, next) => {
  const query = ctx.query
  ctx.status = 200
  articleCol.update({ _id: query.id }, { $inc: { likeCount: 1 } }, function (err, data) {
    if (err) console.log(err)
  })
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}

// 评论
// 添加评论
const addComment = async (ctx, next) => {
  const req = ctx.request.body
  ctx.status = 200
  let commentData = {
    comment_from: req.userId,
    comment_content: req.comment
  }
  articleCol.findById(req.articleId, function (err, content) {
    console.log(content)
    if (!err) {
      content.comments.push(commentData)
      content.save()
      return false
    } else {
      console.log(err)
    }
  })
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}

// 删除评论及回复
const deleteComment = async (ctx, next) => {
  const query = ctx.query
  console.log(query)
  ctx.status = 200
  articleCol.updateOne({ '_id': query.articleId }, { $pull: { comments: { '_id': query.commentId } } }, (err, data) => {
    if (!err) {
      console.log(data)
    } else {
      console.log(err)
    }
  })
  // 修改
  // articleCol.updateOne({ '_id': query.articleId, 'comments._id': query.commentId }, { $set: { 'comments.$.comment_content' : '哈哈哈' } } , (err, data) => {
  //   if (!err) {
  //     console.log(data)
  //   } else {
  //     console.log(err)
  //   }
  // })
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}

// 添加回复
const addCommentReply = async (ctx, next) => {
  const req = ctx.request.body
  let replyData = {
    reply_from: req.reply_from,
    reply_to: req.reply_to,
    reply_content: req.reply_content,
    reply_time: new Date()
  }
  articleCol.updateOne({ '_id': req.articleId, 'comments._id': req.commentId }, { $push: { 'comments.$.reply': replyData } }, (err, data) => {
    if (!err) {
      console.log(data)
    } else {
      console.log(err)
    }
  })
  ctx.status = 200
  ctx.body = {
    code: 0,
    msg: 'success'
  }
}

// 删除回复
const deleteReply = async (ctx, next) => {
  const req = ctx.request.body
  articleCol.updateOne({ '_id': req.articleId, 'comments._id': req.commentId }, { $pull: { 'comments.$.reply': { '_id': req.replyId } } }, (err, data) => {
    if (!err) {
      console.log(data)
    } else {
      console.log(err)
    }
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
  removeArticle,
  addArticleContent,
  addComment,
  deleteComment,
  addCommentReply,
  deleteReply,
  addReadCount,
  addLikeCount
}
