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

// Game
var games = {};

class Game {
    constructor(){
        this.id = nextGameId();
        this.started = false;
        this.users = [];
        this.observers = [];
    }

    get all() {
        return game.users.map((u) => u.socket).concat(game.observers);
    }

    toJSON() {
        return {
            id: this.id,
            started: this.started,
            users: this.users.map((u) => u.toJSON())
        }
    }
}

class User {
    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
        this.score = 0;
    }

    toJSON() {
        return {
            username: this.username,
            score: this.score
        };
    }
}

const State = {
    IDLE: "idle",
    PLAYING: "playing",
    OBSERVING: "observing",
    HOSTING: "hosting"
};

io.on("connection", function (socket) {

    socket.status = State.IDLE;

    function observe(gameId){


        // Game does not exist?
        if (!(gameId in games)) {
            //TODO
        }
        var game = games[gameId];
        game.observers.push(socket);
        console.log(game);
        socket.emit("game info", game.toJSON());

        socket.game = game;
        socket.status = State.OBSERVING;
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

        game.all.forEach((u) => {
            u.socket.emit("user joined", user);
        });

        socket.status = State.PLAYING;
    });

    socket.on('disconnect', function () {
        switch(socket.status){
            case State.PLAYING:
                socket.game.users = socket.game.users.filter((u) => u !== socket.user);
                game.all.forEach((u) => {
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
