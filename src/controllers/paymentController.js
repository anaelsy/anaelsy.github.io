const Cart = require('../models/cart');

const controller = {};

controller.list = (req, res) =>{
    res.render('payment.html', {
        title: 'Payment Page'
    });

};

controller.cart = (req, res) =>{
    if(!req.session.cart) {
        return res.render('payment.html', {
            title: "Carrito",
            products: []
        });
    }
    var cart = new Cart(req.session.cart);
    console.log(req.session.cart.totalItems);

    res.render('payment.html', {
        title:'Carrito',
        products: cart.getItems(),
        totalPrice: cart.totalPrice
    });
};

module.exports = controller;