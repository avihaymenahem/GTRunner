function MainAppController($scope, MainDao, FileParse) {
    var nw = global.window.nwDispatcher.requireNwGui(),
        win = nw.Window.get();
    var self = this;
    this.MainDAO = MainDao;
    this.$scope = $scope;
    this.FileParse = FileParse;
    this.MainDAO.connect();

    this.$scope.projects = [];
    this.$scope.tasks = [];
    this.getProjects();

    $scope.consoleCode = "";
    $scope.addFileInput = "";
    $scope.consoleClosed = true;
    $scope.currentProject = {};

    $scope.loadProjectAssets = function (projectObj) {
        $scope.currentProject = projectObj;
        $scope.tasks = this.FileParse.findGulpTasks(projectObj.path);
    }.bind(this);

    $scope.closeWindow = function () {
        win.close();
    };
    $scope.minimizeWindow = function () {
        win.minimize();
    };

    $scope.runTask = function (task) {
        self.runTask(task, $scope);
    };

    $scope.toggleConsole = function () {
        $scope.consoleClosed = !$scope.consoleClosed;
        $scope.$digest();
    };

    $scope.newProjectFileAddedCallback = function (e) {
        if(e.value === null) {
            return;
        }

        var path = require('path');

        if(path.basename(e.value) !== 'gulpfile.js') {
            window.alert("Only gulpfile.js files are supported");
            return;
        }

        var projectName = window.prompt("Please enter the project\'s name:");

        self.InsertNewProject(projectName, e.value);
        e.value = "null";
    };

    $scope.removeProject = function (projectObject) {
        self.removeProject(projectObject._id);
    };

    $scope.openFileDialog = function () {
        var fileDialogInput = window.document.getElementById("projectFileDialog");
        fileDialogInput.click();
    };
}

MainAppController.prototype.scrollToConsoleBottom = function () {
    var consoleContent = window.document.querySelector(".console-box .content");
    consoleContent.scrollTop = consoleContent.scrollHeight;
};

MainAppController.prototype.runTask = function (obj, $scope) {
    var self = this;
    var util = require('util'),
        exec = require('child_process').exec,
        path = require('path');

    $scope.consoleClosed = false;

    var currentProjectObj = $scope.currentProject;

    exec('cd ' + path.dirname(currentProjectObj.path) + ' && gulp ' + obj, function (error, stdout, stderr) {
        if(stdout !== null) $scope.consoleCode += "<code>" + stdout.trim() + "</code>";
        if(stderr !== null) $scope.consoleCode += "<code>" + stderr.trim() + "</code>";
        if(error !== null) $scope.consoleCode += "<code> \r\n" + error.toString().trim() + "</code>";
        $scope.$digest();
        self.scrollToConsoleBottom();
    });
};

MainAppController.prototype.getProjects = function () {
    this.MainDAO.instance.find({}, function (err, results) {
        this.$scope.projects = results;
        this.$scope.$digest();
    }.bind(this));
};

MainAppController.prototype.InsertNewProject = function (name, path) {
    var ProjectObject = {
        name : name,
        path : path
    };

    this.MainDAO.instance.insert(ProjectObject);
    this.getProjects();
};

MainAppController.prototype.removeProject = function (projectId) {
    this.MainDAO.instance.remove({ '_id' : projectId });
    this.getProjects();
};

module.exports = MainAppController;