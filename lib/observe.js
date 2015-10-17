"use strict";
import React from "react";
import ScoreBoard from "./scoreboard.js";
import { GameState } from "./game.js";

export default class ObserveGame extends React.Component {
    render() {
        var game = this.props.game;
        if(!game || game.state === GameState.LOBBY){
            return <div>...</div>;
        }

        var gif;
        if(game.state === GameState.SHOW_QUESTION || game.state === GameState.SHOW_CHOICES) {
            gif = <div>question</div>;
        } else if(game.state === GameState.SHOW_ANSWER) {
            gif = <div>answer</div>;
        }

        var choices = <div>A,B,C,D</div>;

        return <div>
            {gif}
            {choices}
            such gif
            <ScoreBoard users={this.props.game.users}/>
        </div>;
    }
}