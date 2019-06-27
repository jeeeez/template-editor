// import { TemplateEditor } from '../../editor/src/index';
import { TemplateEditor } from '@shuyun-ep-team/template-editor';


const container = document.getElementById('editor')!;

const editor = new TemplateEditor(container, {
  mappings: [
    { type: 'variable', matchRegexp: /^nickname/, text: '昵称', className: 'cm-keyword', tooltip: '哈哈哈' },
    { type: 'variable', matchRegexp: /^#\S+#/, className: 'cm-keyword' }]
});

editor.onChange((input) => {
  console.log(input);
});

// setInterval(() => {
//   editor.insert(new Date() + '\n');
// }, 1500)

console.log(editor);
