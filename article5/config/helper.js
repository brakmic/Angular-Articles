"use strict";

const path = require('path');
const _root = path.resolve(__dirname, '..');

function getRoot(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}


function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server$/.exec(process.argv[1]));
}

module.exports = {
    getRoot: getRoot,
    hasProcessFlag: hasProcessFlag,
    isWebpackDevServer: isWebpackDevServer
}