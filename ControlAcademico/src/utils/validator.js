import { compare, hash } from 'bcrypt'

export const encrypt = async(password)=>{
    try {
        return await hash(password,10)
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkpassword = async(password, hash)=>{
    try {
        return await compare(password,hash)
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkUpdate = (data, userId)=>{
    if(userId){
        if(
            Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        )return false
        return true
    }else{
        if(
            Object.entries(data).length === 0 ||
            data.teacher ||
            data.teacher == ''
        )return false
        return true
    }
}