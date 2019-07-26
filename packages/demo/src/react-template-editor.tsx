import * as React from 'react';
import Codemirror from 'codemirror';
// import { TemplateEditor, IPlaceholder } from '@shuyun-ep-team/template-editor';
import { TemplateEditor } from '../../editor/src';
import { IPlaceholder } from '../../editor/src/index.d';
import { createSpanReplacementNode } from '../../editor/src/createSpanReplacementNode';


interface IProps {
  componentRef?: React.RefObject<ReactTemplateEditor>;
  value: string;
  placeholders: IPlaceholder[];
  onChange?(value: string, tokens?: Codemirror.Token[]): void;
}


export class ReactTemplateEditor extends React.Component<IProps>{
  private $divRef = React.createRef<HTMLDivElement>();

  private editor!: TemplateEditor;

  public componentDidMount() {
    const { value, placeholders, onChange } = this.props;
    this.editor = new TemplateEditor(this.$divRef.current, {
      initialValue: value,
      placeholders,
      createReplacementNode(placeholder, value) {
        const text = typeof placeholder.text === 'function' ? placeholder.text(value) : placeholder.text;
        return createSpanReplacementNode(text, placeholder.className);
      },
    });

    this.editor.onChange((input) => {
      const tokens = this.editor.getTokens();
      onChange && onChange(input, tokens);
    });
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.value !== this.props.value) {
      this.editor.setValue(nextProps.value);
    }
  }

  public forceUpdateEditor() {
    this.editor.setValue(this.props.value + ' ');
    setTimeout(() => {
      this.editor.setValue(this.props.value);
    }, 0);
  }

  public render() {
    return (
      <div ref={this.$divRef} style={{ height: 300 }}></div>
    );
  }
}
