let fs = require('fs');
let path = require('path');
let appRoot = require("app-root-path");

class File {

    static get(file) {
        let filePath = path.join(appRoot.path, file);

        return fs.readFileSync(filePath, {encoding: 'utf-8'});
    }

    static make(file, content) {
        let filePath = path.join(appRoot.path, file);
        fs.writeFile(filePath, content, function(err) {
            if(err) {
                throw new Error(err);
            }
        });
    }

}

module.exports = File;
