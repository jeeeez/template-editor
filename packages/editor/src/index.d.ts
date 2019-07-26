import CodeMirror from 'codemirror';

type IStringFnc = (v: string) => string;

export interface IPlaceholder {
  matchRegexp: RegExp;
  consumeRegexp?: RegExp;
  type: string;
  text?: string | IStringFnc;
  className?: string;
}


export interface IEditorOption {
  controlled?: boolean;
  initialValue: string;
  placeholders: IPlaceholder[];
  lineWrapping?: boolean;
  createReplacementNode?(placeholder: IPlaceholder, value?: string, input?: string): HTMLSpanElement;
}

declare class TemplateEditor {
  constructor(container: HTMLElement, options: IEditorOption);

  public instance: CodeMirror.Editor;

  public getTokens(): CodeMirror.Token[];

  public getValue(): string;

  public setValue(value: string): void;

  public onChange(change: (input: string) => any): void;
}
