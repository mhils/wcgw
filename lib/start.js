"use strict";
import React from "react";
import QRCode from "qrcode.react";
import config from "./config.js";
import ScoreBoard from "./scoreboard.js";


export default class StartGame extends React.Component {
    render() {
        if (!this.props.game) {
            return <div>...</div>;
        }
        var origin = window.location.origin;
        var url = origin + "/play/" + this.props.game.id;
        return (
            <div>
                <h1>show barcode</h1>
                <QRCode value={url}/>
                <a href={url}>
                    {url}
                </a>

                <button onClick={this.props.startGame}>Start Game</button>

                <ScoreBoard users={this.props.game.users}/>
            </div>
        );
    }
}