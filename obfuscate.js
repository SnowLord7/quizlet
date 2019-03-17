function obfuscate(msg, num) {
	var answer = "";
	for (let i = 0; i < msg.length; i++) {
		answer = answer + ("-" + (msg.charCodeAt(i) + num % (i + 1)));
	}
	return answer.slice(1);
}