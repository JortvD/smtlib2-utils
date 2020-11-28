const SMTLogicNode = require("./logicNode");
const SMTObject = require("./object");

/**
 * The SMT expression node. These logic nodes must have a single child and may not have more.
 */
class SMTExpressionNode extends SMTLogicNode {
    constructor() {
        super(null, []);
    }
    
    /**
     * Adds a new SMT object to the expression node. An expresion may only have a single child and 
     * if it tried to add another one an error will be thrown. 
     * @param {SMTObject} node 
     */
    addChild(obj) {
        if(this.children.length > 0) throw Error("An expression node can have just a single child!");

        this.children.push(obj);
    }
    
    /**
     * Builds the expression into a string. As an expression must have a single child it will throw 
     * an error if this isn't the case.
     * @param {Object} options The options when building.
     * @param {Object} options.depth The depth of this expression.
     * @returns String
     */
    build({depth = 0}) {
        if(this.children.length === 0) throw Error("An expression node must have a single child!");

        return this.children[0].build({depth: depth+1});
    }
}

module.exports = SMTExpressionNode;