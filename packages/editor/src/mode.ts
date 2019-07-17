import CodeMirror from 'codemirror';
import { IPlaceholders } from './index.d';


interface IModeConfig {
  placeholders: IPlaceholders[];
}

let counter = 0;

export function defineMode(config: IModeConfig) {
  const name = `CustomMode-${++counter}`;

  CodeMirror.defineMode(name, () => {

    function tokenBase(stream: CodeMirror.StringStream, state: any) {
      state.line = (stream as any).lineOracle.line;
      for (const placeholder of config.placeholders) {
        if (stream.match(placeholder.matchRegexp, false)) {
          const consumeRegexp = placeholder.consumeRegexp || placeholder.matchRegexp;
          stream.match(consumeRegexp);
          state.placeholder = placeholder;
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
          return null;
        }

        const style = state.tokenize(stream, state);

        return style;
      }
    };
  });
  return name;
}
