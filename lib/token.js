const SMTObject = require("./object");

class SMTToken extends SMTObject {
    constructor(value) {
        super();

        this.value = value;
    }

    build() {
        return this.value;
    }
}

module.exports = SMTToken;