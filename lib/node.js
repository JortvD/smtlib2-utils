const SMTObject = require("./object");

class SMTNode extends SMTObject{
    constructor(key, children = []) {
        super();
        
        this.key = key;
        this.children = children;
    }

    build({depth = 0, spaced} = {}) {
        if(this.children.length === 0) {
            return `(${this.key})`;
        }
        if(this.children.length === 1) {
            return `(${this.key} ${this.children[0] instanceof SMTObject ? this.children[0].build({depth: depth+1}) : this.children[0]})`;
        }

        if(spaced) {
            let result = `(${this.key}\n`;

            for(let child of this.children) {
                result += `${" ".repeat(depth*2)}${child instanceof SMTObject ? child.build({depth: depth+1}) : child}\n`;
            }

            result += ")";

            return result;
        }

        let result = `(${this.key} ${this.children.map(child => child instanceof SMTObject ? child.build({depth: depth+1}) : child).join(" ")})`;

        if(!result.includes("\n") && spaced === undefined && result.length > 80) return this.build({depth, spaced: true});

        return result;
    }
}

module.exports = SMTNode;