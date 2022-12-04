var vocab = ["-aille", "-ance", "-ée", "-eille", "-ouille", "-onde", "-une", "-té", "-tion", "-tude", "-e", "-ion", "eau", "pilule", "souris", "fin", "fille", "pizza", "atmosphère", "horloge", "mer", "clé", "peau", "radio", "tribu", "chaise", "idée", "grenouille", "moitié", "chausette", "émission", "enfance", "gingembre", "arbre", "incendie", "garçon", "main", "sentiment", "cerf-volant", "mare", "tableau", "amour", "phénomène", "début", "squelette", "écran", "climat", "insecte", "rouge à levres", "vélo", "nounours", "coeur", "-age", "-ail", "-é", "-eau", "-is", "-isme", "-ment", "-oir", "-ois", "-ueil", "-ege"]
var f = ["-aille", "-ance", "-ée", "-eille", "-ouille", "-onde", "-une", "-té", "-tion", "-tude", "-e", "-ion",
    "eau", "pilule", "souris", "fin", "fille", "pizza", "atmosphère", "horloge", "mer", "clé", "peau", "radio", "tribu", "chaise", "idée", "grenouille", "moitié", "chausette", "émission", "enfance"]
var m = ["-age", "-ail", "-é", "-eau", "-is", "-isme", "-ment", "-oir", "-ois", "-ueil", "-ege",
    "gingembre", "arbre", "incendie", "garçon", "main", "sentiment", "cerf-volant", "mare", "tableau", "amour", "phénomène", "début", "squelette", "écran", "climat", "insecte", "rouge à levres", "vélo", "nounours", "coeur"]
var countScore = 0;
var palette = ["#D6D6D6", "#D5DAD0", "#D4DDCB", "#D3E1C5", "#D2E5C0", "#D1E9BA", "#D1ECB5", "#D0F0AF", "#CFF4AA", "#CEF8A4", "#CDFB9F", "#CCFF99"]

//Code from https://animate.style/
const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });



//Starting a game
$("#restart").on("click", function () {
    vocab.sort((a, b) => 0.5 - Math.random()); //code to shuffle items in an array comes from here: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    var spot = 0;
    for (var i = 0; i < vocab.length; i++) { //code to repeat the execution of a block of code a set number of times comes from here: https://codehs.gitbooks.io/introcs/content/Basic-JavaScript-and-Graphics/for-loops-in-javascript.html
        $("#" + spot).text(vocab[spot]);
        spot++;
    }
    $("main p").toggleClass("selected", false).toggleClass("male", false).toggleClass("female", false).toggleClass("wrong", false); //toggleClass method from here: https://www.w3schools.com/jquery/html_toggleclass.asp
});



//Accessing the game rules, further learning resources, etc.
function hide() {
    $("#explain-biblio").css("visibility", "hidden")
    $("#explain-rules").css("visibility", "hidden")
}

function introAnim(placeHold) {
    hide();
    $(placeHold).css("visibility", "visible");
    animateCSS(placeHold, 'backInDown');
}

function outroAnim(placeHold) {
    animateCSS(placeHold, 'backOutDown').then((message) => {
        hide();
    });
}

$("#click-rules").on("click", function () {
    introAnim("#explain-rules");
});

$("#click-biblio").on("click", async function () {
    introAnim("#explain-biblio");
});

$("#explain-biblio .dacc p").on("click", function () {
    outroAnim("#explain-biblio");
});

$("#explain-rules .dacc p").on("click", function () {
    outroAnim("#explain-rules");
});



//Playing the game
$("main p").on("click", function () {
    $(".selected").toggleClass("selected", false);
    $(this).toggleClass("selected", true);
    $("#score").toggleClass("wrong", false);
    $("#score").css("animation", "").css("animation-duration", "");
});

function wrongAnswer() {
    $(".selected").toggleClass("wrong", true);
    $("#score").toggleClass("wrong", true);
    $(".selected").toggleClass("selected", false);
    countScore = 0;
}

$(document).on("keypress", function (e) {
    console.log($(".selected").text());
    if (e.key == "f") {
        if (f.indexOf($(".selected").text()) == -1) {
            wrongAnswer();
            console.log("wrong");
        } else {
            $(".selected").toggleClass("female", true);
            $(".selected").toggleClass("selected", false).toggleClass("male", false);
            countScore++;
            $("#score").css("animation", "flash").css("animation-duration", "1s");
        }
    } else if (e.key == "m") {
        if (m.indexOf($(".selected").text()) == -1) {
            wrongAnswer();
            console.log("wrong");
        } else {
            $(".selected").toggleClass("male", true);
            $(".selected").toggleClass("selected", false).toggleClass("female", false);
            countScore++;
            $("#score").css("animation", "flash").css("animation-duration", "1s");
        }
    }
    //Tracking the score
    $("#score").html("<p>" + countScore + "</p>");
    $("body").css("background-color", palette[countScore]);
});