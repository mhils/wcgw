"use strict";
import React from "react";
import QRCode from "qrcode.react";
import config from "./config.js";
import ScoreBoard from "./scoreboard.js";


export default class StartGame extends React.Component {
    render() {
        if (!this.props.game) {
            return <div><i className="fa fa-spinner fa-pulse fa-4x"></i></div>;
        }
        return <div>
            <h1>show barcode</h1>
            <QRCode value = {"/play/" + this.props.game.id}/>
            <a href={"/play/" + this.props.game.id}>
                {config.domain}/play/{this.props.game.id}
            </a>

            <button onClick={this.props.startGame}>Start Game</button>

            <ScoreBoard users={this.props.game.users}/>
        </div>;
    }
}