import Codemirror from 'codemirror';
import { IPlaceholder, IEditorOptions } from '@template-editor/native/index.d';


export interface IProps {
  value: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  placeholders: IPlaceholder[];
  /** You can use custom your placeholder span, may be you need to add click lintener on it */
  createReplacementNode?: IEditorOptions['createReplacementNode'];
  /** The first argument is the value, and tokens is the array of Codemirror.Token, you can get the tokens you need with a filter function */
  onChange?(input: string, tokens?: Codemirror.Token[]): void;
}


export interface IImperativeHandles {
  forceUpdateEditor(): void;
}

export declare type ReactTemplateEditor = React.ForwardRefExoticComponent<IProps & React.RefAttributes<IImperativeHandles>>;
