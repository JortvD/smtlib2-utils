const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');
const SMTNode = require("./node");
const SMTListToken = require("./listToken");
const SMTCommentToken = require("./commentToken");
const SMTObject = require("./object");
const SMTToken = require("./token");
const SMTExpressionNode = require("./expressionNode");

/**
 * This is the SMT stack class. A stack is a list of functions that a prover, like Z3 can execute.
 */
class SMTStack {
    /**
     * On creation of the stack an empty array is created tl which the functions will be added.
     */
    constructor() {
        this.stack = [];
    }

    /**
     * Adds the logic type for this stack. This should be done at the start and may only be done 
     * once.
     * @param {String} value The logic type.
     */
    setLogic(value) {
        if(this.stack.find(node => node.key === "set-logic")) throw Error("set-logic has already been set!");

        this.stack.push(new SMTNode("set-logic", [value]));
    }

    /**
     * Adds a check SAT node to this stack.
     */
    checkSAT() {
        this.stack.push(new SMTNode("check-sat"));
    }

    /**
     * Adds a get model node to this stack.
     */
    getModel() {
        this.stack.push(new SMTNode("get-model"));
    }

    /**
     * Adds a exit node to this stack.
     */
    exit() {
        this.stack.push(new SMTNode("exit"));
    }

    /**
     * Adds an expression assertion to this stack. This expression can be created using the SMTLIB 
     * class.
     * @param {SMTExpressionNode} expression The expression to assert.
     */
    assert(expression) {
        this.stack.push(new SMTNode("assert", [expression]));
    }

    maximize(expression) {
        this.stack.push(new SMTNode("maximize", [expression]));
    }

    /**
     * Adds a function declaration to the stack. This has to be done before the function is used in 
     * an expression. The function will have the specified name and can have the specified array of 
     * parameters. It was also be of the given type. These parameters and type can be given using 
     * SMTLIb's .s which returns the possible sorts. This method will return another method, which 
     * when called returns the node needed to reference this function. Let's say a function f is 
     * declared: (declare-fun f (Int) Int), the method f is returned which can then be used inside 
     * an expression: .equals(f(1), f(2)) which will build to (= (f 1) (f 2)).
     * @param {String} name The name of the function.
     * @param {Array<SMTToken>} parameters The parameters sorts for the function.
     * @param {SMTToken} type The type sort of the function.
     */
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

    /**
     * Adds a constant declaration to the stack, which is basically an argument-less function. This 
     * method will return a SMTToken variable which can be added in the code as token for the 
     * constant.
     * @param {String} name The name of the constant.
     * @param {SMTToken} type The type sort of the constant.
     */
    declareConst(name, type) {
        this.stack.push(new SMTNode("declare-const", [name, type]));

        return new SMTToken(name);
    }

    /**
     * Creates a comment token with the given value and adds it to the stack.
     * @param {String} value The value of the comment token.
     */
    comment(value) {
        this.stack.push(new SMTCommentToken(value, {spaced: false}));
    }

    /**
     * Builds the stack and returns it as a string. Every SMT object in the stack will be build on 
     * a new line.
     * @returns {String} The built SMT stack.
     */
    build() {
        let result = "";

        for(let node of this.stack) {
            result += node.build() + "\n";
        }

        return result;
    }

    run(options) {
        let z3Path = "z3";
        let outputFile = os.tmpdir() + "/output.smt2";
        if(options) {
            if(options.z3) {
                z3Path = options.z3;
            }

            if(options.outputFile) {
                outputFile = options.outputFile;
            }
        }

        let success = true;
        fs.writeFile(outputFile, this.build(), err => {
            if(err) {
                success = false;
                console.error(err);
            }
        });

        if(!success) return;

        let result = null;
        exec(`${z3Path} -file ${outputFile}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`${stdout}`);
            result = stdout;
        });

        return result;
    }
}

module.exports = SMTStack