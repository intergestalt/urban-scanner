import React, { Component } from "react";

class Stats extends React.Component {
  constructor(props) {
    super()
    this.state = {
      stats: "0"
    }
    this.host = props.host
  }

  componentDidMount() {
    var xmlhttp = new XMLHttpRequest();
    var url = this.host + "/stats/";
    var setState = this.setState.bind(this)

    xmlhttp.onreadystatechange = function () {
      console.log(this)
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        var statsString = JSON.stringify(data, null, 2)
        setState({stats: statsString})
        console.log(statsString)
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  render() {
    return <pre style={{whiteSpace: "pre-wrap", margin: "1rem"}}>
      <h5>Statistics with 100 random scans </h5>
      { this.state.stats }
    </pre>
  }
}

export default Stats