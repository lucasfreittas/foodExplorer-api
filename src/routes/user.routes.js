const { Router } = require('express');
const usersRouter = express();

const UsersController = require('../controllers/usersController');
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.put('/', usersController.update);
usersRouter.delete('/', usersController.delete);

module.exports = usersRouter;