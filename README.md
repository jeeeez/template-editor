#@shuyun-ep-team/template-editor
> 标准的模板编辑器，适用于 短信模板、微信模板 编辑

## Usage
```javascript
import { TemplateEditor } from '@shuyun-ep-team/template-editor';

const editor = new TemplateEditor(div, {
  placeholders: [
    { type: 'variable', matchRegexp: /^nickname/, text: '微信昵称', className: 'cm-keyword', tooltip: '哈哈哈' },
    { type: 'topic', matchRegexp: /^#\S+#/, className: 'cm-keyword' }
  ]
});
```
