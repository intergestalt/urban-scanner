import React, { Component } from "react";
import {sentenceTitles} from '../../../config.js';

import Form from "react-jsonschema-form";

const keywords = [
  "orstspezifisch",
  "transdisziplinär",
  "künstlerisch",
  "politisch",
  "imaginär",
  "Gestaltung",
  "Verknüpfung",
  "Interaktion",
  "Inklusion",
  "Zukunft"
].map(w => w.toUpperCase())

const schema = {
  properties: {
    intro1: {
      title: "Überschrift",
      type: "string"
    },
    intro2: {
      title: "Intro Text",
      type: "string"
    },
    fictions: {
      title: "Exponate",
      type: "array",
      items: {
        type: "object",
        title: "Exponat",
        required: ["title", "text"],
        properties: {
          title: {
            "title": "Name des Exponats",
            "type": "string", 
          },
          code: {
            "title": "Name des Exponats zur Codegenerierung",
            "description": "Erscheint auf dem Barcode. Bei Änderung ändert sich der Barcode und muss neu ausgedruckt werden",
            "type": "string",
          },
          text: {
            "title": "Text",
            "type": "string",
          },
          words: {
            "type": "array",
            "title": "Stichworte für Algorithmus (Ein Wort pro Feld & immer exakt gleiche Schreibweise verwenden!)",
            "description": "Auswahl: " + keywords.join(", "),
            "minItems": 1,
            "maxItems": 10,
            "items": {
              "type": "string",
            }
          },
          /* active: {
            type: "boolean", 
            title: "Aktiviert?", 
            default: true
          } */
        }
      }    
    },
    mid: {
      title: "Text zwischen Exponaten und Persönlichkeit",
      type: "string"
    },
    personalities: {
      title: "Persönlichkeitstypen",
      type: "array",
      items: {
        type: "object",
        title: "Persönlichkeit",
        required: ["title", "text"],
        properties: {
          title: {
            "title": "Bezeichnung des Persönlichkeitstyps",
            "type": "string",
          },
          text: {
            "title": "Text",
            "type": "string",
          },
          words: {
            "type": "array",
            "title": "Stichworte für Algorithmus (Ein Wort pro Feld & immer exakt gleiche Schreibweise verwenden!)",
            "description": "Auswahl: " + keywords.join(", "),
            "minItems": 1,
            "maxItems": 10,
            "items": {
              "type": "string",
            }
          },
          /* active: {
            type: "boolean", 
            title: "Aktiviert?", 
            default: true
          } */
        }
      }
    },
    end: {
      title: "Schlusstext",
      type: "string"
    },
    coordinates: {
      title: "Koordinaten",
      type: "string"
    },
  }
};

const UISchema = {
  intro2: {
    "ui:widget": "textarea",
  },
  fictions: {
    "ui:options": {
      "orderable": false,
    },
    items: {
      title: {
        classNames: "foo",
      },
      text: {
        "ui:widget": "textarea",
      },
      words: {
        classNames: "bar",
        "ui:options": {
          "addable": true,
          "orderable": false,
          "removable": true
        },
      },
    }
  },
  mid: {
    "ui:widget": "textarea",
  },
  personalities: {
    "ui:options": {
      "orderable": false,
    },
    items: {
      title: {
        classNames: "foo",
      },
      text: {
        "ui:widget": "textarea",
      },
      words: {
        classNames: "bar",
        "ui:options": {
          "addable": true,
          "orderable": false,
          "removable": true
        },
      },
    }
  },
  end: {
    "ui:widget": "textarea",
  },
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