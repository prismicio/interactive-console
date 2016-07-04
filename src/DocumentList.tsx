import * as React from 'react';
import { Prismic } from 'prismic.io';

interface LinkResolverFunc {
  (doc: any): string;
}

export interface DocumentListProps {
  endpoint: string,
  linkResolver: LinkResolverFunc,
  docs: Array<any>
}

class DocumentList extends React.Component<DocumentListProps, {}> {
  render() {
    return (<ul>
      {this.props.docs.map((doc: any) => {
        return (<li key={doc.id}>
          {doc.slug}
        </li>);
      })}
    </ul>);
  }
}

export interface DocumentListContainerProps {
  api: any
  endpoint: string,
  accesstoken?: string,
  linkResolver: LinkResolverFunc,
  q?: string // Prismic query
}

export interface DocumentListContainerState {
  docs: Array<any>
}

class DocumentListContainer extends React.Component<DocumentListContainerProps, DocumentListContainerState> {

  constructor(props: DocumentListContainerProps) {
    super(props);
    this.state = { docs: [] };
  }

  componentDidMount() {
    console.log("component will mount!");
    this.props.api.form('everything').ref(this.props.api.master()).submit((err: any, res: any) => {
      this.setState({docs: res.results});
    });
  }

  render() {
    console.log("Render doclistcont");
    return <DocumentList endpoint={this.props.endpoint} docs={this.state.docs} linkResolver={this.props.linkResolver} />;
  }

}

export default DocumentListContainer;
