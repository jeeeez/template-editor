import CodeMirror from 'codemirror';
import { IPlaceholder } from './index.d';


interface IModeConfig {
  placeholders: IPlaceholder[];
}

let counter = 0;

export function defineMode(config: IModeConfig) {
  const name = `Template-Editor-${++counter}-${Date.now()}`;

  CodeMirror.defineMode(name, () => {

    function tokenBase(stream: CodeMirror.StringStream, state: any) {
      state.line = (stream as any).lineOracle.line;
      for (const placeholder of config.placeholders) {
        if (stream.match(placeholder.matchRegexp, false)) {

          const consumeRegexp = placeholder.consumeRegexp || placeholder.matchRegexp;
          const matched = stream.match(consumeRegexp);
          state.placeholder = placeholder;
          state.matchedValue = matched[1];
          return placeholder.type;
        }
      }

      stream.next();

      return null;
    }

    return {
      startState() {
        return { tokenize: tokenBase, context: null };
      },

      token(stream, state: any) {
        if (state.tokenize === tokenBase && stream.eatSpace()) {
          state.placeholder = undefined;
          state.matchedValue = undefined;
          return null;
        }

        const style = state.tokenize(stream, state);

        return style;
      }
    };
  });
  return name;
}
