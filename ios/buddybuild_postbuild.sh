#!/usr/bin/env bash
npm install -g code-push-cli
code-push login --accessKey $CODE_PUSH_ACCESS_KEY
npm run codepush
npm run build