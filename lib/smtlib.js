const SMTExpressionNode = require("./expressionNode");
const SMTLogicNode = require("./logicNode");
const SMTStack = require("./stack");
const SMTToken = require("./token");
const SMTStringToken = require("./stringToken");

/**
 * SMTLIB manages all the utilities within this package.
 */
class SMTLIB {
    /**
     * Returns a new SMT logic node which a user can use to create child logic nodes. This option 
     * is given to users to easily add logic nodes of their choice to other logic nodes. This 
     * parent node is destroyed after use, and thus shouldn't be used.
     */
    get l() {
        return new SMTLogicNode("", []);
    }

    /**
     * Returns all of the default sorts included in SMTLIB. Sorts are written as uppercase.
     */
    get s() {
        return {
            INT: new SMTToken("Int"),
            BOOL: new SMTToken("Bool"),
            STRING: new SMTToken("String"),
            REAL: new SMTToken("Real")
        };
    }

    /**
     * Returns a new SMT stack. A stack is basically a list of functions that can be executed by a 
     * prover. It will contain all basic functions needed to create your SMT.
     */
    stack() {
        return new SMTStack();
    }

    /**
     * Retuns a new symbol token, which is actually a standard SMT token. Symbols decribe constant names for example.
     * @param {String} value The value for the symbol.
     */
    symbol(value) {
        return new SMTToken(value);
    }

    /**
     * Returns a new number token, which is actually a standard SMT token.
     * @param {Number} value The number for the token.
     */
    num(value) {
        return new SMTToken(value);
    }

    /**
     * Returns a new string token.
     * @param {String} value The string for the token.
     */
    string(value) {
        return new SMTStringToken(value);
    }

    /**
     * Returns a new SMT expression node. Expression nodes can be used to create expression to be 
     * used in the assert function and the maximize function for example.
     */
    expression() {
        return new SMTExpressionNode();
    }
}

module.exports = SMTLIB;