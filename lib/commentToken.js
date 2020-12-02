const SMTToken = require("./token");

/**
 * This is the SMT comment token class. It represents and can build comment tokens.
 */
class SMTCommentToken extends SMTToken {
    /**
     * This class requires a value for the comment and has some options.
     * @param {String} value The value for the comment.
     * @param {Object} options The options for this token. 
     * @param {Boolean} spaced If the comment should be have line returns before and after.
     */
    constructor(value, {spaced = true} = {}) {
        super(value);
        this.spaced = spaced;
    }

    /**
     * Builds the comment. Depending on it's depth spaces are added before every line.
     * @param {Object} options The options when building.
     * @param {Integer} depth The depth of this comment. 
     * @returns {String} The built comment.
     */
    build({depth = 0} = {}) {
        const trueDepth = depth > 0 ? (depth-1)*2 : depth;
        let str = " ".repeat(trueDepth) + this.value.split("\n").map(line => `; ${line}`).join("\n");

        if(this.spaced) str = `\n${str}\n${" ".repeat(trueDepth-1)}`;

        return str;
    }
}

module.exports = SMTCommentToken;