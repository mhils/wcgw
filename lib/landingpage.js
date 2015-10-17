"use strict";
import React from "react";

export default class LandingPage extends React.Component {
    hostGame() {
        this.props.hostGame();
    }

    render() {
        return <div>
            <h1>What Could Go Wrong?</h1>
            <button className="btn btn-primary" onClick={this.hostGame.bind(this)}>Host Game</button>
        </div>
    }
}