import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from 'react-dom';

interface Dictionary<T> {
  [index: string]: T;
}

interface SnippetSelectorProps {
  skey: string;
  values: Array<string>;
  onChange: { (key: string, value: string): void };
}

class SnippetSelector extends React.Component<SnippetSelectorProps, {}> {

  change(event: any) {
    this.props.onChange(this.props.skey, event.target.value);
  }

  render() {
    return (<select onChange={this.change.bind(this)}>
      {this.props.values.map((value: any) =>
        <option key={value} value={value}>{value}</option>
      )}
    </select>);
  }

}

interface SnippetProps {
  title: string;
  template: string;
  onClick: { (code: string): void };
  variables?: Dictionary<string[]>;
}

interface SnippetState {
  selectorValues: Dictionary<string>;
}

function headsOnly(input: Dictionary<string[]>): Dictionary<string> {
  let result: Dictionary<string> = {};
  Object.keys(input).map((key) => {
    result[key] = input[key][0];
  });
  return result;
}

class Snippet extends React.Component<SnippetProps, SnippetState> {

  constructor(props: SnippetProps) {
    super(props);
    this.state = {
      selectorValues: props.variables ? headsOnly(props.variables): {}
    };
  }

  componentWillReceiveProps(nextProps: SnippetProps) {
    this.setState({
      selectorValues: nextProps.variables ? headsOnly(nextProps.variables): {}
    });
  }

  code() {
    let result = this.props.template;
    if (this.state && this.state.selectorValues) {
      Object.keys(this.state.selectorValues).map((key) => {
        result = result.replace(`<${key}>`, this.state.selectorValues[key]);
      });
    }
    return result;
  }

  onclick(e: any) {
    this.props.onClick(this.code());
  }

  onVariableChange(key: string, value: string) {
    let sValues: { [label: string]: string; } = _.clone(this.state.selectorValues);
    sValues[key] = value;
    this.setState({
      selectorValues: sValues
    });
  }

  render() {
    let title: any;
    const code = this.code();
    if (this.props.variables) {
      let selector = Object.keys(this.props.variables).map((key: string) =>
        <SnippetSelector onChange={this.onVariableChange.bind(this)} key={key} skey={key} values={this.props.variables[key]}/>
      );
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
        <pre>{code}</pre>
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
