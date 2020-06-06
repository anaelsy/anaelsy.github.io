const controller = {};

controller.list = (req, res) =>{
    res.render('products.html', {
        title: 'Products Page'
    });
};

controller.list = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('select * from products', (err, products) =>{
            if(err){
                res.json(err);
            }
            console.log(products);
            res.render('products.html', {
                data:products,
                title: 'Product Page'
            });
        });
    });
};


module.exports = controller;