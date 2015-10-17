var React = require('react');
var ReactDOM = require('react-dom');


const State = {
    START_SCREEN: "start_screen",
    HOST_GAME: "start_game",
    JOIN: "join",
    PLAY: "play"
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
        window.setTimeout(() => {
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
                return <StartGame gameId={this.state.gameId} users={this.state.users}/>;
            case State.JOIN:
                return <PlayGame/>;
            case State.PLAY:
                return <PlayGame/>;
            default:
                return <StartScreen hostGame={this.hostGame.bind(this)}/>;
        }
    }
}

class StartGame extends React.Component {
    render() {
        return <div>
            <h1>show barcode</h1>
            <a href={"/play/" + this.props.gameId}>
                whatcouldgowrong.party/play/{this.props.gameId}
            </a>
            <UserList users={this.props.users}/>
        </div>;
    }
}

class User extends React.Component {
    render() {
        return (
            <div>  {this.props.user.name} ({this.props.user.score})
            </div>

        )
    }
}

class UserList extends React.Component {
    render() {
        var userNodes = this.props.users.map(function (user) {
            return <User user={user}/>;
        });

        return (
            <div> {userNodes} </div>
        )

    }
}

class JoinGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    joinGame() {
        console.log(this.state.name);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                <button onClick={this.joinGame.bind(this)}>Join Game</button>
            </div>
        );
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

class PlayGame extends React.Component {

    onAnswerButton(choice) {
        console.log(choice)
    }


    render() {
        return <div>
            <button onClick={this.onAnswerButton.bind(this, "a")}>A</button>
            <button onClick={this.onAnswerButton.bind(this, "b")}>B</button>
            <button onClick={this.onAnswerButton.bind(this, "c")}>C</button>
            <button onClick={this.onAnswerButton.bind(this, "d")}>D</button>
        </div>
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    ReactDOM.render(
        <App/>,
        document.getElementById("app")
    );
});
