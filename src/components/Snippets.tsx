import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from 'react-dom';

interface Dictionary<T> { [index: string]: T; }

interface SnippetSelectorProps {
  skey: string;
  values: Dictionary<string>;
  onChange: { (value: string): void };
}

class SnippetSelector extends React.Component<SnippetSelectorProps, {}> {

  change(event: any) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (<select onChange={this.change.bind(this)}>
      {Object.keys(this.props.values).map((key: string) =>
        <option key={key} value={key}>{this.props.values[key]}</option>
      )}
    </select>);
  }

}

interface SnippetProps {
  title: string;
  template: string;
  onClick: { (code: string): void };
  variable?: string;
  values?: Dictionary<string>;
}

interface SnippetState {
  selected: string;
}

class Snippet extends React.Component<SnippetProps, SnippetState> {

  constructor(props: SnippetProps) {
    super(props);
    if (props.values && Object.keys(props.values).length > 0) {
      this.state = {
        selected: Object.keys(props.values)[0]
      };
    } else {
      this.state = { selected: null };
    }
  }

  componentWillReceiveProps(nextProps: SnippetProps) {
    if (!this.state.selected && nextProps.values && Object.keys(nextProps.values).length > 0) {
      this.setState({
        selected: Object.keys(nextProps.values)[0]
      });
    }
  }

  code() {
    let result = this.props.template;
    if (this.state.selected) {
      result = result.replace(this.props.variable, this.state.selected);
    }
    return result;
  }

  onclick(e: any) {
    this.props.onClick(this.code());
  }

  onVariableChange(value: string) {
    this.setState({
      selected: value
    });
  }

  render() {
    let title: any;
    const code = this.code();
    if (this.props.variable && this.props.values) {
      title = (<h4>
        {this.props.title}
        <SnippetSelector
          onChange={this.onVariableChange.bind(this)}
          key={this.props.variable}
          skey={this.props.variable}
          values={this.props.values}/>
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
  docIds: Dictionary<string>;
  types: Dictionary<string>;
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
        variable="<docid>"
        values={this.props.docIds}
        template="api.getByID('<docid>').then(function(doc) {\n   PrismicConsole.display(doc);\n});"
        />
      <Snippet
        onClick={this.props.onClick}
        title='By type'
        variable="<type>"
        values={this.props.types}
        template="api.query(Prismic.Predicates.at('document.type', '<type>'))\n   .then(function(res) {\n      PrismicConsole.display(res.results);\n   });"
        />
    </div>);
  }

}
