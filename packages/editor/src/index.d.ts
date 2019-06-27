import CodeMirror from 'codemirror';

export interface IMapping {
  matchRegexp: RegExp;
  consumeRegexp?: RegExp;
  type: string;
  text?: string;
  className?: string;
  tooltip?: string;
}


export interface IEditorOption {
  mappings: IMapping[];
}

declare class TemplateEditor {
  constructor(container: HTMLElement, options: IEditorOption);

  public instance: CodeMirror.Editor;

  public getValue(): string;

  public setValue(value: string): void;

  public onChange(change: (input: string) => any): void;
}
