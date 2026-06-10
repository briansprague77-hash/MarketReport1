#!/usr/bin/env node
// Wrapper to fix EPERM: uv_cwd when MCP preview tool spawns from invalid CWD.
try { process.cwd(); } catch { process.chdir('/Users/briansprague/Desktop/marketreport'); }
process.chdir('/Users/briansprague/Desktop/marketreport');
require('/Users/briansprague/Desktop/marketreport/node_modules/next/dist/bin/next');
