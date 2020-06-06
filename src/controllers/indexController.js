const controller = {};

controller.list = (req, res) =>{
    res.render('index.html', {
        title: 'Index Page'
    });

};

module.exports = controller;