"use strict";
import React from "react";
import { GameState } from "./game.js";

export default class PlayGame extends React.Component {

    constructor(props){
        super(props);
        this.state = { choice: null };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.game.state !== this.props.game.state){
            this.setState({choice: null});
        }
    }

    onAnswerButton(choice) {
        this.submitChoice(choice, () => {
            this.setState({choice: choice});
        });
    }

    render() {
        var game = this.props.game;
        if (!game || game.state === GameState.LOBBY) {
            return <div><i className="fa fa-spinner fa-pulse fa-4x"></i></div>;
        }
        if (game.state === "show choices") {
            return <div>
                <button onClick={this.onAnswerButton.bind(this, "a")}>A</button>
                <button onClick={this.onAnswerButton.bind(this, "b")}>B</button>
                <button onClick={this.onAnswerButton.bind(this, "c")}>C</button>
                <button onClick={this.onAnswerButton.bind(this, "d")}>D</button>
            </div>
        } else if (game.state === "show answer") {
            return <div>
                <i className="fa fa-youtube-play fa-4x"></i>
            </div>
        } else {
            return <div>
                 <i className="fa fa-youtube-play fa-4x"></i>
            </div>
        }
    }
}