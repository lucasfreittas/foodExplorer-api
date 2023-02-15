const { Router } = require('express');
const productsRouter = Router();

const ProductsController = require('../controllers/ProductsController');
const productsController = new ProductsController();

const checkToken = require('../middlewares/checkToken');

productsRouter.post('/', checkToken, productsController.create);
productsRouter.get('/:id', productsController.read);
productsRouter.put('/:id', checkToken, productsController.update);
productsRouter.delete('/:id', checkToken, productsController.delete);
productsRouter.get('/', checkToken, productsController.index);

module.exports = productsRouter;
