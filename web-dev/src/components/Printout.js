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
    <p><b>{sentenceTitles[1]}</b></p><p>{p[1]}</p>
    <p><b>{sentenceTitles[2]}</b></p><p>{p[2]}</p>
    <p><b>{sentenceTitles[3]}</b></p><p>{p[3]}</p>
    <p><b>{sentenceTitles[4]}</b></p><p>{p[4]}</p>
    <p><b>{sentenceTitles[5]}</b></p><p>{p[5]}</p>
    <p style={{textAlign: "center"}}>
      {p.nexttolast}<br/>
      {p.last}
    </p>
    <p>
      {p.announcement}
    </p>
  </div>
}