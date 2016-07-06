import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as Codemirror from 'react-codemirror';
import * as Prismic from 'prismic.io';

import { Snippets } from './Snippets';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

interface Dictionary<T> { [index: string]: T; }

interface EditorProps {
  endpoint: string,
  loading: {(): void},
}
interface EditorState {
  code?: string;
  bookmarks?: Dictionary<string>;
  types?: Dictionary<string>;
}

export default class Editor extends React.Component<EditorProps, EditorState> {

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      code: "api.query('').then(function(response) {\n"
         + "   PrismicConsole.display(response.results);\n"
         + "});"
    }
    Prismic.api(this.props.endpoint).then((api: PrismicIO.Api) => {
      // We need to revert bookmarks because we want the id as the key
      let bookmarks: Dictionary<string> = {};
      Object.keys(api.bookmarks).map((name) => {
        let id = api.bookmarks[name];
        bookmarks[id] = name;
      });
      this.setState({
        bookmarks: bookmarks,
        types: api.data.types
      });
    });
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
    this.props.loading();
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
        <Snippets onClick={this.onSnippetClick.bind(this)}
          docIds={this.state.bookmarks || {}}
          types={this.state.types || {}}
        />
      </div>
      <input type='submit' onClick={this.run.bind(this)}/>
    </div>);
  }

}
