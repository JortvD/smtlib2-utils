const SMTToken = require("./token");

class SMTListToken extends SMTToken {
    constructor(value) {
        super(value);
    }

    build() {
        return `(${this.value.map(token => token instanceof SMTToken ? token.build() : token).join(" ")})`;
    }
}

module.exports = SMTListToken;