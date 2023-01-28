// At its core, React is a library that allows us to create, change and update dom elements using jsx (sintactc sugar that allows us to write "html-like javascript")
// created by Facebook, it's main advantage is the use of -components-, that allow us to create complex UI reusing code that encapsulates design and logic
// React also keeps updated the state of the app and the UI accordingly
// Relies on moderm js principles ([Q]: is that why it needs Babel?)
// it was created for the browser, but it's now used for other interfaces and that's why you need to import two libraries (React and ReactDOM) for webapps

// Thought we usually will be working with components, it's useful to first understand how does React creates individual elements (that are then used for components)


const title = React.createElement(
    'h1',
    { id: 'main-title', title: 'this is a title' },
    'My First React Element'
)

// But React does not create DOM elements, just js elements that then are rendered to the DOM
// For example when we do..

console.log(title);

// what we see in the console is a js object, not a DOM element
// So now we need to render it in the DOM with the ReactDOM library

ReactDOM.render(
    title,
    document.getElementById('one-child')
);


// we can also give it more elements as children

const desc = React.createElement(
    'p',
    null,
    'I just learnt how to create a React node and render it into the DOM'
)


const header = React.createElement(
    'header',
    null,
    title,
    desc
)

ReactDOM.render(
    header,
    document.getElementById('several-children')
);

// As you can see, create elements in React using the createElement and render functions is not efficient (although can be done). Then...what's the point of using React?

// in order to move forward we need to understand what JSX is
// JSX is an extension of vanille js that allows us to create React elements in an "html-style". It's "sintactic sugar" (AKA, is there just to make things easier for us!)
// Let's convert the previous code to JSX (renaming variables as [VARIABLE-NAME]JSX)

const titleJSX = <h1>My First React Element</h1>

const descJSX = <p>I just learnt how to create a React node and render it into the DOM</p>

const headerJSX = React.createElement(
    'header',
    null,
    titleJSX,
    descJSX
)

// in order to be able to use JSX, this code needs to be "transpiled" (compiled into another language of the same level, in this case from JSX to JS)
// normally we will be done automatically before sending it to the browser
// but in this case we need to provide the link to Babel and change the script type of app.js at index.html so the browser is able to do it

ReactDOM.render(
    titleJSX,
    document.getElementById('one-child-JSX')
);


ReactDOM.render(
    headerJSX,
    document.getElementById('several-children-JSX')
);

// We can even "concatenate" the different JS objects using JSX so we avoid using the createElement function
// [Q]: it works, but is this correct? 

const headerConcatenatedJSX = (
    <header className="header"> {/* jsx use camel case and allows us to modify attributes */}
        { titleJSX }  {/* <-- this is called a "jsx expression". Allows us to use js in side jsx*/}
        {descJSX} <p>this was added in jsx</p> { /* and allows as to concatenate on the fly */}
    </header>
); //the parenthesys is just for clarity


// instead of creating the header element with createElement, we are creating it with jsx.
    
ReactDOM.render(
    headerConcatenatedJSX,
    document.getElementById('contatenated-JSX')
);

// All the previous code, is transpiled into js createElement functions before render()
// you can see how it does it and try to convert it back to js here: https://babeljs.io/repl

// TODOs:
// - show examples of createElement function nesting
// - Explain the flow jsx-- > transpiler-- > render()-- > browser
// - Convert in runtime jsx to js to make it clear how it works



