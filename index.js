#! /usr/bin/env node
const util = require('./util');
const aemsync = require('aemsync');
const argv = require('yargs')
              .usage('Usage: $0 -t [url to aem instance] -w [paths to watch (comma separated)]')
              .demandOption(['t','w'])
              .example('$0 -t http://admin:admin@example.gov:4503 -w ~/aemdir/frontend,~/aemdam')
              .argv;

let watchDirs = util.enforceArray(argv.w);
let targets = util.enforceArray(argv.t);

const interval = 300
const onPushEnd = (err, host) => {
  if (err) {
    return console.log(`Error when pushing package to ${host}.`, err)
  }
  console.log(`Package pushed to ${host}.`)
}


// aemsync({workingDir, targets, exclude, interval, packmgrUrl, onPushEnd})
watchDirs.forEach((workingDir) => {
  aemsync({workingDir, targets, interval, onPushEnd})
})
