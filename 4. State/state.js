const Header = ( props ) =>     ( 
        <header>
            <h1>{ props.title }</h1>
            <span className="stats">Players: { props.totalPlayers }</span>
        </header>

);
    

// we need to change the counter component to be a Class (only classes have state). So we go from this...
// const Counter = ( props ) =>
//     (
//         <div>
//             <button className="counter-action decrement"> - </button>
//             <span className="counter-score">{ props.score }</span>
//             <button className="counter-action increment"> + </button>
//         </div>
//     );

// to this:

// class Counter extends React.Component { //we are extending an existing class (that already has some methods and properties that we can use)
//     render() {
//         return(
//             <div>
//                 <button className="counter-action decrement"> - </button>
//                 {/* In class components, props are not accessed via inputs. They are part of the object itself (a built-in property) so you access them with this. */}
//                 <span className="counter-score">{ this.props.score }</span>
//                 <button className="counter-action increment"> + </button>
//             </div>
//         );
//     }
// }

// Class components are used as functional components: by adding the jsx tag wherever you want to display it

// and now let's add the state

class Counter extends React.Component {
    
    constructor() { //we build the constructor, so each time we build a counter, it initializes and has its own state
        super(); //we need to call the constructor of the component class that we are extending
        this.state = { //this object needs to be named "state", otherwise it won't work --> the methods wouldn't know what to update...
            score: 0 //we initialize state
        }
    }
    // this whole constructor could be replace by:
    // state = { score: 0};
    // but this way is not supported in all browsers

    incrementScore() {
        // this.state.score++ --> Nope, state cannot be modified directly. You need to do it through setState function so React knows something has changed and renders again
        this.setState({
            score: this.state.score + 1 //after doing this, setState will tell React that this element needs to be re-rendered
            // but we cannot make it this way! it losts "binding". "this" is undefined here because custom made functiones are not binded to the object, so can't use this
            // you need to bind it. two ways: using arrow function in the onClick or binding it there
        });
    }

    //another way to fix the binding problem [Q] is to declare the event handle function as an anonimous function. As follows:
    decrementScore = () => {
        this.setState({
            score: this.state.score - 1
        });
    }

    render() {
        return(
            <div>
                <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
                <span className="counter-score">{ this.state.score }</span> 
                <button className="counter-action increment" onClick={this.incrementScore.bind(this)}> + </button> { /* we use onClick event listener...(1) */}
                {/* <button className="counter-action increment" onClick={() => this.incrementScore()}> + </button> || BOTH CAN BE USED */}
            </div>
        );
    }
}

const Player = ( props ) => {
    return (
        <div className="player">
            <span className="player-name">
            <button className="remove-player" onClick={ () => props.removePlayer( props.id ) }>???</button>
                { props.playerName }
            </span>
        <Counter />,

        </div>
    );
}


// Again, in the App component, in order to be able to use state, we need to define the component as a class instead of as a function (stateless functional component)
// In state, we will keep track of the players

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            
            players :
            [
                {
                    name: "Guil",
                    // score: 50, --> we don't need the score here anymore since it is saved in the counter component
                    id: 1
                },
                {
                    name: "Treasure",
                    // score: 85,--> we don't need the score here anymore since it is saved in the counter component
                    id: 2
                },
                {
                    name: "Ashley",
                    // score: 95,--> we don't need the score here anymore since it is saved in the counter component
                    id: 3
                },
                {
                    name: "James",
                    // score: 80,--> we don't need the score here anymore since it is saved in the counter component
                    id: 4
                },
                {
                    name: "Ricardo",
                    // score: 100,--> we don't need the score here anymore since it is saved in the counter component
                    id: 5
                }
            ]
        };
    }

    // handleRemovePlayer = ( id ) => {
        // this.setState(
            // setState takes an object as parameter, thus the parenthesis
            // {
                // players : this.state.players.filter ( p => {}) --> But this could cause problems and we need to update based on the previous state so...
    // }

    // so instead of providing the array, we provide a callback function that takes the previous state
    handleRemovePlayer = (id) => {
        this.setState( // Remember, we cannot modify the state directly! (like..."this.state")
            
            // why can't we just do players: prevState.players.filter... --> [Q]: because we need to do it async so we fix the problem we talk about above
            prevState => {
                return { //and returns the updated players arra
                    players: prevState.players.filter (p => id !==p.id)
                }
            }
            
        )

    }

    render() {
        return (
            <div className="scoreboard">
                <Header title="Scoreboard" totalPlayers={ this.state.players.length } /> 
                {
                    this.state.players.map(player =>
                        <Player
                            id={player.id}
                            removePlayer={this.handleRemovePlayer}
                            playerName= {player.name}
                            key={player.id.toString()}
                        />)     
                }
            </div>)
        }
}

ReactDOM.render(
    <App />, 
    document.getElementById("root")
);

// There are two main types of state when building a React app:
// application state and local component state (like ths counter states)

