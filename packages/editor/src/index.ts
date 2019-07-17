import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import { defineMode } from './mode';
import { IEditorOption } from './index.d';


export class TemplateEditor {

  public instance!: CodeMirror.Editor;

  constructor(container: HTMLElement, options: IEditorOption) {

    const mode = defineMode({
      placeholders: options.placeholders
    });

    this.instance = CodeMirror(container, {
      value: options.initialValue,
      mode
    });

    // 初始化时需要Mark一次变量
    this.replaceVariables();
    this.listenContentChange();
  }

  private listenContentChange() {
    this.instance.on('change', () => {
      this.replaceVariables();
    });
  }

  private replaceVariables() {
    const document = this.instance.getDoc();
    document.getAllMarks().forEach(mark => {
      mark.clear();
    });

    this.getTokens().forEach(token => {
      if (token && token.type && token.state && token.state.placeholder) {

        const line = token.state.line;
        const startPos = { line, ch: token.start };
        const endPos = { line, ch: token.end };

        const placeholder = token.state.placeholder;
        const matchedPlaceholderValue = token.state.matchedPlaceholderValue;

        const text = placeholder && placeholder.hasOwnProperty('text') ?
          (typeof placeholder.text === 'string' ? placeholder.text : placeholder.text(matchedPlaceholderValue)) : matchedPlaceholderValue;
        const className = placeholder && placeholder.hasOwnProperty('className') ? placeholder.className : 'cm-variable';
        const tooltip = placeholder && placeholder.tooltip ?
          (typeof placeholder.tooltip === 'string' ? placeholder.tooltip : placeholder.tooltip(matchedPlaceholderValue)) : undefined;

        document.markText(startPos, endPos, {
          replacedWith: createSpanReplacementNode(text, className, tooltip)
        });
      }
    });
  }

  public getTokens() {
    const tokens: CodeMirror.Token[] = [];
    const document = this.instance.getDoc();
    document.eachLine(line => {
      const lineTokens = this.instance.getLineTokens((line as any).lineNo());
      lineTokens.forEach(token => tokens.push(token));
    });
    return tokens;
  }

  public getValue() {
    return this.instance.getDoc().getValue();
  }

  public setValue(input: string) {
    this.instance.getDoc().setValue(input);
  }

  public onChange(change: (input: string) => any) {
    this.instance.on('change', () => {
      change(this.getValue());
    });
  }

  // public insert(input: string) {
  //   const document = this.instance.getDoc();
  //   const cursor = document.getCursor();
  //   document.replaceRange(input, cursor, cursor);
  // }
}


// 创建用以替换 token 的 Element
function createSpanReplacementNode(context: string, className: string, tooltip?: string) {
  const $span = document.createElement('span');
  $span.innerHTML = context;
  if (className) {
    $span.classList.add(className);
  }
  if (tooltip) {
    $span.setAttribute('data-editor-tooltip', tooltip);
  }
  return $span;
}
