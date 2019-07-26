export const imports = {
  'packages/editor/src/docs/Introduction.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "packages-editor-src-docs-introduction" */ 'packages/editor/src/docs/Introduction.mdx'
    ),
  'packages/editor/src/docs/usage2/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "packages-editor-src-docs-usage2-index" */ 'packages/editor/src/docs/usage2/index.mdx'
    ),
  'packages/editor/src/docs/usage1/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "packages-editor-src-docs-usage1-index" */ 'packages/editor/src/docs/usage1/index.mdx'
    ),
}
