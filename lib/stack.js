const SMTNode = require("./node");
const SMTListToken = require("./listToken");
const SMTCommentToken = require("./commentToken");
const SMTObject = require("./object");
const SMTToken = require("./token");

class SMTStack {
    constructor() {
        this.stack = [];
    }

    setLogic(value) {
        if(this.stack.find(node => node.key === "set-logic")) throw Error("set-logic has already been set!");

        this.stack.push(new SMTNode("set-logic", [value]));
    }

    checkSAT() {
        this.stack.push(new SMTNode("check-sat"));
    }

    getModel() {
        this.stack.push(new SMTNode("get-model"));
    }

    exit() {
        this.stack.push(new SMTNode("exit"));
    }

    assert(expression) {
        this.stack.push(new SMTNode("assert", [expression]));
    }

    declareFun(name, parameters, type) {
        this.stack.push(new SMTNode("declare-fun", [name, new SMTListToken(parameters), type]));

        if(parameters.length === 0) {
            return new SMTToken(name);
        }
        else {
            return (...args) => {
                if(args.length !== parameters.length) throw Error("Incorrect amount of parameters!");

                return new SMTNode(name instanceof SMTObject ? name.build() : name, args);
            }
        }
    }

    declareConst(name, type) {
        this.stack.push(new SMTNode("declare-const", [name, type]));

        return new SMTToken(name);
    }

    comment(value) {
        this.stack.push(new SMTCommentToken(value, {spaced: false}));
    }

    build() {
        let result = "";

        for(let node of this.stack) {
            result += node.build() + "\n";
        }

        return result;
    }
}

module.exports = SMTStack