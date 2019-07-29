#!/bin/sh

set -e

cd packages/demo

npm run build

rm -rf template-editor-demo

git clone git@github.com:ShuyunFF2E/template-editor.git template-editor-demo

cd template-editor-demo

cat > README.md << EOF
# template-editor &middot; [![Conventional Commits](https://img.shields.io/npm/v/template-editor.svg)](https://www.npmjs.com/package/template-editor)

+ [预览地址](https://shuyunff2e.github.io/template-editor/)
EOF

rm -rf docs/*

mkdir -p docs

cp -R ../dist/* ./docs

git add -A
git commit -m 'version+'
git push

cd .. && rm -rf template-editor-demo
