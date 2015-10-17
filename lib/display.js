"use strict";
import React from "react";
import ScoreBoard from "./scoreboard.js";
import { GameState } from "./game.js";

class Gif extends React.Component {
    constructor(props){
        super(props);
        this.state = {repetitions: 1};
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.url !== this.props.url){
            this.setState({repetitions: 1});
        }
    }
    onEnded(event){
        if(this.state.repetitions < this.props.repetitions){
            event.target.play();
            this.setState({repetitions: this.state.repetitions + 1});
        }
    }
    render(){
        return <video src={this.props.url} autoPlay onEnded={this.onEnded.bind(this)}></video>;
    }
}

class Choices extends React.Component {
    render(){
        var answers = this.props.answers.map((x) => {
           return <li key={x}>{x}</li>;
        });
        return <ul>{answers}</ul>;
    }
}

export default class ObserveGame extends React.Component {
    render() {
        var game = this.props.game;
        if(!game || game.state === GameState.LOBBY){
            return <div>...</div>;
        }

        var gif;
        if(game.state === GameState.SHOW_QUESTION || game.state === GameState.SHOW_CHOICES) {
            gif = <Gif {...game.gif.question} repetitions={3}/>;
        } else if(game.state === GameState.SHOW_ANSWER) {
            gif = <Gif {...game.gif.answer} repetitions={1}/>;
        }

        var answers;
        if(game.state !== GameState.SHOW_QUESTION){
            answers = <Choices answers={game.gif.answers}/>;
        }


        return <div>
            <h1>{game.gif.title}</h1>
            {gif}
            {answers}
            <ScoreBoard users={this.props.game.users}/>
        </div>;
    }
}