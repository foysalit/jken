var _       = require('lodash'), 
    Async   = require('async'), 
    Db      = require('../../config/sequelize');

setTimeout(function(){
    Async.series([importEntities, importCategories, importTransactions], function (err, result) {
        if(err){
            console.log('error in the process');
            console.log(err);
        }else{
            _.each(result, function (r) {
                console.log(r);
            });
        }
    });
}, 5000);

var importTransactions = function(endImport){
    Async.parallel({
        entities : function (callback) {
            Db.Klass.findAll().success(function (klasses) {
                callback(null, klasses);
            }).failure(function (err) {
                callback(err);
            });
        },
        categories: function (callback) {
            Db.Category.findAll().success(function (categories) {
                callback(null, categories);
            }).failure(function (err) {
                callback(err);
            });
        },
        transactions: function(callback) {
             Db.sequelize.query('select * from transactions').success(function (transactions) {
                callback(null, transactions);
            }).failure(function (err) {
                callback(err);
            });
        }
    }, function (err, data) {
        if(err){
            console.log('retreival error', err);
            return;
        }

        Async.each(data.transactions, function (t, nextEntry) {
            var entityName      = t.entity.length > 0 ? t.entity : 'N/A',
                categoryName    = t.category.length > 0 ? t.category : 'N/A',
                category      = _.find(data.categories, {name: categoryName}),
                klass        = _.find(data.entities, function(e){
                    return e.name.toUpperCase() == entityName.toUpperCase();
                });

            if(typeof category === 'undefined' || typeof klass === 'undefined'){
                nextEntry(t);
                return;
            }

            Db.Transaction.create({
                CategoryId: category.id,
                KlassId: klass.id,
                UserId: 1,
                account: t.account,
                number: t.number,
                payee: t.payee,
                date: t.date,
                cleared: t.cleared == -1 ? '0' : '1',
                amount: t.amount,
                description: t.description
            }).success(function () {
                nextEntry();
            }).failure(function (err) {
                nextEntry(err);
            });
        }, function (err) {
            if(err){
                endImport(err);
                return;
            }

            endImport(null, 'transactions imported');
        });
    });
};

var importEntities = function(callback){
    Db.sequelize.query('select entity from transactions group by entity').success(function(entities){
        Async.each(entities, function(c, nextEntry){
            if(c.entity.length > 0)
                var name = c.entity;
            else
                var name = 'N/A';

            Db.Klass.create({name: name, UserId: 1})
                .success(function () {
                    nextEntry();
                })
                .failure(function (err) {
                    nextEntry(err);
                });
        }, function (err) {
            if(err){
                console.log('error importing entities', err);
                callback('error importing entities');
                return;
            }

            callback(null, 'entities inserted');
        });
    }).failure(function (err) {
        console.log(err);
        callback(err);
    });
};

var importCategories = function(callback){
    Db.sequelize.query('select category from transactions group by category').success(function(cats){
        Async.each(cats, function (c, nextEntry) {
           
            if(c.category.length <= 0) var name = 'N/A';
            else var name = c.category;
            
            Db.Category.create({name: name, UserId: 1})
                .success(function () {
                    nextEntry();
                })
                .failure(function (err) {
                    nextEntry(err);
                });
         
        }, function (err) {
            if(err){
                console.log('error importing cats', err);
                callback('error importing cats');
                return;
            }

            callback(null, 'categories inserted');
        });
    });
};