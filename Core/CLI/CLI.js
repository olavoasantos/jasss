let Handler = require('./Handler');
let Validation = require('./Validation');

class CLI {
    constructor(raw) {
        this.raw = raw;
        this.handler = new Handler();
        this.validation = new Validation();
    }

    run() {
        this.needsHelp()
            .parse()
            .checkDefault()
            .validate();

        return this;
    }

    needsHelp() {
        if(this.raw.length <= 2) {
            this.handler.help();

            process.exit();
        }

        return this;
    }

    parse() {
        let flag;
        this.raw.forEach( arg => {
            if(this.handler.has(arg)) {
                flag = arg;
            } else if (flag) {
                this.handler.run(flag, arg);
                flag = null;
            }
        });

        return this;
    }

    checkDefault() {
        this.handler.checkDefault();

        return this;
    }

    validate() {
        this.validation.check();

        return this;
    }

}

module.exports = CLI;
