"use strict";
import React from "react";
import ReactDOM from "react-dom";

import PlayGame from "./play.js";
import JoinGame from "./join.js";
import DisplayGame from "./display.js";
import Lobby from "./lobby.js";
import LandingPage from "./landingpage.js";


const State = {
    DISPLAY_GAME: "display game",
    START_SCREEN: "start screen",
    HOST_GAME: "start game",
    JOIN: "join",
    PLAY: "play"
};

class App extends React.Component {
    constructor(props) {
        super(props);

        var socket = io();

        socket.on("game update", (game) => {
            console.log("received game info", game);
            this.setState({game: game});
        });

        this.state = {
            socket: socket,
            game: null
        };
        if (window.location.pathname.indexOf("play") > -1) {
            this.state.state = State.JOIN;
        } else if (window.location.pathname.indexOf("game") > -1) {
            this.state.state = State.DISPLAY_GAME;
            var gameId = parseInt(window.location.pathname.split("/").reverse()[0]);
            this.state.socket.emit("observe game", gameId);
        } else {
            this.state.state = State.START_SCREEN;
        }
    }

    startGame() {
        this.state.socket.emit("start game");
        this.setState({
            state: State.DISPLAY_GAME
        });
    }

    hostGame() {
        this.state.socket.emit("host game");
        this.setState({
            state: State.HOST_GAME
        });
    }

    joinGame(username) {
        var gameId = parseInt(window.location.pathname.split("/").reverse()[0]);
        console.log("Join Game %s as %s", gameId, username);
        this.state.socket.emit("join game", gameId, username);
        this.setState({
            state: State.PLAY
        });
    }

    submitChoice(choice, cb) {
        this.state.socket.emit("choose answer", choice, cb);
    }

    render() {
        switch (this.state.state) {
            case State.HOST_GAME:
                return <Lobby game={this.state.game} startGame={this.startGame.bind(this)}/>;
            case State.JOIN:
                return <JoinGame joinGame={this.joinGame.bind(this)}/>;
            case State.DISPLAY_GAME:
                return <DisplayGame game={this.state.game}/>;
            case State.PLAY:
                return <PlayGame game={this.state.game} submitChoice={this.submitChoice.bind(this)} />;
            default:
                return <LandingPage hostGame={this.hostGame.bind(this)}/>;
        }
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    ReactDOM.render(
        <App/>,
        document.getElementById("app")
    );
});
