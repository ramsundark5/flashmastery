#!/usr/bin/env bash
npm install -g react-native-cli
npm install -g code-push-cli
code-push login --accessKey $CODE_PUSH_ACCESS_KEY
npm install
