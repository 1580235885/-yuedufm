const router = require('koa-router')()
const user_controllers = require('../../controllers/user_controllers')
const jwt_auth = require('../../middleware/jwt_auth')

router
  .post('/user/login', user_controllers.login)
  .post('/user', user_controllers.register)
  .get('/user/:id', jwt_auth, user_controllers.get_user)
  .post('/user/token', jwt_auth, user_controllers.auth_token)

module.exports = router