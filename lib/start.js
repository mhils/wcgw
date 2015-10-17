"use strict";
var React = require('react');
var config = require("./config.json");
import ScoreBoard from "./scoreboard.js";

export default class StartGame extends React.Component {
    render() {
        if (!this.props.game) {
            return <div>...</div>;
        }
        return <div>
            <h1>show barcode</h1>
            <a href={"/play/" + this.props.game.id}>
                {config.domain}/play/{this.props.game.id}
            </a>

            <button onClick={this.props.startGame}>Start Game</button>

            <ScoreBoard users={this.props.game.users}/>
        </div>;
    }
}