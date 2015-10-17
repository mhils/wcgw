"use strict";
import React from "react";
import { GameState } from "./game.js";

export default class PlayGame extends React.Component {

    onAnswerButton(choice) {
        console.log(choice)
    }

    render() {
        var game = this.props.game;
        if(!game || game.state === GameState.LOBBY) {
            return <div><i className="fa fa-spinner fa-pulse fa-4x"></i></div>;
        }
        return <div>
            {game.state}
            <button onClick={this.onAnswerButton.bind(this, "a")}>A</button>
            <button onClick={this.onAnswerButton.bind(this, "b")}>B</button>
            <button onClick={this.onAnswerButton.bind(this, "c")}>C</button>
            <button onClick={this.onAnswerButton.bind(this, "d")}>D</button>
        </div>
    }
}