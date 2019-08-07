# @template-editor/native
基于`CodeMirror`实现的模板编辑器，一般用来作为短信编辑器或者微信模板编辑器使用。

Features:

+ 配置简单易用
+ 支持自定义的占位符（Placeholder）
+ 原生`Javascript`实现，可以任意框架中使用，比如 `React`、`Vue`、`Angular`

## 安装
```bash
npm i @template-editor/native
```

## 使用
```typescript
import { TemplateEditor } from '@template-editor/native';

const editor = new TemplateEditor(container, {
  initialValue: 'Dear {{nickname}}...',
  placeholders: []
});
```
