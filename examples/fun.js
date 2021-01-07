const smtlib = require("../index");
const stack = smtlib.stack();
const f = stack.declareFun("f", [smtlib.s.INT], smtlib.s.INT);
const expr = smtlib.expression();
const and = expr.and();
and.equals(2).plus(f(1), f(2));
and.equals(1).minus(f(1), f(2));
stack.assert(expr);
stack.checkSAT();
stack.getModel();
console.log(stack.build());

// -> generates
// (declare-fun f (Int) Int)
// (assert (and (= 2 (+ (f 1) (f 2))) (= 1 (- (f 1) (f 2)))))     
// (check-sat)
// (get-model)