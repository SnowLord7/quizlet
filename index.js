/*! DrewSnow v0.0.1 | (c) https://github.com/SnowLord7 */
let _extensionVersion = 1590784983652;

/**
 * Library by Drew Snow for miscellaneous uses 
 * @namespace Modules
 */

~function () {
	const timer = 'Exploit API loaded in';
	console.time(timer);

	window.drewsnow = {
		'mouse': { 'x': 0, 'y': 0 },

		/**
		 * Allow a container to be dragged around
		 * @param {HTMLElement} container - Container of the draggable element
		 * @param {HTMLElement} dragItem - Element to drag to move container
		 * @memberof Modules
		 */
		'draggable': (container, dragItem) => {
			if (dragItem === undefined) dragItem = container;

			let xOffset = 0,
				yOffset = 0,
				active = false,
				currentX,
				currentY,
				initialX,
				initialY;

			container.addEventListener('touchstart', dragStart, false);
			document.addEventListener('touchend', dragEnd, false);
			document.addEventListener('touchmove', drag, false);

			container.addEventListener('mousedown', dragStart, false);
			document.addEventListener('mouseup', dragEnd, false);
			document.addEventListener('mousemove', drag, false);

			function dragStart(e) {
				if (e.type === 'touchstart') {
					initialX = e.touches[0].clientX - xOffset;
					initialY = e.touches[0].clientY - yOffset;
				} else {
					initialX = e.clientX - xOffset;
					initialY = e.clientY - yOffset;
				}
				let ignoredElems = ['INPUT', 'BUTTON', 'A', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
				if (e.target === dragItem || container === dragItem && ignoredElems.indexOf(e.target.nodeName) == -1) active = true;
			}

			function dragEnd(e) {
				initialX = currentX;
				initialY = currentY;
				active = false;
			}

			function drag(e) {
				if (active) {
					e.preventDefault();
					if (e.type === 'touchmove') {
						currentX = e.touches[0].clientX - initialX;
						currentY = e.touches[0].clientY - initialY;
					} else {
						currentX = e.clientX - initialX;
						currentY = e.clientY - initialY;
					}
					xOffset = currentX;
					yOffset = currentY;
					setTranslate(currentX, currentY, container);
				}
			}

			function setTranslate(xPos, yPos, el) {
				el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
			}
		},

		/**
		 * Create new cascading style sheet (CSS)
		 * @param {String} css - CSS style to add to the page
		 * @returns {HTMLElement} New style sheet
		 * @memberof Modules
		 */
		'css': (css) => {
			let elem = document.createElement('style');
			elem.textContent = css;
			document.head.appendChild(elem);
			return elem;
		},

		/**
		 * Append HTML to body or given element
		 * @param {String} html - HTML to append to parent
		 * @param {HTMLElement} [HTMLElement] parent - Parent to append HTML to
		 * @returns {HTMLElement} New HTML element
		 * @memberof Modules
		 */
		'html': (html, parent) => {
			elements = new DOMParser().parseFromString(html, 'text/html');
			container = elements.body.firstChild;
			(parent || document.body).appendChild(container);
			return container;
		},

		/**
		 * Create and run a new script
		 * @param {String} script - Script element to create
		 * @returns {HTMLElement} New HTML element
		 * @memberof Modules
		 */
		'script': (script) => {
			let elem = document.createElement('script');
			elem.type = 'text/javascript';
			elem.textContent = script;
			elem.onload = function () { this.remove(); };
			document.body.appendChild(elem);
		},

		/**
		 * Create a new keybind
		 * @param {Function} func - Function to run on keydown
		 * @param {*} code - Identifier to select or remove keybind
		 * @param {Number} key - Key to call function
		 * @param {Boolean} [false] bool - Does the keybind start as on or off
		 * @memberof Modules
		 */
		'addKeyBind': function (func, code = -1, key = '', bool = false) {
			this.keybinds.push({
				'key': key,
				'on': bool,
				'func': func,
				'code': code
			});
			if (bool) func();
		},

		/**
		 * Remove keybind(s) with given identifier
		 * @param {*} code - Identifier to find and remove keybind
		 * @returns {Boolean} Keybind found or not
		 * @memberof Modules
		 */
		'removeKeyBind': function (code) {
			for (let i = 0; i < this.keybinds.length; i++) {
				let binds = this.keybinds;
				if (binds[i].code === code) {
					binds.splice(i, 1);
					return true;
				}
			}
			return false;
		},

		'keybinds': [],

		/**
		 * Find the angle between two given points
		 * @param {Number} x1 - X position of first point
		 * @param {Number} y1 - Y position of first point
		 * @param {Number} x2 - X position of second point
		 * @param {Number} y2 - Y position of second point
		 * @returns {Number} Angle between the two points
		 * @memberof Modules
		 */
		'angle': (x1, y1, x2, y2) => {
			return Math.atan2(y1 - y2, x1 - x2);
		},

		/**
		 * Find the distance between two given points
		 * @param {Number} x1 - X position of first point
		 * @param {Number} y1 - Y position of first point
		 * @param {Number} x2 - X position of second point
		 * @param {Number} y2 - Y position of second point
		 * @returns {Number} Distance between the two points
		 * @memberof Modules
		 */
		'distance': (x1, y1, x2, y2) => {
			let a = x1 - x2,
				b = y1 - y2;

			return Math.sqrt(a * a + b * b);
		},

		/**
		 * Find the closest object in an array to the given point
		 * @param {Object} you - Main charecter's position
		 * @param {String} you.x - Main charecter's position on X-axis
		 * @param {String} you.y - Main charecter's position on Y-axis
		 * @param {Array} objects - Array of positions of the other charecters
		 * @returns {Object} Closest object to main charecter
		 * @memberof Modules
		 */
		'closest': function (you, objects=[]) {
			let closestObj = objects[0];
			let closestDist = Infinity;
			for (let i = 0; i < objects.length; i++) {
				let obj = objects[i],
					dist = this.getDist(you.x, you.y, obj.x, obj.y);
				if (dist < closestDist) {
					closestObj = obj;
					closestDist = dist;
				}
			}
			return closestObj;
		},

        /**
		 * Spoof input event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @param {String} data - Data to be fed into the event
		 * @memberof Modules
		 */
		'input': function (elem, data='') {
			let event = new InputEvent('input', {
				bubbles: true,
				cancelBubble: false,
				cancelable: false,
				composed: true,
				currentTarget: null,
				dataTransfer: null,
				defaultPrevented: false,
				detail: 0,
				view: null,
				which: 0,
				returnValue: true,
				sourceCapabilities: null,
				eventPhase: 0,
				isComposing: false,
				inputType: 'insertText',
				srcElement: elem,
				target: elem,
				data
			});
			elem.dispatchEvent(event);
		},
        
        /**
		 * Spoof focus event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @memberof Modules
		 */
		'focus': function (elem) {
			elem.focus();
			let event = new FocusEvent('focus', {
				bubbles: false,
				cancelBubble: false,
				cancelable: false,
				composed: true,
				currentTarget: null,
				defaultPrevented: false,
				detail: 0,
				eventPhase: 0,
				isTrusted: true,
				relatedTarget: null,
				returnValue: true,
				sourceCapabilities: null,
				srcElement: elem,
				target: elem,
				view: window,
				which: 0
			});
			elem.dispatchEvent(event);
		},

		/**
		 * Download a file with given name and contents
		 * @param {String} filename - Name of the file to download
		 * @param {String} data - Contents of the file to download
		 * @memberof Modules
		 */
		'download': function (filename, data) {
			let elem = document.createElement('a');
			elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
			elem.setAttribute('download', filename);

			elem.style.display = 'none';
			document.body.appendChild(elem);

			elem.click();

			document.body.removeChild(elem);
		},

		/**
		 * Attempt to go fullscreen
		 */
		'fullscreen': function () {
			let elem = document.documentElement;
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			}
		},

		/**
		 * Attempt to intercept scripts
		 * @param {String} match - String to match the script SRC to
		 * @param {String} script - Script to replace the file with
		 * @memberof Modules
		 */
		'intercept': function (match, script) {
			document.addEventListener('beforescriptexecute', function (e) {
				src = e.target.src;
				content = e.target.text;

				if (src.indexOf(match) != -1) {
					e.preventDefault();
					e.stopPropagation();
					e.target.remove();

					this.script(script);
				}
			});
		},

		/**
		 * Attempt to copy text to clipboard
		 * @param {String} text - String to copy to clipboard
		 * @memberof Modules
		 */
		'copy': function (text) {
			let input = document.createElement('textarea');

			input.value = text;
			input.setAttribute('readonly', '');
			document.body.appendChild(input);

			input.focus();
			input.select();

			try {
				input.style = 'opacity: 0; visibility: hidden;';

				document.execCommand('copy');
				document.body.removeChild(input);
			} catch (e) {
				input.style = 'z-index: 2147483646; position: fixed; left: 50%; top: 50%; width: 50%; height: 50%; transform: translate(-50%, -50%)';

				input.onclick = function () {
					this.focus();
					this.select();
					document.execCommand('copy');
				};

				input.onblur = function () { this.remove(); };
			}
		},

		/**
		 * Spoof mousedown event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @param {Object} params - Parameters to be fed into the event
		 * @memberof Modules
		 */
		'mousedown': function (elem, params={}) {
			let event = new MouseEvent('mousedown', {
				currentTarget: params.currentTarget || elem || document.body,
				view: params.view || window,
				bubbles: params.bubbles || true,
				cancelable: params.cancelable || true,
				clientX: params.x || 0,
				clientY: params.y || 0,
				pageX: params.x || 0,
				pageY: params.y || 0
			});
			elem.dispatchEvent(event);
		},

		/**
		 * Spoof mouseup event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @param {Object} params - Parameters to be fed into the event
		 * @memberof Modules
		 */
		'mouseup': function (elem, params={}) {
			let event = new MouseEvent('mouseup', {
				currentTarget: params.currentTarget || elem || document.body,
				view: params.view || window,
				bubbles: params.bubbles || true,
				cancelable: params.cancelable || true,
				clientX: params.x || 0,
				clientY: params.y || 0,
				pageX: params.x || 0,
				pageY: params.y || 0
			});
			elem.dispatchEvent(event);
		},

		/**
		 * Spoof mousemove event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @param {Object} params - Parameters to be fed into the event
		 * @memberof Modules
		 */
		'mousemove': function (elem, params={}) {
			let event = new MouseEvent('mousemove', {
				currentTarget: params.currentTarget || elem || document.body,
				view: params.view || window,
				bubbles: params.bubbles || true,
				cancelable: params.cancelable || true,
				clientX: params.x || 0,
				clientY: params.y || 0,
				pageX: params.x || 0,
				pageY: params.y || 0
			});
			elem.dispatchEvent(event);
		},

		/**
		 * Picks a random number inbetween two given numbers
		 * @param {Number} min - Minimum number
		 * @param {Number} max - Maximum number
		 * @memberof Modules
		 */
		'random': (min, max) => {
			return Math.floor(Math.random() * (max - min) + min);
		},

		'init': function () {
			const binds = this.keybinds;
			document.body.addEventListener('keydown', (e) => {
				for (let i = 0; i < binds.length; i++) {
					let data = binds[i];
					if ((e.which || e.keyCode) === data.code) {
						data.func(data.on);
						data.on = !data.on;
					}
				}
			});

			window.addEventListener('mousemove', e => {
				this.mouse.x = e.clientX;
				this.mouse.y = e.clientY;
			});

			let elem = this.html(`
				<div style="pointer-events: none; user-select: none;box-shadow: 0 5px 35px rgba(0, 0, 0, .65);font-family: Consolas, monaco, monospace;transition: transform 1s ease;transform: translateX(125%);border-radius: 3px 0 0 3px;width: 250px; height: 90px;background-color: #11af00;box-sizing: content-box;bottom: 20px; right: 0;box-sizing: border-box;margin: 0; padding: 0;z-index: 2147483647;text-align: center;line-height: 100%;padding-top: 30px;position: fixed;line-height: 0;color: #000;">
					<span style="line-height: 0px; font-size: 25px; font-family: inherit;">&#x44;&#x65;&#x76;&#x65;&#x6C;&#x6F;&#x70;&#x65;&#x64;&#x20;&#x42;&#x79;</span><br>
					<span style="line-height: 45px; font-size: 45px; text-shadow: 0 1px #808d93, -1px 0 #cdd2d5, -1px 2px #808d93, -2px 1px #cdd2d5, -2px 3px #808d93, -3px 2px #cdd2d5, -3px 4px #808d93, -4px 3px #cdd2d5, 2px 2px 2px rgba(206, 89, 55, 0.1); font-family: inherit;">&#x44;&#x72;&#x65;&#x77;&#x20;&#x53;&#x6E;&#x6F;&#x77;</span>
				</div>
			`.trim());

			setTimeout(() => { elem.style.transform = ''; }, 1);

			setTimeout(() => { elem.style.transform = 'translateX(125%)'; }, 4000);

			setTimeout(() => { elem.remove(); }, 5250);
			
			Number.prototype.toDegree = function () { return this * (180 / Math.PI); };

			Number.prototype.toRadian = function () { return this * (Math.PI / 180); };

			Array.prototype.random = function () { return this[Math.floor(Math.random() * this.length)] || []; };

			Element.prototype.forEach = function (callback) { for (let i = 0; i < this.length; i++) callback(this[i], i); };

			Array.prototype.contains = function (value) {
				for (let i = 0; i < this.length; i++)
					if (this[i] === value) return true;
				return false;
			};

			Array.prototype.findByName = function (name = '', exact = false) {
				let result = [],
					index = -1;
				if (this.length < 1) return [];

				for (let i = 0; i < this.length; i++) {
					let obj = this[i];

					if (exact && obj.name != name) continue;
					if (!exact && obj.name !== name) continue;

					result.push(obj);
					index = i;
				}

				return result[0];
			};

			String.prototype.encode = function () {
				return this
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&#39;');
			};

			CanvasRenderingContext2D.prototype.line = function (x1, y1, x2, y2, color = '#000', thickness = 1) {
				this.save();
				this.lineWidth = thickness;
				this.strokeStyle = color;

				this.beginPath();
				this.moveTo(x1, y1);
				this.lineTo(x2, y2);
				this.stroke();
				this.restore();
			};

			CanvasRenderingContext2D.prototype.circle = function (x, y, r, color = '#000') {
				this.save();

				this.arc(x, y, r, 0, 2 * Math.PI, false);
				this.fillStyle = color;
				this.fill();

				this.restore();
			};

			CanvasRenderingContext2D.prototype.rect = function (x, y, width, height, color = '#000') {
				this.save();

				this.fillStyle = color;
				this.fillRect(x, y, width, height, color);

				this.restore();
			};

			console.timeEnd(timer);
		}
	};
	window.drewsnow.init();
}();
function Alert(header, content) {
	let container = document.createElement('div');
	container.style = `box-shadow: 0 0.3125rem 1rem 0 rgba(0, 0, 0, 0.24); transform: translateX(-50%); margin-bottom: 2.8125rem; margin-top: 2.8125rem; max-width: 100%; width: 37.5rem; position: relative; top: 0; left: 50%; z-index: 2147483647; color: rgb(69, 83, 88); display: block; background-clip: border-box; background-color: rgb(255, 255, 255)`;
	container.className = 'custom-alert-container';

	let head = document.createElement('div');
	head.style = `background-color: rgb(66, 87, 178); color: rgb(255, 255, 255); font-size: 30px; line-height: 26px; padding: 32px;`;
	head.innerHTML = `${header}<span onclick="this.parentElement.parentElement.remove();" class="UIButton-wrapper" style="position: absolute; right: 0; width: 94px; cursor: pointer;"><svg class="UIIcon UIIcon--x-thin"><noscript></noscript><use xlink:href="#x-thin"></use><noscript></noscript></svg></span>`;
	container.appendChild(head);

	let body = document.createElement('div');
	body.style = `color: rgb(69, 83, 88); font-size: 16px; padding: 32px;`;
	body.innerHTML = content;
	container.appendChild(body);

	document.body.appendChild(container);
	return container;
}

