const Router = require('koa-router')
const router = new Router()

const articleController = require('../controllers/article')

router.get('/getList', articleController.getArticleList)
router.get('/getDetail', articleController.getArticleDetail)
router.post('/add', articleController.addArticle)
router.post('/update', articleController.updateArticle)
router.delete('/', articleController.removeArticle)

module.exports = router
