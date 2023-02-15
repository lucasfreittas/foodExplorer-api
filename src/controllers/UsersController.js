const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');
const knex = require('../database/knex');

class UsersController{
    async create(request, response){
        const { name, email, password, isAdmin} = request.body

        if(!name || !email || !password){
            throw new AppError('Preencha todos os campos!')
        }

        const emailChecker = await knex('users').where({email}).first();
        if(emailChecker){
            throw new AppError('Este email já está em uso.')
        };

        const hashedPassword = await hash(password, 8)

        const newUser = {
            name,
            email,
            password: hashedPassword,
            admin: isAdmin || false
        };

        await knex('users').insert(newUser);

        return response.json('Usuário criado com sucesso!')
    };

    async update(request, response){
        return response.json('Rota Update Ativa!')
    };

    async delete(request, response){
        return response.json('Rota Delete Ativa!')
    };

}

module.exports = UsersController;
