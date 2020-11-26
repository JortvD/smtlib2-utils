const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');
const SMTNode = require("./node");
const SMTListToken = require("./listToken");
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

    maximize(expression) {
        this.stack.push(new SMTNode("maximize", [expression]));
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