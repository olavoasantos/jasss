let File = require('./File');

class Config {
    static get() {
        return this.getConfig();
    }

    static getConfig() {
        let config = JSON.parse(this.getConfigFile());
        let jasss = JSON.parse(this.getPackageData());

        return Object.assign({}, config, jasss);
    }

    static getPackageData() {
        return File.getCore("../package.json");
    }

    static getConfigFile() {
        return (File.exists("./jasss.config.json"))
                    ? File.get("./jasss.config.json")
                    : File.getCore("./jasss.config.json");
    }
}

module.exports = Config;
