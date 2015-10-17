"use strict";
import React from "react";

export default class LandingPage extends React.Component {
    hostGame() {
        this.props.hostGame();
    }

    render() {
        return <div className="landing">
            <h1>What Could Go Wrong?</h1>
            <h2>Can you guess the fail?</h2>
            <button className="btn btn-lg btn-primary" onClick={this.hostGame.bind(this)}>
                <i className="fa fa-arrow-right"/>&nbsp;
                <i className="fa fa-arrow-right"/>&nbsp;
                <i className="fa fa-arrow-right"/>&nbsp;
                Create Game
                &nbsp;<i className="fa fa-arrow-left"/>
                &nbsp;<i className="fa fa-arrow-left"/>
                &nbsp;<i className="fa fa-arrow-left"/>
            </button>
        </div>
    }
}