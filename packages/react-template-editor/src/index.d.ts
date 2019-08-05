import Codemirror from 'codemirror';
import { IPlaceholder, IEditorOptions } from '@template-editor/native/index.d';


export interface IProps {
  value: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  placeholders: IPlaceholder[];
  createReplacementNode?: IEditorOptions['createReplacementNode'];
  onChange?(input: string, tokens?: Codemirror.Token[]): void;
}


export interface IImperativeHandles {
  forceUpdateEditor(): void;
}

export declare type ReactTemplateEditor = React.ForwardRefExoticComponent<IProps & React.RefAttributes<IImperativeHandles>>;
