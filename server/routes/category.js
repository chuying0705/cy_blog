const Router = require('koa-router')
const router = new Router()

const categoryController = require('../controllers/category')

router.get('/get', categoryController.getCategory)
router.post('/add', categoryController.addCategory)

module.exports = router
