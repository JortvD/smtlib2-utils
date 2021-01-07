const smtlib = require("../index");
const stack = smtlib.stack();
const p = stack.declareConst("p", smtlib.s.BOOL);
const expr = smtlib.expression();
expr.and(p).not(p);
stack.assert(expr);
stack.checkSAT();
stack.getModel();
console.log(stack.build());

// -> generates
// (declare-const p Bool)
// (assert (and p (not p)))
// (check-sat)
// (get-model)