const SMTLogicNode = require("./logicNode");

class SMTExpressionNode extends SMTLogicNode {
    constructor() {
        super(null, []);
    }
    
    addChild(node) {
        if(this.children.length > 0) throw Error("An expression node can have just a single child!");

        this.children.push(node);
    }

    build({depth = 0}) {
        if(this.children.length === 0) throw Error("An expression node must have a single child!");

        return this.children[0].build({depth: depth+1});
    }
}

module.exports = SMTExpressionNode;