let File = require('../File');
let Normalizer = require('../Normalizer');

class Import {
    static verify(line) {
        if(line.endsWith(");") && line.startsWith("import(")) {
            return true;
        }

        return false;
    }

    constructor(line) {
        this.line = line;
        this.lines = "";
    }

    parse() {
        let path = this.line.match(/import\([\'|\"](.*)[\'|\"]\);/,"g")[1];
        let content = File.get(`${path}.jasss`);

        this.lines = Normalizer.normalize(content);
    }

    register(interpreter, currLine) {
        interpreter.lines.splice(currLine, 1);
        this.lines.reverse().forEach( line => {
            interpreter.lines.splice(currLine, 0, line);
        });
    }
}

module.exports = Import;
