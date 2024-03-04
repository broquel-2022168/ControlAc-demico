'use strict'

import { Router } from "express"
import { isStudent, isTeacher, validateJwt } from '../middlewares/validate-jwt.js'
import { deleteC, gett, saveC, test, update, verCursosAsignados } from './course.controller.js'


const api = Router()

api.get('/test', test)
api.post('/save',[validateJwt, isTeacher], saveC)
api.put('/update/:id',[validateJwt,isTeacher],update)
api.delete('/delete/:id',[validateJwt,isTeacher],deleteC)
api.get('/get',[validateJwt,isTeacher],gett)
api.get('/get/:userId',[validateJwt,isStudent],verCursosAsignados);


export default api