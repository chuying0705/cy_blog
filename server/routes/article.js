const Router = require('koa-router')
const router = new Router()

const articleController = require('../controllers/article')

router.get('/getList', articleController.getArticleList)
router.get('/getDetail', articleController.getArticleDetail)
router.post('/add', articleController.addArticle)
router.post('/update', articleController.updateArticle)
router.delete('/', articleController.removeArticle)
router.post('/updateContent', articleController.addArticleContent)
// 阅读点赞
router.get('/addReadCount', articleController.addReadCount)
router.get('/addLikeCount', articleController.addLikeCount)

// 评论
router.post('/addComment', articleController.addComment)
router.delete('/deleteComment', articleController.deleteComment)
router.post('/addReply', articleController.addCommentReply)
router.post('/deleteReply', articleController.deleteReply)

module.exports = router
