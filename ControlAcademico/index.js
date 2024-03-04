import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
import { registerAutomatic } from './src/user/user.controller.js'
initServer()
connect()
registerAutomatic()