function removeClass(className) {
	let elems = document.getElementsByClassName(className);

	for (let i = 0; i < elems.length; i++) elems[i].remove();
}

function obfuscate(msg, num=77) {
	let answer = '';
	for (let i = 0; i < msg.length; i++) answer += ('-' + (msg.charCodeAt(i) + num % (i + 1)));
	return answer.slice(1);
}

function getCookie(cname) {
    let name = cname + '=',
        decodedCookie = decodeURIComponent(document.cookie),
        ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; ++i) {
        let c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);

        if (c.indexOf(name) === 0)
            return c.substring(name.length, c.length);
    }

    return '';
}

function copyText(text) {
	let input = document.createElement('textarea');

	input.value = text;
	input.setAttribute('readonly', '');

	document.body.appendChild(input);

	input.focus();
	input.select();

	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
		input.style = 'z-index: 2147483646; position: fixed; left: 50%; top: 50%; width: 50%; height: 50%; transform: translate(-50%, -50%)';

		input.onclick = function () {
			this.focus();
			this.select();
			document.execCommand('copy');
		};

		input.onblur = function () { this.remove(); };
	} else {
		input.stype = 'opacity: 0; visibility: hidden;';

		document.execCommand('copy');
		document.body.removeChild(input);
	}
}

Object.defineProperty(String.prototype, 'hashCode', {
    value: function () {
        let hash = 0, chr;
        for (let i = 0; i < this.length; ++i) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    }
});
window.settings = {
	'default': {
		'developer': 'Drew Snow',
		'gravity': { 'score': 4294967295 },
		'learn': { 'speed': 100 },
		'live': { 'answerDelay': 100, 'autoAnswer': true, 'displayAnswer': true, 'key': 67 },
		'match': { 'time': 0.5 },
		'night': false,
		'test': { 'key': 67 }
	},
    'current': {
		'developer': 'Drew Snow',
		'gravity': { 'score': 4294967295 },
		'learn': { 'speed': 100 },
		'live': { 'answerDelay': 100, 'autoAnswer': true, 'displayAnswer': true, 'key': 67 },
		'match': { 'time': 0.5 },
		'night': false,
		'test': { 'key': 67 }
	},
	'fix': function () {
		this.current = this.get();
		if (typeof this.current.developer != 'string') this.current.developer = this.default.developer;
		if (typeof this.current.gravity.score != 'number') this.current.gravity.score = this.default.gravity.score;
		if (typeof this.current.learn.speed != 'number') this.current.learn.speed = this.default.learn.speed;
		if (typeof this.current.live.answerDelay != 'number') this.current.live.answerDelay = this.default.live.answerDelay;
		if (typeof this.current.live.autoAnswer != 'boolean') this.current.live.autoAnswer = this.default.live.autoAnswer;
		if (typeof this.current.live.displayAnswer != 'boolean') this.current.live.displayAnswer = this.default.live.displayAnswer;
		if (typeof this.current.live.key != 'number') this.current.live.key = this.default.live.key;
		if (typeof this.current.match.time != 'number') this.current.match.time = this.default.match.time;
		if (typeof this.current.night != 'boolean') this.current.night = this.default.night;
		if (typeof this.current.test.key != 'number') this.current.test.key = this.default.test.key;
		this.save();
	},
	'reset': function () {
		localStorage.setItem('extensionSettings', JSON.stringify(this.default));
	},
	'save': function () {
		localStorage.setItem('extensionSettings', JSON.stringify(this.current));
	},
	'get': function () {
		if (localStorage) {
            if (!localStorage.getItem('extensionSettings')) this.reset();
            return JSON.parse(localStorage.getItem('extensionSettings'));
        }
        return this.default;
	}
};
settings.fix();

