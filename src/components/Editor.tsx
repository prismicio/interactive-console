'use strict';

import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as Codemirror from 'react-codemirror';
import { Prismic } from 'prismic.io';

import { SNIPPETS } from '../snippets';
import { SnippetsComponent } from './Snippets';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

interface EditorProps {
  endpoint: string
}
interface EditorState {
  code: string
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      code: "api.query('').then(function(response) {\n"
         + "   PrismicConsole.display(response.results);\n"
         + "});"
    }
  }

  updateCode(newCode: string) {
    this.setState({
      code: newCode
    });
  }

  onSnippetClick(newCode: string) {
    this.updateCode(newCode);
  }

  fullCode() {
    return `PrismicConsole.prismic.api('${this.props.endpoint}').then(function(api) {\
  return ${this.state.code}\
});`;
  }

  run() {
    eval(this.fullCode());
  }

  render() {
    return (<div>
      <div className="prismic-editor">
        <Codemirror
          value={this.state.code}
          onChange={this.updateCode.bind(this)}
          options={{
            lineNumbers: true
          }}
        />
        <SnippetsComponent snippets={SNIPPETS} onClick={this.onSnippetClick.bind(this)}/>
      </div>
      <input type='submit' onClick={this.run.bind(this)}/>
    </div>);
  }

}
