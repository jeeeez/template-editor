import * as React from 'react';
// import Codemirror from 'codemirror';
import { TemplateEditor } from '../../';
import { IPlaceholder } from '../../index.d';

interface IProps {
  value: string;
  placeholders: IPlaceholder[];
}


export function ReactTemplateEditor(props: IProps) {
  const [containerRef] = React.useState(React.createRef<HTMLDivElement>());

  React.useEffect(() => {
    const editor = new TemplateEditor(containerRef.current!, {
      initialValue: props.value,
      placeholders: props.placeholders
    });
    editor.getValue();
  }, []);

  return <div ref={containerRef} style={{ border: '1px solid #ddd' }}></div>
}
