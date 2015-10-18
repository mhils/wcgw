"use strict";
import React from "react";
import { GameState } from "./common.js";
import { choiceDuration } from "./common.js";
import ProgressBar from "./progressbar.js";

export default class PlayGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {choice: null};
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.game || nextProps.game.state !== this.props.game.state) {
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
        var contents;

        if ((!game || game.state === GameState.LOBBY)) {
            let playerCount = null;
            if (game) {
                playerCount = <p>{game.users.length} players</p>;
            }
            contents = <div>
                <p><i className="fa fa-heart fa-4x text-danger"/></p>
                <h4>Waiting for the game to start...</h4>
                {playerCount}
            </div>;
        } else if (game.state === "show choices") {
            var btnLabels = {0: "A", 1: "B", 2: "C", 3: "D"};
            var buttons = [0, 1, 2, 3].map((i) => {
                var cls = "btn btn-block btn-lg";
                if (i === this.state.choice) {
                    cls += " btn-info";
                } else {
                    cls += " btn-default";
                }
                return <button
                    key={i}
                    onClick={this.submitChoice.bind(this, i)}
                    className={cls}>
                    {btnLabels[i]}
                </button>
            });

            var duration = choiceDuration(game.gif.question.length);
            contents = [<ProgressBar key="progressbar" total={duration}/>, buttons];
        } else {
            contents = <i className="fa fa-youtube-play fa-4x"/>;
        }
        return <div className="play">
            <h1>WCGW?</h1>
            {contents}
        </div>;
    }
}