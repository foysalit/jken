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
    req.query.includeUser = true;
    var params = buildTransactionsQuery(req.query);

    db.Transaction.findAll(params).success(function(transactions){
        return res.jsonp(transactions);
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
exports.count = function(req, res) {
    var params = buildTransactionsQuery(req.query);

    db.Transaction.count().success(function (count) {
        return res.jsonp(count);
    }).error(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

var buildTransactionsQuery = function (filters) {
    var params = {
        include: [],
        where: {}
    };

    if(filters.includeUser){
        params.include.push({
            model: db.User, 
            attributes: ['id']
        });
    }

    if(filters.fromDate && filters.toDate){
        params.where['date'] = {between: [
            new Date(filters.fromDate), 
            new Date(filters.toDate)
        ]};
    }

    if(filters.limit && parseInt(filters.limit) > 0) 
        params.limit = req.query.limit;

    if(filters.perPage && parseInt(filters.perPage) > 0) 
        params.limit = filters.perPage;

    if(filters.offset && parseInt(filters.offset) > 0) 
        params.offset = filters.offset;

    return params
};

var buildProfitLoss = function (transactions) {
    tmp = {};
    
    for(i=0;i<transactions.length;i++){
        var entity = transactions[i]['entity'],
            cat = transactions[i]['category'],
            payee = transactions[i]['payee'],
            amount = transactions[i]['amount'];
            
        if (tmp[entity]) {
            tmp[entity].total += amount;

            if(tmp[entity][cat]){
                tmp[entity][cat].total += amount;

                if(tmp[entity][cat][payee]){
                    tmp[entity][cat][payee].amount += amount;
                }else{
                    tmp[entity][cat][payee] = {'amount': amount};
                }
            }else{
                tmp[entity][cat] = {};
                tmp[entity][cat][payee] = {'amount': amount};
            }
        }else{
            tmp[entity] = {total : 0.00};
            tmp[entity][cat] = {total: 0.00};
            tmp[entity][cat][payee] = {'amount': amount};
        }
    }
};

var buildForecasts = function(forecasts, transactions){
    tmp = {};
    
    for(i=0;i<transactions.length;i++){
        var entity = transactions[i]['entity'],
            cat = transactions[i]['category'],
            payee = transactions[i]['payee'],
            amount = transactions[i]['amount'];
            
        if (tmp[entity]) {
          
            if(tmp[entity][cat]){
                if(tmp[entity][cat][payee]){
                    tmp[entity][cat][payee].amount += amount;
                }else{
                    tmp[entity][cat][payee] = {'amount': amount};
                }
            }else{
                tmp[entity][cat] = {};
                tmp[entity][cat][payee] = {'amount': amount};
            }
        }else{
        
            tmp[entity] = {};
            tmp[entity][cat] = {};
            tmp[entity][cat][payee] = {'amount': amount};
            
        
        }
    }
    
    for(i=0;i<forecasts.length;i++){
        var entity = forecasts[i]['entity'],
            cat = forecasts[i]['category'],
            payee = forecasts[i]['payee'],
            amount = forecasts[i]['amount'];
            
        if (tmp[entity]) {
          
            if(tmp[entity][cat]){
                if(tmp[entity][cat][payee]){
                    tmp[entity][cat][payee].forecast = amount
                }else{
                    tmp[entity][cat][payee] = {'forecast': amount};
                }
            }else{
                tmp[entity][cat] = {};
                tmp[entity][cat][payee] = {'forecast': amount};
            }
        }else{
        
            tmp[entity] = {};
            tmp[entity][cat] = {};
            tmp[entity][cat][payee] = {'forecast': amount};
            
        
        }
    }
    
    return tmp;
};

var getTransactionsByDate = function(from, to){
    return db.Transaction.findAll({ 
        attributes: ['entity', 'category', 'payee', [db.sequelize.fn('sum', db.sequelize.col('amount')), 'amount']],
        group:['entity', 'category', 'payee'], 
        where: ["`date` >= ? and `date` <= ?",
            from,
            to
        ]
    });
};

var getForecasts = function(){
    return db.Forecast.findAll({
        attributes: ['entity', 'category', 'payee', [db.sequelize.fn('sum', db.sequelize.col('amount')), 'amount']],
        group:['entity', 'category', 'payee']
    });
};

exports.forecasts = function(req, res){
    var from = req.query.fromDate,
        to = req.query.toDate;

    //better option would be to use async.js or promise
    getTransactionsByDate(from, to).success(function(transactions){
        getForecasts().success(function(forecasts){
            var data = buildForecasts(forecasts, transactions);
            res.json(data);
        });
    });
};