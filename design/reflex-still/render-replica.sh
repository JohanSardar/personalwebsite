#!/bin/zsh
set -eu
cd "${0:A:h}"
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless=new --no-first-run --no-default-browser-check --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=2 --window-size=1084,800 --user-data-dir="$PWD/.chrome-replica" --screenshot="$PWD/claude-replica.png" --default-background-color=00000000 --virtual-time-budget=1500 "file://$PWD/claude-replica.html"
