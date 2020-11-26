const SMTNode = require("./node");

class SMTLogicNode extends SMTNode {
    constructor(name, children = []) {
        super(name, children);
    }

    addChild(node) {
        this.children.push(node);
    }

    and(...children) {
        return this.createNode("and", children);
    }

    or(...children) {
        return this.createNode("or", children);
    }

    not(a) {
        return this.createNode("not", [a]);
    }

    implies(a, b) {
        return this.createNode("implies", [a, b]);
    }

    plus(...children) {
        return this.createNode("+", children);
    }

    times(a, b) {
        return this.createNode("*", [a, b]);
    }

    minus(a, b) {
        return this.createNode("-", [a, b]);
    }

    ge(a, b) {
        return this.createNode(">", [a, b]);
    }

    geq(a, b) {
        return this.createNode(">=", [a, b]);
    }

    equals(a, b) {
        return this.createNode("=", [a, b]);
    }

    le(a, b) {
        return this.createNode("<", [a, b]);
    }

    leq(a, b) {
        return this.createNode("<=", [a, b]);
    }

    fun(name, ...args) {
        return this.createNode(name, args)
    }

    createNode(name, children) {
        const node = new SMTLogicNode(name, children);
        this.addChild(node);

        return node;
    }
}

module.exports = SMTLogicNode;