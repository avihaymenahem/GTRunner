var MainDao = function(){
    this.instance = null;

    this.connect = function () {
        var Datastore = require('nedb');
        this.instance = new Datastore({ filename : './assets/data/main.gdb', autoload: true });
    };

    return this;
};

module.exports = MainDao;