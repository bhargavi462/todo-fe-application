//import logo from './logo.svg';
//import './App.css'; 

// import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Todo from './todo'
import SignIn from './signin';
import SignUp from './signup';
function App() {
  return (
    <div className="App">
       <SignUp/>
      
      <SignIn></SignIn>
    <Todo/>
    </div>
  );
}

export default App;
