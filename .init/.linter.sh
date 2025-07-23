#!/bin/bash
cd /home/kavia/workspace/code-generation/web-based-tic-tac-toe-eb895280/web_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

