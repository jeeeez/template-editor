import CodeMirror from 'codemirror';
import { TemplateEditor } from '../../editor/src/index';
// import { IPlaceholder } from '../../editor/src/index.d';
import { createSpanReplacementNode } from '../../editor/src/createSpanReplacementNode';



const container = document.getElementById('editor')!;

let latestCursor: CodeMirror.Position;

const editor = new TemplateEditor(container, {
  initialValue: '',
  createReplacementNode(placeholder, value) {
    const text = typeof placeholder.text === 'function' ? placeholder.text(value) : placeholder.text;
    console.log(text);

    return createSpanReplacementNode(text + 1, placeholder.className);
  },
  placeholders: [
    {
      type: 'variable',
      matchRegexp: /^nickname/,
      text: '昵称',
      className: 'cm-keyword'
    },
    {
      type: 'variable',
      matchRegexp: /^#(\w|\d)+#/,
      className: 'cm-keyword',
      text(value) {
        return {
          ['#date#']: '获奖时间',
          ['#phoneNo#']: '手机号码',
          ['#Email#']: '电子邮箱',
        }[value] || 'Unknown Variable';
      }
    }]
});

// editor.onChange((input) => {
//   console.log(input);
//   console.log(editor.getTokens());
// });

editor.instance.focus();

editor.instance.on('blur', () => {
  latestCursor = editor.instance.getDoc().getCursor();
});

document.querySelectorAll('.btn-variable').forEach(btnVariable => {
  btnVariable.addEventListener('click', () => {
    const variable = btnVariable.getAttribute('data-variable');
    if (latestCursor) {
      editor.instance.getDoc().replaceRange(variable, latestCursor, latestCursor);
      latestCursor.ch += variable.length + 1;
      editor.instance.focus();
    }
  });
});


