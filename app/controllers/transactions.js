/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
    _ = require('lodash');

/**
 * Find transaction by id
 * Note: This is called every time that the parameter :transactionId is used in a URL. 
 * Its purpose is to preload the transaction on the req object then call the next function. 
 */
exports.transaction = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Transaction.find({ where: {id: id}, include: [db.User]}).success(function(transaction){
        if(!transaction) {
            return next(new Error('Failed to load transaction ' + id));
        } else {
            req.transaction = transaction;
            return next();            
        }
    }).error(function(err){
        return next(err);
    });
};

/**
 * Create a transaction
 */
exports.create = function(req, res) {
    // augment the transaction by adding the UserId
    req.body.UserId = req.user.id;
    // save and return and instance of transaction on the res object. 
    db.Transaction.create(req.body).success(function(transaction){
        if(!transaction){
            return res.send('users/signup', {errors: err});
        } else {
            return res.jsonp(transaction);
        }
    }).error(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a transaction
 */
exports.update = function(req, res) {

    // create a new variable to hold the transaction that was placed on the req object.
    var transaction = req.transaction;

    transaction.updateAttributes(req.body).success(function(a){
        return res.jsonp(a);
    }).error(function(err){
        return res.render('error', {
            error: err, 
            status: 500 
        });
    });
};

/**
 * Delete an transaction
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the transaction that was placed on the req object.
    var transaction = req.transaction;

    transaction.destroy().success(function(){
        return res.jsonp(transaction);
    }).error(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an transaction
 */
exports.show = function(req, res) {
    // Sending down the transaction that was just preloaded by the transactions.transaction function
    // and saves transaction on the req object.
    return res.jsonp(req.transaction);
};

/**
 * List of transactions
 */
exports.all = function(req, res) {
    var params = {
        include: [{
            model: db.User, 
            attributes: ['id']
        }],
        where: {}
    };

    if(req.query.fromDate && req.query.toDate){
        params.where['date'] = {between: [
            new Date(req.query.fromDate), 
            new Date(req.query.toDate)
        ]};
    }

    db.Transaction.findAll(params).success(function(transactions){
        return res.jsonp(transactions);
    }).error(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};