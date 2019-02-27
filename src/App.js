import React, { Component } from 'react';
import './App.css';
import SignaturePad from '../src/SignatureCanvas';
import styles from './styles.css';
import {Card,CardBody,CardTitle,CardText,Button} from 'reactstrap';

class App extends Component {

    state = {trimmedDataURL: null,signPad: false}

    sigPad = {}

    clear = () => {
      this.sigPad.clear();
      this.setState({signPad:false});
    }

    trim = () => {
      this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
        .toDataURL('image/png')})
    }

    addSign = () => {
      console.log('addSign called');
      this.setState({signPad:true});
    }

  render() {

     let {trimmedDataURL} = this.state

    return (
      <div className="App">
        <Card>
          <CardBody>
            <CardTitle>Digital signature pad</CardTitle>
            <CardText>
              Hello ,<br/>
                Digital signature pad, Digital signature pad Digital signature pad Digital signature pad<br/>
                Digital signature pad, Digital signature pad Digital signature pad Digital signature pad<br/>
                Digital signature pad, Digital signature pad Digital signature pad Digital signature pad<br/>
                Digital signature pad, Digital signature pad Digital signature pad Digital signature pad<br/>
                Digital signature pad, Digital signature pad Digital signature pad Digital signature pad<br/>
                Digital signature pad,Digital signature pad.<br/>
                <br/>
                <div className="trimmedUrl">
                {trimmedDataURL
                ? <img className={styles.sigImage}
                  src={trimmedDataURL} alt=''/>
                : null}
                </div>
                <br/>
                {trimmedDataURL && this.state.signPad === false ? (null)
                  : (
                  <Button onClick={this.addSign}>Click To Add Signature</Button>
                )}
            </CardText>
          </CardBody>
          {this.state.signPad === true && (
            <div>
            <div className={styles.sigContainer}>
              <SignaturePad
                canvasProps={{className: styles.sigPad}}
                ref={(ref) => { this.sigPad = ref }}
              />
            </div>
            <div>
                <button className={styles.buttons} onClick={this.trim}>
                  Add To SignPad
                </button>
                <button styles={styles.buttons} onClick={this.clear}>
                  Exit Pad
                </button>
            </div>
            </div>
          )}
            </Card>
      </div>
    );
  }
}

export default App;
