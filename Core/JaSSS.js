let File = require('./File');
let Compiler = require('./Compiler');
let Normalizer = require('./Normalizer');
let Interpreter = require('./Interpreter');

class JaSSS {

    static compile(content) {
        let lines = Normalizer.normalize(content);
        let interpreter = new Interpreter(lines);
        interpreter.read();

        return (new Compiler(interpreter.global)).run();
    }

    static compileFile(path) {
        let content = File.get(path);

        return this.compile(content);
    }

}

module.exports = JaSSS;