~function () {
	let style = drewsnow.css(`
        #extensionSettingsContainer {
			transition: transform 1s ease;
			transform: translateY(355px);

			box-shadow: 0 5px 35px rgba(0, 0, 0, .65);
			font-family: Roboto, Verdana, Arial;
            border-top: 25px solid #d86d02;
            height: 380px; width: 300px;
			border-radius: 0 5px 0 0;
            background-color: #000;
			box-sizing: border-box;
			z-index: 2147483638;
			bottom: 0; left: 0;
            position: fixed;
            display: block;
            line-height: 1;
            padding: 10px;
            color: #fff;
        }

		#extensionSettingsContainer:hover {
			transform: translateY(0);
		}

        #extensionSettingsContainer h2 {
            margin-top: 10px;
        }

        #extensionSettingsContainer input {
            background-color: rgba(255, 255, 255, .8);
            margin-right: 10px;
            border-radius: 2px;
            max-width: 150px;
            outline: none;
            float: right;
            color: #000;
        }

        #extensionSettingsContainer #saveSettings {
            width: 100%; height: 30px;
            border-radius: 5px;
            outline: none;
        }

        #extensionSettingsContainer .adaptKeyInput {
            width: 70px;
        }

        #extensionSettingsContainer .numberOnlyInput {
            width: 80px;
        }

        #extensionSettingsContainer .extensionMenuItem {
            margin-right: 5px;
            cursor: pointer;
            float: right;
        }

        #extensionSettingsContainer .extensionMenuItem:hover {
            color: #8c8c8c;
        }
    `);

	let container = drewsnow.html(`
		<div id="extensionSettingsContainer">
			<span class="extensionMenuItem" id="extensionExitButton">&times;</span>
			<span class="extensionMenuItem" id="extensionResetButton">&#8634;</span>
			<h2 id="extensionSettingsTitle">Settings</h2>
			<div>Gravity Score<input id="gravityScoreInput" class="numberOnlyInput"></input></div><br>
			<div>Learn Speed<input id="learnSpeedInput" class="numberOnlyInput"></input></div><br>
			<div>Live Answer Delay<input id="liveDelayInput" class="numberOnlyInput"></input></div><br>
			<div>Live Auto-Answer<input id="liveAutoAnswerInput" type="checkbox"></input></div><br>
			<div>Live Show Answer<input id="liveShowAnswerInput" type="checkbox"></input></div><br>
			<div>Live Toggle Key<input name="live" class="adaptKeyInput" id="liveKeyInput"></input></div><br>
			<div>Match Time<input id="matchTimeInput" class="numberOnlyInput"></input></div><br>
			<div>Test Key<input name="test" class="adaptKeyInput" id="testKeyInput"></input></div><br>
			<button id='saveSettings'>Save</button>
		</div>
    `);

	let inputs = document.getElementsByClassName('adaptKeyInput');

	for (let i = 0; i < inputs.length; i++) {
		let input = inputs[i];
		input.onkeypress = changeSettingOnKey;
		input.onkeydown = changeSettingOnKey;
		input.onkeyup = changeSettingOnKey;
	}

	inputs = document.getElementsByClassName('numberOnlyInput');
	for (let i = 0; i < inputs.length; i++) {
		let input = inputs[i];
		input.onkeydown = e => {
			if (!/^([0-9.,]|Backspace)$/i.test(e.key)) e.preventDefault();
		}
	}

    document.getElementById('extensionSettingsTitle').addEventListener('dblclick', () => {
        try {
            let session = new Debug();
            prompt('Copy this and send it to Drew Snow', session.run());
        } catch (e) { prompt('Copy this and send it to Drew Snow', e); }
    });

	document.getElementById('extensionResetButton').onclick = () => {
		localStorage.setItem('extensionSettings', JSON.stringify({
			'developer': 'Drew Snow',
			'gravity': { 'score': 4294967295 },
			'learn': { 'speed': 100 },
			'live': { 'answerDelay': 100, 'autoAnswer': true, 'displayAnswer': true, 'key': 67 },
			'match': { 'time': 0.5 },
			'night': false,
			'test': { 'key': 67 }
		}));
		window.location.reload();
	};

	document.getElementById('extensionExitButton').onclick = function () {
		this.parentElement.remove();
	}

	document.getElementById('saveSettings').onclick = () => {
		localStorage.setItem('extensionSettings', JSON.stringify({
			"developer": "Drew Snow",
			"gravity": {
				"score": Number(document.getElementById('gravityScoreInput').value)
			},
			"learn": {
				"speed": Number(document.getElementById('learnSpeedInput').value)
			},
			"live": {
				"answerDelay": Number(document.getElementById('liveDelayInput').value),
				"autoAnswer": !!document.getElementById('liveAutoAnswerInput').checked,
				"displayAnswer": !!document.getElementById('liveShowAnswerInput').checked,
				"key": Number(document.getElementById('liveKeyInput').value)
			},
			"match": {
				"time": Number(document.getElementById('matchTimeInput').value)
			},
			"night": false,
			"test": {
				"key": Number(document.getElementById('testKeyInput').value)
			}
		}));
	};

	let settings = JSON.parse(localStorage.getItem('extensionSettings')) || { "developer": "Drew Snow", "gravity": { "score": 4294967295 }, "learn": { "speed": 700 }, "live": { "answerDelay": 100, "autoAnswer": 1, "displayAnswer": 1, "key": "c" }, "match": { "time": 0.5 }, "night": false, "test": { "key": "c" } };
	document.getElementById('gravityScoreInput').value = settings.gravity.score;
	document.getElementById('learnSpeedInput').value = settings.learn.speed;
	document.getElementById('liveDelayInput').value = settings.live.answerDelay;
	document.getElementById('liveAutoAnswerInput').checked = +settings.live.autoAnswer;
	document.getElementById('liveShowAnswerInput').checked = +settings.live.displayAnswer;
	document.getElementById('liveKeyInput').value = settings.live.key;
	document.getElementById('matchTimeInput').value = settings.match.time;
	document.getElementById('testKeyInput').value = settings.test.key;

	function changeSettingOnKey(e) {
		e.preventDefault();
		this.value = e.keyCode || e.which;
	}
}();

