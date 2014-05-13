
var users       = require('../app/controllers/users');
var klasses    = require('../app/controllers/klasses');
var categories    = require('../app/controllers/categories');
var transactions    = require('../app/controllers/transactions');
var settings       = require('../app/controllers/settings');
var index       = require('../app/controllers/index');

exports.init = function(app, passport, auth) {

    console.log('Initializing Routes');

    // User Routes
    app.get('/login', users.signin);
    //sign up is closed for now
    //app.get('/signup', users.signup);
    app.get('/logout', auth.requiresLogin, users.signout);
    app.get('/users/me', auth.requiresLogin, users.me);

    // Setting up the users api
    //sign up is closed for now
    //app.post('/users', users.create);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), users.session);

    // Finish with setting up the userId param
    app.param('userId', users.user);

    // Class Routes
    app.get('/klasses', auth.requiresLogin, klasses.all);
    app.post('/klasses', auth.requiresLogin, klasses.create);
    app.get('/klasses/:klassId', auth.requiresLogin, klasses.show);
    app.put('/klasses/:klassId', auth.requiresLogin, auth.common.hasAuthorization, klasses.update);
    app.del('/klasses/:klassId', auth.requiresLogin, auth.common.hasAuthorization, klasses.destroy);

    // Category Routes
    app.get('/categories', auth.requiresLogin, categories.all);
    app.post('/categories', auth.requiresLogin, categories.create);
    app.get('/categories/:categoryId', auth.requiresLogin, categories.show);
    app.put('/categories/:categoryId', auth.requiresLogin, auth.common.hasAuthorization, categories.update);
    app.del('/categories/:categoryId', auth.requiresLogin, auth.common.hasAuthorization, categories.destroy);

    // Category Routes
    app.get('/transactions', auth.requiresLogin, transactions.all);
    app.post('/transactions', auth.requiresLogin, transactions.create);
    app.get('/transactions/:transactionId', auth.requiresLogin, transactions.show);
    app.put('/transactions/:transactionId', auth.requiresLogin, auth.common.hasAuthorization, transactions.update);
    app.del('/transactions/:transactionId', auth.requiresLogin, auth.common.hasAuthorization, transactions.destroy);
    
    // Settings Routes
    app.post('/settings/database_backups', auth.requiresLogin, settings.dbBackUp);
    app.get('/settings/database_backups', auth.requiresLogin, settings.getDbBackUps);
    app.get('/settings/database_backups/download', auth.requiresLogin, settings.downloadBackUp);
    app.post('/settings/database_backups/remove', auth.requiresLogin, settings.removeDbBackUp);

    // Finish with setting up the articleId param
    // Note: the articles.article function will be called everytime then it will call the next function.
    app.param('klassId', klasses.klass); 
    app.param('categoryId', categories.category);
    app.param('transactionId', transactions.transaction);

    // Home route
    app.get('/', auth.requiresLogin, index.render);

};
