import React, { Component } from "react";
import {saveSvgAsPng} from 'save-svg-as-png'
import { generateShorthand } from '../../../api/shared'
import Editor from './Editor.js'
import Barcodes from './Barcodes.js'
import Printout from './Printout.js'
import Toggle from 'react-toggle'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toggle/style.css'
import '../App.css'

const host = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"

function beep() {
  var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
  snd.play();
}

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      loading: true,
      changed: false,
      results: [],
      page: "edit"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCodeInput = this.handleCodeInput.bind(this)
    this.handleNavChange = this.handleNavChange.bind(this)
    this.handleImport = this.handleImport.bind(this)
  }

  handleChange(data) {
    let formData = data.formData
    if (formData.length > 0) {
      formData = formData.map( item => {
        item.words = item.words.map( word => word ? word.toUpperCase() : "")
        return item
      })
    }    
    this.setState({data: formData, changed: true})
  }

  handleSave() {
    var url = host + "/data/";
    var setState = this.setState.bind(this)
    var body = JSON.stringify(this.state.data)
    console.log("saving data", body)

    fetch(url, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
      },
      body, 
    }).then(res => res.json())
    .then(data => {console.log("saved"); setState({ changed: false })})
    .catch(error => console.error(error));
  }

  handleCodeInput(code) {
    beep();
    var url = host + "/code/";
    var setState = this.setState.bind(this)
    var body = JSON.stringify({code})
    console.log("sending code", body)

    fetch(url, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json', 
      },
      body, 
    }).then(res => res.json())
    .then(data => {console.log(data); if (data[1]) setState({ results: [data].concat(this.state.results)})})
    .catch(error => console.error(error));
  }

  handleNavChange(event) {
    this.setState({
      page: event.target.checked ? "test" : "edit"
    })
  }

  handleImport(event) {
    const file = event.target.files[0]
    console.log(file)
    var reader = new FileReader();
    reader.onload = ( content => {
      var jsonString = content.target.result
      console.log(jsonString)
      let data = JSON.parse(jsonString)
      if (Array.isArray(data)) {
        console.warn("converting old data")
        data.fictions = data
      }
      this.setState({
        data,
        changed: true
      })
    })
    reader.readAsText(file)
  }

  handleDownload() {
    let elem = Array.from(document.querySelectorAll(".barcode-container")).forEach( (elem, index) => {
      setTimeout( () => {
        let svg = elem.querySelector("svg")
        let word = generateShorthand(elem.querySelector('text').textContent)
        let idea = elem.dataset.idea
        saveSvgAsPng(svg, idea + "_" + word + ".png");
      }, index * 250)
    })  
  }

  componentDidMount() {
    var xmlhttp = new XMLHttpRequest();
    var url = host + "/data/";
    var setState = this.setState.bind(this)
    
    xmlhttp.onreadystatechange = function() {
      console.log(this)
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        if (Array.isArray(data)) { // old style data json
          console.log("converting old data")
          setState({ data: { fictions: data } })  
        } else if (data.fictions && Array.isArray(data.fictions)) {
          setState({data})
        }
        setState({ loading: false })
        console.log("loaded data")
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
  }

  render() {
    
    const saveButton = <button key="save" disabled={!this.state.changed} onClick={this.handleSave}>Speichern</button>
    const importExport = <div key="importexport" className="import-export">
        <label>
          import
          <input type="file" onInput={this.handleImport}/>
        </label>
        <a href={"data:application/json;base64," + utf8_to_b64(JSON.stringify(this.state.data)) } download="data.json">export</a>
      </div>
    const download = <button onClick={this.handleDownload}>Download</button>

    return <div>
      <nav>
        <h1>Future To Go</h1>
        <label>
          <span>Edit</span>
          <Toggle
            icons={false}
            onChange={this.handleNavChange} />
          <span>Test</span>
        </label>
        <div className="buttons">
          { this.state.page === "edit" ?
            [ saveButton, importExport ]
          : download }
        </div>
      </nav>
      <main>
        { this.state.loading ?
          <div>Lade Daten...</div>
        :
          <div>
            { this.state.page == "edit" ?
              <Editor 
                data={this.state.data}
                onChange={this.handleChange}
              />
            :
              <div>
                <Barcodes 
                  data={this.state.data.fictions}
                  onInput={this.handleCodeInput}
                />
                <div className="printout-container">
                  { this.state.results.map( 
                      textParts => <Printout key={textParts.third} textParts={textParts}/>
                  )}
                </div>
              </div>
            }
          </div>
        }
        </main>
    </div>}
}

export default App