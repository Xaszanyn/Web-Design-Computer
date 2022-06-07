var settings = {
    textSpeed: 4
}

var terminalRequest = new XMLHttpRequest();
var paperRequest = new XMLHttpRequest();

terminalRequest.onreadystatechange = function() {
    if(terminalRequest.readyState == 4) {
        var terminal = document.querySelector('#terminal');
        terminal.innerHTML = "";
        let page = currentPage;
        typewrite(page, terminalRequest.responseText, terminal);
    }
};

paperRequest.onreadystatechange = function() {
    if(paperRequest.readyState == 4) {
        var paper = document.querySelector('#paper');
        paper.innerHTML = paperRequest.responseText;
    }
};

function getTerminal(name) {
    terminalRequest.open('GET', `pages/${name}.ekin`);
    terminalRequest.send();
}

function getPage(name) {
    paperRequest.open('GET', `pages/${name}.aslan`);
    paperRequest.send();
}

function typewrite(page, text, element, char = 0) {

    if (page != currentPage) return;

    if (char < text.length) {
        let skip = 1;
        let character = text[char];
        let code = character.charCodeAt(0);
        
        if (code == 32) element.innerHTML += "<span>&nbsp;</span>";
        else if (code == 13) {
            element.innerHTML += "<br>";
            skip++;
        }
        else element.innerHTML += character;

        element.scrollTo(0, element.scrollHeight);

        setTimeout(function() { typewrite(page, text, element, char + skip); }, settings.textSpeed);
    }
    else return;
}

document.onkeypress = function (event) {
    
    switch((event || window.event).key) {
        case '0':
            if (currentPage.F0) currentPage.F0();
            window.scrollTo(0, 0);
            break;
        case '1':
            if (currentPage.F1) currentPage.F1();
            break;
        case '2':
            if (currentPage.F2) currentPage.F2();
            break;
        case '3':
            if (currentPage.F3) currentPage.F3();
            break;
        case '4':
            if (currentPage.F4) currentPage.F4();
            break;
        case '5':
            if (currentPage.F5) currentPage.F5();
            break;
        case '6':
            if (currentPage.F6) currentPage.F6();
            break;
        case '7':
            if (currentPage.F7) currentPage.F7();
            break;
        case '8':
            if (currentPage.F8) currentPage.F8();
            break;
        case '9':
            if (currentPage.F9) currentPage.F9();
            break;
    }
};

document.onclick = function(event) {
    let element = event.target;
    
    if (element.className != "default")
    {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    if(element.className == "popUp") popUp(element.id);
}

function popUp(id)
{
    let media = document.querySelector('#media');
    let video = media.firstElementChild;

    video.firstElementChild.src = `resources/videos/${id}.mp4`;

    media.classList.remove("disable");
    setTimeout(function() {
        media.classList.remove("fade");
        video.style.minHeight = "25vw";

        video.load();
        video.play();
    }, 250);
}

var up = document.querySelector('#up');

var closeMedia = document.querySelector('#close');

function notepad() {
    window.scrollTo(0, window.innerWidth * 1.125 - window.innerHeight);
    setTimeout(function() {
        document.querySelector('#notepad').classList.remove("hideNotepad");

        up.classList.remove("disable");
        setTimeout(function() {
            up.classList.remove("fade");
        }, 500);
    }, 250);
}

up.addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector('#notepad').classList.add("hideNotepad");
    setTimeout(function() {
        window.scrollTo(0, 0);

        up.classList.add("fade");
        setTimeout(function() {
            up.classList.add("disable");
        }, 500);
    }, 250);
});

closeMedia.addEventListener("click", function(event) {
    event.preventDefault();

    let media = document.querySelector('#media');
    let video = media.firstElementChild;

    video.pause();
    setTimeout(function() {
        media.classList.add("fade");
        video.style.minHeight = "0";

        setTimeout(function() {
            media.classList.add("disable");
        }, 250);
    }, 250);
});

var currentPage;

var mainPage = {
    show: function() { currentPage = mainPage; getTerminal("mainPage"); },
    F0: function() { load("pages/home-page", false) },
    F1: function() { unityProjects.show(); },
    F2: function() { alert("This page has not been added yet."); },
    F3: function() { load("resources/others/samples.zip") },
    F4: function() { notepad(); getPage("arduino-projects"); },
    F5: function() { alert("Allow the Pop-ups, otherwise pages won't open."); load("/pages/legacy/pages/ai"); load("https://github.com/Xaszanyn/Pixel-Art-Works"); }
}

var unityProjects = {
    show: function() { currentPage = unityProjects; getTerminal("unity-projects"); },
    F0: function() { mainPage.show(); },
    F1: function() { notepad(); getPage("unity-projects-1"); },
    F2: function() { notepad(); getPage("unity-projects-2"); },
    F3: function() { notepad(); getPage("unity-projects-3"); },
    F4: function() { notepad(); getPage("unity-projects-4"); },
    F6: function() { notepad(); getPage("unity-projects-6"); },
    F7: function() { notepad(); getPage("unity-projects-7"); },
    F8: function() { notepad(); getPage("unity-projects-8"); },
    F9: function() { notepad(); getPage("unity-projects-9"); },
}

mainPage.show();

function load(address, blank = true)
{
    if (blank) window.open(address, "_blank");
    else window.location = address;
}

window.scrollTo(0, 0);