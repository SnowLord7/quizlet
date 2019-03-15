(function() {
    let html = `
        <div style="line-height: 1.2; top: 0; left: 0; font-family: 'Courier New', Courier, monospace; z-index: 2147483647; background-color: #202020; position: fixed; width: 350px; height: 475px; margin: 0; padding: 0; box-shadow: 0 5px 35px rgba(0, 0, 0, .75)">

            <nav style="cursor: move; user-select: none; text-align: right; color: #fff; position: absolute; width: 348px; height: 25px; margin: 1px;">
                <span onclick="alert('Intructions:\\n1.) Enter the Quizlet Live code into the input with a placeholder of 123456.\\n\\n2.) Click the large orange button that says Obtain Live Data.\\n\\n3.) Copy the text that is in the site that pops up (Ctrl + a, then Ctrl + c) and paste it (Ctrl + v) all in the textarea that says Paste The Site Data Here.\\n\\n4.) If the data if correct, the answer will be shown in the top right corner of your screen, and if you have the answer, it will be clicked for you.\\n\\nNotes:\\nPressing C will hide the answer.\\n\\nYou can toggle the script from automatically clicking the answer by clicking the text in the top right of your screen.\\n\\nPressing Ctrl + a will select all the text on a page.\\n\\nPressing Ctrl + v will paste the copied text for you.\\n\\nThis script was made by Drew Snow.');" style="font-size: 15px; cursor: pointer; width: 100%; height: 100%;">?</span>
                <span onclick="this.parentElement.parentElement.remove()" aria-label="Close Interface Model" style="cursor: pointer; width: 100%; height: 100%; padding-right: 5px; font-size: 20px;">&times;</span>
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
    `.trim();

    let css = `
        @keyframes shake {
            0% { transform: translate(-51%, -1px) rotate(1deg); }
            20% { transform: translate(-50%, 1px) rotate(0deg); }
            40% { transform: translate(-49%, 2px) rotate(-1deg); }
            60% { transform: translate(-51%, 0px) rotate(1deg); }
            80% { transform: translate(-50%, -1px) rotate(-1deg); }
            100% { transform: translate(-49%, 1px) rotate(0deg); }
        }
        
        .shakingElement {
            animation: shake .4s; 
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
            background-color: rgba(0, 0, 0, .2);
            width: 336px; height: 266px;
            transition: all .3s ease;
            border-radius: 3px;
            overflow-y: scroll;
            font-size: 15px;
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

        /*
        input[type=text] {
            border: none; border-bottom: 2px solid #d3d3d3;
            background-color: rgba(0, 0, 0, 0);
            transition: border .3s ease;
            outline: none;
            color: #fff;
        }

        input[type=text]:focus {
            border-bottom: 2px solid #ef7f00;
        }
        */

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
        /*
        .onoffswitch {
            transition: opacity .3s;
            position: relative;
            opacity: .8;
            width: 60px;
        }

        .onoffswitch:hover {
            opacity: 1;
        }

        .onoffswitch-checkbox {
            display: none;
        }

        .onoffswitch-label {
            transition: background-color 0.3s ease-in;
            background-color: #d3d3d3;
            border-radius: 25px;
            line-height: 25px;
            overflow: hidden;
            cursor: pointer;
            display: block;
            height: 25px;
            padding: 0;
        }

        .onoffswitch-label:before {
            transition: all 0.3s ease-in 0s;
            border: 2px solid #bababa;
            border-radius: 25px;
            position: absolute;
            top: 0; bottom: 0;
            background: #fff;
            display: block;
            content: '';
            width: 25px;
            margin: 0px;
            right: 30px;
        }

        .onoffswitch-checkbox:checked + .onoffswitch-label {
            background-color: #ef7f00;
        }

        .onoffswitch-checkbox:checked + .onoffswitch-label, .onoffswitch-checkbox:checked + .onoffswitch-label:before {
        border-color: #ffb25b;
        }

        .onoffswitch-checkbox:checked + .onoffswitch-label:before {
            right: 0px;
        }

        input[type=range].slider {
            width: 100%; height: 15px;
            background-color: #d3d3d3;
            -webkit-appearance: none;
            transition: opacity .3s;
            border-radius: 5px;
            outline: none;
            opacity: 0.8;
        }

        input[type=range].slider:hover {
            opacity: 1;
        }

        input[type=range].slider::-webkit-slider-thumb {
            background-color: #ef7f00;
            width: 25px; height: 25px;
            -webkit-appearance: none;
            border-radius: 50%;
            appearance: none;
            cursor: pointer;
        }

        input[type=range].slider::-moz-range-thumb {
            background-color: #ef7f00;
            width: 25px; height: 25px;
            border-radius: 50%;
            cursor: pointer;
        }
        */
    `;

    const click = (e) => {
        if (e.fireEvent) {
            e.fireEvent('onclick');
        } else {
            var obj = document.createEvent('Events');
            obj.initEvent('click', true, false);
            e.dispatchEvent(obj);
        }
    }

    const makeDraggable = function (dragItem, container) {
        var xOffset = yOffset = 0,
            active = false,
            currentX,
            currentY,
            initialX,
            initialY;

        container.addEventListener("touchstart", dragStart, false);
        document.addEventListener("touchend", dragEnd, false);
        document.addEventListener("touchmove", drag, false);

        container.addEventListener("mousedown", dragStart, false);
        document.addEventListener("mouseup", dragEnd, false);
        document.addEventListener("mousemove", drag, false);

        function dragStart(e) {
            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }
            if (e.target === dragItem) {
                active = true;
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            active = false;
        }

        function drag(e) {
            if (active) {
                e.preventDefault();
                if (e.type === "touchmove") {
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
            el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        }
    }

    styles = document.createElement('style');
    styles.innerHTML = css;
    document.head.appendChild(styles);

    elements = new DOMParser().parseFromString(html, "text/html");
    container = elements.body.firstChild;
    document.body.appendChild(container);

    makeDraggable(container.querySelector('nav'), container);

    const cmd = document.getElementById('customCommandOutput');
    const input = document.getElementById('quizletLiveDataInput');
    var set = {};

    const log = (msg, color='#c6c6c6') => {
        let element = document.createElement('div');

        element.style.display = 'block';
        element.style.color = color;
        element.textContent = msg;

        cmd.appendChild(element);
        cmd.children[cmd.children.length - 1].scrollIntoView();

        if (cmd.children.length > 25) cmd.children[0].remove();
    }

    const handleUpdate = () => {
        if (!input.value) {
            input.style.border = '1px solid blue';
        } else {
            try {
                let json = JSON.parse(input.value);
                if (json.terms.length < 1) throw 0;
                input.style.border = '1px solid green';
                set = json;
            } catch (e) {
                input.style.border = '1px solid red';
            }
        }
    }
    input.onchange = handleUpdate;
    input.onkeyup = handleUpdate;
    input.onkeydown = setTimeout(handleUpdate, 0);

    document.getElementById('getLiveDataButton').onclick = () => {
        let code = '';
        let container = document.getElementById('liveCodeInput');
        let inputs = container.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) code += inputs[i].value;
        
        if (code.length == 6 && !isNaN(code)) {
            log('Sending GET requests to Quizlet...', '#3884ff');
            fetch(`https://quizlet.com/webapi/3.2/game-instances?filters={"gameCode":${code},"isInProgress":true,"isDeleted":false}&perPage=500`,
            
            )
            .then((resp) => resp.json())
            .then((data) => {
                log('Recieved data from Quizlet.', '#3884ff');
                if (data.responses[0].models.gameInstance.length > 0) {
                    let id = data.responses[0].models.gameInstance[0].itemId;
                    window.open(`https://api.quizlet.com/2.0/sets/${id}?client_id=R3snf5zu9W`, 's', 'width=500, height=500, toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no');
                    log('Obtaining site data, paste it in the input above.', '#fff');
                } else {
                    log('Unable to find live /w code ' + code, '#ff0015');
                }
            })
            .catch((e) => {
                log('Unable to send request.', '#ef9700');
            });
        } else {
            log('Please enter a correct Live code!', '#ff0015');
            container.classList.toggle('shakingElement');
            setTimeout(function() {
                container.classList.toggle('shakingElement');
            }, 400);
        }
    }

    var joinCodeInputs = document.getElementById('liveCodeInput').querySelectorAll('input');
    for (let i = 0; i < joinCodeInputs.length; i++) {
        let input = joinCodeInputs[i];
        let style = input.style;

        style.border = 'none'; style.borderBottom = '1px solid #969696';
        style.backgroundColor = 'rgba(0, 0, 0, .1)'
        style.textAlign = 'center';
        style.outline = 'none';
        style.margin = '1px 1px';
        style.width = '20px';
        style.color = '#fff';
        input.name = i;
        input.maxLength = 1;
        input.placeholder = i + 1;
        input.onkeydown = function(e) {
            if (!(e.keyCode == 86 || e.which == 86) && !e.ctrlKey && e.shiftKey && e.altKey) e.preventDefault();
            var nextInput = document.getElementById('liveCodeInput').querySelectorAll('input[name="' + (Number(this.name) + 1) + '"')[0];
            var prevInput = document.getElementById('liveCodeInput').querySelectorAll('input[name="' + (Number(this.name) - 1) + '"]')[0];
            if (e.keyCode == 8 || e.which == 8) {
                this.value = '';
                if (prevInput) {
                    prevInput.value = '';
                    setTimeout(function() {
                        prevInput.focus();
                    }, 0);
                }
            } else if (e.key.match(/[0-9]/) != null) {
                this.value = e.key;
                if (nextInput) {
                    setTimeout(function() {
                        nextInput.focus();
                    }, 0);
                }
            }
        }
    }

    document.getElementById('liveCodeInput').addEventListener('paste', function(e) {
        var clipboardData, pastedData;
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('Text');
        var formattedText = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
        if (formattedText.length == 6) {
            var inputs = document.getElementById('liveCodeInput').querySelectorAll('input');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = formattedText[i];
            }
        }
    });

    var elem = document.createElement('div');
    elem.id = 'liveSettingsContainer';
    elem.style.transition = 'all .3s';
    elem.style.position = 'absolute';
    elem.style.paddingRight = '5px';
    elem.style.opacity = 1;
    elem.style.margin = 0;
    elem.style.right = 0;
    elem.style.top = 0;
    elem.innerHTML = '<span style="color: #fff" id="liveAnswerPhrase">Answer</span><span style="user-select: none; color: #000;"> — </span><span style="color: #ff0000; cursor: pointer; user-select: none;" id="btnToggleHack">Pause</span>';
    document.body.appendChild(elem);

    var container = document.getElementById('liveSettingsContainer');
    var toggleHack = document.getElementById('btnToggleHack');
    var paused = false;

    toggleHack.addEventListener('click', function() {
        paused = !paused;
        if (paused) {
            this.style.color = '#00ff00';
            this.textContent = 'Resume';
        } else {
            this.style.color = '#ff0000';
            this.textContent = 'Pause';
        }
    });

    document.addEventListener('keydown', function(e) {
        var container = document.getElementById('liveSettingsContainer');
        if (e.key == 'c') {
            if (container.style.opacity != 0) {
                container.style.opacity = 0;
            } else {
                container.style.opacity = 1;
            }
        }
    });

    setInterval(function() {
        if (set && Object.keys(set).length > 0 && (window.location.href.indexOf('quizlet') && window.location.href.indexOf('live')) != -1) {
            if (document.getElementById('liveAnswerPhrase') && document.getElementsByClassName('StudentPrompt-inner')[0] && document.getElementsByClassName('StudentTerm is-clickable can-beClicked')) {
                var question = document.getElementsByClassName('StudentPrompt-inner')[0].innerText.trim();
                var options = document.getElementsByClassName('StudentTerm is-clickable can-beClicked');
                set.terms.filter((term) => {
                    if (term.term.toLowerCase() == question.toLowerCase()) {
                        return true;
                    } else if (term.definition.toLowerCase() == question.toLowerCase()) {
                        return true;
                    }
                }).forEach(function(word) {
                    if (word.term.toLowerCase() == question.toLowerCase()) {
                        document.getElementById('liveAnswerPhrase').textContent = word.definition;
                    } else {
                        document.getElementById('liveAnswerPhrase').textContent = word.term;
                    }
                    if (!paused) {
                        for (let i = 0; i < options.length; i++) {
                            if (word.definition.toLowerCase() == options[i].innerText.trim().toLowerCase()) {
                                click(options[i]);
                            } else if (word.term.toLowerCase() == options[i].innerText.trim().toLowerCase()) {
                                click(options[i]);
                            }
                        }
                    }
                });
            }
        }
    }, 250);

    log('Finished Executing JavaScript.', '#339b00');
    log('For help click the \'?\' in the top right corner.', '#1c73ff');
})();
