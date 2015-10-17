"use strict";
var React = require('react');

export default class PlayGame extends React.Component {

    onAnswerButton(choice) {
        console.log(choice)
    }

    render() {
        if(!this.props.game || !this.props.game.started) {
            return <div><i className="fa fa-spinner fa-pulse fa-4x"></i></div>;
        }
        return <div>
            <button onClick={this.onAnswerButton.bind(this, "a")}>A</button>
            <button onClick={this.onAnswerButton.bind(this, "b")}>B</button>
            <button onClick={this.onAnswerButton.bind(this, "c")}>C</button>
            <button onClick={this.onAnswerButton.bind(this, "d")}>D</button>
        </div>
    }
}