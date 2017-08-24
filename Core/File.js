let fs = require('fs');
let path = require('path');
let appRoot = require("app-root-path");

class File {

    static get(file) {
        return fs.readFileSync(this.pathTo(file), {encoding: 'utf-8'});
    }

    static getCore(file) {
        return fs.readFileSync(this.pathToCore(file), {encoding: 'utf-8'});
    }

    static make(file, content) {
        fs.writeFile(this.pathTo(file), content, function(err) {
            if(err) {
                throw new Error(err);
            }
        });
    }

    static check(file) {
        return fs.existsSync(this.pathTo(file));
    }

    static exists(file) {
        return fs.existsSync(this.pathTo(file));
    }

    static import(file) {
        return require(this.pathTo(file));
    }

    static importCore(file) {
        return require(this.pathToCore(file));
    }

    static pathTo(file) {
        return path.join(appRoot.path, file);
    }

    static pathToCore(file) {
        return path.join(__dirname, file);
    }

}

module.exports = File;
