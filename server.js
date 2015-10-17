"use strict";
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;
var gifs = require("./lib/gifs.json");
var common = require("./lib/common.js");


var gameCount = 0;
function nextGameId() {
    return ++gameCount;
}

server.listen(port, function () {
    console.log(
        'Server listening at http://%s:%s',
        this.address().address,
        this.address().port
    );
});

// Routing
app.use(express.static(__dirname + '/public'));


app.get('/play/:id', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/game/:id', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Game
var games = {};

class Mode {
    isFinished(game) {
    }

    canJoin(game) {
        // FIXME: unimplemented
    }
}

class InfiniteMode extends Mode {
    isFinished(game) {
        return false;
    }

    canJoin(game) {
        return true;
    }
}

const GameState = {
    LOBBY: "lobby",
    SHOW_QUESTION: "show question",
    SHOW_CHOICES: "show choices",
    SHOW_ANSWER: "show answer"
};

class Game {
    constructor(mode) {
        this.id = nextGameId();
        this.state = GameState.LOBBY;
        this.users = [];
        this.observers = [];
        this.history = [];
        this.mode = mode;
        this.gif = undefined;
    }

    setState(state){
        this.state = state;
        this.emitUpdate();
    }

    get all() {
        return this.users.map((u) => u.socket).concat(this.observers);
    }


    emitUpdate(eventName) {
        console.log("emitUpdate", this.toJSON());
        this.all.forEach((u) => {
            u.emit(eventName || "game update", this.toJSON());
        });
    }

    toJSON() {
        return {
            id: this.id,
            state: this.state,
            users: this.users.map((u) => u.toJSON()),
            gif: this.gif
        }
    }
}

class User {
    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
        this.score = 0;
        this.id = Math.random();
        this.choice = null;
    }

    toJSON() {
        return {
            username: this.username,
            score: this.score,
            id: this.id
        };
    }
}

const State = {
    IDLE: "idle",
    PLAYING: "playing",
    OBSERVING: "observing"
};

function startGame(game) {
    console.log("startGame");
    if (game.state === GameState.LOBBY) {
        showQuestion(game);
    }
}

function showQuestion(game) {
    // pick random gif that hasn't been played yet.
    do {
        game.gif = gifs[Math.floor(Math.random() * gifs.length)];
    } while(game.history.indexOf(game.gif) > -1);
    if(game.history.length == gifs.length){
        game.history.unshift();
    }
    game.history.push(game.gif);

    game.setState(GameState.SHOW_QUESTION);
    setTimeout(() => showChoices(game), game.gif.question.length);
}
function showChoices(game) {
    game.users.forEach((u) => { u.choice = null; });
    game.setState(GameState.SHOW_CHOICES);

    var wait = common.choiceDuration(game.gif.question.length);
    setTimeout(() => evaluate(game), wait);
}
function evaluate(game) {
    // determine winners
    console.log(game.gif, game.users);
    var correct = game.users.filter((u) => {
        return game.gif.solution === u.choice;
    });
    // update scores
    setTimeout(() => {
        correct.forEach((u) => u.score++);
        game.emitUpdate();
    }, game.gif.answer.length);

    // show answer
    game.setState(GameState.SHOW_ANSWER);
    if (!game.mode.isFinished(game)) {
        setTimeout(() => showQuestion(game), game.gif.answer.length + 4 * 1000);
    }
}

io.on("connection", function (socket) {

    socket.status = State.IDLE;

    function observe(gameId) {

        // Game does not exist?
        if (!(gameId in games)) {
            //TODO
        }
        var game = games[gameId];
        game.observers.push(socket);
        socket.emit("game update", game.toJSON());

        socket.game = game;
        socket.status = State.OBSERVING;
    }

    socket.on("host game", function () {
        var game = new Game(new InfiniteMode());
        games[game.id] = game;
        observe(game.id);
    });

    socket.on("start game", function () {
        if (socket.status !== State.OBSERVING) {
            throw new Error();
        }
        startGame(socket.game);
    });

    socket.on("observe game", function (gameId) {
        observe(gameId);
    });

    socket.on('join game', function (gameId, username) {


        // Game does not exist?
        if (!(gameId in games)) {
            //TODO
        }
        var game = games[gameId];

        var user = new User(username, socket);

        game.users.push(user);

        // we store the username in the socket session for this client
        socket.game = game;
        socket.user = user;

        game.emitUpdate();
        socket.status = State.PLAYING;
    });

    socket.on("choose answer", function (choice, ack) {
        if (socket.status !== State.PLAYING) {
            return;
        }
        socket.user.choice = choice;
        ack();
    });

    socket.on('disconnect', function () {
        switch (socket.status) {
            case State.PLAYING:
                socket.game.users = socket.game.users.filter((u) => u !== socket.user);
                socket.game.emitUpdate();
                break;
            case State.OBSERVING:
                socket.game.observers = socket.game.observers.filter((u) => u !== socket);
                break;
            case State.IDLE:
                break;
            default:
                console.error("unknown status: %s", socket.status);
        }
    });

});