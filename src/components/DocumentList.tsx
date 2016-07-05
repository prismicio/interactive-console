import * as React from 'react';
import { Prismic } from 'prismic.io';

import { Doc } from './Doc';

interface LinkResolverFunc {
  (doc: any): string;
}

interface DocumentListProps {
  loading: boolean,
  docs: Array<any>
}

interface DocumentListState {
  currentIndex: number
}

class DocumentList extends React.Component<DocumentListProps, DocumentListState> {

  constructor(props: DocumentListProps) {
    super(props);
    this.state = {
      currentIndex: (this.props.docs.length === 1) ? 0 : -1
    };
  }

  componentWillReceiveProps(nextProps: DocumentListProps) {
    this.setState({
      currentIndex: (nextProps.docs.length === 1) ? 0 : -1
    })
  }

  render() {
    if (this.props.loading) {
      return (<div>Loading...</div>);
    }
    if (this.props.docs.length === 0) {
      return (<div>No result!</div>);
    }
    return (<ul>
      {this.props.docs.map((doc: any, idx: number) => {
        return (<Doc onClick={() => { this.setState({currentIndex: idx})}} key={doc.id} doc={doc} collapsed={idx !== this.state.currentIndex}/>);
      })}
    </ul>);
  }

}

export default DocumentList;
