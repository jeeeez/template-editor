import CodeMirror from 'codemirror';
import { IMapping } from './index.d';


interface IModeConfig {
  mappings: IMapping[];
}

let counter = 0;

export function defineMode(config: IModeConfig) {
  const name = `CustomMode-${++counter}`;

  CodeMirror.defineMode(name, () => {

    function tokenBase(stream: CodeMirror.StringStream, state: any) {
      state.line = (stream as any).lineOracle.line;
      for (const mapping of config.mappings) {
        if (stream.match(mapping.matchRegexp, false)) {
          const consumeRegexp = mapping.consumeRegexp || mapping.matchRegexp;
          stream.match(consumeRegexp);
          state.mapping = mapping;
          return mapping.type;
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
          state.mapping = undefined;
          return null;
        }

        const style = state.tokenize(stream, state);

        return style;
      }
    };
  });
  return name;
}
