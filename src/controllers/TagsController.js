class TagsController{
    async read(request, response){
        return response.json('Rota Read Ativa!')
    };

};

module.exports = TagsController;