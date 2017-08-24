class Validation {

    constructor() {
        this.rules = [];
    }

    register(name, handler, msg) {
        this.rules.push({
            name, handler, msg
        });
    }

    check() {
        this.rules.forEach( rule => {
            if(!rule.handler()) {
                throw new Error( rule.msg );
            }
        });
    }

}

module.exports = Validation;
