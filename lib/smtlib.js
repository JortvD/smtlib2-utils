const SMTExpressionNode = require("./expressionNode");
const SMTLogicNode = require("./logicNode");
const SMTStack = require("./stack");
const SMTToken = require("./token");
const SMTStringToken = require("./stringToken");

class SMTLIB {
    constructor() {
        this.l = new SMTLogicNode("", []);
        this.s = {
            INT: new SMTToken("Int"),
            BOOL: new SMTToken("Bool"),
            STRING: new SMTToken("String"),
            REAL: new SMTToken("Real")
        };
    }

    stack() {
        return new SMTStack();
    }

    symbol(data) {
        return new SMTToken(data);
    }

    num(data) {
        return new SMTToken(data);
    }

    string(data) {
        return new SMTStringToken(data);
    }

    expression() {
        return new SMTExpressionNode();
    }
}

module.exports = SMTLIB;