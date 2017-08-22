class Property {
    static verify(line) {
        if(line.endsWith(";") && line.includes(":") && !line.includes("=")) {
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
        [this.name, this.value] = line.split(": ");
    }

    register(interpreter) {
        let el = interpreter.active.pop();
        el.properties.push(this);
        interpreter.active.push(el);
    }
}

module.exports = Property;
