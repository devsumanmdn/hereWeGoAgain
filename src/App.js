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
      posArray: null,
      steps: 36,
      nos: 0
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getBoardSize = this.getBoardSize.bind(this);
    this.generateArray = this.generateArray.bind(this);
  }

  componentDidMount() {
    this.getBoardSize();
    window.addEventListener("keypress", this.handleKeyPress);
  }

  getBoardSize() {
    this.bHeight = prompt("Enter Board Height", "Height");
    this.bWidth = prompt("Enter Board Width", "Width");
    this.generateArray(this);
  }

  generateArray(ss) {
    let array = [],
      key = 1,
      no = 0;

    for (let i = 0; i < `${ss.bWidth}`; i++) {
      for (let j = 0; j < `${ss.bHeight}`; j++) {
        var t = "T";
        if (Math.random(1) > 0.85) {
          t = "H";
          no = no + 1;
        }
        array.push({
          key: key++,
          top: i,
          left: j,
          tt: t
        });
      }
    }
    this.setState({
      posArray: array,
      nos: no
    });
  }

  reset(msg) {
    alert(msg);
    window.location.reload();
  }

  handleKeyPress = event => {
    let width = this.bWidth,
      height = this.bHeight;

    switch (event.key) {
      case "ArrowLeft":
        let moveLeft = this.state.positionLeft;
        if (moveLeft !== 0) {
          let posArr = this.state.posArray;
          let nol = this.state.nos;
          if (
            posArr[
              parseFloat(this.state.positionTop) * parseFloat(this.bWidth) +
                parseFloat(moveLeft) -
                1
            ].tt === "H"
          ) {
            posArr[
              parseFloat(this.state.positionTop) * parseFloat(this.bWidth) +
                parseFloat(moveLeft) -
                1
            ].tt =
              "T";
            nol === 1 ? this.reset("You have Won!!") : nol--;
          }

          const step = this.state.steps - 1;
          this.setState({
            positionLeft: moveLeft - 1,
            posArray: posArr,
            steps: step,
            nos: nol
          });
          if (this.state.steps === 0) {
            this.reset("You Lost!!");
          }
        }

        break;
      case "ArrowRight":
        let moveRight = this.state.positionLeft;
        if (`${moveRight}` !== `${width - 1}`) {
          let posArr = this.state.posArray;
          let nor = this.state.nos;
          if (
            posArr[
              parseFloat(this.state.positionTop) * parseFloat(this.bWidth) +
                parseFloat(moveRight) +
                1
            ].tt === "H"
          ) {
            posArr[
              parseFloat(this.state.positionTop) * parseFloat(this.bWidth) +
                parseFloat(moveRight) +
                1
            ].tt =
              "T";
            nor === 1 ? this.reset("You have Won!!") : nor--;
          }
          const step = this.state.steps - 1;
          this.setState({
            positionLeft: moveRight + 1,
            posArray: posArr,
            steps: step,
            nos: nor
          });
          if (this.state.steps === 0) {
            this.reset("You Lost!!");
          }
        }
        break;
      case "ArrowUp":
        let moveUp = this.state.positionTop;
        if (moveUp !== 0) {
          let posArr = this.state.posArray;
          let nou = this.state.nos;
          if (
            posArr[
              (parseFloat(this.state.positionTop) - 1) *
                parseFloat(this.bWidth) +
                parseFloat(this.state.positionLeft)
            ].tt === "H"
          ) {
            posArr[
              (parseFloat(this.state.positionTop) - 1) *
                parseFloat(this.bWidth) +
                parseFloat(this.state.positionLeft)
            ].tt =
              "T";
            nou === 1 ? this.reset("You have Won!!") : nou--;
          }
          const step = this.state.steps - 1;
          this.setState({
            positionTop: moveUp - 1,
            posArray: posArr,
            steps: step,
            nos: nou
          });
          if (this.state.steps === 0) {
            this.reset("You Lost!!");
          }
        }
        break;
      case "ArrowDown":
        let moveDown = this.state.positionTop;
        if (`${moveDown}` !== `${height - 1}`) {
          let posArr = this.state.posArray;
          let nod = this.state.nos;
          if (
            posArr[
              (parseFloat(this.state.positionTop) + 1) *
                parseFloat(this.bWidth) +
                parseFloat(this.state.positionLeft)
            ].tt === "H"
          ) {
            posArr[
              (parseFloat(this.state.positionTop) + 1) *
                parseFloat(this.bWidth) +
                parseFloat(this.state.positionLeft)
            ].tt =
              "T";
            nod === 1 ? this.reset("You have Won!!") : nod--;
          }
          const step = this.state.steps - 1;
          this.setState({
            positionTop: moveDown + 1,
            posArray: posArr,
            steps: step,
            nos: nod
          });
          if (this.state.steps === 0) {
            this.reset("You Lost!!");
          }
        }
        break;
      default:
        break;
    }
  };

  render() {
    if (this.bWidth) {
      return (
        <div className="main">
          <div className="Board">
            <p> {`Remaining Steps  : ${this.state.steps}`} </p>
            <p> {`Remaining Mushroom: ${this.state.nos}`} </p>

            <div
              style={{
                width: this.bWidth * 42,
                height: this.bHeight * 42,
                backgroundColor: "#ffffff"
              }}
            >
              {this.state.posArray
                ? this.state.posArray.map(box => (
                    <Box
                      key={box.key}
                      data={box}
                      pos={[this.state.positionLeft, this.state.positionTop]}
                    />
                  ))
                : ""}
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const Box = props => {
  return (
    <div
      className="box"
      style={{
        float: "left",
        width: "40px",
        height: "40px",
        border: "1px solid #000",
        textAlign: "center"
      }}
    >
      <span
        style={{
          height: "40px",
          lineHeight: "40px"
        }}
      >
        <img
          src={
            props.data.left === props.pos[0] && props.data.top === props.pos[1]
              ? "P.jpg"
              : props.data.tt + ".jpg"
          }
          alt={props.data.tt}
          height="40"
          width="40"
        />
      </span>
    </div>
  );
};

export default App;
