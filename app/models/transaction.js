module.exports = function(sequelize, DataTypes) {

    var Transaction = sequelize.define('Transaction', {
            account: DataTypes.INTEGER,
            amount: DataTypes.DECIMAL(10, 2),
            payee: DataTypes.STRING,
            entity: DataTypes.STRING,
            category: DataTypes.STRING,
            number: DataTypes.INTEGER,
            cleared: DataTypes.ENUM('0', '1'),
            date: DataTypes.DATE,
            description: DataTypes.TEXT
        },
        {
            associate: function(models){
                Transaction.belongsTo(models.User);
            }
        }
    );

    return Transaction;
};
