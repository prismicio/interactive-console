'use strict';

import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as Codemirror from 'react-codemirror';
import { Prismic } from 'prismic.io';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

interface EditorProps {
  endpoint: string
}
interface EditorState {
  api?: any,
  code?: string
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      code: "api.query('').then(function(results) {\n"
         + "   console.log('Results: ', results);\n"
         + "});"
    }
  }

  componentDidMount() {
    Prismic.api(this.props.endpoint).then((api: any) => this.setState({api: api}));
  }

  updateCode(newCode: string) {
    this.setState({
      code: newCode
    });
  }

  fullCode() {
    return 'PrismicConsole.prismic.api("' + this.props.endpoint + '").then(function(api) {'
      + 'return ' + this.state.code
      + '});';
  }

  run() {
    console.log(this.fullCode());
    eval(this.fullCode());
  }

  render() {
    if (!this.state.api) {
      return (<div>Loading...</div>);
    }
    return (<div>
      <Codemirror
        value={this.state.code}
        onChange={this.updateCode.bind(this)}
        options={{
          lineNumbers: true
        }}
      />
      <input type='submit' onClick={this.run.bind(this)}/>
    </div>);
  }

}