window.Answers = {
	'duplicates': function (terms = this.get()) {
		let words = terms.map(e => e.word),
			images = terms.map(e => e.photo || e._imageUrl),
			definitions = terms.map(e => e.definition);

		if (new Set(words).size != words.length) return true;
		if (new Set(definitions).size != definitions.length) return true;
		if (words.filter(e => definitions.indexOf(e) != -1).length) return true;

		return false;
	},

	'get': function () {
		if (Quizlet.assistantModeData !== undefined) {
			return Quizlet.assistantModeData.terms;
		} else if (Quizlet.learnGameData !== undefined) {
			return Quizlet.learnGameData.allTerms;
		} else if (Quizlet.testModeData !== undefined) {
			return Quizlet.testModeData.terms;
		} else if (Quizlet.spellModeData !== undefined) {
			return Quizlet.spellModeData.spellGameData.termsById;
		} else if (Quizlet.matchModeData !== undefined) {
			return Quizlet.matchModeData.terms;
		} else if (Quizlet.gravityModeData !== undefined) {
			return Quizlet.gravityModeData.terms;
		}
		return [];
	},

	'find': function (question = '', terms = this.get()) {
		let words = terms.filter(e => e.word == question),
			definitions = terms.filter(e => e.definition == question),
			images = terms.filter(e => e.photo == question || e._imageUrl == question);

		answers = [...words, ...definitions, ...images];
		return answers;
	},

	'exact': function (question, src = '', terms = this.get()) {
		let matches = [];

		// Test for normal matching text and image
		for (let i = 0; i < terms.length; ++i) {
			let word = terms[i].word,
				definition = terms[i].definition,
				image = terms[i].photo || terms[i]._imageUrl;

			if (question == word && src == image) matches.push(definition);
		}

		// Test for defintion with text and image
		if (matches.length == 0) {
			for (let i = 0; i < terms.length; ++i) {
				let word = terms[i].word,
					definition = terms[i].definition,
					image = terms[i].photo || terms[i]._imageUrl;

				if (question == definition && src == image) matches.push(word);
			}
		}

		// Test for only matching word
		if (matches.length == 0) {
			for (let i = 0; i < terms.length; ++i) {
				let word = terms[i].word,
					definition = terms[i].definition;

				if (question == word) matches.push(definition);
			}
		}

		// Test for only matching definition
		if (matches.length == 0) {
			for (let i = 0; i < terms.length; ++i) {
				let word = terms[i].word,
					definition = terms[i].definition;

				if (question == definition) matches.push(word);
			}
		}

		return matches;
	},

	'post': function (game = 'match', score = '1') {
		let data = {};

		score = String(score);

		if (game === 'gravity') {
			score = score || prompt('Highest possible score is 4294967295.\nScore: ', 4294967295) || 4294967295;

			data = {
				sessionId: undefined,
				score: score,
				previous_record: Quizlet.highscoresModalData.previousRecord || 420,
				time_started: Date.now() - 53582,
				selectedOnly: false
			}
		} else if (game === 'match') {
			score = score || prompt('Fastest possible time is 0.5\nScore: ', '0.5') || '0.5';

			if (score.indexOf('.') == -1) score += '0';
			score = score.replace(/[^0-9]/g, '');

			data = {
				score: Math.min(Math.max(5, score), 4294967295),
				previous_record: Quizlet.matchModeData.recordTime || 69,
				too_small: 0,
				time_started: Quizlet.SERVER_TIME,
				selectedOnly: false
			}
		}

		let message = { 'data': obfuscate(JSON.stringify(data), 77) };

		let send = new XMLHttpRequest;
		send.onreadystatechange = function () {
			if (send.readyState === 4) {
				try {
					let response = JSON.parse(send.responseText);
					if (send.status == 200) Alert('Success!', `Injected a ${game} score of ${JSON.parse(send.responseText).responses[0].models.session[0].score} into ${JSON.parse(send.responseText).responses[0].models.user[0].username}'s (${JSON.parse(send.responseText).responses[0].models.user[0].id}) account!`);
					else Alert('Error in sending request!', 'Sending negative numbers, decimal numbers, and numbers lower than five will not work! If you have done none of these and this is happening multiple times, please submit a bug report with the following information:<br><textarea style="width: 100%; resize: none;">' + 'Status:' + send.status + '\nGame:' + game + '\nScore:' + score + '\nError:' + e + '</textarea>');
				} catch (e) { Alert('Error in parsing response!', 'Sending negative numbers, decimal numbers, and numbers lower than five will not work! If you have done none of these and this is happening multiple times, please submit a bug report with the following information:<br><textarea style="width: 100%; resize: none;">' + 'Game:' + game + '\nScore:' + score + '\nError:' + e + '</textarea>'); }
			}
		}
		send.open('POST', document.location.href + '/highscores');
		send.setRequestHeader('CS-Token', Quizlet.getCsToken());
		send.setRequestHeader('Accept', 'application/json');
		send.setRequestHeader('Content-Type', 'application/json');
		send.send(JSON.stringify(message));
	}
}
function Live() {
    this.paused = false;

    this.container = drewsnow.html(`
		<div style="line-height: 1.2; top: 0; left: 0; font-family: 'Courier New', Courier, monospace; z-index: 2147483647; background-color: #202020; position: fixed; width: 350px; height: 475px; margin: 0; padding: 0; box-shadow: 0 5px 35px rgba(0, 0, 0, .75)">
			<nav style="cursor: move; user-select: none; text-align: right; color: #fff; position: absolute; width: 348px; height: 25px; margin: 1px;">
				<span onclick="alert('Intructions:\\n1.) Enter the Quizlet Live code into the input with a placeholder of 123456.\\n\\n2.) Click the large orange button that says Obtain Live Data.\\n\\n3.) Copy the text that is in the site that pops up (Ctrl + a, then Ctrl + c) and paste it (Ctrl + v) all in the textarea that says Paste The Site Data Here.\\n\\n4.) If the data if correct, the answer will be shown in the top right corner of your screen, and if you have the answer, it will be clicked for you.\\n\\nNotes:\\nPressing C will hide the answer.\\n\\nYou can toggle the script from automatically clicking the answer by clicking the text in the top right of your screen.\\n\\nPressing Ctrl + a will select all the text on a page.\\n\\nPressing Ctrl + v will paste the copied text for you.\\n\\nThis script was made by Drew Snow.');" style="font-size: 15px; cursor: pointer; width: 100%; height: 100%;">?</span>
				<span onclick="this.parentElement.parentElement.remove();" aria-label="Close Interface Model" style="cursor: pointer; width: 100%; height: 100%; padding-right: 5px; font-size: 20px;">&times;</span>
			</nav>
			
			<div style="margin: 0; border-radius: 3px; background-color: #141414; position: absolute; bottom: 276px; width: 346px; height: 170px; margin: 2px;">
				<button id="getLiveDataButton">Obtain Live Data</button>
				<div id="liveCodeInput" style="height: 20px; width: 132px; position: relative; left: 0; margin-left: 50%; transform: translateX(-50%);"><input><input><input><input><input><input></div>
				<textarea spellcheck="false" id="quizletLiveDataInput" class="customScrollBar" placeholder="Paste The Site Data Here"></textarea>
			</div>

			<div style="margin: 0; position: absolute; bottom: 0px; width: 346px; height: 275px; margin: 2px;">
				<div style="margin: 0;" id="customCommandOutput" class="customScrollBar">
					<div style="color: #339b00;">Loaded initial HTML.</div>
				</div>
			</div>
		</div>
	`);

    this.css = drewsnow.css(`
        @keyframes shake-animation {
            0% { transform: translate(-51%, -1px) rotate(1deg); }
            20% { transform: translate(-50%, 1px) rotate(0deg); }
            40% { transform: translate(-49%, 2px) rotate(-1deg); }
            60% { transform: translate(-51%, 0px) rotate(1deg); }
            80% { transform: translate(-50%, -1px) rotate(-1deg); }
            100% { transform: translate(-49%, 1px) rotate(0deg); }
        }
        
        .shakingElement {
            animation: shake-animation .4s; 
            animation-iteration-count: infinite; 
        }

        #getLiveDataButton {
            width: 346px;
        }

        #quizletLiveDataInput {
            background-color: rgba(0, 0, 0, .2);
            width: 340px; height: 103px;
            overflow-x: hidden;
            color: #d6d6d6;
            outline: none;
            resize: none;
        }

        #customCommandOutput {
            font-family: 'Courier New', Courier, monospace;
            background-color: rgba(0, 0, 0, .1);
            transition: all .3s ease;
            border-radius: 3px;
            overflow-y: scroll;
            font-size: 15px;
			height: 266px;
            padding: 5px;
        }

        .customScrollBar::-webkit-scrollbar {
            width: 10px;
        }

        .customScrollBar::-webkit-scrollbar-track {
            background: #1c1c1c; 
        }

        .customScrollBar::-webkit-scrollbar-thumb {
            background: #3d3d3d; 
        }

        .customScrollBar::-webkit-scrollbar-thumb:hover {
            background: #686868; 
        }

        #getLiveDataButton {
            transition: opacity .3s, background .8s ease, color .5s ease, box-shadow .5s ease;
            background-color: #ef7f00;
            position: relative;
            font-size: 1.6em;
            cursor: pointer;
            padding: 0 2em;
            outline: none;
            height: 40px;
            border: none;
            opacity: .8;
            color: #fff;
        }

        #getLiveDataButton:hover {
            background-color: #d3d3d3;
            color: #000;
            opacity: 1;
        }

        #getLiveDataButton:before, #getLiveDataButton:after {
            transition: width .8s ease;
            width: 0; height: 2px;
            background: #ffb25b;
            position: absolute;
            top: 0; right: 0;
            content: '';
        }

        #getLiveDataButton:after {
            right: inherit; top: inherit;
            left: 0; bottom: 0;
        }

        #getLiveDataButton:active:before, #getLiveDataButton:active:after {
            transition: all .8s ease;
            width: 100%;
        }

        #getLiveDataButton:hover {
            box-shadow: 0px 5px 13px 0px rgba(166, 166, 166, .5);
        }
    `);

    this.cmd = document.getElementById('customCommandOutput');
    this.input = document.getElementById('quizletLiveDataInput');

    this.input.onchange = e => { this.update(e); };
    this.input.onkeyup = e => { this.update(e); };
    this.input.oninput = e => { this.update(e); };

    this.btnLive = document.getElementById('getLiveDataButton');
    this.btnLive.onclick = () => { this.getData(); };

    this.inpLive = document.getElementById('liveCodeInput');
    this.inputs = this.inpLive.querySelectorAll('input');

    this.options = document.createElement('div');
    this.options.style = 'transition: all 0.3s; position: absolute; padding-right: 5px; opacity: 1; margin: 0; right: 0; top: 0';
    this.options.id = 'liveSettingsContainer';
    this.options.innerHTML = '<span style="color: #fff" id="liveAnswerPhrase">Answer</span><span style="user-select: none; color: #000;"> — </span><span style="color: #ff0000; cursor: pointer; user-select: none;" id="btnToggleHack">Pause</span>';
    document.body.appendChild(this.options);

    this.setup();

    this.inpLive.addEventListener('paste', e => { this.paste(e); });

    this.data = {};
    this.loop = setInterval(() => { this.interval(); }, 250);

    drewsnow.addKeyBind(() => {
        let container = document.getElementById('liveSettingsContainer');
        if (container.style.opacity != 0) container.style.opacity = 0;
        else container.style.opacity = 1;
    }, settings.current.live.key || 67, 'c');

    drewsnow.addKeyBind(() => {
        try { document.getElementById('btnToggleHack').click(); } catch (e) { };
    }, 86, 'v');

    this.btnToggle = document.getElementById('btnToggleHack');

    this.btnToggle.onclick = () => {
        let btn = this.btnToggle;

        this.paused = !this.paused;
        if (this.paused) {
            btn.style.color = '#00ff00';
            btn.textContent = 'Resume';
        } else {
            btn.style.color = '#ff0000';
            btn.textContent = 'Pause';
        }
    };

    drewsnow.draggable(this.container, this.container.querySelector('nav'));

    this.log('Finished Executing JavaScript.', '#339b00');
    this.log('For help click the \'?\' in the top right corner.', '#1c73ff');
}

