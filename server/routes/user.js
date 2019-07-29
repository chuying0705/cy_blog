const Router = require('koa-router')
const router = new Router()

const userController = require('../controllers/user')

router.get('/user/query', userController.getUser)
router.post('/user/add', userController.postUser)

module.exports = router
