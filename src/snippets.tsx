export interface Snippet {
  label: string,
  code: string
}

export const SNIPPETS: Array<Snippet> = [
  {
    label: 'All documents',
    code: "api.query('').then(function(response) {\n   PrismicConsole.display(response.results);\n});"
  },
  {
    label: 'By ID',
    code: "api.getByID('<docid>').then(function(doc) {\n   PrismicConsole.display(doc);\n});"
  }
]
