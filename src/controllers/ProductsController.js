const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const DiskStorage = require('../Providers/DiskStorage');

class ProductsController{
    async create(request, response){
        const { name, description, price, tags, category } = request.body;
        const user_id = request.user.id
        const user = await knex('users').where({id: user_id}).first();

        if(user.admin == false){
            throw new AppError('Usuário não autorizado', 401)
        };

        if(!name || !description || !price || !category){
            throw new AppError('Por favor, preencha todos os campos!')

        };
        
        const newProduct = {
            name,
            description,
            price,
            category 
        };

        const product_id = await knex('products').insert(newProduct)

        const insertTags = tags.map(name => {
            return({
                product_id,
                name
            });
        });

        await knex('tags').insert(insertTags)

        return response.json({newProduct, insertTags, product_id})

    };

    async read(request, response){
        const { id } = request.params;
        const product = await knex('products').where({id}).first();
        const tags = await knex('tags').where({product_id: id}).orderBy('name');

        return response.json({product, tags})
        
    }

    async update(request, response){
        const { id } = request.params;
        const user_id = request.user.id;
        const { name, description, price, tags, category  } = request.body;

        const user = await knex('users').where({id: user_id}).first();
        const product = await knex('products').where({id}).first();

        if(user.admin == false){
            throw new AppError('Usuário não autorizado', 401)
        }

        const updated = {
            name,
            description,
            price
        };

        const newProduct = Object.assign(product, updated);
        await knex('products').where({id}).first().update(newProduct);

        const insertTags = tags.map(name => {
            return({
                product_id: id,
                name
            });
        });

        await knex('tags').where({product_id: id}).delete()
        await knex('tags').where({product_id: id}).insert(insertTags)

        return response.json({product})

    };

    async delete(request, response){
        const { id } = request.params;
        const user_id = request.user.id;
        const user = await knex('users').where({id: user_id}).first()

        if(user.admin == false){
            throw new AppError('Usuário não autorizado', 401)
        }

        await knex('products').where({id}).delete();

        return response.json('Produto deletado com sucesso!')

    };

    async index(request, response){

        const { search } = request.query;

        let products;

        if(search){
            const filterTags = search.split(',').map(tag => tag.trim().toLowerCase());

            const tags = await knex('products')
            .select('products.*')
            .join('tags', 'products.id', '=', 'tags.product_id')
            .whereIn(knex.raw('lower(tags.name)'), filterTags)
            .groupBy('products.name')

            const name = await knex('products')
            .whereLike('name', `%${search}%`)
            .orderBy('name')

            products = [...tags, ...name]
        } else {
            products = await knex('products')
        }
        
        return response.json(products);
    };

};

module.exports = ProductsController;