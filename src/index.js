const fs = require('fs');
const path = require('path');
const async = require('async');
const cpr = require('cpr');
const merge = require('webpack-merge');
const uniq = require('lodash.uniq');

// Overlays target files on top of common template while copying.
// package.json is treated as a special case. We'll merge it instead.
function copyTarget(from, to, target, cb) {
  // TODO: validate that target directory exists
  if (!target) {
    return cb(new Error('Missing target'));
  }

  const commonPath = path.resolve(from, 'common');
  const targetPath = path.resolve(from, target);

  async.series([
    copyTemplates.bind(
      null,
      commonPath,
      to
    ),
    copyTemplates.bind(
      null,
      targetPath,
      to
    ),
    mergePackageJson.bind(
      null,
      to,
      [
        require(path.resolve(commonPath, 'package.json')),
        require(path.resolve(targetPath, 'package.json')),
        require(path.resolve(process.cwd(), 'package.json'))
      ]
    )
  ], cb);
}

// Copies templates from a directory to another without overwriting.
function copyTemplates(from, to, cb) {
  cpr(from, to, {
    deleteFirst: false,
    overwrite: false,
    confirm: true
  }, cb);
};

function mergePackageJson(target, packages, cb) {
  console.log(path.join(target, 'package.json'));

  fs.writeFile(
    path.join(target, 'package.json'),
    JSON.stringify(
      merge({
        customizeArray: function(a, b) {
          return uniq(a.concat(b));
        }
      }).apply(null, packages), null, 2),
    cb
  );
}

exports.copyTarget = copyTarget;
exports.copyTemplates = copyTemplates;
