'use strict'

import { checkUpdate, checkpassword, encrypt } from '../utils/validator.js'
import User from './user.model.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res)=>{
    return res.send("Si funciono")
}

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let user = await User.findOne({ username }) 
        if(user && await checkpassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({message: `Welcome ${user.name}`, 
            loggedUser,
            token               
            })
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const registerAutomatic = async()=>{
    try {
        let persona ={
            name: 'Juan',
            surname: 'Roquel',
            email: 'juan@gmail.com',
            username: 'juanroque',
            password: '12345678',
            role: 'TEACHER'
        }
        persona.password = await encrypt(persona.password)
        let user = new User(persona)
        await user.save()
        return console.log("Guardado exitosamente")
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error in automatic create user with role teacher'})
    }
}

export const register = async(req, res)=>{
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'STUDENT'
        let user = new User(data)
        await user.save()
        return res.send({message:'Registered Successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'error saving user', error})
    }
}

export const update = async(req, res)=>{
    try {
        let { id } = req.params
        let data  =  req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submited some data that cannot be update or missing'})
        let updateUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}    
        )
        if(!updateUser) return res.status(400).send({message : `User not found and not update`})
        return res.send({message: 'Update user', updateUser})
    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `Username ${error.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating acount'})
    }
}
export const deleteU = async(req, res) =>{
    try {
        let { id } = req.params
        let deletedUser = await User.findOneAndDelete({_id: id})
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`})
    } catch (error) {
        return res.status(500).send({message: 'Error deleting account'})
    }
}

export const asignarCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { course } = req.body;
        if (!course) {
            return res.status(400).send({ message: 'El ID del curso es requerido' });
        }
        let user = await User.findById(id)

        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        if (user.course.includes(course)) {
            return res.status(400).send({ message: 'El usuario ya tiene este curso asignado' });
        }
        if (user.course.length >= 3) {
            return res.status(400).send({ message: 'El usuario ya tiene el máximo de cursos asignados' });
        }
        user.course.push(course);
        await user.save();
        return res.status(200).send({ message: 'Curso asignado correctamente', user });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al asignar el curso' });
    }
}


