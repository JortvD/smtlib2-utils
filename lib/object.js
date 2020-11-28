/**
 * This is the SMT object class. It is an abstract class meant to be extended by the SMT token and 
 * SMT node for example.
 */
class SMTObject {
    /**
     * This is an abstract function that classes extending this class should implement. It builds 
     * this SMT object into a SMTLIB v2 valid string and returns that string.
     * @returns String
     */
    build() {}
}

module.exports = SMTObject;