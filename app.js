/**
 * Module dependencies.
 */
var express     = require('express');
var fs          = require('fs');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load Configurations

var env             = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config          = require('./config/config');
var auth            = require('./config/middlewares/authorization');
var db              = require('./config/sequelize');
var passport        = require('./config/passport');

var app = express();

//Initialize Express
require('./config/express')(app, passport, db);

//Initialize Routes
require('./config/routes').init(app, passport, auth);

//db.sequelize.query('DROP TABLE Sessions');

//Start the app by listening on <port>
var port = process.env.PORT || config.port;

if(typeof config.ip !== 'undefined')
    app.listen(port, config.ip);
else
    app.listen(port);

console.log('Express app started on port ' + port);

//expose app
exports = module.exports = app;


/*
db.sequelize.query('select * from transactions').success(function(ts){
    var cats = _.uniq(_.pluck(ts, 'class'));
    
    _.each(cats, function(c){
        if(c.length > 0){
            db.Klass.create({name: c, UserId: 1});
        }
    });
});

db.sequelize.query('select * from transactions').success(function(ts){
	var cats = _.uniq(_.pluck(ts, 'category'));

    _.each(cats, function(c){
    	if(c.length <= 0) return;

    	klass = _.find(ts, {category: c}).class;

        if(klass == 'SimplePC') var k = 1;
        else if(klass == 'SomeOtherClass') var k = 2;
        
        if(typeof k != 'undefined'){
            db.Category.create({name: c, KlassId: k, UserId: 1});
        }
    });
});

db.Klass.findAll({include: [db.Category, db.User]}).success(function(ks){
    db.sequelize.query('select * from transactions').success(function(ts){
        _.each(ts, function(t){
            _.each(ks, function (k) {
                if(k.name != t.class) return;
                
                _.each(k.categories, function(c){
                    if(c.name != t.category) return;
                    
                    db.Transaction.create({
                        CategoryId: c.id,
                        KlassId: k.id,
                        account: t.account,
                        number: t.number,
                        payee: t.payee,
                        cleared: t.cleared == -1 ? '0' : '1',
                        amount: t.amount,
                        description: t.description
                    });
                });
            });
        });
    });
});
*/