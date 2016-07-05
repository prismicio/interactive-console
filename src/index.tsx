'use strict';

import * as React from "react";
import * as ReactDOM from 'react-dom';
import { Prismic } from 'prismic.io';

import Editor from './components/Editor';
import DocumentList from './components/DocumentList';
import { SNIPPETS } from './snippets';

import './css/main.css'

interface HomeProps {
  endpoint: string
}

interface HomeState {
  docs: Array<any>
}

class Home extends React.Component<HomeProps, HomeState> {

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      docs: []
    };
  }

  setDocs(docs: Array<any>) {
    this.setState({
      docs: docs
    })
  }

  render() {
    return (<div>
      Endpoint: <a href={this.props.endpoint}>{this.props.endpoint}</a>
      <Editor endpoint={this.props.endpoint}/>
      <DocumentList docs={this.state.docs}/>
    </div>);
  }

}

let home: any = null;

export function init(element: any, options: any) {
  home = ReactDOM.render(<Home endpoint={options.endpoint} />, element);
  return home;
}

export function display(docs: any) {
  if (!docs) {
    docs = [];
  } else if (docs.constructor !== Array) {
    docs = [docs];
  }
  home.setDocs(docs);
}

export const prismic = Prismic;
