import React, { Component } from "react";
import {sentenceTitles} from '../../../config.js';

export default function(props) {
  console.log(props)
  const p = props.textParts
  if (!p) return null

  return <div className="printout">
    <p style={{textAlign: "center"}}>
      {p.first}<br/>
      {p.second}<br/>
      {p.third}
    </p>
    <p>{sentenceTitles[1]}</p><p>{p[1]}</p>
    <p>{sentenceTitles[2]}</p><p>{p[2]}</p>
    <p>{sentenceTitles[3]}</p><p>{p[3]}</p>
    <p>{sentenceTitles[4]}</p><p>{p[4]}</p>
    <p>{sentenceTitles[5]}</p><p>{p[5]}</p>
    <p style={{textAlign: "center"}}>
      {p.nexttolast}<br/>
      {p.last}
    </p>
  </div>
}