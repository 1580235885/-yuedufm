const router = require('koa-router')()
const comment_controllers = require('../../controllers/comment_controllers')
const jwt_auth = require('../../middleware/jwt_auth')


router
  .get('/comments/:article_id/page/:page', comment_controllers.get_comments_limit)
  .post('/comment', jwt_auth, comment_controllers.add_comment)
  // .post('/comment', comment_controllers.add_comment)

  .delete('/comment/:id', jwt_auth, comment_controllers.remove_comment)
module.exports = router