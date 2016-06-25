#!/usr/bin/env node
var fs = require('fs');
var youtubedl = require('youtube-dl');
var program = require('commander');
program
.option('-u, --url <url>', 'The youtube url')
.option('-o, --output <output>', 'Output dir')
.option('-n, --name <name>', 'Output name')
.parse(process.argv);

var video = youtubedl(program.url,
  // Optional arguments passed to youtube-dl.
  ['--format=18'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname });

// Will be called when the download starts.
video.on('info', function(info) {
  console.log(`${program.name}.mp4 download started`);
  console.log('filename: ' + info._filename);
});


video.pipe(fs.createWriteStream(`${program.output}/${program.name}.mp4`));

video.on('end', function() {
  console.log(`${program.name}.mp4 downloaded.`);
  console.log('\u0007');
});
