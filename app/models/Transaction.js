module.exports = function(sequelize, DataTypes) {

    var Transaction = sequelize.define('Transaction', {
            account: DataTypes.INTEGER,
            amount: DataTypes.DECIMAL(10, 2),
            payee: DataTypes.STRING,
            class: DataTypes.STRING,
            description: DataTypes.TEXT
        },
        {
            associate: function(models){
                Transaction.belongsTo(models.Category);
                Transaction.belongsTo(models.User);
            }
        }
    );

    return Transaction;
};
