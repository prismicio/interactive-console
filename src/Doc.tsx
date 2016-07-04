import * as React from 'react';
import { Prismic } from 'prismic.io';

interface LinkResolverFunc {
  (doc: any): string;
}

export interface DocProps {
  endpoint: string,
  accesstoken?: string,
  linkResolver: LinkResolverFunc,
  params: any
}

export interface DocState {
  notFound?: boolean,
  doc?: any
}

class Doc extends React.Component<DocProps, DocState> {

  constructor(props: DocProps) {
    super(props);
    this.state = {
      notFound: false,
      doc: null
    };
  }

  componentDidMount() {
    Prismic.api(this.props.endpoint, this.props.accesstoken).then((api: any) => {
      return api.getByID(this.props.params['id'], {}, ((err: any, doc: any) => {
        if (doc) {
          this.setState({
            doc: doc
          });
        } else {
          this.setState({
            notFound: true
          });
        }
      }));
    });
  }

  render() {
    if (this.state.notFound) {
      return (<div>Document not found</div>);
    } else if (!this.state.doc) {
      return (<div>Loading...</div>);
    } else {
      return (
        <div dangerouslySetInnerHTML={{__html: this.state.doc.asHtml(this.props.linkResolver)}} />
      );
    }
  }

}

export default Doc;
