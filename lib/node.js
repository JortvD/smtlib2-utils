const SMTObject = require("./object");

/**
 * This is the SMT node class. Is is an abstract class that other classes may extend to build their 
 * own node functionality. This functionality, of what this package has called "nodes", lies at the 
 * core of SMTLIB v2 and is thus represented using this class. This class also extends on the SMT 
 * objects.
 */
class SMTNode extends SMTObject {
    /**
     * This is the constructor for the SMT node.
     * @param {String} key The key value for this node.
     * @param {Array<SMTObject>} children The array of child SMT objects this node has.
     */
    constructor(key, children = []) {
        super();
        
        this.key = key;
        this.children = children;
    }

    /**
     * Builds and returns the text version of this node. How the text is built depends on the 
     * number of children in has, the length of the built size of those children and on some 
     * options. With the option depth the amount of spaces at the beginning of each new line is 
     * specified. While this isn't required it does help with readability. Also it is possible to 
     * enable spacing, which means it will add returns in the text depending on its length.
     * @param {Object} options The options to build with.
     * @param {Integer} options.depth The depth this node has.
     * @param {Boolean} options.spaced If this node may add returns depending on length.
     * @returns {String} The built node.
     */
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