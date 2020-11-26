const SMTToken = require("./token");

class SMTStringToken extends SMTToken {
    constructor(value) {
        super(value);
    }

    build() {
        return `"${this.value}"`;
    }
}

module.exports = SMTStringToken;