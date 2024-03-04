'use strict'

import  jwt from 'jsonwebtoken'

const secretkey = '@LlaveSuperSecretaIN6AV@'

export const generateJwt = async(payload)=>{
    try {
        return jwt.sign(payload, secretkey, {
            expiresIn: '3h',
            algorithm: 'HS256'
        })
    } catch (error) {
        console.error(error)
        return error
    }
}