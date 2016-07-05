'use strict';

import * as React from "react";
import * as ReactDOM from 'react-dom';

import { Snippet } from '../snippets';

interface SnippetsProps {
  snippets: Array<Snippet>,
  onClick: { (code: string): void }
}

interface SnippetsState {}

export class SnippetsComponent extends React.Component<SnippetsProps, SnippetsState> {

  onclick(e: any) {
    this.props.onClick(e.target.dataset.code);
  }

  render() {
    return (<ul>
      {
        this.props.snippets.map((snippet) => {
          return (<li key={snippet.label} data-code={snippet.code} onClick={this.onclick.bind(this)}>{snippet.label}</li>)
        })
      }
    </ul>);
  }

}
