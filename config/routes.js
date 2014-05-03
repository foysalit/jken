
var users       = require('../app/controllers/users');
var articles    = require('../app/controllers/articles');
var categories    = require('../app/controllers/categories');
var transactions    = require('../app/controllers/transactions');
var index       = require('../app/controllers/index');

exports.init = function(app, passport, auth) {

    console.log('Initializing Routes');

    // User Routes
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    // Setting up the users api
    app.post('/users', users.create);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    // Finish with setting up the userId param
    app.param('userId', users.user);

    // Article Routes
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    // Category Routes
    app.get('/categories', categories.all);
    app.post('/categories', auth.requiresLogin, categories.create);
    app.get('/categories/:articleId', categories.show);
    app.put('/categories/:articleId', auth.requiresLogin, auth.article.hasAuthorization, categories.update);
    app.del('/categories/:articleId', auth.requiresLogin, auth.article.hasAuthorization, categories.destroy);

     // Category Routes
    app.get('/transactions', transactions.all);
    app.post('/transactions', auth.requiresLogin, transactions.create);
    app.get('/transactions/:articleId', transactions.show);
    app.put('/transactions/:articleId', auth.requiresLogin, auth.article.hasAuthorization, transactions.update);
    app.del('/transactions/:articleId', auth.requiresLogin, auth.article.hasAuthorization, transactions.destroy);

    // Finish with setting up the articleId param
    // Note: the articles.article function will be called everytime then it will call the next function. 
    app.param('articleId', articles.article);
    app.param('categoryId', categories.category);
    app.param('transactionId', transactions.transaction);

    // Home route
    app.get('/', index.render);

};
