#!/bin/bash
cd /Users/briansprague/Desktop/marketreport
exec node node_modules/next/dist/bin/next dev --port "${PORT:-3001}"
