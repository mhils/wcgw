var React = require('react');
var ReactDOM = require('react-dom');


const State = {
    START_SCREEN: "start_screen",
    HOST_GAME: "start_game",
    JOIN: "join"
};

class App extends React.Component {
    constructor(props) {
        super(props);

        //var socket = window.io(document.location.protocol + '//' + document.location.host);

        //socket.on("game info", function(){});

        this.state = {
            //socket: socket,
            gameId: null,
            users: []
        };
        if (window.location.pathname.indexOf("play") > -1) {
            this.state.state = State.JOIN;
            this.state.gameId = parseInt(window.location.pathname.split("/").reverse()[0]);
        } else {
            this.state.state = State.START_SCREEN;
        }
    }

    hostGame() {
        this.setState({
            state: State.HOST_GAME
        });
        window.setInterval(() => {
            this.setState({
                gameId: 42,
                users: [
                    {name: "James Bond", score: 3},
                    {name: "Jamie Bond", score: 4}
                ]
            });
        }, 1000);
    }

    render() {
        switch (this.state.state) {
            case State.HOST_GAME:
                return <StartGame/>;
            case State.JOIN:
                return <JoinGame/>;
            default:
                return <StartScreen hostGame={this.hostGame.bind(this)}/>;
        }
    }
}

class JoinGame extends React.Component {
    render() {
        return <h1>join game</h1>;
    }
}

class StartGame extends React.Component {
    render() {
        return <h1>show barcode</h1>;
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