Live.prototype.click = element => {
    if (element.fireEvent) {
        element.fireEvent('onclick');
    } else {
        let event = document.createEvent('Events');
        event.initEvent('click', true, false);
        element.dispatchEvent(event);
    }
}

Live.prototype.log = function (msg, color = '#c6c6c6') {
    let element = document.createElement('div'),
        cmd = this.cmd;

    element.style.display = 'block';
    element.style.color = color;
    element.textContent = msg;

    cmd.appendChild(element);
    cmd.children[cmd.children.length - 1].scrollIntoView();

    if (cmd.children.length > 25) cmd.children[0].remove();
}

Live.prototype.update = function (e) {
    if (!e.target.value) e.target.style.border = '1px solid blue';
    else {
        try {
            let json = JSON.parse(e.target.value);
            if (json.terms.length < 1) throw 0;
            e.target.style.border = '1px solid green';
            this.data = json;
        } catch (error) { e.target.style.border = '1px solid red'; }
    }
}

Live.prototype.getData = function (code='') {
    let inputs = this.inpLive.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) code += inputs[i].value;

    if (code.length == 6 && !isNaN(code)) {
        this.log('Sending GET requests to Quizlet...', '#3884ff');
        fetch(`https://quizlet.com/webapi/3.2/game-instances?filters={"gameCode":${code},"isInProgress":true,"isDeleted":false}&perPage=500`)
            .then((resp) => resp.json())
            .then((data) => {
                this.log('Recieved data from Quizlet.', '#3884ff');
                if (data.responses[0].models.gameInstance.length > 0) {
                    let id = data.responses[0].models.gameInstance[0].itemId;
                    fetch(`https://quizlet.com/${id}/flashcards`)
                        .then(e => e.text())
                        .then(html => {
                            let matches = html.match(/window\.Quizlet\["assistantModeData"\]\s*=\s*(.+?);\s*QLoad\(\"Quizlet\.assistantModeData\"\)/);
                            try {
                                this.input.value = matches[1];
                                this.data = JSON.parse(matches[1]);
                                this.log('Found answers!', '#339b00');
                            } catch (e) { this.log('Unable to find answers!', '#ff0015'); }
                        });
                    this.log('Grabbing answers...', '#fff');
                } else {
                    this.log('Unable to find live game with code ' + code, '#ff0015');
                }
            })
            .catch((e) => {
                this.log('Unable to send request.', '#ef9700');
            });
    } else {
        this.log('Please enter a correct live code!', '#ff0015');
        this.inpLive.classList.toggle('shakingElement');
        setTimeout(() => { this.inpLive.classList.toggle('shakingElement'); }, 400);
    }
}

Live.prototype.setup = function () {

    // Automatically get game code if game is running
    try {
        let data = JSON.parse(getCookie('live_previous_game_instance'));
        if (data.gameCode) this.getData(data.gameCode);
    } catch(e) {}

    // Custom inputs for game code
    for (let i = 0; i < this.inputs.length; i++) {
        let input = this.inputs[i];
        input.style = 'border: none; border-bottom: 1px solid #969696; background-color: rgba(0,0,0,0.1); text-align: center; outline: none; margin: 1px 1px; width: 20px; color: #fff;';

        input.name = i;
        input.maxLength = 1;
        input.placeholder = i + 1;

        input.onkeydown = e => {
            if (!(e.keyCode == 86 || e.which == 86) && !e.ctrlKey && e.shiftKey && e.altKey)
                e.preventDefault();

            let nextInput = this.inpLive.querySelectorAll('input[name="' + (Number(e.target.name) + 1) + '"')[0],
                prevInput = this.inpLive.querySelectorAll('input[name="' + (Number(e.target.name) - 1) + '"]')[0];

            if (e.keyCode == 8 || e.which == 8) {
                e.target.value = '';
                if (prevInput) {
                    prevInput.value = '';
                    setTimeout(() => { prevInput.focus(); }, 0);
                }
            } else if (e.key.match(/[0-9]/) != null) {
                e.target.value = e.key;
                if (nextInput) setTimeout(() => { nextInput.focus(); }, 0);
            }
        }
    }
}

// Handle the paste event
Live.prototype.paste = function (e) {
    let clipboardData = e.clipboardData || window.clipboardData,
        pastedData = clipboardData.getData('Text');

    let formattedText = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
    for (let i = 0; i < this.inputs.length; i++)
        this.inputs[i].value = formattedText[i];
}

Live.prototype.interval = function () {
    if (this.data && Object.keys(this.data).length > 0 && window.location.href.indexOf('quizlet') > 0 && window.location.href.indexOf('live') > 0) {
        if (document.getElementById('liveAnswerPhrase') && document.getElementsByClassName('StudentPrompt-inner')[0] && document.getElementsByClassName('StudentTerm is-clickable can-beClicked').length) {
            let question = document.getElementsByClassName('StudentPrompt-inner')[0].innerText.toLowerCase().trim(),
                options = document.getElementsByClassName('StudentTerm is-clickable can-beClicked');

            this.data.terms.filter(data => {
                if (data.word.toLowerCase() == question) return true;
                else if (data.definition.toLowerCase() == question) return true;
            }).forEach(data => {
                if (data.word.toLowerCase() == question) document.getElementById('liveAnswerPhrase').textContent = word.definition;
                else document.getElementById('liveAnswerPhrase').textContent = data.word;

                if (!this.paused) {
                    for (let i = 0; i < options.length; i++) {
                        let option = options[i].innerText.toLowerCase().trim();
                        if (data.definition.toLowerCase() == option) this.click(options[i]);
                        else if (data.word.toLowerCase() == option) this.click(options[i]);
                    }
                }                
            });
        }
    }
}
function Flashcards() {
	const options = {
        'text': atob('RHJldyBTbm93IHdhcyBoZXJl'),
        'size': 150,
        'weight': 800,
        'speed': 2500
    };

    for (let i = 0; i < 50; i++) {
        let element = document.createElement('div');
        element.className = 'floatingElements'
        element.style = `width: 100%; height: 100%; margin: auto; pointer-events: none; user-select: none; font-weight: ${options.weight}; font-size: ${options.size}px; position: absolute; z-index: 2147483647; transition: all ${options.speed/1000}s linear; transform-origin: center center; text-align: center;`;
        element.textContent = options.text;

        document.body.appendChild(element);
    }

    setInterval(() => {
        let elements = document.getElementsByClassName('floatingElements');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color = color();
            elements[i].style.opacity = Math.random() + .1;
            elements[i].style.transform = `rotate(${drewsnow.random(0,360)}deg) translate(${drewsnow.random(-1000,1000)}px, ${drewsnow.random(-500,500)}px) translate3d(${drewsnow.random(0,200)}px,${drewsnow.random(0,200)}px,${drewsnow.random(0,200)}px) rotateX(${drewsnow.random(0,360)}deg) rotateY(${drewsnow.random(0,360)}deg) rotateZ(${drewsnow.random(0,360)}deg)`;
        }
    }, options.speed);

    function color() { return ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'][Math.floor(Math.random() * 7)]; }
}
function Gravity() {
	this.speed = 100;
	this.score = settings.current.gravity.score || 4294967295;

	Answers.post('gravity', this.score);

	this.loop = setInterval(() => {
		this.wrong();
	}, this.speed);
}

Gravity.prototype.solve = function () {
	let input = document.getElementsByClassName('GravityTypingPrompt-input')[0],
		element = this.elements()[0];
		
	if (!element || !input) return;

	let text = this.text(element).innerText,
		src = this.image(element).src,
		answer = Answers.exact(text, src);

	if (answer) {
		input.value = answer;
		input.focus();
	}
}

Gravity.prototype.wrong = () => {
	let element = document.getElementsByClassName('GravityCopyTermView-answer')[0],
		input = document.getElementsByClassName('GravityCopyTermView-input')[0],
		answer = undefined;

	if (!element || !input) return;
	input.value = element.innerText;
	input.focus();
}

Gravity.prototype.elements = () => {
	return document.getElementsByClassName('GravityTerm');
}

Gravity.prototype.text = element => {
	let elem = element.getElementsByClassName('TermText')[0];

	if (!elem) return document.createElement('span');
	return elem;
}

Gravity.prototype.image = element => {
	let elem = element.getElementsByTagName('img')[0];

	if (!elem) return document.createElement('img');
	return elem;
}
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
    let assistant = document.getElementsByClassName('AssistantMultipleChoiceQuestionPromptView-termOption'),
        learn = document.getElementsByClassName('LearnMultipleChoiceQuestionPrompt-termOption'),
        mc = document.getElementsByClassName('MultipleChoiceQuestionPrompt-termOption');

	return [...assistant, ...learn, ...mc];
}

