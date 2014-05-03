module.exports = function(sequelize, DataTypes) {

    var Category = sequelize.define('Category', {
            id: DataTypes.INTEGER,
            name: DataTypes.STRING
        },
        {
            associate: function(models){
                Category.hasMany(models.Transaction);
                Category.belongsTo(models.User);
            }
        }
    );

    return Category;
};
