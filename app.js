#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2), {});
var clivas = require('clivas');
var aneum = require('./');
var keypress = require('keypress');

var link = [];

keypress(process.stdin);
process.stdin.setEncoding('utf8');

var searchStr = "";
var flag = "";
var txt = "";

var stdin = process.openStdin(); 
process.stdin.setRawMode(true);
stdin.on('keypress', function (chunk, key) {
	if (key == undefined) {searchStr += chunk; process.stdout.clearLine(); process.stdout.cursorTo(0); process.stdout.write(searchStr);}

	else if (key && key.ctrl && key.name == 'c') process.exit();

	else if(key.name == "backspace") {searchStr = searchStr.slice(0, searchStr.length-1);}

	else if(key.name == "return") {
		console.log("\n");
		if (searchStr[0] === 'r') {
			clivas.line("\n");
			aneum.select(link[Number(searchStr[2])-1], function(resultArr) {
				clivas.line("{bold:"+resultArr+"}");
			});
		}
		else if (searchStr[0] === 's') {
			aneum.search(searchStr.slice(1,-1).trim(), function(resultArr) {
				searchStr = "";
				clivas.line("\n");
				for(var i=resultArr[0].length-1; i>=0; i--) {
					clivas.line("{bold:"+(i+1)+' '+resultArr[0][i]+"}");
					clivas.line("{cyan:  "+resultArr[1][i]+"}");
					clivas.line("{green:  "+resultArr[2][i]+"}");
					clivas.line("{orange:  "+resultArr[3][i]+"}");
					clivas.line("\n");
				}
				link = resultArr[3];
			});
		}
	}
	else { searchStr += chunk;}
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(searchStr);
});



