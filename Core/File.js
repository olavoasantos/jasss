let fs = require('fs');
let path = require('path');
let appRoot = require("app-root-path");

class File {

    static get(file) {
        let filePath = path.join(appRoot.path, file);

        return fs.readFileSync(filePath, {encoding: 'utf-8'});
    }

}

module.exports = File;
