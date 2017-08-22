let collect = require("collect.js");
let Property = require('../Identifiers/Property');
let Variable = require('../Identifiers/Variable');

class Element {

    constructor(scope) {
        this.__elements = [];
        this.__variables = [];
        this.__properties = [];

        this.scope = scope;
        this.selector = "";
        this.extends = false;
        this.abstract = false;
        this.implements = false;
    }

    set(name, value) {
        this[name] = value;
    }

    implement(element) {
        element.elements.each( el => {
            let newEl = Object.assign(new Element, el);
            newEl.scope = this;

            if(this.elements.where("selector", el.selector).isEmpty()) {
                this.elements.push(newEl);
            } else {
                this.elements.where("selector", newEl.selector).first().merge(newEl);
            }
        });

        this.merge(element);
    }

    merge(element) {
        this.mergeVariablesFrom(element);
        this.mergePropertiesFrom(element);
    }

    mergePropertiesFrom(element) {
        element.properties.each( prop => {
            if(this.properties.where("name", prop.name).isEmpty()) {
                let newProp = Object.assign(new Property, prop);
                this.properties.push(newProp);
            }
        });
    }

    mergeVariablesFrom(element) {
        element.variables.each( variable => {
            if(this.variables.where("name", variable.name).isEmpty()) {
                let newVar = Object.assign(new Variable, variable);
                this.variables.push(newVar);
            }
        });
    }

    set elements(value) {
        this.__elements = value.all();
    }

    get elements() {
        return collect(this.__elements);
    }

    set variables(value) {
        this.__variables = value;
    }

    get variables() {
        if(this.scope.constructor.name !== "Global") {
            return collect(Object.assign([], this.__variables, this.scope.variables.all()));
        }

        return collect(this.__variables);
    }

    set properties(value) {
        this.__properties = value;
    }

    get properties() {
        return collect(this.__properties);
    }

}

module.exports = Element;
