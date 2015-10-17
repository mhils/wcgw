"use strict";
import React from "react";

export default class JoinGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "John Doe"
        };
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    joinGame() {
        this.props.joinGame(this.state.name);
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
