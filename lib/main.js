var React = require('react');
var ReactDOM = require('react-dom');


const State = {
    START_SCREEN: "start_screen",
    START_GAME: "start_game"
};

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            state: State.START_SCREEN
        };
    }
    startGame(){
        this.setState({
            state: State.START_GAME
        });
    }
    render(){
        switch(this.state.state) {
            case State.START_GAME:
                return <StartGame/>;
            default:
                return <StartScreen startGame={this.startGame.bind(this)}/>;
        }
    }
}

class StartGame extends React.Component {
    render() {
        return <h1>show barcode</h1>;
    }
}

class StartScreen extends React.Component {
    hostGame() {
        this.props.startGame();
    }

    render() {
    return <div>
            <h1>What Could Go Wrong?</h1>
            <button onClick={this.hostGame.bind(this)}>Host Game</button>
        </div>
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
	ReactDOM.render(
	  <App/>,
	  document.body
	);
});
