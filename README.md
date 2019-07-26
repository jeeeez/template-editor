# @shuyun-ep-team/template-editor
A `CodeMirror` based template editor usually used as `message editor` or `wechat message editor`.

Features:

+ Simple configuration
+ Support custom regularation `Placeholder`s
+ No framework limts, which means you CAN use with any frameworks such as `React`、`Vue`、`Angular`

## Install
```bash
npm i @shuyun-ep-team/template-editor
```

## Usage
```typescript
import { TemplateEditor } from '@shuyun-ep-team/template-editor';

const editor = new TemplateEditor(container, {
  initialValue: 'Dear {{nickname}}...',
  placeholders: []
});
```
