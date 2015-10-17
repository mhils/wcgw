"use strict";
import React from "react";

var colors = ["primary", "success", "info", "warning", "danger"];

export default class JoinGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "John Doe",
            color: "btn-success"
        };
        setInterval(
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

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    joinGame() {
        this.props.joinGame(this.state.name);
    }

    render() {
        return (
            <div className="play">
                <h1>WCGW?</h1>
                <p>
                    <input type="text"
                           className="form-control"
                           value={this.state.name}
                           placeholder="Name"
                           onChange={this.handleChange.bind(this)}/>
                    <button className={"join btn btn-lg " + this.state.color}
                            onClick={this.joinGame.bind(this)}>Join Game
                    </button>
                </p>
            </div>
        );
    }
}
