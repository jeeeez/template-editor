import CodeMirror from 'codemirror';

type IStringFnc = (v: string) => string;

export interface IPlaceholder {
  matchRegexp: RegExp;
  consumeRegexp?: RegExp;
  type: string;
  text?: string | IStringFnc;
  className?: string;
  tooltip?: string | IStringFnc;
}


export interface IEditorOption {
  initialValue: string;
  placeholders: IPlaceholder[];
}

declare class TemplateEditor {
  constructor(container: HTMLElement, options: IEditorOption);

  public instance: CodeMirror.Editor;

  public getTokens(): CodeMirror.Token[];

  public getValue(): string;

  public setValue(value: string): void;

  public onChange(change: (input: string) => any): void;
}
