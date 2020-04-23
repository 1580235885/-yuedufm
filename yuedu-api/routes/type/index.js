const router = require('koa-router')()
const type_controllers = require('../../controllers/type_controllers')

router
  .get('/types', type_controllers.get_types)
  .get('/type/:id', type_controllers.get_type_by_id)
module.exports = router