"use strict";
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

var gameCount = 0;
function nextGameId(){
    return ++gameCount;
}

app.listen(port, function () {
    console.log(
        'Server listening at http://%s:%s',
        this.address().address,
        this.address().port
    );
});

// Routing
app.use(express.static(__dirname + '/public'));


app.get('/play/:id', function (req, res) {
    res.sendFile(__dirname + '/public/play.html');
});

// Game
var games = {};

class Game {
    constructor(){
        this.id = nextGameId();
        this.started = false;
        this.users = [];
        this.observers = [];
    }
}

class User {
    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
        this.score = 0;
    }

    toJSON() {
        return JSON.stringify({
            username: this.username,
            score: this.score
        })
    }
}

const State = {
    IDLE: "idle",
    PLAYING: "playing",
    OBSERVING: "observing",
    HOSTING: "hosting"
};

io.on("connection", function (socket) {

    socket.status = "idle";

    function observe(gameId){
        socket.status = State.OBSERVING;

        // Game does not exist?
        if (!(gameId in games)) {
            //TODO
        }
        var game = games[gameId];
        game.observers.push(socket);
        user.socket.emit("game info", game);

        socket.game = game;
    }

    socket.on("host game", function(){
        var game = new Game();
        games[game.id] = game;
        observe(game.id);
    });

    socket.on("start game", function(){
        if(socket.status !== State.OBSERVING) {
            throw new Error();
        }
        //startGame();
    });

    socket.on("observe game", function(gameId){
        observe(gameId);
    });

    socket.on('join game', function (gameId, username) {
        socket.status = State.PLAYING;

        // Game does not exist?
        if (!(gameId in games)) {
            //TODO
        }
        var game = games[gameId];

        user.socket.emit("game info", game);

        var user = new User(username, socket);
        game.users.push(user);

        // we store the username in the socket session for this client
        socket.game = game;
        socket.user = user;

        game.users.forEach((u) => {
            u.socket.emit("user joined", user);
        });

    });

    socket.on('disconnect', function () {
        switch(socket.status){
            case State.PLAYING:
                socket.game.users = socket.game.users.filter((u) => u !== socket.user);
                game.users.forEach((u) => {
                    u.socket.emit("user left", socket.user);
                });
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
