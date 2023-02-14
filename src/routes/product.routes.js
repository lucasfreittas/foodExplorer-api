const { Router } = require('express');
const productsRouter = Router();

const ProductsController = require('../controllers/ProductsController');
const productsController = new ProductsController();

productsRouter.post('/', productsController.create);
productsRouter.get('/:id', productsController.read);
productsRouter.update('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

