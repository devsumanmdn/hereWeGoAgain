import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionLeft: 0,
      positionTop: 0,
      bHeight: 0,
      bWidth: 0,
      posArray: null
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // this.getBoardSize = this.getBoardSize.bind(this);
    // this.generateArray = this.generateArray.bind(this);
  }

  componentDidMount() {
    this.getBoardSize();
    window.addEventListener("keypress", this.handleKeyPress);
  }

  getBoardSize() {
    this.bHeight = prompt("Enter Board Height", "Height");
    this.bWidth = prompt("Enter Board Width", "Width");
    console.log(this);
    // this.setState({
    //   bHeight,
    //   bWidth
    // });
    // let { state } = this;
    this.generateArray(this);
  }

  generateArray(ss) {
    let array = [],
      key = 1;

    for (let i = 0; i < `${ss.bWidth}`; i++) {
      for (let j = 0; j < `${ss.bHeight}`; j++) {
        array.push({ key: key++, left: i, right: j, tt: (Date.now() * 7) % 2 });
      }
    }
    this.setState({
      posArray: array
    });
  }

  handleKeyPress = event => {
    console.log(this.state.posArray);
    let width = this.state.bWidth,
      height = this.state.bHeight;
    switch (event.key) {
      case "ArrowLeft":
        let moveLeft = this.state.positionLeft;
        moveLeft = moveLeft === 0 ? moveLeft : moveLeft - 1;
        this.setState({
          positionLeft: moveLeft
        });
        break;
      case "ArrowRight":
        let moveRight = this.state.positionLeft;
        moveRight = `${moveRight}` === `${width}` ? moveRight : moveRight + 1;
        this.setState({
          positionLeft: moveRight
        });
        break;
      case "ArrowUp":
        let moveUp = this.state.positionTop;
        moveUp = moveUp === 0 ? moveUp : moveUp - 1;
        this.setState({
          positionTop: moveUp
        });
        break;
      case "ArrowDown":
        let moveDown = this.state.positionTop;
        moveDown = `${moveDown}` === `${height}` ? moveDown : moveDown + 1;
        this.setState({
          positionTop: moveDown
        });
        break;
      default:
        break;
    }
  };

  render() {
    if (this.bWidth) {
      console.log(this.state.posArray);
      return (
        <div className="main">
          <div className="Board">
            <p> {`left : ${this.state.positionLeft}`} </p>
            <p> {`top : ${this.state.positionTop}`} </p>
            <p> {`array : ${this.state.posArray}`} </p>
            {this.state.posArray
              ? this.state.posArray.map(box => (
                  <Box key={box.key} left={box.left} right={box.right} />
                ))
              : ""}
            <Board width={this.state.bWidth} height={this.state.bHeight} />
          </div>
        </div>
      );
    } else {
      return <div>Nothing</div>;
    }
  }
}

const Board = props => {
  return (
    <div className="Board">
      <p> Hello </p>
      {}
    </div>
  );
};

const Box = props => {
  return (
    <div className="box">
      <p>{this.props}</p>
    </div>
  );
};

export default App;
