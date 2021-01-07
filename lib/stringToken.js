const SMTToken = require("./token");

/**
 * This is the SMT string token. It is used to build SMTLIB v2 valid strings.
 */
class SMTStringToken extends SMTToken {
    /**
     * This class requires a string as value for when it is build.
     * @param {String} value The value for this token.
     */
    constructor(value) {
        super(value);
    }

    /**
     * Builds this string token.
     * @returns {String} The built string token.
     */
    build() {
        return `"${this.value}"`;
    }
}

module.exports = SMTStringToken;