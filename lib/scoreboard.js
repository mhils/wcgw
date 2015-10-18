"use strict";
import React from "react";

export class User extends React.Component {
    render() {
        var x = 100-(100 * this.props.score / this.props.maxScore);
        var background = "linear-gradient(90deg, white 0%, rgba(255, 38, 118,0.2) "+x+"%, #FF2676 "+x+"%)";
        return (
            <div className="user" style={{background: background}}>
                {this.props.username} ({this.props.score})
            </div>
        )
    }
}

export default class ScoreBoard extends React.Component {
    render() {
        var users = this.props.users;
        users.sort(function(a,b) {
            if (a.score > b.score) {
                return -1;
            }
            if (a.score < b.score) {
                return 1;
            }
            return 0;
        });
        var maxScore = Math.max(7, users.length>0 ? users[0].score : 0);
        var userNodes = users.map((user) => {
            return <User key={user.id} {...user} maxScore={maxScore}/>;
        });

        return <div className="scoreboard">
            <h4>Scores</h4>
            {userNodes}
        </div>;
    }
}