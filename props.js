// The same way html tags have atributes, in React we use attributes named "properties" or "props" to pass information into the component
// we use props to customized and made components reusable
// image you have two players with different names. You will pass the "name" as a prop
// you can also pass functions, thus adding custom functionality to the component

const elementWithProps = React.createElement('p', { id: 'element with properties' }, "let's see the props of this element");
console.log(elementWithProps);
// we can see that the object has a "props" key, with the properties of the React element
// indeed, print them too...

console.log('this is the id property:', elementWithProps.props.id);
console.log('this is the children property:', elementWithProps.props.children);

// and you can also inspect it with the React Dev Tools

// Let's try the display the same code as in "components.html" but using props...

// the header needs the title and the number of players
// const Header = () =>
//     (
//         <header>
//             <h1>ScoreBoard</h1>
//             <span className="stats">Players: 1</span>
//         </header>

//     );


// when you define a component using a function (like below), the function gets one default argument: the props object
const Header = ( props ) => //you can name it whatever you want
    ( 
        <header>
            {/* we use curly braces because we are using a js inside jsx */}
            <h1>{ props.title }</h1>
            <span className="stats">Players: { props.totalPlayers }</span>
        </header>

);
    
// Important thing about props is that they are read only (immutable): the component can only read the props, never change them.
// Only the parent owns and controls the prop values [Q]: indeed they would be out of scope, right?
// They must act like "pure functions"
// what is a pure function? A function that always returns the same result if the same arguments are passed. It does not modify any of the objects it received as inputs

const Counter = ( props ) =>  
    (
        <div>
            <button className="counter-action decrement"> - </button>
            <span className="counter-score">{ props.score }</span>
            <button className="counter-action increment"> + </button>
        </div>
    );


const Player = ( props ) => {
    return (
        <div className="player">
            <span className="player-name">
                { props.playerName }
            </span>
        <Counter score={ props.score } />,

        </div>
    );
}


const App = ( ) => {
    return (
        <div className="scoreboard">
            {/* anytime to pass anything but a string, must be between curly braces */}
            <Header title="Scoreboard" totalPlayers={1} /> 
            <Player playerName="Ricardo" score={30} />
            {/* and we could reuse this element as many times as we wanted... */}
            <Player playerName="Mamen" score={30} />
            <Player playerName="Pablo" score={30} />
            {/* though normally we would do this using an api or a database, not hard coding them */}
        
        </div>

    )
}

ReactDOM.render(
    <App />, 
    document.getElementById("root")
);



// let's use now a variable to iterate an array

const players = [
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
];

const AppArray = ( props ) => {
    return (
        <div className="scoreboard">
            <Header title="Scoreboard" totalPlayers={ props.initialPlayers.length } /> 
            {
                //the UI may change, React needs an identifier for each of the players so it can be consistent
                //They key is not always needed. Only in elements that will be updated, deleted, etc and are similar to other elements (like players)
                props.initialPlayers.map(player =>
                    <Player
                        playerName= {player.name}
                        score={player.score}
                        key={player.id.toString()}
                    />)     
            }
        </div>

    )
}

ReactDOM.render(
    <AppArray initialPlayers={ players } />, 
    document.getElementById("root-array")
);

// but our app is static: it doesn't change yet. In order for the app to change, we need to be able to manage the "state" of the app.
// states manage the information about a component that may change over time (for example: score, the list of players,...)