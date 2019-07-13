import React, { Component } from "react";
import Barcode from 'react-barcode'
import { generateCode } from '../../../shared.js'

const barcodeOptions = {
  width: 2,
  height: 100,
  format: "CODE128",
  displayValue: true,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined
}

export default function(props) {
  console.log(props)

  const listItems =  props.data.map( item => {
    return <li key={item.title}>
      <h3>{ item.title }</h3>
      { item.words.map( word => {
        if (word) {
          const code = generateCode(word)
          return <div onClick={event => props.onInput(code)} className="barcode-container">
              <Barcode key={code} value={code} options={barcodeOptions} text={word} />
            </div>
        }
      }) }
    </li>
  })

  return <ul className="barcodes-container">{ listItems }</ul>
}