const router = require('koa-router')()

const user = require('./user')
const article = require('./aritcle')
const comment = require('./comment')
const type = require('./type')
router.use('/api', user.routes(), user.allowedMethods())
router.use('/api', article.routes(), article.allowedMethods())
router.use('/api', comment.routes(), comment.allowedMethods())
router.use('/api', type.routes(), type.allowedMethods())


const test = require('./test')
router.use('/test', test.routes(), test.allowedMethods())

module.exports = router