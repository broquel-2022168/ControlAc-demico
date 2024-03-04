'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async(req, res, next)=>{
    try {
        let secretkey = process.env.SECRET_KEY
        let { token } = req.headers
        if(!token) return res.status(401).send({message:'Unauthorized'})
        let { uid } = jwt.verify(token, secretkey)
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message:'User not found'}) 
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Unauthorized'})
    }
}

export const isTeacher = async(req, res, next)=>{
    try {
        let { role } = req.user
        if(!role || role !== 'TEACHER')return res.status(403).send({message: `You do not have access | username ${username} `})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Unauthorized role'})
    }
}

export const isStudent = async(req, res, next)=>{
    try {
        let { role } = req.user
        if(!role || role !== 'STUDENT')return res.status(403).send({message: `You do not have access | username ${username} `})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Unauthorized role'})
    }
}

/*export const actualizarCursoParaEstudiantes = async (req, res) => {
    try {
        const { updateCourse } = req.body;
        const updateResult = await User.updateMany(
            { role: 'STUDENT' },
            { course: updateCourse }
        );      
        if (updateResult.nModified === 0) {
            return res.status(404).send({ message: 'No se encontraron usuarios con el rol "STUDENT"' });
        }
         return res.send({ message: 'Se ha actualizado el curso para los estudiantes correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar el curso para los estudiantes' });
    }
};
*/



/*export const desasignarCursoATodos = async (req, res) => {
    try {
        let { id } = req.params;
        let users = await User.find({ course: id });
        if (!users || users.length === 0) {
            return res.status(404).send({ message: 'No se encontraron usuarios con el curso especificado' });
        }
        await User.updateMany({ course: id }, { $pull: { course: id } });
        return res.send({ message: 'Curso desasignado de todos los usuarios correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al desasignar el curso de todos los usuarios' });
    }
}
*/