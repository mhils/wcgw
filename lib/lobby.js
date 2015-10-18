"use strict";
import React from "react";
import QRCode from "qrcode.react";
import ScoreBoard from "./scoreboard.js";


var colors = ["primary", "success", "info", "warning", "danger"];


export default class Lobby extends React.Component {
    constructor(props){
        super(props);
        this.state = {color: "primary"};
        this.updateColor = setInterval(
            () => {
                var color = this.state.color;
                while(color === this.state.color){
                    color = "btn-" + colors[Math.floor(Math.random() * colors.length)];
                }
                this.setState({color: color});
            },
            250
        );

    }

    startGame() {
        clearInterval(this.updateColor);
        this.props.startGame();
    }

    render() {
        if (!this.props.game) {
            return <div><i className="fa fa-spinner fa-pulse fa-4x"/></div>;
        }
        var origin = window.location.origin;
        var url = origin + "/play/" + this.props.game.id;
        return (
            <div className="lobby">
                <main>
                    <h1 className={this.state.color.replace("btn-","text-")}>Get your friends together!</h1>
                    <QRCode value={url} size={512}/>
                    <h3>Alternatively, share this link: </h3>
                    <p>
                        <a href={url}>{url}</a>
                    </p>
                    <button className="btn btn-lg btn-success" onClick={this.startGame.bind(this)}>Start Game</button>
                </main>
                <aside>
                    <ScoreBoard users={this.props.game.users}/>
                </aside>
            </div>
        );
    }
}