"use strict";
import React from "react";

export default class JoinGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    joinGame() {
        console.log(this.state.name);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                <button onClick={this.joinGame.bind(this)}>Join Game</button>
            </div>
        );
    }
}
