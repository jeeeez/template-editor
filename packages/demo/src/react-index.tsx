import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactTemplateEditor } from '@template-editor/react';


const DefaultPlaceholders = [{
  type: 'variable',
  matchRegexp: /^\{\{(123)\}\}/,
  className: 'cm-keyword',
  text: 'nickname'
}];

function ReactTemplateEditorWrapper() {
  const editorRefObj = React.useRef<typeof ReactTemplateEditor>(null);
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
      // console.log(editorRefObj.current);

      editorRefObj.current!.forceUpdateEditor();
    }, 2000);
  }, []);


  return (
    <ReactTemplateEditor
      ref={editorRefObj}
      value={value}
      placeholders={placeholders}
      className='editor-instance'
    />);
}

ReactDOM.render(<ReactTemplateEditorWrapper />, document.getElementById('editor'));
