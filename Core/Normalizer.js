class Normalizer {
    static normalize(content) {
        content = this.minimize(content);
        content = this.maximize(content);
        content = this.break(content);

        return content;
    }

    static break(content) {
        return content.split("\n")
                      .filter(line => line)
                      .map(line => line.trim());
    }

    static maximize(content) {
        return content.replace(/;/g, ";\n")
                      .replace(/{/g, "{\n")
                      .replace(/\s}/g, "\n}\n");
    }

    static minimize(content) {
        return content.replace(/\n|\t|\r/g, " ")
                      .replace(/;/g, "; ")
                      .replace(/:/g, ": ")
                      .replace(/,/g, ", ")
                      .replace(/=/g, " = ")
                      .replace(/\[/g, "[ ")
                      .replace(/;}/g, "; } ")
                      .replace(/\s}/g, " } ")
                      .replace(/[^ $]{/g, "{ ")
                      .replace(/\s+/g, " ")
                      .trim();
    }
}

module.exports = Normalizer;
