const path = require('path');
const async = require('async');
const cpr = require('cpr');

// Overlays target files on top of common template while copying
function copyTarget(from, to, target, cb) {
  // TODO: validate that target directory exists
  if (!target) {
    return cb(new Error('Missing target'));
  }

  async.series([
    copyTemplates.bind(
      null,
      path.resolve(from, 'common'),
      to
    ),
    copyTemplates.bind(
      null,
      path.resolve(from, target),
      to
    )
  ], cb);
}

// Copies templates from a directory to another without overwriting
function copyTemplates(from, to, cb) {
  cpr(from, to, {
      deleteFirst: false,
      overwrite: false,
      confirm: true
  }, cb);
};

exports.copyTarget = copyTarget;
exports.copyTemplates = copyTemplates;
