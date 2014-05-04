module.exports = function(sequelize, DataTypes) {

    var Transaction = sequelize.define('Transaction', {
            account: DataTypes.INTEGER,
            amount: DataTypes.DECIMAL(10, 2),
            payee: DataTypes.STRING,
            number: DataTypes.INTEGER,
            cleared: DataTypes.ENUM(0, 1),
            description: DataTypes.TEXT
        },
        {
            associate: function(models){
                Transaction.belongsTo(models.Klass);
                Transaction.belongsTo(models.Category);
                Transaction.belongsTo(models.User);
            }
        }
    );

    return Transaction;
};
