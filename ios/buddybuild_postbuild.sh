#!/usr/bin/env bash
code-push login --accessKey $CODE_PUSH_ACCESS_KEY
npm run codepush
npm run build