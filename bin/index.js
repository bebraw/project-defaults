#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const { copyTarget } = require('../');
const pkg = require('../package.json')

function main() {
  program
    .version(pkg.version)
    .option('-t, --target [target]', 'Target') // TODO: enumerate targets
    .parse(process.argv);

  const target = program.target;

  const templatePath = path.resolve(__dirname, '../templates');
  const targetPath = process.cwd();

  copyTarget(templatePath, targetPath, target, function(err) {
    if (err) {
      return console.error(err);
    }

    console.log('Copied templates');
  });
}

main();
