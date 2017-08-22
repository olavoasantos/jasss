let Builder = require('./Compiler/Builder');
let CssCompiler = require('./Compiler/CssCompiler');

class Compiler {
    constructor(global) {
        this.global = global;
    }

    run() {
        let elements = (new Builder(this.global)).run();

        return CssCompiler.compile(elements);
    }
}

module.exports = Compiler;
