const AppError = require('../utils/AppError');
const { hash, compare } = require('bcryptjs');
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
            admin: isAdmin || false,
            updated_at: new Date().toLocaleString('pt-BR')
        };

        await knex('users').insert(newUser);

        return response.json('Usuário criado com sucesso!')
    };

    async update(request, response){
        const {name, email, password, old_password} = request.body;
        const user_id = request.user.id;
        const user = await knex('users').where({id: user_id}).first();

        if(email){
            const userByEmail = await knex('users').where({email}).first();
            if(userByEmail && userByEmail.id != user_id)
            throw new AppError('E-mail já está em uso!', 401)
        }

        if(password && !old_password){
            throw new AppError('Por favor, informe a senha antiga', 401)
        }

        const hashedPassword = await hash(password, 8)
       
        const updated = {
            name,
            email,
            password: hashedPassword,
            updated_at: new Date().toLocaleString('pt-BR')
        }

        const newUser = Object.assign(user, updated)
        await knex('users').where({id: user_id}).first().update(newUser)

        return response.json(newUser)
    };

    async delete(request, response){
        const user_id = request.user.id;
        await knex('users').where({id: user_id}).first().delete();

        return response.json('Usuário deletado com sucesso!')
    };

}

module.exports = UsersController;
