let collect = require("collect.js");
let Property = require('../Identifiers/Property');

class Builder {
    constructor(global) {
        this.global = global;
        this.elements = collect([]);
    }

    run() {
        this.global.elements.each( element => {
            this.parseElement(element);
            element = this.checkModifiers(element);
            this.parseElement(element);
        });
        this.elements.transform( element => {
            element.mergeVariablesFrom(this.global);
            element.variables = element.variables.map( prop => this.checkVariables(prop, element) ).all();
            element.properties = element.properties.map( prop => this.checkVariables(prop, element) ).all();

            return element;
        });

        return this.elements;
    }

    checkVariables(prop, element) {
        let replace = {name:"", value:""};

        element.variables.each( variable => {
            if(prop.value.includes(variable.name) && replace.name.length < variable.name.length) {
                replace = variable;
            }
        });

        let newProp = Object.assign(new Property, prop);
        newProp.value = (replace.name) ? newProp.value.replace(replace.name, replace.value) : newProp.value;

        return newProp;
    }

    parseElement(element, parent) {
        element.selector = (parent)
                            ? this.parseChildSelector(element.selector, parent.selector)
                            : element.selector;

        let bag = this.elements.where("selector", element.selector);
        (bag.isEmpty())
            ? this.elements.push(element)
            : this.merge(bag.first(), element);

        element.elements.each( child => this.parseElement(child, element) );
    }

    merge(original, element) {
        original.merge(element);

        this.elements.each(el => {
            if(el.extends && el.extends.includes(element.selector)) {
                el.merge(element);
            }
        })
    }

    checkModifiers(element) {
        if(element.implements) {
            element = this.implements(element);
        }

        if(element.extends) {
            element = this.extends(element);
        }

        return element;
    }

    implements(element) {
        let el;
        element.implements.forEach(selector => {
            el = this.global.abstract.where("selector", selector).first();
            element.implement(el);
        });

        return element;
    }

    extends(element) {
        element.extends.forEach( selector => {
            element.merge(
                this.global.elements.where("selector", selector).first()
            );
        });

        return element;
    }

    parseChildSelector(child, parent) {
        return child.replace(/&/g, parent)
    }
}

module.exports = Builder;
