#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

program
  .arguments('<file>')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, contents) => {
      console.log('Your METEOR_SETTINGS_ENCODED value is: %s', encodeURIComponent(contents));
    });
  })
  .parse(process.argv);
