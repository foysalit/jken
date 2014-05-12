/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
    _ = require('lodash');

/**
 * Find klass by id
 * Note: This is called every time that the parameter :klassId is used in a URL. 
 * Its purpose is to preload the klass on the req object then call the next function. 
 */
exports.klass = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Klass.find({ where: {id: id}, include: [db.User, db.Category]}).success(function(klass){
        if(!klass) {
            return next(new Error('Failed to load klass ' + id));
        } else {
            req.klass = klass;
            return next();            
        }
    }).error(function(err){
        return next(err);
    });
};

/**
 * Create a klass
 */
exports.create = function(req, res) {
    // augment the klass by adding the UserId
    req.body.UserId = req.user.id;
    // save and return and instance of klass on the res object. 
    db.Klass.create(req.body).success(function(klass){
        if(!klass){
            return res.send('users/signup', {errors: err});
        } else {
            return res.jsonp(klass);
        }
    }).error(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a klass
 */
exports.update = function(req, res) {

    // create a new variable to hold the klass that was placed on the req object.
    var klass = req.klass;

    klass.updateAttributes({
        title: req.body.title,
        content: req.body.content
    }).success(function(a){
        return res.jsonp(a);
    }).error(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};

/**
 * Delete an klass
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the klass that was placed on the req object.
    var klass = req.klass;

    klass.destroy().success(function(){
        return res.jsonp(klass);
    }).error(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an klass
 */
exports.show = function(req, res) {
    // Sending down the klass that was just preloaded by the klasses.klass function
    // and saves klass on the req object.
    return res.jsonp(req.klass);
};

/**
 * List of Klasses
 */
exports.all = function(req, res) {
    var params = {
        include: [{
            model: db.User, 
            attributes: ['id']
        }],
        where: {}
    };

    if(req.query.offset) params.offset = req.query.offset;
    if(req.query.limit) params.limit = req.query.limit;

    if(req.query.withCategories){
        params.include.push({
            model: db.Category,
            attributes: ['KlassId', 'id', 'name'] 
        });
    }

    if(req.query.withTransactions) {
        var incTrans = {
            model: db.Transaction,
            attributes: ['amount', 'description', 'KlassId', 'CategoryId']
        };
        params.include.push(incTrans);
    }

    if(req.query.fromDate && req.query.toDate){
        params.where['Transactions.date'] = {between: [
            new Date(req.query.fromDate), 
            new Date(req.query.toDate)
        ]};
    }

    db.Klass.findAll(params).success(function(klasses){
        return res.jsonp(klasses);
    }).error(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });
};