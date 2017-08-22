class CssCompiler {
    static compile(elements) {
        let css = "";
        elements.each(element => {
            css += `\n${element.selector} {\n`;
            element.properties.each(prop => {
                css += `\t${prop.name}: ${prop.value};\n`;
            });
            css += `}\n`;
        });

        return css;
    }
}

module.exports = CssCompiler;
