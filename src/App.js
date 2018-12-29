import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

var voices = window.speechSynthesis.getVoices();

function say(m) {
  var msg = new SpeechSynthesisUtterance();
  msg.voice = voices[1];
  msg.voiceURI = "native";
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 0.8;
  msg.text = m;
  msg.lang = 'vi-VN';
  speechSynthesis.speak(msg);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  start = () => {
    if (!this.inter) {
      this.inter = setInterval(this.randomNumber, 3000)
    }
  }

  stop = () => {
    clearInterval(this.inter)
  }

  randomNumber = () => {
    const number = getRandomArbitrary(1, 90);
    if (this.state.list.includes(number)) {
      return this.randomNumber();
    }

    this.setState({ list: [number, ...this.state.list] }, () => {
      say(number);
    });
  };

  render() {
    return (
      <div className="App">
              <button onClick={this.stop}>stop</button>

        <button onClick={this.start}>start</button>
        <ul>
          {this.state.list.map(v => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
