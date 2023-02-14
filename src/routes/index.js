const { Router } = require('express');
const routes = Router();

const usersRouter = require('./user.routes');

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRouter);
routes.use('/products', producsRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/tags', tagsRoutes);


module.exports = routes;