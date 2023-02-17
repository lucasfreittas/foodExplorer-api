const { Router } = require('express');
const favoritesRouter = Router();

const FavoritesController = require('../controllers/FavoritesController');
const favoritesController = new FavoritesController();

const checkToken = require('../middlewares/checkToken');

favoritesRouter.post('/', checkToken, favoritesController.create);
favoritesRouter.get('/', checkToken, favoritesController.read);
favoritesRouter.delete('/', checkToken, favoritesController.delete);

module.exports = favoritesRouter;