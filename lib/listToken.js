const SMTToken = require("./token");

/**
 * The SMT list token which when it is builds creates a list of its children in SMT syntax.
 */
class SMTListToken extends SMTToken {
    constructor(value) {
        super(value);
    }

    /**
     * Builds the list into valid SMT syntax.
     */
    build() {
        return `(${this.value.map(token => token instanceof SMTToken ? token.build() : token).join(" ")})`;
    }
}

module.exports = SMTListToken;