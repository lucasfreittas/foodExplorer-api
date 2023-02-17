const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../Providers/DiskStorage');

class PhotoController{
    async update(request, response){
        const user_id = request.user.id;
        const { id } = request.params;
        const newPhoto = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex('users').where({id: user_id}).first();
        const product = await knex('products').where({id}).first();

        if(user.admin == false){
            throw new AppError('Somente usuários administradores tem permissão para alterar fotos', 401)
        };

        if(product.photo){
            await diskStorage.deleteFile(product.photo)
        };

        const filename = await diskStorage.saveFile(newPhoto);

        product.photo = filename;
        await knex('products').update(product).where({id});

        return response.json('Deu Certo!');

    };
};

module.exports = PhotoController