var _       = require('lodash'), 
    Async   = require('async'), 
    Db      = require('../../config/sequelize');

setTimeout(function(){
    Async.series([importClasses, importCategories, importTransactions], function (err, result) {
        if(err){
            console.log('error in the process');
        }else{
            _.each(result, function (r) {
                console.log(r);
            });
        }
    });
}, 5000);

var importTransactions = function(callback){
    Db.Klass.findAll({include: [Db.Category, Db.User]}).success(function(ks){
        Db.sequelize.query('select * from transactions').success(function(ts){
            _.each(ts, function(t){
                if(t.class == '') t.class = 'N/A';
                if(t.category == '') t.category = 'N/A';

                _.each(ks, function (k) {
                    if(k.name != t.class) return;
                    
                    _.each(k.categories, function(c){
                        if(c.name != t.category) return;
                        
                        Db.Transaction.create({
                            CategoryId: c.id,
                            KlassId: k.id,
                            UserId: 1,
                            account: t.account,
                            number: t.number,
                            payee: t.payee,
                            date: t.date,
                            cleared: t.cleared == -1 ? '0' : '1',
                            amount: t.amount,
                            description: t.description
                        });
                    });
                });
            });

            setTimeout(function(){
                callback(null, 'transactions inserted');
            }, 40000);
        });
    });
};

var importClasses = function(callback){
    Db.sequelize.query('select * from transactions group by class').success(function(ks){
        _.each(ks, function(c){
            if(c.class.length > 0){
                Db.Klass.create({name: c.class, UserId: 1});
            }else{
                Db.Klass.create({name: 'N/A', UserId: 1});
            }
        });

        setTimeout(function(){
            callback(null, 'classes inserted');
        }, 5000);
    });
};

var importCategories = function(callback){
    Db.sequelize.query('select category, class from transactions group by category, class').success(function(cats){
        Db.Klass.findAll().success(function(klasses){
            _.each(cats, function(c){
                if(c.class.length <= 0) c.class = 'N/A';

                if(c.category.length <= 0) name = 'N/A';
                else name = c.category;

                klass = _.find(klasses, {name: c.class});
                
                if(typeof klass != 'undefined'){
                    Db.Category.create({name: name, KlassId: klass.id, UserId: 1});
                }
            });
                
            setTimeout(function(){
                callback(null, 'categories inserted');
            }, 10000);
        });
    });
};