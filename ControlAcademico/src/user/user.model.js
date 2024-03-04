import {Schema,model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    course:[{
        type: Schema.ObjectId,
        ref:'course',
        required: false
    }],
    role:{
        type: String,
        uppercase: true,
        enum: ['TEACHER','STUDENT'],
        required: true
    }
})


export default model('user', userSchema)