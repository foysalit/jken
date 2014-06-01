
var users       = require('../app/controllers/users');
var transactions    = require('../app/controllers/transactions');
var settings       = require('../app/controllers/settings');
var index       = require('../app/controllers/index');

exports.init = function(app, passport, auth) {

    console.log('Initializing Routes');

    // User Routes
    app.get('/login', users.signin);
    //sign up is closed for now
    app.get('/signup', users.signup);
    app.get('/logout', auth.requiresLogin, users.signout);
    app.get('/users/me', auth.requiresLogin, users.me);

    // Setting up the users api
    //sign up is closed for now
    app.post('/users', users.create);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), users.session);

    // Finish with setting up the userId param
    app.param('userId', users.user);

    // Category Routes
    app.get('/transactions', auth.requiresLogin, transactions.all);
    app.get('/transactions/count', auth.requiresLogin, transactions.count);
    app.post('/transactions', auth.requiresLogin, transactions.create);
    app.get('/transactions/forecasts', auth.requiresLogin, auth.common.hasAuthorization, transactions.forecasts);
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
   app.param('transactionId', transactions.transaction);

    // Home route
    app.get('/', auth.requiresLogin, index.render);

};
