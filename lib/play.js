"use strict";
import React from "react";
import { GameState } from "./game.js";

export default class PlayGame extends React.Component {

    constructor(props){
        super(props);
        this.state = { choice: null };
    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.game || nextProps.game.state !== this.props.game.state){
            this.setState({choice: null});
        }
    }

    submitChoice(choice) {
        this.props.submitChoice(choice, () => {
            this.setState({choice: choice});
        });
    }

    render() {
        var game = this.props.game;
        if (!game || game.state === GameState.LOBBY) {
            return <div><i className="fa fa-spinner fa-pulse fa-4x"/></div>;
        }
        if (game.state === "show choices") {
            return <div>
                <button onClick={this.submitChoice.bind(this, 0)}>A</button>
                <button onClick={this.submitChoice.bind(this, 1)}>B</button>
                <button onClick={this.submitChoice.bind(this, 2)}>C</button>
                <button onClick={this.submitChoice.bind(this, 3)}>D</button>
            </div>
        } else if (game.state === "show answer") {
            return <div>
                <i className="fa fa-youtube-play fa-4x"/>
            </div>
        } else {
            return <div>
                 <i className="fa fa-youtube-play fa-4x"/>
            </div>
        }
    }
}