const { clearHash } = require('../services/cache')

module.exports = async (req, res, next) => {
  await next()

  // here happening after the request
  clearHash(req.user.id)
}
