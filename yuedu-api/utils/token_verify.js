const jwt = require('jsonwebtoken')

module.exports = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, encode) => {
      if (err) {
        reject(err)
      } else {
        resolve(encode)
      }
    })
  })
  
}