let collect = require("collect.js");
let $element = require('../Elements/Element');

class Element {
    static verify(line) {
        if(line.endsWith("{") && !line.includes("(") && !line.includes(")")) {
            return true;
        }

        return false;
    }

    constructor(line) {
        this.line = line;
        this.selector = "";
        this.modifiers = collect([]);
    }

    parse() {
        let line = this.line.replace(/{/g, "");
        let parts = line.split(" ");
        let flag = false;

        parts.forEach( part => {
            if(this.isModifier(part)){
                this.modifiers.push({name: part, value: true});
                flag = true;
            } else if(part && !this.isModifier(part) && flag) {
                if(part.endsWith(",")) {
                    part = part.replace(",", "");
                } else {
                    flag = false;
                }

                let modifier = this.modifiers.pop();

                if(typeof modifier.value === "object"){
                    modifier.value.push(part);
                } else {
                    modifier.value = [part];
                }

                this.modifiers.push(modifier);
            } else {
                this.selector += part;
            }
        });
    }

    isModifier(name) {
        return [
            "extends",
            "abstract",
            "implements",
        ].includes(name);
    }

    register(interpreter) {
        this.build(interpreter);
        interpreter.active.push(this.element);
    }

    build(interpreter) {
        this.element = new $element(interpreter.scope());
        this.element.selector = this.selector;

        this.modifiers.each( modifier =>{
            this.element.set(modifier.name, modifier.value);
        });
    }

}

module.exports = Element;
