import React, { Component } from "react";
import {sentenceTitles} from '../../../config.js';

export default function(props) {
  console.log(props)
  const p = props.textParts
  if (!p) return null

  return <div className="printout">
    <p>{p.timeString}</p>
    <p><b>{sentenceTitles[1]}</b><br />{p[1]}</p>
    <p><b>{sentenceTitles[2]}</b><br />{p[2]}</p>
    <p><b>{sentenceTitles[3]}</b><br />{p[3]}</p>
    <p><b>{sentenceTitles[4]}</b><br />{p[4]}</p>
    <p><b>{sentenceTitles[5]}</b><br />{p[5]}</p>
  </div>
}