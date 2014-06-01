var _       = require('lodash'), 
    Async   = require('async');

module.exports = function (sequelize) {
    if(!sequelize) return;

    var fields = 'amount, entity, category, payee, date, cleared, account, number, description';
        
    setTimeout(function () {
        sequelize
            .query('INSERT INTO Transactions('+ fields +') SELECT '+ fields +' FROM transactions')
            .success(function () {
                console.log('db imported');
            })
            .failure(function (err) {
               console.log('couldnt import db', err); 
            });
    }, 1500);
};