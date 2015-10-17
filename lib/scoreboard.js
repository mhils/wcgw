"use strict";
import React from "react";

export class User extends React.Component {
    render() {
        return (
            <div>
                {this.props.username} ({this.props.score})
            </div>
        )
    }
}

export default class ScoreBoard extends React.Component {
    render() {
        var userNodes = this.props.users.map((user) => {
            return <User key={user.id} {...user}/>;
        });

        return <div>
            <h4>Scores</h4>
            {userNodes}
        </div>;
    }
}