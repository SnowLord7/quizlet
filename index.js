function Learn() {
	this.interval = settings.current.learn.speed || 100;
	this.running = true;

	this.interval = setInterval(() => {
		if (this.running) this.loop();
	}, this.interval);	
}

Learn.prototype.pause = function () {
	this.running = false;
}

Learn.prototype.start = function () {
	this.running = true;
}

Learn.prototype.loop = function () {
	if (this.mode() == 'choice') this.solve();
	else if (this.mode() == 'written' || this.mode() == 'flashcards') {
		let btns = document.getElementsByClassName('UIButton');

		for (let i = 0; i < btns.length; ++i)
			if (btns[i].innerText.trim() == 'Options') btns[i].click();

		alert('Please make sure \'Question Type\' is set to choice only.');
		this.running = false;
	} 
	else if (this.mode() == 'other') this.next();
}

Learn.prototype.solve = function () {
	let elements = this.questions(),
		answers = this.answers();

	loop:
	for (let i = 0; i < elements.length; ++i) {
		for (let j = 0; j < answers.length; ++j) {
			if (elements[i].innerText.substr(2) == answers[j]) {
				elements[i].click();
				break loop;
			}
		}
	}
}

Learn.prototype.answers = function () {
	if (this.questions().length == 0) return [];

	return Answers.exact(this.text().innerText, this.image().src);
}

Learn.prototype.next = () => {
	let btns = document.getElementsByClassName('UIButton');

	for (let i = 0; i < btns.length; ++i) {
		if (btns[i].innerText.trim() == 'Press any key to continue') btns[i].click();
	}
}

Learn.prototype.questions = () => {
	return document.getElementsByClassName('LearnMultipleChoiceQuestionPrompt-termOption');
}

Learn.prototype.parent = () => {
	return document.getElementsByClassName('LearnMultipleChoiceQuestionPrompt-promptArea')[0];
}

Learn.prototype.image = function () {
	if (this.questions().length == 0) return false;

	let container = this.parent().getElementsByClassName('FormattedTextWithImage-image')[0];
	if (!container) return document.createElement('img');

	return container.getElementsByClassName('Image-image')[0];
}

Learn.prototype.text = function () {
	if (this.questions().length == 0) return false;

	let container = this.parent().getElementsByClassName('LearnPromptTextWithImage')[0],
		parent = container.getElementsByClassName('FormattedText')[0];
	
	if (!parent) return document.createElement('div');

	return parent.children[0];
}

Learn.prototype.mode = () => {
	if (document.getElementsByClassName('LearnMultipleChoiceQuestionPrompt-termOption').length > 0) return 'choice';
	if (document.getElementsByClassName('AutoExpandTextarea-textarea').length > 0) return 'written';
	if (document.getElementsByClassName('FlippableFlashcard').length > 0) return 'flashcards';

	return 'other';
}
