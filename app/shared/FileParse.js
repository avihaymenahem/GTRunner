var FileParse = function () {
    var fs = require('fs');

    this.findGulpTasks = function (filePath) {
        var fileContents = fs.readFileSync(filePath, 'utf8'),
            matches = [];

        fileContents.replace(/gulp\.task\(['"](.*?)['"]/g, function($0, $1) {
            matches.push($1)
        });
        return matches;
    };

    return this;
};

module.exports = FileParse;