const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class OrdersController{
    async create(request, response){
        const { description, total } = request.body;
        const user_id = request.user.id;
        const user = await knex('users').where({id: user_id}).first();

        if(!user){
            throw new AppError('Usuário não autorizado', 401)
        }

        if(description.length == 0 || !total){
            throw new AppError('Pedido Vazio, por favor preencha um novo pedido.')
        }

        const descriptionString = description.reduce((acc, item) => {
            if (!acc[item]) {
              acc[item] = { name: item, count: 0 };
            }
          
            acc[item].count++;
          
            return acc;
          }, {});
          
          const products = Object.values(descriptionString)
            .map((item) => `${item.count}x ${item.name}`)
            .join(", ");

        const newOrder = {
            user_id,
            description: products,
            total,
            created_at: new Date().toLocaleString('pt-BR')
        };

        await knex('orders').insert(newOrder);

        return response.json(newOrder)
    };

    async read(request, response){
        const user_id = request.user.id;
        const user = await knex('users').where({id: user_id}).first();
        const orders = await knex('orders').where({user_id});

        if(user.admin == true){
            const clientOrders = await knex('orders');
            return response.json(clientOrders);
        };

        return response.json(orders.slice(-5));
    };

    async update(request, response){
        const { status, description, total } = request.body;

        const { id } = request.params;
        const order = await knex('orders').where({id}).first()

        const user_id = request.user.id;
        const user = await knex('users').where({id: user_id}).first();

        if(user.admin == false){
            throw new AppError('Usuário não autorizado, por favor entre em contato para alterar o pedido');
        };

        if(!status && !description && !total){
            return response.json(order)
        };

        const updated = {
            status,
            description,
            total
        };

        const newOrder = Object.assign(order, updated)
        await knex('orders').where({id}).update(newOrder);
       
        return response.json(newOrder)
    };

    async delete(request, response){
        const {id} = request.params;
        const user_id = request.user.id;
        const user = await knex('users').where({id: user_id}).first()

        if(user.admin == false){
            throw new AppError('Usuário não autorizado a realizar essa operação')
        };

        await knex('orders').where({id}).first().delete()

        return response.json("Pedido deletado com sucesso!");
    };

};

module.exports = OrdersController;