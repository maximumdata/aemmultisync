#! /usr/bin/env node
const util = require('./util');
const aemsync = require('aemsync');
const argv = require('yargs')
              .usage('Usage: $0 -t [url to aem instance] -w [paths to watch (comma separated)]')
              .demandOption(['t','w'])
              .example('$0 -t http://admin:admin@example.gov:4503 -w ~/aemdir/frontend,~/aemdam')
              .argv;



let watchDirs = util.enforceArray(argv.w);
let deployTargets = util.enforceArray(argv.t);

console.log('-t', deployTargets);
console.log('-w', watchDirs);
