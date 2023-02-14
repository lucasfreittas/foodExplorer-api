const { Router } = require('express');
const usersRouter = Router();

const UsersController = require('../controllers/usersController');
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

module.exports = usersRouter;