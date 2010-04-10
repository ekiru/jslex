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

function TokenDef(pattern, callbackfn) {
    this.match = function match(text) {
	var trimmed = text.trimBegin();
	var match = trimmed.match(pattern);
	if (match && match.index == 0) {
	    var newText = trimmed.substr(match[0].length);
	    var token = callbackfn(match[0]);
	    return { success: true,
		    token: token,
		    text: newText};
	} else {
	    return { success: false };
	}
    };
}

TokenDef.ignore = function (string) {
    return null;
};

TokenDef.always = function (token) {
    return function (string) {
	return token;
    };
};

TokenDef.identity = function (string) {
    return string;
}

function jsLex(tokenDefs, text) {
    text = text.trim();
    var tokenStream = [];
    var tokenCount = tokenDefs.length;
    while (text.length > 0) {
	var matchedAny = false;
	for (var i = 0; i < tokenCount; i++) {
	    var tokenType = tokenDefs[i];
	    var match = tokenType.match(text);
	    if (match.success) {
		match.token && tokenStream.push(match.token);
		text = match.text.trim();
		matchedAny = true;
	    }
	}
	if (!matchedAny) {
	    throw Error("Can't tokenize string " + text);
	}
    }

    return tokenStream;
}
