import React, { Component } from 'react';
import './App.css';
// import SignaturePad from '../src/signaturePad';
// import Signature from '../src/signaturePad/ReactSignature';
import SignaturePad from '../src/SignatureCanvas';
import ReactDOM from 'react-dom'
import styles from './styles.css';

class App extends Component {
      state = {trimmedDataURL: null}
    sigPad = {}
    clear = () => {
      this.sigPad.clear()
    }
    trim = () => {
      this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
        .toDataURL('image/png')})
    }
  render() {
     let {trimmedDataURL} = this.state
    return (
      <div className="App">
      <div className={styles.sigContainer}>
        <SignaturePad canvasProps={{className: styles.sigPad}}
          ref={(ref) => { this.sigPad = ref }} />
        </div>
        <div>
        <button className={styles.buttons} onClick={this.clear}>
          Clear
        </button>
        <button className={styles.buttons} onClick={this.trim}>
          Trim
        </button>
        </div>
        {trimmedDataURL
        ? <img className={styles.sigImage}
          src={trimmedDataURL} alt='' />
        : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'))
