import * as React from 'react';
import { TemplateEditor } from '@template-editor/native';
import { IProps, ReactTemplateEditor as IReactTemplateEditor } from './index.d';



export const ReactTemplateEditor: IReactTemplateEditor = React.forwardRef(function ReactTemplateEditor(props: IProps, ref) {
  const { value = '', placeholders, createReplacementNode, onChange, ...rest } = props;
  const [editorRef] = React.useState(React.createRef<HTMLDivElement>());
  // const editorRef = React.useRef<HTMLDivElement>(null);
  const [editor, setEditorInstance] = React.useState<TemplateEditor>();

  // componentDidMount
  React.useEffect(() => {
    setEditorInstance(new TemplateEditor(editorRef.current!, {
      initialValue: value,
      placeholders,
      createReplacementNode
    }));
  }, []);

  // add onchange listener
  React.useEffect(() => {
    if (onChange) {
      editor!.onChange((input) => {
        const tokens = editor!.getTokens();
        onChange(input, tokens);
      });
    }
  }, []);

  // when value changed
  React.useEffect(() => {
    editor && editor.setValue(props.value);
  }, [props.value]);


  // when other props changed, Codemirror need to re-parse
  React.useImperativeHandle(ref, () => ({
    forceUpdateEditor: () => {
      editor!.setValue(props.value + ' ');
      setTimeout(() => {
        editor!.setValue(props.value);
      }, 0);
    }
  }));

  return (
    <div ref={editorRef} {...rest}></div>
  );
});
