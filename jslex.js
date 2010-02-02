function jslex(tokenDefs, text) {
    var tokenStream = [];
    var tokenCount = tokenDefs.length;
    while (text.length > 0) {
	for (var i = 0; i < tokenCount; i++) {
	    var tokenType = tokenDefs[i];
	    var match = tokenType.match(text);
	    tokenStream.push(match.token);
	    break;
	}
    }
}
