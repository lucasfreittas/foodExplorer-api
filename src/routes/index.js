const { Router } = require('express');
const routes = Router();

const usersRouter = require('./user.routes');
const ordersRouter = require('./order.routes');
const sessionsRouter = require('./sessions.routes');
const productsRouter = require('./product.routes');
const tagsRouter = require('./tag.routes');
const favoritesRouter = require('./favorites.routes');

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);
routes.use('/tags', tagsRouter);
routes.use('/favorites', favoritesRouter);


module.exports = routes;