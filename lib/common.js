"use strict";

function choiceDuration(gifLength){
    return Math.max(gifLength*2 + 1000, 10 * 1000);
}

var GameState = {
    LOBBY: "lobby",
    SHOW_QUESTION: "show question",
    SHOW_CHOICES: "show choices",
    SHOW_ANSWER: "show answer"
};

module.exports.choiceDuration = choiceDuration;
module.exports.GameState = GameState;