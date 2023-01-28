// A component is a piece of UI that you can reuse
// like we are able to reuse code in functions, we can reuse components to render in the UI with React
// which allows us to think of each piece on isolation

// Thinking about how to "break" your UI into components is like thinking how to decide to create functions/class:
// try to keep your code "DRY". where there elements that you keep reusing and has "independent functinality", it probably
// makes sense to create a React Component

// React doesn't use a templating language, it uses plain js with jsx
// Create a React Component has two steps: 1) definen the component as function or class and then 2) use or display the component with the JSX tag

// By defining a new component, we will be defining a "react tag" that can indeed be a custom tag, for example the next code creates a tag called "myCustomTag"
// and renders it into the browser (though keep in mind that custom tags are not valid html elements...)



function MyCustomTag() { //why do we need to begin in Uppercase? [Q] if it's js...isn't this like...defining a class?
    return ( //you can read why we need the parenthesys here: https://jamesknelson.com/javascript-return-parenthesis/
        <myCustomTag>
            <h1>ScoreBoard</h1>
            <span className="stats">Players: 1</span>
        </myCustomTag>
    );
}

ReactDOM.render(
    <MyCustomTag />, //you can use the self closing if it has no children. Could also be <MyCustomTag><MyCustomTag/>
    document.getElementById('root-custom')
);

// It's worth noting that a component jsx tag is also a call to the createElement function
// this render() actually receives (as expected) a JSX object and renders it in the selected element

// you can also use arrow functions to define components:

const Header = () => 
    ( //we don't need the curly braces nor the return anymore using arrow functions
        <header>
            <h1>ScoreBoard</h1>
            <span className="stats">Players: 1</span>
        </header>

    );



// let's create the "player" component:

const Player = () => {
    return (
        <div className="player">
            <span className="player-name">
                Ricardo
            </span>

            <div>
                <button className="counter-action decrement"> - </button>
                <span className="counter-score">35</span>
                <button className="counter-action increment"> + </button>
            </div>
        </div>
    );
}

ReactDOM.render(
    <Player />,
    document.getElementById("root-arrow")
);

// let's try now to extract a component name counter

const Counter = () =>  //now we are not using return nor curly braces, just for practice
    (
        <div>
            <button className="counter-action decrement"> - </button>
            <span className="counter-score">35</span>
            <button className="counter-action increment"> + </button>
        </div>
    );

// how do we "nest" the Counter component now? --> Composing components

const PlayerCounter = () => {
    return (
        <div className="player">
            <span className="player-name">
                Ricardo
            </span>
            <Counter />,

        </div>
    );
}

ReactDOM.render(
    <PlayerCounter />, 
    document.getElementById("root-counter")
);


// Note that you cannot create a React tag that returns two elements, as it will not be transpiled, giving an error like...
// "Adjacent JSX elements must be wrapped in an enclosing tag"
// everything must be nested into a single tag


// So far, we have been creating "roots" for our examples, but that's not how it's done in real life, only one root is used.
// as you can only render one element into root (with as many children as you want) we need to create React component that handles the whole UI
// that component is the App component. Let's create a "root-App" html element and do it properly...


const App = () => {
    return (
        <div className="scoreboard">
            <Header />
            <PlayerCounter />
        </div>

    )
}

ReactDOM.render(
    <App />, 
    document.getElementById("root-app")
);

// with react, we don't touch the dom directly, it manages what is redered into the DOM. so it can be tricky to debug
// for example to map the react components to what you see in the developer tools
// React Dev Tools (extension to Chrome)
// how to use:
// - you will see the react code that underlies the UI
// - you can inspect as if they were html elements
// - right click and select dom node, show states,...
// - you can switch back and forth the react and the elements tab
// - search bar
// - inspecting component properties
// [Q]: I guess this only can be done when react is transpiled in the browser?
