const wordlist = words_easy;

//const wordlist = ["a", "b", "c"];

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

wl = shuffle(wordlist);

var distance = 60;
var current = 0;
var game_status = false; // game started
var score_right = 0;
var score_all = 0;

function load_word() {
    $("div.word h2").html(wl[current]);
    current++;
}

function start_game() {
    $("button#next").removeAttr("disabled");
    $("button#right").html("Richtig & Weiter");
    start_timer();
    game_status = true;
    score_right = -1;
    score_all = -1;
}

function stop_game() {
    $("button#next").attr("disabled", "disabled");
    $("button#right").html("Neustart");
    $("div.word h2").html("ENDE");
    $("#countdown").html("1:00");
    game_status = false;
}

function start_timer() {
    distance = 60;
    var x = setInterval(function() {


        distance--;
        
        // Time calculations for days, hours, minutes and seconds
        //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (60 * 60)) / (60));
        var seconds = Math.floor((distance % (60)));
        
        // Display the result in the element with id="demo"
        $("#countdown").html(minutes + ":" + seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
        
        // If the count down is finished, write some text
        if (distance <= 0) {
            clearInterval(x);
            stop_game();
        }
    }, 1000);
}

function update_score() {
    $("span#score_right").html(score_right);
    $("span#score_all").html(score_all);
}

$("button#right").click(function() {
    if(game_status == false) {
        start_game();
    }
    score_right++;
    score_all++;
    load_word();
    update_score();
});

$("button#next").click(function() {
    load_word();
    score_all++;
    update_score();
});



