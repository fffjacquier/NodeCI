const Buffer = require('safe-buffer').Buffer
const Keygrip = require('keygrip')
const keys = require('../../config/keys')
const keygrip = new Keygrip([keys.cookieKey])

module.exports = userModel => {
  // generate a  fake session from this userId
  const sessionObject = {
    passport: {
      user: userModel._id.toString(), // because mongoose returns an object
    },
  }
  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64')
  // use this because the passport lib does so
  const sig = keygrip.sign('session=' + session)
  return { session, sig }
}
