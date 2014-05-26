module.exports = function(sequelize, DataTypes) {

    var Klass = sequelize.define('Klass', {
            name: DataTypes.STRING
        },
        {
            associate: function(models){
                Klass.hasMany(models.Transaction);
                Klass.belongsTo(models.User);
            }
        }
    );

    return Klass;
};
