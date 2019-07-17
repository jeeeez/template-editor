import * as React from 'react';
import Codemirror from 'codemirror';
// import { TemplateEditor, IPlaceholder } from '@shuyun-ep-team/template-editor';
import { TemplateEditor, IPlaceholder } from '../../editor/src/index';


interface IProps {
  initialValue: string;
  placeholders: IPlaceholder[];
  onChange?(value: string, tokens?: Codemirror.Token[]): void;
}


export class ReactTemplateEditor extends React.Component<IProps>{
  private $divRef = React.createRef<HTMLDivElement>();

  private editor!: TemplateEditor;

  public componentDidMount() {
    const { initialValue, placeholders, onChange } = this.props;
    this.editor = new TemplateEditor(this.$divRef.current, {
      initialValue,
      placeholders
    });

    this.editor.onChange((input) => {
      const tokens = this.editor.getTokens();
      onChange && onChange(input, tokens);
    });
  }

  public render() {
    return (
      <div ref={this.$divRef} style={{ height: 300 }}></div>
    );
  }
}
