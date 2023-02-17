const { Router } = require('express');
const productsRouter = Router();

const ProductsController = require('../controllers/ProductsController');
const productsController = new ProductsController();

const PhotoController = require('../controllers/PhotoController');
const photoController = new PhotoController();
const multer = require('multer');
const uploadConfig = require('../configs/uploads');
const upload = multer(uploadConfig.MULTER);

const checkToken = require('../middlewares/checkToken');

productsRouter.post('/', checkToken, productsController.create);
productsRouter.get('/:id', productsController.read);
productsRouter.put('/:id', checkToken, productsController.update);
productsRouter.delete('/:id', checkToken, productsController.delete);
productsRouter.get('/', checkToken, productsController.index);
productsRouter.patch('/photo/:id', checkToken, upload.single('photo'), photoController.update)

module.exports = productsRouter;
