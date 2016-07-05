import * as React from "react";
import * as ReactDOM from 'react-dom';

interface SnippetSelectorProps {
  key: string,
  values: Array<string>
}

class SnippetSelector extends React.Component<Sni, {}> {

}

interface SnippetProps {
  title: string;
  template: string;
  onClick: { (code: string): void };
  variables?: Object;
}

class Snippet extends React.Component<SnippetProps, {}> {

  code() {
    return this.props.template
  }

  onclick(e: any) {
    this.props.onClick(this.code());
  }

  render() {
    let title: any;
    if (this.props.variables) {
      let selector = Object.keys(this.props.variables).map((key: string) => {
        <
      });
      title = (<h4>
        {this.props.title}
      </h4>);
    } else {
      title = (<h4>{this.props.title}</h4>);
    }
    return (
      <div onClick={this.onclick.bind(this)}>
        {title}
        <pre>{this.props.template}</pre>
      </div>
    );
  }

}

// ====

interface SnippetsProps {
  onClick: { (code: string): void };
  docIds: Array<string>;
}

export class Snippets extends React.Component<SnippetsProps, {}> {

  render() {
    return (<div>
      <Snippet
        onClick={this.props.onClick}
        title='All documents'
        template="api.query('').then(function(response) {\n   PrismicConsole.display(response.results);\n});"/>
      <Snippet
        onClick={this.props.onClick}
        title='By ID'
        template="api.getByID('<docid>').then(function(doc) {\n   PrismicConsole.display(doc);\n});"
        variables={{docid: this.props.docIds}}
        />
    </div>);
  }

}
/*
  {
    label: 'All documents',
    code: "api.query('').then(function(response) {\n   PrismicConsole.display(response.results);\n});"
  },
  {
    label: 'By ID',
    code: "api.getByID('<docid>').then(function(doc) {\n   PrismicConsole.display(doc);\n});"
  }
  */
