let collect = require("collect.js");
let Identifier = require('./Identifier');
let Global = require("./Elements/Global");

class Interpreter {

    constructor(lines) {
        this.lines = lines;
        this.global = new Global;
        this.active = collect([]);
        this.indentifier = new Identifier;
    }

    scope() {
        if(this.active.isEmpty()) {
            return this.global;
        } else {
            return this.active.first();
        }
    }

    read() {
        this.import();

        this.lines.forEach( (line, number) => {
            this.run(line, number);
        });
    }

    import() {
        for(let i = 0; i < this.lines.length; i++){
            let line = this.indentifier.verify(this.lines[i]);
            if(line.constructor.name === "Import") {
                line.parse();
                line.register(this, i);

                i = -1;
            }
        }
    }

    run(line, number) {
        line = this.indentifier.verify(line);
        line.parse();
        line.register(this, number);
    }

}

module.exports = Interpreter;
