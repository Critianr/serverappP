const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const msg = require('../helpers/messages')

const authService = {
    signToken: async function(_id){
        return jwt.sign({ _id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 * 365
        })
    },
    login: async function(data){
        try {
            const { email, password } = data
            let userExists = await User.findOne({email:email}, 'name email password').exec()
            if(await bcrypt.compare(password, userExists.password).then(res=>res)){
                const token = await this.signToken(userExists.id)
                return {
                    user: userExists,
                    code: 200,
                    token
                }
            }else{
                return msg.authFailed
            }
        } catch (error) {
            return error
        }
    },
    register: async function(userData){
        try {
            let hash = await bcrypt.hash(userData.password, 10).then(res => res)
            userData.password = hash
            await userData.save()
            let token = await this.signToken(userData._id)
            return {
                userData,
                code: 200,
                token
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = authService