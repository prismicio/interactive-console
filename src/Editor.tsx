'use strict';

import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';

import 'codemirror/lib/codemirror.css';

interface EditorProps {}
interface EditorState {
  code: string
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      code: 'function(api) { /* stuff */ }'
    }
  }

  updateCode(newCode: string) {
    this.setState({
      code: newCode
    });
  }

  render() {
    return (<Codemirror
      value={this.state.code}
      onChange={this.updateCode.bind(this)}
      options={{
        lineNumbers: true
      }}
    />);
  }

}
