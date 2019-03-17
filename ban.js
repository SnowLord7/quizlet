try {
	var request = new XMLHttpRequest();
	request.open('GET', "https://raw.githubusercontent.com/SnowLord7/info/master/banlist.txt", true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText);
			var banned = false;
			data.bans.forEach(function(ban) {
				if (ban.user == Quizlet.user.username) {
					banned = true;
					document.write(`<title>Quizlet | You were banned!</title><body style=background-image:url(https://i.imgur.com/mSGXLXY.jpg);cursor:none;overflow:hidden><div style=position:absolute;bottom:10px;width:100%;text-align:center;font-size:30px;color:#fff>${ban.reason}</div>`);
				}
			});
			if (!banned) {
				loadModule();
			}
		}
	};

	request.onerror = function() {
		console.log("Bad Internet or site blocked 0:");
		loadModule();
	};
	request.send();
} catch(e) {
	loadModule();
}