'use strict';

import * as React from "react";
import * as ReactDOM from 'react-dom';
import Editor from './components/Editor';
import DocumentList from './DocumentList';
import { Prismic } from 'prismic.io';

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

export function display(docs: Array<any>) {
  console.log('Got that: ', docs);
  home.setDocs(docs);
}

export const prismic = Prismic;
