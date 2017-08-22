let File = require('./File');
let Compiler = require('./Compiler');
let Normalizer = require('./Normalizer');
let Interpreter = require('./Interpreter');

class JaSSS {

    static compile(content, output) {
        let lines = Normalizer.normalize(content);
        let interpreter = new Interpreter(lines);
        interpreter.read();

        let compiled = (new Compiler(interpreter.global)).run();

        if(output) File.make(output, compiled);

        return compiled;
    }

    static compileFile(path, output) {
        let content = File.get(path);

        return this.compile(content, output);
    }

}

module.exports = JaSSS;
