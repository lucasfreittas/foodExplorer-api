const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const authConfig = require('../configs/auth');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken')

class SessionsController{
    async create(request, response){
        const { email, password } = request.body;
        const user = await knex('users').where({email}).first();
        
        if(!user){
            throw new AppError('Email e/ou senha incorretos', 401)
        }

        const passwordCheck = await compare(password, user.password);


        if(passwordCheck === false){
            throw new AppError('Senha Errada', 401)
        };

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })
        

        return response.json({user, token})
    };

};

module.exports = SessionsController;