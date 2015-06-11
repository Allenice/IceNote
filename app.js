/**
 * Created by allenice on 15/4/27.
 */

var Sequelize = require('sequelize');

global.rootPath = __dirname;
global.config = require('./server/config.json');
global.sequelize = new Sequelize(config.database.name, config.database.user, config.database.pwd);

require('./server/server');