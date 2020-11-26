const SMTToken = require("./token");

class SMTCommentToken extends SMTToken {
    constructor(value, {spaced = true} = {}) {
        super(value);
        this.spaced = spaced;
    }

    build({depth = 0} = {}) {
        const trueDepth = depth > 0 ? (depth-1)*2 : depth;
        let str = " ".repeat(trueDepth) + this.value.split("\n").map(line => `; ${line}`).join("\n");

        if(this.spaced) str = `\n${str}\n${" ".repeat(trueDepth-1)}`;

        return str;
    }
}

module.exports = SMTCommentToken;