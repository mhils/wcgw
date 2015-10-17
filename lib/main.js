var React = require('react');
var ReactDOM = require('react-dom');
var config = require("./config.json");

const State = {
    OBSERVE: "observe",
    START_SCREEN: "start_screen",
    HOST_GAME: "start_game",
    JOIN: "join"
};

class App extends React.Component {
    constructor(props) {
        super(props);

        var socket = io();

        socket.on("game info", (game) => {
            this.setState({game: game});
        });

        this.state = {
            socket: socket,
            game: null
        };
        if (window.location.pathname.indexOf("play") > -1) {
            this.state.state = State.JOIN;
            //this.state.gameId = parseInt(window.location.pathname.split("/").reverse()[0]);
        } else {
            this.state.state = State.START_SCREEN;
        }
    }

    startGame() {
        this.state.socket.emit("start game");
        this.setState({
            state: State.OBSERVE
        });
    }

    hostGame() {
        this.state.socket.emit("host game");
        this.setState({
            state: State.HOST_GAME
        });
    }

    render() {
        switch (this.state.state) {
            case State.HOST_GAME:
                return <StartGame game={this.state.game} startGame={this.startGame.bind(this)}/>;
            case State.JOIN:
                return <JoinGame/>;
            case State.OBSERVE:
                return <ObserveGame game={this.state.game}/>;
            default:
                return <StartScreen hostGame={this.hostGame.bind(this)}/>;
        }
    }
}

class ObserveGame extends React.Component {
    render() {

        return <div>
            such gif
            <UserList users={this.props.game.users}/>
        </div>;
    }
}


class JoinGame extends React.Component {
    render() {
        return <h1>join game</h1>;
    }
}

class StartGame extends React.Component {
    render() {
        if (!this.props.game) {
            return <div>...</div>;
        }
        return <div>
            <h1>show barcode</h1>
            <a href={"/play/" + this.props.game.id}>
                {config.domain}/play/{this.props.game.id}
            </a>

            <button onClick={this.props.startGame}>Start Game</button>

            <UserList users={this.props.game.users}/>
        </div>;
    }
}

class User extends React.Component {
    render() {
        return (
            <div>
                {this.props.name} ({this.props.score})
            </div>
        )
    }
}

class UserList extends React.Component {
    render() {
        var userNodes = this.props.users.map((user) => {
            return <User {...user}/>;
        });

        return <div>Users: {userNodes}</div>;
    }
}

class StartScreen extends React.Component {
    hostGame() {
        this.props.hostGame();
    }

    render() {
        return <div>
            <h1>What Could Go Wrong?</h1>
            <button onClick={this.hostGame.bind(this)}>Host Game</button>
        </div>
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    ReactDOM.render(
        <App/>,
        document.getElementById("app")
    );
});
