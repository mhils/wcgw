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
        console.log("Userinformation ", this.props.users);
        this.props.users.sort(function(a,b) {
            if (a.score > b.score) {
                return -1;
            }
            if (a.score < b.score) {
                return 1;
            }
            return 0;
        });
        var userNodes = this.props.users.map((user) => {
            return <User key={user.id} {...user}/>;
        });

        return <div>Users: {userNodes}</div>;
    }
}