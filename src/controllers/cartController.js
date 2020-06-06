const Cart = require('../models/cart');

const controller = {};

controller.add = (req, res, next) =>{
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    req.getConnection((err, conn) =>{
        var query = conn.query('Select * from products', (err, products) =>{
            console.log(query.sql);
            if(err){
                res.json(err);
                console.log(err);
            }
            var product = products.filter(function(item) {
                return item.id == productId;
            });
            cart.add(product[0], productId);
            req.session.cart = cart;
            console.log(req.session.cart);
            req.flash('success', 'Producto agregado!');
            res.redirect('back');
        });
    });
};

controller.cart = (req, res) =>{
    if(!req.session.cart) {
        return res.render('cart.html', {
            title: "Carrito",
            products: []
        });
    }
    var cart = new Cart(req.session.cart);
    console.log(req.session.cart.totalItems);

    res.render('cart.html', {
        title:'Carrito',
        products: cart.getItems(),
        totalPrice: cart.totalPrice
    });
};

controller.remove = (req, res) =>{
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart.html');
};

controller.removeOne = (req, res) =>{
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeOne(productId);
    req.session.cart = cart;
    res.redirect('/cart.html');
};

controller.addOne = (req, res) =>{
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.addOne(productId);
    req.session.cart = cart;
    res.redirect('/cart.html');
};

controller.ppResp = (req, res) =>{
    var response =req.params.resp;
    if(response =="success"){
        req.flash('success', 'Su compra ha sido completada.');
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.removeItems();
        req.session.cart = cart;
    }else{
        req.flash('danger', 'Compra cancelada');
    }

    res.redirect('/cart.html');
};

module.exports = controller;