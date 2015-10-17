"use strict";
import React from "react";
import ReactDOM from "react-dom";
import config from "./config.js";

import PlayGame from "./play.js";
import JoinGame from "./join.js";
import ObserveGame from "./observe.js";
import StartGame from "./start.js";
import LandingPage from "./landingpage.js";


const State = {
    OBSERVE: "observe",
    START_SCREEN: "start_screen",
    HOST_GAME: "start_game",
    JOIN: "join",
    PLAY: "play"
};

class App extends React.Component {
    constructor(props) {
        super(props);

        var socket = io();

        socket.on("game info", (game) => {
            this.setState({game: game});
        });

        this.state = {
            socket: socket,
            game: null
        };
        if (window.location.pathname.indexOf("play") > -1) {
            this.state.state = State.JOIN;
            //this.state.gameId = parseInt(window.location.pathname.split("/").reverse()[0]);
        } else {
            this.state.state = State.START_SCREEN;
        }
    }

    startGame() {
        this.state.socket.emit("start game");
        this.setState({
            state: State.OBSERVE
        });
    }

    hostGame() {
        this.state.socket.emit("host game");
        this.setState({
            state: State.HOST_GAME
        });
    }

    render() {
        switch (this.state.state) {
            case State.HOST_GAME:
                return <StartGame game={this.state.game} startGame={this.startGame.bind(this)}/>;
            case State.JOIN:
                return <JoinGame/>;
            case State.OBSERVE:
                return <ObserveGame game={this.state.game}/>;
            case State.PLAY:
                return <PlayGame/>;
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
