#!/usr/bin/env narwhal
/*
  Copyright (c) 2010 Tyler Leslie Curtis <ekiru.0@gmail.com>

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
*/
load("jslex.js");

function testTokenMatch() {
    var result = true;
    
    var matchResult = new TokenDef(/[0-9]/, parseInt).match("123");
    result = matchResult.success && result;
    result = matchResult.token == 1 && result;
    result = matchResult.text == "23" && result;
    
    matchResult = new TokenDef(/[0-9]/, parseInt).match("a123");
    result = !matchResult.success && result;

    matchResult = new TokenDef(/[0-9]+/, parseInt).match("12,");
    result = matchResult.success && result;
    result = matchResult.token == 12 && result;
    result = matchResult.text == "," && result;
    
    return result;
}

function testTokenDef() {
    var result = true;

    result = testTokenMatch() && result;

    if (result) {
	print("Token definition tests succeeded.");
    } else {
	print("Token definition tests failed.");
    }
    return result;
}

function testIntLexer() {
    var result = true;

    var tokenRules = [new TokenDef(/[0-9]+/, parseInt)];
    var tokens = jsLex(tokenRules, "123 456 789");

    result = tokens[0] == 123 && result;
    result = tokens[1] == 456 && result;
    result = tokens[2] == 789 && result;
    
    return result;
}

function testIntOrIdentifierLexer() {
    var result = true;
    var tokenRules = [
	new TokenDef(/[0-9]+/, function (string) {
		return ["int", parseInt(string)];
	    }),
	new TokenDef(/[a-zA-Z][a-zA-Z0-9_$]*/, function (string) {
		return ["ident", string];
	    })
	];
    var tokens = jsLex(tokenRules, "123 plus P4");
    
    result = tokens[0][0] == "int" && tokens[0][1] == 123 && result;
    result = tokens[1][0] == "ident" && tokens[1][1] == "plus" && result;
    result = tokens[2][0] == "ident" && tokens[2][1] == "P4" && result;

    return result;
}

function testLexer() {
    var result = true;

    result = testIntLexer() && result;
    result = testIntOrIdentifierLexer() && result;

    if (result) {
	print("Lexer tests succeeded.");
    } else {
	print("Lexer tests failed.");
    }
    return result;
}

function testAll() {
    var result = true;

    result = testTokenDef() && result;
    result = testLexer() && result;

    if (result) {
	print("All tests succeeded.");
    } else {
	print("Some tests failed.");
    }
    return result;
}

testAll();
