const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class FavoritesController{
    async create(request, response){
        const { product_id } = request.body;
        const user_id = request.user.id;

        const product = await knex('products').where({id: product_id}).first();

        if(!product){
            throw new AppError('Produto não encontrado.')
        };
        
        const favorite = {
            user_id,
            product_id: product.id
        };

        await knex('favorites').insert(favorite);

        return response.json();
    };

    async read(request, response){
        const user_id = request.user.id;
        const userFavorites = await knex('favorites').where({user_id});
        const products_id = userFavorites.map(product => {
            return product.product_id
        });

        const products = await knex('products').whereIn('id', products_id);

        return response.json(products)
    };

    async delete(request, response){
        const { product_id } = request.body;
        const user_id = request.user.id;
        await knex('favorites').where({user_id, product_id}).delete();

        return response.json()
    };
};

module.exports = FavoritesController