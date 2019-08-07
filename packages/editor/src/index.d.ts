import CodeMirror from 'codemirror';

export interface IPlaceholder {
  matchRegexp: RegExp;
  consumeRegexp?: RegExp;
  type: string;
  text?: string | ((v: string) => string);
  className?: string;
}


export interface IEditorOptions {
  initialValue: string;
  placeholder?: string;
  placeholders: IPlaceholder[];
  lineWrapping?: boolean;
  disabled?: boolean;
  createReplacementNode?(placeholder: IPlaceholder, value?: string, input?: string): HTMLSpanElement;
}

declare class TemplateEditor {
  constructor(container: HTMLElement, options: IEditorOptions);

  public instance: CodeMirror.Editor;

  public getTokens(): CodeMirror.Token[];

  public getValue(): string;

  public setValue(value: string): void;

  public onChange(change: (input: string) => any): void;
}
