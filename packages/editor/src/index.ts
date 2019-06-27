import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import { defineMode } from './mode';
import { IEditorOption } from './index.d';


export class TemplateEditor {

  public instance!: CodeMirror.Editor;

  constructor(container: HTMLElement, options: IEditorOption) {

    const mode = defineMode({
      mappings: options.mappings
    });

    this.instance = CodeMirror(container, {
      value: options.value,
      mode
    });

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

    document.eachLine(line => {
      const tokens = this.instance.getLineTokens((line as any).lineNo());
      tokens.forEach(token => {
        if (token && token.type && token.state && token.state.mapping) {

          const line = token.state.line;
          const startPos = { line, ch: token.start };
          const endPos = { line, ch: token.end };

          const mapping = token.state.mapping;

          const text = mapping && mapping.hasOwnProperty('text') ?
            (typeof mapping.text === 'string' ? mapping.text : mapping.text(token.string)) : token.string;
          const className = mapping && mapping.hasOwnProperty('className') ? mapping.className : 'cm-variable';
          const tooltip = mapping && mapping.tooltip ?
            (typeof mapping.tooltip === 'string' ? mapping.tooltip : mapping.tooltip(token.string)) : undefined;

          document.markText(startPos, endPos, {
            replacedWith: createSpanReplacementNode(text, className, tooltip)
          });
        }
      });
    });
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
