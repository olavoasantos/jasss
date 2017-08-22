let Import = require('./Identifiers/Import');
let Element = require('./Identifiers/Element');
let Closing = require('./Identifiers/Closing');
let Property = require('./Identifiers/Property');
let Variable = require('./Identifiers/Variable');

class Identifier {

    constructor() {
        this.identifiers = [
            Import,
            Closing,
            Element,
            Property,
            Variable,
        ]
    }

    verify(line) {
        let el;
        this.identifiers.forEach( identifier => {
            if(identifier.verify(line)) {
                el = new identifier(line);
            }
        });

        return el;
    }

}

module.exports = Identifier;
