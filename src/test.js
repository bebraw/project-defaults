const path = require('path');
const async = require('async');
const rimraf = require('rimraf');
const { copyTemplates, copyTarget } = require('./');

// TODO: this should operate against a virtual FS and then assert
function test() {
  const templatePath = path.resolve(__dirname, '../templates');
  const tmpPath = path.resolve(__dirname, '../tmp');

  async.series([
    rimraf.bind(null, tmpPath),
    copyTarget.bind(
      null,
      path.resolve(templatePath),
      tmpPath,
      'react'
    )
  ], function(err) {
    if (err) {
      return console.error(err);
    }
  });
}

test();
