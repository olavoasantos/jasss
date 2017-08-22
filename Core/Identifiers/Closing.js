class Closing {
    static verify(line) {
        if(line.endsWith("}")) {
            return true;
        }

        return false;
    }

    constructor(line) {
        this.line = line;
    }

    parse() {
    }

    register(interpreter) {
        let el = interpreter.active.pop();

        if(el.constructor.name === "Element") {
            if(el.abstract && interpreter.scope().constructor.name === "Global") {
                interpreter.scope().abstract.push(el);
            } else {
                interpreter.scope().elements.push(el);
            }
        }
    }
}

module.exports = Closing;
