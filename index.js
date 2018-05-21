#! /usr/bin/env node
const util = require('./util');
const aemsync = require('aemsync');
const argv = require('yargs')
              .usage('Usage: $0 -t [url to aem instance] -w [paths to watch (comma separated)] -e [path globs to exclude (comma separated)] --verbose [verbose logging]')
              .demandOption(['t','w'])
              .example('$0 -t http://admin:admin@example.gov:4503 -w ~/aemdir/frontend,~/aemdam -e **/node_modules/*,**/bower_components/* --verbose')
              .argv;

let watchDirs = util.enforceArray(argv.w);
let targets = util.enforceArray(argv.t);
let excludes = util.enforceArray(argv.e);
let verbose = argv.verbose;

const interval = 300

watchDirs.forEach((workingDir) => {
  // aemsync({workingDir, targets, interval, onPushEnd})
  let pusher = new aemsync.Pusher(targets, interval, (err, host) => {
    if (err) {
      return console.log(`Error when pushing package to ${host} from ${workingDir}.`, err)
    }
    if (verbose) { console.log(`Package pushed to ${host} from ${workingDir}.`) }
  });
  let watcher = new aemsync.Watcher();
  pusher.start();
  watcher.watch(workingDir, excludes, (localPath) => {
      pusher.enqueue(localPath);
  });
})
