module("calculus");

(function(){

var coefs = [];
coefs[2] = 2;
coefs[3] = 3;
coefs[4] = 4;
coefs[5] = 5;

var neg_coefs = [];
neg_coefs[-1] = -1;
neg_coefs[0] = 4;
neg_coefs[1] = 6;
neg_coefs[2] =-2;

test("ddxPolynomial - Differentiate Polynomials", function() {
	equal((KhanUtil.ddxPolynomial(new KhanUtil.Polynomial(2, 5, coefs, "x", null))).toString(), "25x^{4}+16x^{3}+9x^{2}+4x", "differentiate 5x^{5}+4x^{4}+3x^{3}+2x^{2}" );
	equal((KhanUtil.ddxPolynomial(new KhanUtil.Polynomial(-1, 2, neg_coefs, "x", null))).toString(), "-4x+6+x^{-2}", "differentiate -2x^{2}+6x+4-x^{-1}" );
});

test("PowerRule - helper object for polynomial differentiation", function(){

	var powerRule = new KhanUtil.PowerRule();
	ok(powerRule.fText, "null constructor produces a displayable function");
	ok(powerRule.ddxFText, "null constructor produces a displayable differentiated function");

	powerRule = new KhanUtil.PowerRule(2, 5, coefs, "x");
	equal(powerRule.fText,"5x^{5}+4x^{4}+3x^{3}+2x^{2}","check it correctly converts polynomial to LaTeX");
	equal(powerRule.ddxFText,"25x^{4}+16x^{3}+9x^{2}+4x", "check it correctly converts the differential of the polynomial to LaTeX" );

	for (var index in powerRule.wrongsText){
		notEqual(powerRule.wrongsText[index],powerRule.ddxFText,"none of the wrong answers should match the right one");
	}
	ok(KhanUtil.PowerRule() instanceof KhanUtil.PowerRule, "check that 'new' operator is optional");

});

test("funcNotation - helper for randomly choosing a notation for the function", function(){
	ok(KhanUtil.funcNotation().f, "generates a notation for the function");
	ok(KhanUtil.funcNotation().ddxF, "generates a notation for the function derivative");
	equal(KhanUtil.funcNotation("x",1).f, "f(x)","index works and variable is substituted");
	equal(KhanUtil.funcNotation("x",1).ddxF,"f'(x)","index works and variable is substituted");
	ok(KhanUtil.funcNotation("x",1000).f,"randomly choose a notation if out of range");
	equal(KhanUtil.funcNotation("x",0).diffHint,"y=Ax^{n} \\implies \\frac{dy}{dx}=n \\cdot Ax^{n-1}", "check diffHint");
	equal(KhanUtil.funcNotation("b",1).diffHint,"f'(Ab^{n})=n \\cdot Ab^{n-1}","check diffHint");
	equal(KhanUtil.funcNotation("x",2).diffHint,"g'(Ax^{n})=n \\cdot Ax^{n-1}","check diffHint");
	equal(KhanUtil.funcNotation("b",3).diffHint,"y=Ab^{n} \\implies y'=n \\cdot Ab^{n-1}","check diffHint");
	equal(KhanUtil.funcNotation("x",4).diffHint,"f(x)=Ax^{n} \\implies \\frac{d}{dx}f(x)=n \\cdot Ax^{n-1}","check diffHint");
	equal(KhanUtil.funcNotation("b",5).diffHint,"a=Ab^{n} \\implies a'=n \\cdot Ab^{n-1}","check diffHint");
	equal(KhanUtil.funcNotation("x",6).diffHint,"a=Ax^{n} \\implies \\frac{da}{dx}=n \\cdot Ax^{n-1}","check diffHint");
});


test("findDerivative - finds the derivative of select functions (power, product, e^, ln, trig, ...)", function(){
	equal(KhanUtil.findDerivative(["^", "x", 5]), ["*", 5, ["^","x", 4]]);
	equal(KhanUtil.findDerivative(["*", 3,["^", "x", 5]]), ["*", 3,["*", 5, ["^","x", 4]]]);


});

})();
