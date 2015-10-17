"use strict";
import React from "react";

export default class PlayGame extends React.Component {

    onAnswerButton(choice) {
        console.log(choice)
    }

    render() {
        return <div>
            <button onClick={this.onAnswerButton.bind(this, "a")}>A</button>
            <button onClick={this.onAnswerButton.bind(this, "b")}>B</button>
            <button onClick={this.onAnswerButton.bind(this, "c")}>C</button>
            <button onClick={this.onAnswerButton.bind(this, "d")}>D</button>
        </div>
    }
}