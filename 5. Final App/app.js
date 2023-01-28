function Header ( props ) {
    return (
            <header>
                <h1>ScoreBoard</h1>
                <span className="stats">Players: 1</span>
            </header>
        )
}
    
function Player(props) {
    return (
        <div className="player">
            <span className="player-name">
                { props.playerName }
            </span>
            <div>
                <button className="counter-action decrement"> - </button>
                <span className="counter-score">{ props.playerScore }</span> 
                <button className="counter-action increment" onClick= { props.deletePlayer }> + </button>
            </div>            
        </div>
    )

}


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            players:  [
                {
                    name: "Guil",
                    score: 50,
                    id: 1
                },
                {
                    name: "Treasure",
                    score: 85,
                    id: 2
                },
                {
                    name: "Ashley",
                    score: 95,
                    id: 3
                },
                {
                    name: "James",
                    score: 80,
                    id: 4
                },
                {
                    name: "Ricardo",
                    score: 100,
                    id: 5
                }
            ]
        }
    }

    deletePlayer = ( id ) => {
        console.log(this.state.players)
        
        this.setState(
            prevState => {
                return {
                    players: prevState.players.map(p => id !== p.id)
                }
        }
        )
        
        
    }

    render() {
        return (
            <div>
                <Header players={this.state.players} title='Scoreboard' />
                {
                    this.state.players.map ( p => 
                        <Player
                            playerName={p.name}
                            playerScore={p.score}
                            key={p.id.toString()}
                            id= {p.id}
                            deletePlayer={this.deletePlayer}
                            />
                    )
                }
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)