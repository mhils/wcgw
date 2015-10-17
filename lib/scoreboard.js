"use strict";
import React from "react";

export class User extends React.Component {
    render() {
        return (
            <div>
                {this.props.name} ({this.props.score})
            </div>
        )
    }
}

export default class UserList extends React.Component {
    render() {
        var userNodes = this.props.users.map((user) => {
            return <User {...user}/>;
        });

        return <div>Users: {userNodes}</div>;
    }
}