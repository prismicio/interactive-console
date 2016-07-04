'use strict';

import * as React from "react";
import * as ReactDOM from 'react-dom';
import { Prismic } from 'prismic.io';
import DocumentListContainer from './DocumentList';
import Doc from './Doc';
import * as Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

// Update these 2 constants to point to your repository
const endpoint = 'https://blogtemplate.prismic.io/api';
const accessToken: string = null;

// Also change the linkResolver if you change the URL scheme in the Router below
function linkResolver(doc: any) {
  return '/' + doc.type + '/' + doc.id;
}

interface HomeProps {
  endpoint: string
}

interface HomeState {
  code?: string,
  api?: any
}

class Home extends React.Component<HomeProps, HomeState> {

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      api: null,
      code: 'var foo = 3;'
    };
  }

  componentDidMount() {
    Prismic.api(this.props.endpoint).then((api: any) => this.setState({api: api}));
  }

  updateCode(newCode: string) {
    this.setState({
      code: newCode
    })
  }

  run() {
    eval(this.state.code);
  }

  render() {
    if (!this.state.api) {
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <Codemirror
          value={this.state.code}
          onChange={this.updateCode.bind(this)}
          options={{
            lineNumbers: true
          }}
          />
        <input type='submit' onClick={this.run.bind(this)}/>
        <DocumentListContainer
                api={this.state.api}
                endpoint={this.props.endpoint}
                accesstoken={accessToken}
                linkResolver={linkResolver}
            />
        </div>
    );
  }

}

function DocWrapper(props: any) {
  return <Doc params={props.params} endpoint={this.props.endpoint} accesstoken={accessToken} linkResolver={linkResolver} />;
}

function NoMatch(props: any) {
  return <div>Not found</div>;
}

export function init(element: any, options: any) {
  return ReactDOM.render(<Home endpoint={options.endpoint}/>, element);
}

export function display(docs: any) {

}
