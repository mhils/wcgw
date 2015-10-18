"use strict";
import React from "react";

export default class LandingPage extends React.Component {
    hostGame() {
        this.props.hostGame();
    }

    render() {
        return <div className="landing">
            <div>
                <h1>What Could Go Wrong?</h1>

                <ol >
                    <li>We show you the beginning of a FAIL.</li>
                    <li>You guess what happens next using your phone.</li>
                    <li>???</li>
                    <li>Profit!</li>
                </ol>

                <h2>Can you guess the fails?</h2>
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
        </div>
    }
}