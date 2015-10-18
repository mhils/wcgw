"use strict";

function choiceDuration(gifLength){
    return (gifLength*2) + (5 * 1000);
}

var GameState = {
    LOBBY: "lobby",
    SHOW_QUESTION: "show question",
    SHOW_CHOICES: "show choices",
    SHOW_ANSWER: "show answer"
};

module.exports.choiceDuration = choiceDuration;
module.exports.GameState = GameState;