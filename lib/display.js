"use strict";
import React from "react";
import ScoreBoard from "./scoreboard.js";
import { GameState } from "./common.js";
import { choiceDuration } from "./common.js";


class Gif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {repetitions: 1};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url) {
            this.setState({repetitions: 1});
        }
    }

    onEnded(event) {
        if (this.state.repetitions < this.props.repetitions) {
            event.target.play();
            this.setState({repetitions: this.state.repetitions + 1});
        }
    }

    render() {
        return <video src={this.props.url} autoPlay onEnded={this.onEnded.bind(this)}></video>;
    }
}

class Choices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {highlight: null};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state === GameState.SHOW_ANSWER) {
            var gif = this.props.gif;
            this.highlightChoice = setTimeout(
                () => {
                    this.setState({
                        highlight: gif.solution
                    });
                },
                gif.answer.length-1000
            );
        }
    }

    componentWillUnmount() {
        console.log("meh");
        clearInterval(this.highlightChoice);
    }

    render() {
        var nums = ["A", "B", "C", "D"];
        var choices = this.props.gif.choices.map((x, i) => {
            var cls = i === this.state.highlight ? "text-success" : "";
            return <div key={x} className={cls}>
                <label>({nums[i]})</label> {x}
            </div>;
        });
        return <div className="choices">{choices}</div>;
    }
}

export default class ObserveGame extends React.Component {
    render() {
        var game = this.props.game;
        if (!game || game.state === GameState.LOBBY) {
            return <div>...</div>;
        }

        var gif;
        if (game.state === GameState.SHOW_QUESTION || game.state === GameState.SHOW_CHOICES) {
            gif = <Gif {...game.gif.question} repetitions={2}/>;
        } else if (game.state === GameState.SHOW_ANSWER) {
            gif = <Gif {...game.gif.answer} repetitions={1}/>;
        }

        var choices;
        if (game.state !== GameState.SHOW_QUESTION) {
            choices = <Choices gif={game.gif} state={game.state}/>;
        }


        return <div className="display">
            <main>
                <h1>{game.gif.title}</h1>
                {gif}
                {choices}
            </main>
            <aside>
                <ScoreBoard users={this.props.game.users}/>
            </aside>
        </div>;
    }
}