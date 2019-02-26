import React, { Component } from 'react';
import './App.css';
import SignaturePad from '../src/SignatureCanvas';
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
        <SignaturePad
          canvasProps={{className: styles.sigPad}}
          ref={(ref) => { this.sigPad = ref }}
        />
      </div>
        <div>
            <button styles={styles.buttons} onClick={this.clear}>
              Clear
            </button>
              <br/>
              <br/>
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

export default App;
