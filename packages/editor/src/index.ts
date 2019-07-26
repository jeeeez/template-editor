import CodeMirror from 'codemirror';
// import 'codemirror/lib/codemirror.css';
require('codemirror/addon/scroll/simplescrollbars');
// import 'codemirror/addon/scroll/simplescrollbars.css';
import { defineMode } from './mode';
import { IEditorOptions } from './index.d';
import { createSpanReplacementNode } from './createSpanReplacementNode';
export { createSpanReplacementNode } from './createSpanReplacementNode';



export class TemplateEditor {

  public instance!: CodeMirror.Editor;

  constructor(container: HTMLElement, private options: IEditorOptions) {

    const mode = defineMode({
      placeholders: options.placeholders
    });

    const lineWrapping = 'lineWrapping' in options ? !!options.lineWrapping : true;

    this.instance = CodeMirror(container, {
      mode,
      lineWrapping,
      scrollbarStyle: 'simple',
      value: options.initialValue || ''
    });


    this.replaceVariables();
    this.listenContentChange();
  }

  private listenContentChange() {
    // if (!this.options.controlled) {
    //   this.instance.on('beforeChange', (_R, change) => {
    //     console.log(change,_R);
    //     change.cancel();
    //   });
    // }

    this.instance.on('change', () => {
      this.replaceVariables();
    });
  }

  private replaceVariables() {
    const { createReplacementNode } = this.options;

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
        const matchedValue = token.state.matchedValue;

        const replacedWith = createReplacementNode ?
          createReplacementNode(placeholder, matchedValue, token.string) :
          (() => {
            const text = placeholder && placeholder.hasOwnProperty('text') ?
              (typeof placeholder.text === 'string' ? placeholder.text : placeholder.text(matchedValue)) : matchedValue;
            const className = placeholder && placeholder.hasOwnProperty('className') ? placeholder.className : 'cm-variable';
            return createSpanReplacementNode(text, className);
          })();

        document.markText(startPos, endPos, {
          replacedWith
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
