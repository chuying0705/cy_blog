const Router = require('koa-router')
const router = new Router()

const fileController = require('../controllers/file')

router.post('/upload', fileController.upload)
router.get('/public/upload/*', fileController.getFile)

module.exports = router
