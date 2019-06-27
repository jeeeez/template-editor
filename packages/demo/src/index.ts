import CodeMirror from 'codemirror';
import { TemplateEditor } from '../../editor/src/index';
// import { TemplateEditor } from '@shuyun-ep-team/template-editor';


const container = document.getElementById('editor')!;

let latestCursor: CodeMirror.Position;

const editor = new TemplateEditor(container, {
  value: '',
  mappings: [
    {
      type: 'variable',
      matchRegexp: /^nickname/,
      text: '昵称',
      className: 'cm-keyword',
      tooltip: '我叫王大锤'
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
      },
      tooltip(value) {
        return {
          ['#date#']: `获奖时间：${new Date()}`,
          ['#phoneNo#']: '手机号码：182xxxx1010',
          ['#Email#']: '电子邮箱：junfeng.li@shuyun.com',
        }[value] || '不识别的变量';
      }
    }]
});

// editor.onChange((input) => {
//   console.log(input);
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


container.addEventListener('mouseover', (evt) => {
  const tooltip = (evt.target as HTMLElement).getAttribute('data-editor-tooltip');
  if (tooltip) {
    console.log(tooltip);
  }
});
