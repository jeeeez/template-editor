import CodeMirror from 'codemirror';

type IStringFnc = (v: string) => string;

export interface IMapping {
  matchRegexp: RegExp;
  consumeRegexp?: RegExp;
  type: string;
  text?: string | IStringFnc;
  className?: string;
  tooltip?: string | IStringFnc;
}


export interface IEditorOption {
  value: string;
  mappings: IMapping[];
}

declare class TemplateEditor {
  constructor(container: HTMLElement, options: IEditorOption);

  public instance: CodeMirror.Editor;

  public getValue(): string;

  public setValue(value: string): void;

  public onChange(change: (input: string) => any): void;
}
