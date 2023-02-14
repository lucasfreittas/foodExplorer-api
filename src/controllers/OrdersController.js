class OrdersController{
    async create(request, response){
        return response.json('Rota Create Ativa!')
    };

    async read(request, response){
        return response.json('Rota Read Ativa!')
    }

    async delete(request, response){
        return response.json('Rota Delete Ativa!')
    };

};

module.exports = OrdersController;