import React, { Component } from "react";
import Barcode from 'react-barcode'
import { generateCode, generateShorthand } from '../../../api/shared'

const barcodeOptions = {
  width: 2,
  height: 100,
  format: "CODE128",
  displayValue: true,
  fontOptions: "",
  font: "receipt, monospace",
  textAlign: "center",
  textPosition: "top",
  textMargin: 6,
  fontSize: 30,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: 10,
  marginBottom: 35,
  marginLeft: undefined,
  marginRight: undefined
}

export default class extends React.Component {

  componentDidMount() {
    const containers = document.querySelectorAll(".barcode-container")
    containers.forEach( container => {
      const idea = container.getAttribute("data-idea")
      const parent = container.querySelectorAll("svg > g")[0]
      const otherText = parent.querySelector("text")
      const transformY = parseInt(parent.getAttribute("transform").match(/\d+/g)[1])
      const offsetY = transformY - barcodeOptions.marginTop
      /*let textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const item = this.props.data.find( item => generateShorthand(item.title) === idea)
      textNode.innerHTML = item.title.toUpperCase()
      textNode.setAttribute("style","font: 20px receipt, monospace")
      textNode.setAttribute("text-anchor", "middle")
      textNode.setAttribute("x",otherText.getAttribute("x"))
      textNode.setAttribute("y", 160 - offsetY)
      console.log(textNode)
      parent.appendChild(textNode)
      */
  
    })
  }

  collisionWarning(data) {
    if (!data) return null
    let words = []
    for ( let item of data) {
      for (let word of item.words) {
        if (word) {
          if (words.indexOf(word) > -1) {
            return <h1 style={{color:"red"}}> WORD COLLISION WARNING: {word}</h1>
          }
          words.push(word)
        }
      }
    }
    return null
  }

  renderBarcode(word) {
    {
      let shorthand = generateShorthand(word)
      if (word) {
        const code = generateCode(word)
        const fontSize = barcodeOptions.fontSize * (word.length > 15 ? 0.7 : 1)
        const textMargin = barcodeOptions.textMargin * (word.length > 15 ? 1 : 1)
        const marginTop = barcodeOptions.marginTop * (word.length > 15 ? 1.8 : 1)
        return <div
          key={code}
          onClick={event => this.props.onInput(code)}
          className="barcode-container"
          data-idea={shorthand}
        >
          <Barcode
            key={code}
            value={code}
            {...barcodeOptions}
            fontSize={fontSize}
            textMargin={textMargin}
            marginTop={marginTop}
            text={word}
          />
        </div>
      }
    }
  }

  listItems() {
    const props = this.props

    console.log(props)

    return props.data.map( item => {
      return <li key={item.title}>
        {/* <h3>{ item.title }</h3> */}
        {this.renderBarcode(item.code)}
      </li>
    })
  }

  render() {
    return <div>
      { /* this.collisionWarning(this.props.data) */ }
      <p>Use mouse pointer to simulate code scanning</p>
      <ul className="barcodes-container">{ this.listItems() }</ul>
      </div>
  }
}

function findByShorthand(collection, shorthand) {
  for (let c of collection) {
    if (generateShorthand(c) === shorthand) {
      return c
    }
  }
}