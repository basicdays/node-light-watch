#!/usr/bin/env node
'use strict';

var exec = require('child_process').exec,
	watch = require('node-watch'),
	program = require('commander');


program
	.version('0.1.0')
	.usage('<paths...> <command>')
	.option('-v, --verbose')
	.parse(process.argv);

program.command = program.args.pop();
program.paths = program.args;
if (!(program.paths.length > 0 && program.command)) {
	console.error('Need to indicate at least one path and a command');
	program.help();
}

if (program.verbose) {
	console.log('Watching paths: ', program.paths);
}
watch(program.paths, function() {
	if (program.verbose) {
		console.log(program.command);
	}
	var cmd = exec(program.command);
	cmd.stdout.pipe(process.stdout);
	cmd.stderr.pipe(process.stderr);
});
