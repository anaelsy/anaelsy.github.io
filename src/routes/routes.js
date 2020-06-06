const express= require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
router.get('/index.html', indexController.list);

const productsController = require('../controllers/productsController');
router.get('/products.html', productsController.list);

const paymentController = require('../controllers/paymentController');
router.get('/payment.html', paymentController.cart);

const cartController = require('../controllers/cartController');
router.get('/add/:id', cartController.add);
router.get('/cart.html', cartController.cart);
router.get('/cart/update/:id/delete', cartController.remove);
router.get('/cart/update/:id/remove', cartController.removeOne);
router.get('/cart/update/:id/add', cartController.addOne);
router.get('/cart/response/:resp', cartController.ppResp);

module.exports=router;