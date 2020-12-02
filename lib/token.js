const SMTObject = require("./object");

/**
 * This is the SMT token class. It extends upon the SMT object and is used to represent tokens, 
 * which represent sort values. Most tokens can be build using their normal stringified value, but 
 * some, like the list and string, require a custom build process and thus custom class.
 */
class SMTToken extends SMTObject {
    /**
     * Requires a value for the token.
     * @param {Object} value The value for this token.
     */
    constructor(value) {
        super();

        this.value = value;
    }

    /**
     * Builds the token by returning the normal stringified version. Can be extended by other 
     * classes to match the correct building process.
     * @returns {String} The built token.
     */
    build() {
        return this.value;
    }
}

module.exports = SMTToken;