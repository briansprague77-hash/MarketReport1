#!/usr/bin/env node
// Wrapper to fix EPERM: uv_cwd when MCP preview tool spawns from invalid CWD.
// process.chdir() works even when process.cwd() throws.
try { process.cwd(); } catch { process.chdir('/Users/briansprague/Desktop/marketreport'); }
require('/Users/briansprague/Desktop/marketreport/node_modules/next/dist/bin/next');
