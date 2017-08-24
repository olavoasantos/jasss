let Config = require('../Config');

class Handler {
    constructor() {
        this.commands = {};
        this.config = Config.get();
    }

    help() {
        console.log(`\n${this.config._long_name} (${this.config.name})`);
        console.log(`by Olavo Amorim Santos - v${this.config.version}\n`);
        console.log(this.makeUsage());
        console.log(this.makeDescription());
    }

    makeDescription() {
        let where = `Where: \n`;
        let required;

        for(let cmd in this.commands) {
            required = (this.commands[cmd].value === undefined) ? "Required | " : "Optional | ";
            where += `  <${this.commands[cmd].name}>:\t${required}${this.commands[cmd].description}\n`;
        }

        where += "\n";

        return where;
    }

    makeUsage() {
        let usage = `Usage: ${this.config.name}`;
        for(let cmd in this.commands) {
            usage += ` ${cmd} <${this.commands[cmd].name}>`;
        }
        usage += "\n";

        return usage;
    }

    register(command, name, description, handle, value){
        this.commands[command] = { name, description, handle, value };
    }

    run(cmd, ...arg) {
        if(this.has(cmd)) {
            this.commands[cmd].handle(...arg);
        }
    }

    has(cmd) {
        return (cmd in this.commands);
    }

    checkDefault() {
        for(let cmd in this.commands) {
            if(this.commands[cmd].value !== undefined) {
                this.commands[cmd].value();
            }
        }
    }

}

module.exports = Handler;
