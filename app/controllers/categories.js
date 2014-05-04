/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * Find category by id
 * Note: This is called every time that the parameter :categoryId is used in a URL. 
 * Its purpose is to preload the category on the req object then call the next function. 
 */
exports.category = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Category.find({ where: {id: id}, include: [db.User, db.Klass, db.Transaction]}).success(function(category){
        if(!category) {
            return next(new Error('Failed to load category ' + id));
        } else {
            req.category = category;
            return next();            
        }
    }).error(function(err){
        return next(err);
    });
};

/**
 * Create a category
 */
exports.create = function(req, res) {
    // augment the category by adding the UserId
    req.body.UserId = req.user.id;
    // save and return and instance of category on the res object. 
    db.Category.create(req.body).success(function(category){
        if(!category){
            return res.send('users/signup', {errors: err});
        } else {
            return res.jsonp(category);
        }
    }).error(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a category
 */
exports.update = function(req, res) {

    // create a new variable to hold the category that was placed on the req object.
    var category = req.category;

    category.updateAttributes({
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
 * Delete an category
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the category that was placed on the req object.
    var category = req.category;

    category.destroy().success(function(){
        return res.jsonp(category);
    }).error(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an category
 */
exports.show = function(req, res) {
    // Sending down the category that was just preloaded by the categories.category function
    // and saves category on the req object.
    return res.jsonp(req.category);
};

/**
 * List of Categories
 */
exports.all = function(req, res) {
    db.Category.findAll({include: [db.User, db.Klass]}).success(function(categories){
        return res.jsonp(categories);
    }).error(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });
};
