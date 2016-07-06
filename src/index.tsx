import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as Prismic from 'prismic.io';

import Editor from './components/Editor';
import DocumentList from './components/DocumentList';
import { SNIPPETS } from './snippets';

import './css/main.css'

interface HomeProps {
  endpoint: string
}

interface HomeState {
  loading: boolean,
  docs: Array<any>
}

class Home extends React.Component<HomeProps, HomeState> {

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      loading: false,
      docs: []
    };
  }

  setDocs(docs: Array<any>) {
    this.setState({
      loading: false,
      docs: docs
    });
  }

  loading() {
    this.setState({
      loading: true,
      docs: []
    });
  }

  render() {
    return (<div>
      Endpoint: <a href={this.props.endpoint}>{this.props.endpoint}</a>
      <Editor endpoint={this.props.endpoint} loading={this.loading.bind(this)}/>
      <DocumentList docs={this.state.docs} loading={this.state.loading}/>
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
