const SMTNode = require("./node");
const SMTObject = require("./object");
const SMTCommentToken = require("./commentToken");

/**
 * The SMT logic node. An extendable node for managing logical nodes. All children of the logic 
 * node are supposed to be tokens or other logic nodes.
 */
class SMTLogicNode extends SMTNode {
    /**
     * This is the constructor for the SMT logic node.
     * @param {String} name The name of this logic node.
     * @param {Array<SMTObject>} children The array of child SMT objects this logic node has.
     */
    constructor(name, children = []) {
        super(name, children);
    }

    /**
     * Adds the specified SMT object to the logic node. This should only be a token or logic node.
     * @param {SMTObject} obj The SMT object to add as child.
     */
    addChild(obj) {
        this.children.push(obj);
    }

    /**
     * Creates and returns an "and" function logic node. This function supports an infinite amount 
     * of children. Using the returned logic node child SMT objects can be added later on.
     * @param  {...SMTObject} children The children SMT objects for this "and" node.
     */
    and(...children) {
        return this.createNode("and", children);
    }

    /**
     * Creates and returns an "or" function logic node. This function supports an infinite amount 
     * of children. Using the returned logic node child SMT objects can be added later on.
     * @param  {...SMTObject} children The children SMT objects for this "or" node.
     */
    or(...children) {
        return this.createNode("or", children);
    }

    /**
     * Creates and returns a negation logic node. This function only supports a single child which
     * it will negate. Using the returned logic node it's also possible to add the child later on.
     * @param {SMTObject} a The SMT object to negate.
     */
    not(a) {
        return this.createNode("not", [a]);
    }

    /**
     * Creates and returns an implication logic node. This function supports just two children on
     * which it will apply implication. Using the returned logic node child SMT objects can be 
     * added later on.
     * @param {SMTObject} a The first implication SMT object.
     * @param {SMTObject} b The second implication SMT object.
     */
    implies(a, b) {
        return this.createNode("implies", [a, b]);
    }

    /**
     * Creates and returns a "plus" function logic node. This function supports an infinite amount 
     * of children. Using the returned logic node child SMT objects can be added later on.
     * @param  {...SMTObject} children The children SMT objects for this "plus" node.
     */
    plus(...children) {
        return this.createNode("+", children);
    }

    /**
     * Creates and returns a "times" function logic node. This function supports just two children
     * for the multiplication. Using the returned logic node child SMT objects can be added later
     * on.
     * @param {SMTObject} a The first multiplication SMT object.
     * @param {SMTObject} b The second multiplication SMT object.
     */
    times(a, b) {
        return this.createNode("*", [a, b]);
    }

    /**
     * Creates and returns a "minus" function logic node. This function supports just two children
     * for the subtraction. Using the returned logic node child SMT objects can be added later on.
     * @param {SMTObject} a The first subtraction SMT object.
     * @param {SMTObject} b The second subtraction SMT object.
     */
    minus(a, b) {
        return this.createNode("-", [a, b]);
    }

    /**
     * Creates and returns a "greater than" function logic node. This function supports just two 
     * children for the greater than equation. Using the returned logic node child SMT objects can 
     * be added later on.
     * @param {SMTObject} a The left hand equation SMT object.
     * @param {SMTObject} b The right hand equation SMT object.
     */
    ge(a, b) {
        return this.createNode(">", [a, b]);
    }

    /**
     * Creates and returns a "greater than or equals" function logic node. This function supports 
     * just two children for the greater than or equals equation. Using the returned logic node 
     * child SMT objects can be added later on.
     * @param {SMTObject} a The left hand equation SMT object.
     * @param {SMTObject} b The right hand equation SMT object.
     */
    geq(a, b) {
        return this.createNode(">=", [a, b]);
    }

    /**
     * Creates and returns a "equals" function logic node. This function supports just two children 
     * for the equals equation. Using the returned logic node child SMT objects can be added later 
     * on.
     * @param {SMTObject} a The left hand equation SMT object.
     * @param {SMTObject} b The right hand equation SMT object.
     */
    equals(a, b) {
        return this.createNode("=", [a, b]);
    }

    /**
     * Creates and returns a "lesser than" function logic node. This function supports just two 
     * children for the lesser than equation. Using the returned logic node child SMT objects can 
     * be added later on.
     * @param {SMTObject} a The left hand equation SMT object.
     * @param {SMTObject} b The right hand equation SMT object.
     */
    le(a, b) {
        return this.createNode("<", [a, b]);
    }

    /**
     * Creates and returns a "lesser than or equals" function logic node. This function supports 
     * just two children for the lesser than or equals equation. Using the returned logic node 
     * child SMT objects can be added later on.
     * @param {SMTObject} a The left hand equation SMT object.
     * @param {SMTObject} b The right hand equation SMT object.
     */
    leq(a, b) {
        return this.createNode("<=", [a, b]);
    }

    /**
     * Creates and returns a logic node for a function with the specified name. With this method
     * it is possible to add any logic node. A few functions are added to this class by default for
     * ease of use, but could also be created using this method. Using this method any number of
     * children can be added or these can also be added later on using the returned logic node.
     * @param {String} name The function for the logic node.
     * @param  {...SMTObject} children The children to add to the logic node.
     */
    fun(name, ...children) {
        return this.createNode(name, children);
    }

    comment(value) {
        this.addChild(new SMTCommentToken(value));
    }

    /**
     * Creates and returns a node with the given name and children. This method is mostly used
     * internally.
     * @param {String} name The name of the logic node.
     * @param {Array<SMTObject>} children The array of children to add to the logic node.
     */
    createNode(name, children) {
        const node = new SMTLogicNode(name, children);
        this.addChild(node);

        return node;
    }
}

module.exports = SMTLogicNode;