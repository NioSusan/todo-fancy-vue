const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
      })
]

const userSchema = new mongoose.Schema({
    fbId: {
        type : String
    },
    name : {
        type: String,
        required : true,
        validate: nameValidator
    },
    email : {
        type: String,
        unique: true,
        required : true
    },
    password : {
        type: String
    },
    role : {
        type: String,
        default: "user"
    },
    todos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Todo"
    }]
}, {timestamps:true});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;