const router = require('koa-router')()

router.post('/', async (ctx) => {
  ctx.body = "成功"
})

module.exports = router