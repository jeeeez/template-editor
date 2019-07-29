# @template-editor/native
A `CodeMirror` based template editor usually used as `message editor` or `wechat message editor`.

Features:

+ Simple configuration
+ Support custom regularation `Placeholder`s
+ No framework limts, which means you CAN use with any frameworks such as `React`、`Vue`、`Angular`

## Install
```bash
npm i @template-editor/native
```

## Usage
```typescript
import { TemplateEditor } from '@template-editor/native';

const editor = new TemplateEditor(container, {
  initialValue: 'Dear {{nickname}}...',
  placeholders: []
});
```
