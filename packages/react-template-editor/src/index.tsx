import * as React from 'react';
import { TemplateEditor } from '@template-editor/native';
import { IProps, IImperativeHandles } from './index.d';


const Editor: React.RefForwardingComponent<IImperativeHandles, IProps> = (props, ref) => {
  const {
    value = '',
    style,
    disabled,
    placeholder,
    placeholders,
    createReplacementNode,
    onChange,
    ...rest } = props;
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [editor, setEditorInstance] = React.useState<TemplateEditor>();

  // componentDidMount
  React.useEffect(() => {
    setEditorInstance(new TemplateEditor(editorRef.current!, {
      initialValue: value,
      disabled,
      placeholder,
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


  // when placeholder changed
  React.useEffect(() => {
    editor && editor.instance.setOption('placeholder', placeholder);
  }, [props.placeholder]);


  // when disabled changed
  React.useEffect(() => {
    editor && editor.instance.setOption('readOnly', disabled ? 'nocursor' : false);
  }, [props.disabled]);

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
    <div ref={editorRef} style={{ border: '1px solid #d9d9d9', borderRadius: 2, ...style }} {...rest}></div>
  );
};

export const ReactTemplateEditor = React.forwardRef(Editor);
