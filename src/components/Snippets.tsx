import * as React from "react";
import * as ReactDOM from 'react-dom';

interface SnippetSelectorProps {
  key: string,
  values: Array<string>
}

class SnippetSelector extends React.Component<SnippetSelectorProps, {}> {

}

interface SnippetProps {
  title: string;
  template: string;
  onClick: { (code: string): void };
  variables?: { [label: string]: Array<any>; };
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
        return (<select>
        {this.props.variables[key].map((value: any) =>
            <option value={value}>{value}</option>
        )}
        </select>);
      });
      title = (<h4>
        {this.props.title}
        {selector}
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
        variables={{docid: this.props.docIds}}
        template="api.getByID('<docid>').then(function(doc) {\n   PrismicConsole.display(doc);\n});"
        />
    </div>);
  }

}
