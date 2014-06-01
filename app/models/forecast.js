module.exports = function(sequelize, DataTypes) {
	var Forecast = sequelize.define('Forecast', {
		payee  : DataTypes.TEXT,
		amount  :DataTypes.DECIMAL(19,4),
		description  : DataTypes.TEXT,
		entity  : DataTypes.TEXT,
		category  : DataTypes.TEXT 
	});

	return Forecast;
};