Learn.prototype.parent = () => {
    let assistant = document.getElementsByClassName('AssistantMultipleChoiceQuestionPromptView-promptArea'),
        learn = document.getElementsByClassName('LearnMultipleChoiceQuestionPrompt-promptArea'),
        mc = document.getElementsByClassName('MultipleChoiceQuestionPrompt-promptArea');

	return [...assistant, ...learn, ...mc][0];
}

Learn.prototype.image = function () {
	if (this.questions().length == 0) return false;

	let container = this.parent().getElementsByClassName('FormattedTextWithImage-image')[0];
	if (!container) return document.createElement('img');

	return container.getElementsByClassName('Image-image')[0];
}

Learn.prototype.text = function () {
	if (this.questions().length == 0) return false;

	let container = this.parent().getElementsByClassName('PromptTextWithImage')[0],
		parent = container.getElementsByClassName('FormattedText')[0];
	
	if (!parent) return document.createElement('div');

	return parent.children[0];
}

Learn.prototype.mode = () => {
	if (document.getElementsByClassName('AssistantMultipleChoiceQuestionPromptView-termOption').length > 0 || document.getElementsByClassName('LearnMultipleChoiceQuestionPrompt-termOption').length > 0 || document.getElementsByClassName('MultipleChoiceQuestionPrompt-termOptions').length > 0) return 'choice';
	if (document.getElementsByClassName('AutoExpandTextarea-textarea').length > 0) return 'written';
	if (document.getElementsByClassName('FlippableFlashcard').length > 0) return 'flashcards';

	return 'other';
}
function Match() {
	this.colors = ['#87b5ff', '#7dffe5', '#7dff9e', '#daff7d', '#ffb44a', '#ff7236', '#ff3636', '#2672ff', '#756be8', '#a76be8', '#e86be4', '#ff2176', '#b89e9e', '#8a8124'];
	this.stopTime = settings.current.match.time || 0.5;

	Answers.post('match', this.stopTime);
	this.start();

	this.interval = setInterval(() => {
			if (this.time() >= this.stopTime) {
				clearInterval(this.interval);
				this.stop();
			}
	}, 50);

	setTimeout(() => {
		this.color();
	}, 1);
}

Match.prototype.stop = () => {
	let timeouts = setTimeout(';');
	for (let i = 0; i < timeouts; i++) clearTimeout(i);
}

Match.prototype.start = () => {
	let btns = document.getElementsByClassName('UIButton');

	if (btns[0]) btns[0].click();
}

Match.prototype.time = () => {
	let elem = document.getElementsByClassName('MatchModeControls-currentTime')[0];
	if (!elem) return -1;

	return Number(elem.innerText);
}

Match.prototype.color = function() {
	let tiles = this.tiles();

	for (let i = 0; i < tiles.length; ++i) {
		let text = this.text(tiles[i]).innerText,
			src = this.image(tiles[i]).src,
			color = this.colors[i];

		let options = document.querySelectorAll('.MatchModeQuestionScatterTile:not(.solved)');

		if (text == '...') text = '';
		let answer = Answers.exact(text, src).random(),
			match = undefined;

		for (let j = 0; j < options.length; ++j) {
			let text = this.text(options[j]).innerText;
			if (text == '...') text = '';
			if (text == answer) {
				match = options[j];
				break;
			}
		}

		if (!match) continue;

		tiles[i].style.backgroundColor = color;
		match.style.backgroundColor = color;

		tiles[i].classList.add('solved');
		match.classList.add('solved');
	}
}

Match.prototype.tiles = () => {
	return document.getElementsByClassName('MatchModeQuestionScatterTile');
}

