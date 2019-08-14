# @template-editor/native ![npm latest version](https://img.shields.io/npm/v/@template-editor/native/latest.svg)
基于`CodeMirror`实现的模板编辑器，一般用来作为短信编辑器或者微信模板编辑器使用。

Features:

+ 配置简单易用
+ 支持自定义的占位符（Placeholder）
+ 原生`Javascript`实现，可以任意框架中使用，比如 `React`、`Vue`、`Angular`

## 安装
```bash
npm i @template-editor/native@latest
```

## 使用


### 基础用法
```typescript
import { TemplateEditor, IPlaceholder } from '@template-editor/native';

const Placeholders: IPlaceholder[] = [
  {
    type: 'variable',
    text: 'Peter',
    className: 'te-variable ',
    matchRegexp: /\{\{(name)\}\}/
  },
  {
    type: 'variable',
    text: new Date().toLocaleString(),
    className: 'te-variable ',
    matchRegexp: /\{\{(now)\}\}/
  }
];

const editor = new TemplateEditor(container, {
  initialValue: 'Hello {{name}}, the time now is {{now}}',
  placeholder: 'Please input you message',
  placeholders: Placeholders
});

// 监听编辑器的change事件
editor.onChange((input) => {
  console.log(input);
  // 获取编辑器的 tokens(CodeMirror.Token[])，可以过滤出使用到的变量集合
  const tokens = editor.getToken();
});
```
[![Edit usage-basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/usage-basic-9rk8b?fontsize=14)

