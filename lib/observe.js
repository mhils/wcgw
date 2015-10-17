"use strict";
import React from "react";
import ScoreBoard from "./scoreboard.js";

export default class ObserveGame extends React.Component {
    render() {
        if(!this.props.game){
            return <div>...</div>;
        }
        return <div>
            such gif
            <ScoreBoard users={this.props.game.users}/>
        </div>;
    }
}