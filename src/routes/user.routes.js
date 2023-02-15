const { Router } = require('express');
const usersRouter = Router();

const UsersController = require('../controllers/usersController');
const usersController = new UsersController();

const checkToken = require('../middlewares/checkToken');

usersRouter.post('/', usersController.create);
usersRouter.put('/', checkToken, usersController.update);
usersRouter.delete('/', checkToken, usersController.delete);

module.exports = usersRouter;