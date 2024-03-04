'use strict'

import  express from "express"
import {asignarCourse, deleteU, login, register, test, update,} from './user.controller.js'
import { isStudent, validateJwt } from "../middlewares/validate-jwt.js"

const api = express.Router()

api.get('/test', test)
api.post('/register',register)
api.put('/update/:id',[validateJwt],update)
api.delete('/delete/:id',[validateJwt],deleteU)
api.post('/asignCourse/:id',[validateJwt, isStudent],asignarCourse)
api.post('/login',login)

export default api