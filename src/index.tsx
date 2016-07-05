'use strict';

import * as React from "react";
import * as ReactDOM from 'react-dom';
import Editor from './Editor';
import { Prismic } from 'prismic.io';

export function init(element: any, options: any) {
  return ReactDOM.render(<Editor endpoint={options.endpoint}/>, element);
}

export function display(docs: any) {
}

export const prismic = Prismic;
