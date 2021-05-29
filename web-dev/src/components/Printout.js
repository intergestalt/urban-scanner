import React, { Component } from "react";
import {sentenceTitles} from '../../../config.js';

export default function(props) {
  console.log(props)
  const p = props.textParts
  if (!p) return null

  return <div className="printout">
    <p style={{textAlign: "left"}}>
      <b>{p.intro1}</b><br/>
      {p.intro2}<br /><br />
      <b>{p.fiction1Title}</b><br />
      {p.fiction1Text}<br /><br />
      <b>{p.fiction2Title}</b><br />
      {p.fiction2Text}<br /><br />
      <b>{p.fiction3Title}</b><br />
      {p.fiction3Text}<br /><br />
    </p>
    <p>
      {p.mid}<br />
    </p>
    <p>
      <b>{p.personalityTitle}</b><br />
      {p.personalityText}<br />
    </p>
    <p>
      {p.end}<br /><br />
    </p>
    <p>
      {p.date} {p.coordinates}<br />
    </p>
  </div>
}