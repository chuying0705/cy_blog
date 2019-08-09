const Router = require('koa-router')
const router = new Router()

const userController = require('../controllers/user')

router.get('/query', userController.getUser)
router.post('/add', userController.postUser)
router.post('/login', userController.userLogin)

// const categoryController = require('../controllers/category')
//
// router.get('/category/get', categoryController.getCategory)
// router.post('/category/add', categoryController.addCategory)

module.exports = router
