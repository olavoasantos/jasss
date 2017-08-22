let collect = require("collect.js");

class Global {

    constructor() {
        this.__abstract = [];
        this.__elements = [];
        this.__variables = [];
    }

    set abstract(value) {
        this.__abstract = value;
    }

    get abstract() {
        return collect(this.__abstract);
    }

    set elements(value) {
        this.__elements = value;
    }

    get elements() {
        return collect(this.__elements);
    }

    set variables(value) {
        this.__variables = value;
    }

    get variables() {
        return collect(this.__variables);
    }

}

module.exports = Global;
