import React, { Component } from 'react';
import './App.css';
// import SignaturePad from '../src/signaturePad';
import Signature from '../src/signaturePad/ReactSignature';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Signature/>
        </header>
      </div>
    );
  }
}

export default App;