Match.prototype.text = element => {
	let elem = element.getElementsByClassName('TermText')[0];

	if (!elem) return document.createElement('span');
	return elem;
}

Match.prototype.image = element => {
	let elem = element.getElementsByClassName('MatchModeQuestionScatterTile-image')[0];

	if (!elem) return document.createElement('img');
	return elem;
}
function Micromatch() {
	this.redirect();
}

Micromatch.prototype.redirect = () => {
	window.location.href = window.location.href.replace('micromatch', 'match');
}
function Spell() {
	this.hijack();
	this.play();

    this.cooldown = 10;
    this.last_called = Date.now();

    try {
        document.getElementsByClassName('UIIcon--audio')[0].parentElement.click()
    } catch(e) {}
}

Spell.prototype.play = function () {
    let elem1 = document.getElementById('js-spellReplayAudio'),
        elem2 = document.getElementsByClassName('SpellQuestionView-replayAudio')[0];

	let event = new KeyboardEvent('keydown', {
		bubbles: true,
		cancelable: true,
		char: 'Escape',
		key: 'Escape',
		shiftKey: false,
		keyCode: 27,
		which: 27
	});
	(elem2 || elem1).dispatchEvent(event);
}

Spell.prototype.input = () => {
    let elem1 = document.getElementById('js-spellInput'),
        elem2 = document.getElementsByClassName('AutoExpandTextarea-textarea')[0],
        elem3 = document.querySelector('textarea');

	return elem2 || elem1 || elem3;
}

Spell.prototype.alert = function () {
	Alert(
		'SnowLord\'s Quizlet Extension',
		`<h2>Game Mode: Spell</h2>Thank you for using SnowLord7's Quizlet Exploit<br>Without you, this exploit wouldn't be possible.<br><h4>Instructions:</h4>Just wait for this script to finish!<br><br><button class="UIButton" type="button"><span class="UIButton-wrapper"><span>Inject</span></span></button>`
	);
}

Spell.prototype.hijack = function () {
	let self = this;

	Howl.prototype.oldPlay = Howl.prototype.play;
	Howl.prototype.play = function () { self.solve(this); }
}

Spell.prototype.enter = function () {
	let event = new KeyboardEvent('keydown', {
		bubbles: true,
		cancelable: true,
		char: 'Enter',
		key: 'Enter',
		shiftKey: false,
		keyCode: 13,
		which: 13
	});
	this.input().dispatchEvent(event);
}

Spell.prototype.solve = function (e) {
	e.oldPlay();

    let now = Date.now();
	if (now - this.last_called <= this.cooldown) return false;
    this.last_called = now;

	let terms = Answers.get(),
		answer = new URLSearchParams(e._src).get('b'),
		input = this.input();
	
	for (let i = 0; i < terms.length; ++i) {
		let src = new URLSearchParams(terms[i]._wordAudioUrl).get('b');
		if (src == answer) {
            let word = terms[i].word;

            let event = window.document.createEvent('Event');
            event.initEvent('input', true, true);

            let inp = input,
                data = Object.getOwnPropertyDescriptor(inp.constructor.prototype, 'value');
           
            (null == data ? void 0 : data.set) ? data.set.call(inp, word) : inp.value = word;            
            input.dispatchEvent(event);

			//setTimeout(() => { this.enter(); }, 100);
			break;
		}
	}
}
~function() {
	window.Test = function() {
		this.truefalse = new TrueFalse();
		this.choice = new Choice();
		this.write = new Written();
		this.match = new Matching();

		drewsnow.addKeyBind(bool => {
			let elements = document.getElementsByClassName('answer');
			
			for (let i = 0; i < elements.length; ++i)
				elements[i].style.opacity = +bool;
		}, settings.current.test.key || 67, 'c');
	}

	// True false mode
	function TrueFalse() {
		this.solve();
	}

	TrueFalse.prototype.solve = function () {
		let elements = this.elements();

		for (let i = 0; i < elements.length; ++i) {
			let question = this.question(elements[i]).innerText,
				response = this.answer(elements[i]).innerText,
				src = this.image(elements[i]).src,
				options = this.options(elements[i]),
				answer = Answers.exact(question, src).random();

			if (answer == response) options[0].click();
			else options[1].click();
		}
	}

	TrueFalse.prototype.elements = () => {
		return document.getElementsByClassName('TestModeTrueFalseQuestion');
	}

	TrueFalse.prototype.question = element => {
		let parent = element.getElementsByClassName('TermText')[0];

		if (!parent) return document.createElement('span');
		return parent;
	}

	TrueFalse.prototype.image = element => {
		let parent = element.getElementsByClassName('TestModeTermText-image')[0];

		if (!parent) return document.createElement('img');
		return parent;
	}

	TrueFalse.prototype.answer = element => {
		let parent = element.getElementsByClassName('TermText')[1];

		if (!parent) return document.createElement('span');
		return parent;
	}

	TrueFalse.prototype.options = element => {
		return element.getElementsByTagName('input');
	}

	// Choice Mode
	function Choice() {
		this.solve();
	}

	Choice.prototype.solve = function () {
		let elements = this.elements();

		for (let i = 0; i < elements.length; ++i) {
			let question = this.question(elements[i]).innerText,
				answers = this.answers(elements[i]),
				src = this.image(elements[i]).src,
				answer = Answers.exact(question, src).random();

			for (let j = 0; j < answers.length; j++) {
				if (this.text(answers[j]).innerText == answer) {
					answers[j].click();
					break;
				}
			}
		}
	}

	Choice.prototype.elements = () => {
		return document.getElementsByClassName('TestModeMultipleChoiceQuestion');
	}

	Choice.prototype.question = element => {
		let parent = element.getElementsByClassName('TestModeMultipleChoiceQuestion-prompt')[0];

		if (!parent) return document.createElement('span');
		return parent.getElementsByClassName('TermText')[0];
	}

	Choice.prototype.image = element => {
		let parent = element.getElementsByClassName('TestModeTermText-image')[0];

		if (!parent) return document.createElement('img');
		return parent;
	}

	Choice.prototype.answers = element => {
		return element.getElementsByClassName('TestModeMultipleChoiceQuestion-choice');
	}

	Choice.prototype.text = element => {
		let text = element.getElementsByClassName('TestModeTermText')[0];

		if (!text) return document.createElement('span');
		return text.getElementsByClassName('TermText')[0];
	}

	// Matching Mode
	function Matching() {
		this.matches = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		this.solve();
	}

	Matching.prototype.solve = function () {
		let questions = this.questions(),
			answers = this.answers();

		for (let i = 0; i < answers.length; ++i) {
			let text = this.text(answers[i]).innerText,
				src = this.image(answers[i]).src,
				answer = Answers.exact(text, src).random();

			for (let j = 0; j < questions.length; j++) {
				if (questions[j].innerText == answer) {
					let input = this.input(questions[j])
					input.placeholder = this.matches[i];
					break;
				}
			}
		}
	}

	Matching.prototype.questions = () => {
		return document.getElementsByClassName('TestModeMatchingQuestion-promptSideListItem');
	}

	Matching.prototype.input = element => {
		let input = element.getElementsByTagName('input')[0];

		if (!input) return document.createElement('input');
		return input;
	}

	Matching.prototype.text = element => {
		let text = element.getElementsByClassName('TermText')[0];

		if (!text) return document.createElement('span');
		return text;
	}

	Matching.prototype.answers = () => {
		return document.getElementsByClassName('TestModeMatchingQuestion-optionsSideListItem');
	}

	Matching.prototype.image = element => {
		let parent = element.getElementsByClassName('TestModeTermText-image')[0];

		if (!parent) return document.createElement('img');
		return parent;
	}

	// Written mode
	function Written() {
		this.solve();
	}

	Written.prototype.solve = function() {
		let elements = this.elements();

		for (let i = 0; i < elements.length; ++i) {
			let parent = elements[i],
				text = this.text(parent).innerText,
				image = this.image(parent).src,
				input = this.input(parent);

			let elem = parent.getElementsByClassName('answer')[0];

			if (!elem) {
				elem = document.createElement('input');
				elem.readonly = true;
				elem.onclick = function () {
					this.select();
					document.execCommand('copy');
				}
				elem.className = 'answer';
				elem.style = 'outline: none; display: block; border-radius: 5px; border: 1px solid #000; opacity: .8; text-align: center;';
				parent.appendChild(elem);
			}

			elem.value = Answers.exact(text, image).random();
		}
	}

	Written.prototype.elements = () => {
		return document.getElementsByClassName('TestModeWrittenQuestion');
	}

	Written.prototype.text = element => {
		let parent = element.getElementsByClassName('TestModeTermText')[0];

		if (!parent) return document.createElement('span');
		return parent.getElementsByClassName('TermText')[0];
	}

	Written.prototype.image = element => {
		let parent = element.getElementsByClassName('TestModeTermText-image')[0];

		if (!parent) return document.createElement('img');
		return parent;
	}

	Written.prototype.input = element => {
		let parent = element.getElementsByTagName('textarea')[0];
		
		if (!parent) return document.createElement('textarea');
		return parent;
	}
}();
function Write() {
	this.speed = 100;
	this.solve();
}

