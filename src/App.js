import React, { Component } from 'react';
import logo from './logo.svg';
import List from './component/List'
import './App.css';


class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }



  render() {
    return (
      <div className="App">
        
<List />



      </div>
    );
  }
}

export default App;
