class Variable {
    static verify(line) {
        if(line.endsWith(";") && line.includes("=")) {
            return true;
        }

        return false;
    }

    constructor(line) {
        this.line = line;
        this.name = "";
        this.value = "";
    }

    parse() {
        let line = this.line.replace(/;/g, "");
        [this.name, this.value] = line.split(" = ");
    }

    register(interpreter) {
        if(interpreter.scope().variables.where("name", this.name).isEmpty()) {
            interpreter.scope().variables.push(this);
        } else {
            interpreter.scope().variables = interpreter.scope().variables.map((variable)=> {
                if(variable.name === this.name) {
                    return this;
                } else {
                    return variable;
                }
            });
        }
    }
}

module.exports = Variable;
