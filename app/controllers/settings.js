var config = require('../../config/config'),
	_ = require('lodash'),
	fs = require('fs'),
	sys = require('sys'),
	FOLDER = 'dbs',
	exec = require('child_process').exec;

//create the db directory if doesn't exist
if(!fs.existsSync(FOLDER))
	fs.mkdirSync(FOLDER, '0777');

exports.dbBackUp = function (req, res) {
	var pass = config.db.password,
		user = config.db.username,
		db = config.db.name,
		file = FOLDER +'/'+ new Date().getTime() + '.sql';

	if(process.env.NODE_ENV == 'production')
		var command = "mysqldump -h "+ config.db.host +" --user "+ user +" --password="+ pass +" "+ db +" > "+ file;
	else
		var command = "mysqldump --user "+ user +" --password="+ pass +" "+ db +" > "+ file;

	console.log(command);
	exec(command);

	return res.json({
		'done': true
	});
};

exports.getDbBackUps = function (req, res) {
	var files = fs.readdirSync(FOLDER),
		data = [];

	_.each(files, function (file) {
		var date = new Date(parseInt(file.split(".")[0]));
		data.push({
			file: file,
			url: "settings/database_backups/download?file="+ file,
			createdAt: date 
		});
	});

	return res.json(data);
};

exports.downloadBackUp = function (req, res) {
	var filename = req.query.file,
		file = FOLDER +'/'+ filename;

	fs.exists(file, function(exists){
		if(exists){
			return res.download(file);
		}

		return res.render('404', {
            status: 404
        });
	});
};

exports.removeDbBackUp = function (req, res) {
	var filename = req.body.file,
		file = FOLDER +'/'+ filename;

	fs.unlink(file, function(err){
		if(!err){
			return res.json({
				'done': true
			});
		}

		return res.render('404', {
            status: 404
        });
	});
};