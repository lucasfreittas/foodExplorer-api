const { Router } = require('express');
const ordersRouter = Router();

const OrdersController = require('../controllers/ordersController');
const ordersController = new OrdersController();

ordersRouter.post('/', ordersController.create);
ordersRouter.get('/:id', ordersController.read);
ordersRouter.delete('/:id', ordersController.delete);

