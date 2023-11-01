const { Router } = require('express');
const ordersRouter = Router();

const OrdersController = require('../controllers/OrdersController')
const ordersController = new OrdersController();

const checkToken = require('../middlewares/checkToken');

ordersRouter.post('/', checkToken, ordersController.create);
ordersRouter.get('/', checkToken, ordersController.read);
ordersRouter.put('/:id', checkToken, ordersController.update);
ordersRouter.delete('/:id', checkToken, ordersController.delete);

module.exports = ordersRouter

