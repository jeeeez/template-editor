import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactTemplateEditor } from './react-template-editor';

// const variables = [{ id: 123, name: 'nickname' },{ id: 124, name: 'age' }];

// const placeholders = [
//   {
//     type: 'variable',
//     matchRegexp: /^\{\{(\d+)\}\}/,
//     className: 'cm-keyword',
//     text(value) {
//       const variable = variables.find(item => String(item.id) === value);
//       return variable ? variable.name : 'Unknown Variable';
//     }
//   }
// ];

const DefaultPlaceholders = [{
  type: 'variable',
  matchRegexp: /^\{\{(123)\}\}/,
  className: 'cm-keyword',
  text: 'nickname'
}];

function ReactTemplateEditorWrapper() {
  const [editorRefObj] = React.useState({ editorRef: null });
  const [value] = React.useState('{{123}} {{124}}');
  const [placeholders] = React.useState(DefaultPlaceholders);

  React.useEffect(() => {
    setTimeout(() => {
      DefaultPlaceholders.push({
        type: 'variable',
        matchRegexp: /^\{\{(124)\}\}/,
        className: 'cm-keyword',
        text: 'age'
      });
      editorRefObj.editorRef.forceUpdateEditor();
    }, 2000);
  }, []);

  return (
    <ReactTemplateEditor
      ref={r => editorRefObj.editorRef = r}
      value={value}
      placeholders={placeholders}
    />);
}

ReactDOM.render(<ReactTemplateEditorWrapper />, document.getElementById('editor'));