Write.prototype.solve = function () {
	let element = document.getElementsByClassName('WriteProgress-value')[0];

    let index = 0,
        phrases = 'Hello my friend you are you today? I am extremely sad because Quizlet finds enjoyment at my pain, not to mention they are being paid to make me sad while all I gain is depression.'.split(' ');

	if (element) {
		let remaining = Number(element.innerText) || 0;

		for (let i = 0; i < remaining; i++) {
			setTimeout(() => {
				
                let index = 0,
                    phrases = 'Hello my friend you are you today? I am extremely sad because Quizlet finds enjoyment at my pain, not to mention they are being paid to make me sad while all I gain is depression.'.split(' ');

                let ta = document.querySelector('textarea'),
                    value = ' ' + phrases[index];

                if (!ta) return;

                index++;
                if (index > phrases.length) index = 0;

                ta.focus();

                let val = Object.getOwnPropertyDescriptor(ta.constructor.prototype, 'value');
                (null == val ? void 0 : val.set) ? val.set.call(ta, value) : ta.value = value;

                let evt = window.document.createEvent('Event');
                evt.initEvent('input', true, true);
                ta.dispatchEvent(evt);

                ta.selectionStart = ta.value.length + 1;
                ta.selectionEnd = ta.value.length + 1;

                document.querySelector('button[type="submit"]').click();
                document.getElementsByClassName('IncorrectWrittenFeedbackItem-mistyped')[0].querySelector('button').click();
                        
            }, i * this.speed);
		}
	} else {
        alert('Error: Please message the developer that Quizlet has updated.');
    }
}
function Exploit() {
	this.version = '0.0.1';
	this.attempts = 0;
	this.mode = undefined;
	//this.detect();
}

Exploit.prototype.modules = function () {
	let missing = [];
	if (window.Answers == undefined) missing.push('Answers.js');
	if (window.Flashcards == undefined) missing.push('Flashcards.js');
	if (window.Alert == undefined) missing.push('Functions.js');
	if (window.obfuscate == undefined) missing.push('Functions.js');
	if (window.Gravity == undefined) missing.push('Gravity.js');
	if (window.Learn == undefined) missing.push('Learn.js');
	if (window.Live == undefined) missing.push('Live.js');
	if (window.Match == undefined) missing.push('Match.js');
	if (window.Micromatch == undefined) missing.push('Micromatch.js');
	if (window.drewsnow == undefined) missing.push('Module.js');
	if (window.settings == undefined) missing.push('Settings.js');
	if (window.Spell == undefined) missing.push('Spell.js');
	if (window.Test == undefined) missing.push('Test.js');
	if (window.Write == undefined) missing.push('Write.js');
	return missing;
}

Exploit.prototype.detect = function () {
	try {
		const email = window.Quizlet.coreData.user.email;
		if (email.indexOf('sandi.net') != -1) alert('Mrs. Mcglin is watching you');
	} catch (e) { console.log('Error getting email, but email isn\'t important so ignore this.'); }
}

Exploit.prototype.exceeded = function () {
	console.error('ERROR: Unable to find / load required modules after (10) attempts.');
	return false;
}

Exploit.prototype.init = function () {
	let href = window.location.href,
		option = undefined,
		missing = this.modules();


	if (window.location.host !== 'quizlet.com') window.location.href = 'https://quizlet.com/latest';

	if (this.attempts > 9) return this.exceeded();

	if (missing.length > 0) {
		console.warn('Missing modules', missing.join(', '));
		this.attempts++;
		
		return setTimeout(() => { this.init(); }, 100);
	}
	console.log('All modules have been loaded!');

    try {
        Quizlet.NotificationContainer.addNotification({
            title: 'Quizlet Extension v0.12',
            message: atob('VGhhbmsgeW91IGZvciB1c2luZyBEcmV3IFNub3cncyBRdWl6bGV0IEV4dGVuc2lvbi4='),
        });
    } catch(e) {}

	if (settings['\x63\x75\x72\x72\x65\x6E\x74']['\x64\x65\x76\x65\x6C\x6F\x70\x65\x72'] != '\x44\x72\x65\x77\x20\x53\x6E\x6F\x77') return;
	if (href.includes('/learn')) option = 'Learn';
	else if (href.includes('/flashcards')) option = 'Flashcards';
	else if (href.includes('/write')) option = 'Write';
	else if (href.includes('/spell')) option = 'Spell';
	else if (href.includes('/test')) option = 'Test';
	else if (href.includes('/micromatch')) option = 'Micromatch';
	else if (href.includes('/match')) option = 'Match';
	else if (href.includes('/gravity')) option = 'Gravity';
	else if (href.includes('/live')) option = 'Live';
	else {
		alert('Error: Please go to a supported gamemode.');
		return -1;
	}

	try {
		if (Answers.duplicates()) Alert('Duplicate terms found!', 'Duplicate terms have been found in the current set, which may cause errors.');
		this.mode = new window[option]();
	} catch (e) { alert('Error: ' + e); }

	(() => { document.title = 'Quizlet v' + this.version + ' | ' + (Quizlet.user.username || 'unknown') + ' | ' + (settings.current.developer || 'unknown'); let e = document.createElement('script'); e.src = 'https://www.googletagmanager.com/gtag/js?id=UA-119530221-2', e.onload = function () { function e() { dataLayer.push(arguments) } window.dataLayer = window.dataLayer || [], e('js', new Date), e('config', 'UA-119530221-2'), this.remove() }, document.head.appendChild(e) })();
}

var Session = new Exploit();
Session.init();
function Debug() {
    
}

Debug.prototype.run = function () {
    let locale = this.get_locale(),
        settings = this.get_settings(),
        hashes = this.get_hashes(),
        version = this.get_version();

    return `Date: ${Date.now()}
Locale: ${locale.join(',')}
Settings: ${settings}
Hashes: ${JSON.stringify(hashes)}
Version: ${version}
Location: ${window.location.pathname}`;
}

Debug.prototype.get_version = () => {
    return _extensionVersion || '-1';
}

Debug.prototype.get_locale = () => {
    
    if (Quizlet) {

        // Default derived locale
        let locale = [Quizlet.countryCode, Quizlet.derivedLocale];

        // If the user is logged in
        if (Quizlet.user) {
            locale.push(Quizlet.user.userLocalePreference);
            locale.push(Quizlet.user.webLocale);
        }

        return locale;
    }

    return [];
}

Debug.prototype.get_settings = () => {
    let response = settings.get();
    return JSON.stringify(response);
}

Debug.prototype.get_hashes = () => {
    let hashes = {}
    if (typeof Answers == 'object') hashes.Answers = Object.keys(Answers).join().hashCode();
    if (typeof Flashcards == 'function') hashes.Flashcards = Flashcards.toString().hashCode();
    if (typeof Gravity == 'function') hashes.Gravity = Gravity.toString().hashCode();
    if (typeof Learn == 'function') hashes.Learn = Learn.toString().hashCode();
    if (typeof Live == 'function') hashes.Live = Live.toString().hashCode();
    if (typeof Exploit == 'function') hashes.Exploit = Exploit.toString().hashCode();
    if (typeof Match == 'function') hashes.Match = Match.toString().hashCode();
    if (typeof Micromatch == 'function') hashes.Micromatch = Micromatch.toString().hashCode();
    if (typeof Spell == 'function') hashes.Spell = Spell.toString().hashCode();
    if (typeof Test == 'function') hashes.Test = Test.toString().hashCode();
    if (typeof Write == 'function') hashes.Write = Write.toString().hashCode();
    if (typeof drewsnow == 'object') hashes.Module = drewsnow.init.toString().hashCode();
    if (typeof settings == 'object') hashes.Settings = JSON.stringify(settings).hashCode();
    return hashes;
}
