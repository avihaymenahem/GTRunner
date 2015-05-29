var Config = require('./config.json');
var app = angular.module('GTRunner', ['ngSanitize']);

/** Services */
var FileParseService = require(Config.Paths.App.Shared + 'FileParse.js');
app.factory('FileParse', FileParseService);

var MainDAOService = require(Config.Paths.App.Shared + 'MainDAO.js');
app.factory('MainDao', MainDAOService);

/** Controllers */
var MainAppController = require(Config.Paths.App.Components + 'MainAppController.js');
app.controller('MainAppController', ['$scope', 'MainDao', 'FileParse', MainAppController]);