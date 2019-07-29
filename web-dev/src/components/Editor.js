import React, { Component } from "react";
import {sentenceTitles} from '../../../config.js';

import Form from "react-jsonschema-form";

const schema = {
  properties: {
    announcement: {
      title: "Ankündigung",
      type: "string"
    },
    fictions: {
      title: "Fiktionsdaten",
      type: "array",
      items: {
        type: "object",
        title: "Szenario",
        required: ["title"],
        properties: {
          title: {
            "title": "Name des Szenarios",
            "type": "string", 
          },
          words: {
            "type": "array",
            "title": "Begriffe",
            "minItems": 3,
            "maxItems": 3,
            "items": {
              "type": "string",
            }
          },
          sentences: {
            "type": "array",
            "title": "Sätze",
            "items": [ 
              {
                "title": sentenceTitles[1],
                "type": "string",
              },
              {
                "title": sentenceTitles[2],
                "type": "string",
              },
              {
                "title": sentenceTitles[3],
                "type": "string",
              },
              {
                "title": sentenceTitles[4],
                "type": "string",
              },
              {
                "title": sentenceTitles[5],
                "type": "string",
              },          
            ]
          },    
          /* active: {
            type: "boolean", 
            title: "Aktiviert?", 
            default: true
          } */
        }
      }    
    }
  }
};

const UISchema = {
  fictions: {
    "ui:options": {
      "orderable": false,
    },
    items: {
      title: {
        classNames: "foo",
      },    
      words: {
        classNames: "bar",
        "ui:options": {
          "addable": false,
          "orderable": false,
          "removable": false
        },
      },
      sentences: {
        "ui:options": {
          "addable": false,
          "orderable": false,
          "removable": false
        },
      }
    }
  }
}

const log = (type) => console.log.bind(console, type);

export default function(props) {
  return <Form 
        schema={schema}
        uiSchema={UISchema}
        formData={props.data}
        onChange={props.onChange}
        onSubmit={log("submitted")}
        onError={log("errors")} />
}