import * as React from 'react';

interface DocProps {
  doc: any,
  collapsed: boolean,
  onClick?: any
}

export class Doc extends React.Component<DocProps, {}> {

  renderCollapsed() {
    return (<li onClick={this.props.onClick} key={this.props.doc.id}>
          {this.props.doc.slug}
        </li>);
  }

  renderOpen() {
    return (<li onClick={this.props.onClick} key={this.props.doc.id}>
      {this.props.doc.slug}
      <dl>
        <dt>id</dt>
        <dd>{this.props.doc.id}</dd>
        <dt>slug</dt>
        <dd>{this.props.doc.slug}</dd>
      </dl>
    </li>);
  }

  render() {
    if (this.props.collapsed) {
      return this.renderCollapsed();
    } else {
      return this.renderOpen();
    }
  }

}
