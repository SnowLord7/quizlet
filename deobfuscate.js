function deobfuscate(msg, num) {
	var answer = "";
	var pieces = msg.split("-");
	for (let i = 0; i < pieces.length; i++) {
		answer = answer + (String.fromCharCode(pieces[i] - num % (i + 1)))
	}
	return answer;
}