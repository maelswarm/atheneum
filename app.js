#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2), {});
var mgSrch = require('magsearch');
var clivas = require('clivas');
var keypress = require('keypress');


keypress(process.stdin);
process.stdin.setEncoding('utf8');

if(!argv.p) {
	argv.p=1;
}

if(!argv.k) {
	argv.k="all";
}

if(argv._[0] && (argv.s || argv.F)) {
	if(argv.F) {
		mgSrch.feelingLucky(argv._[0], function(resultArr) {
			clivas.line("\n");
			clivas.line("{bold:"+resultArr[0]+"}");
			clivas.line("{cyan:"+resultArr[1]+"}");
			clivas.line("\n");
		});
	}

	else if(argv.s === "btd") {
		mgSrch.btdigg(argv._[0], argv.p-1, function(resultArr) {
			clivas.line("\n");
			for(var i=resultArr[0].length-1; i>=0; i--) {
				clivas.line("{bold:"+resultArr[0][i]+"}");
				clivas.line("{white:"+resultArr[2][i]+"}");
				clivas.line("{cyan:"+resultArr[1][i]+"}");
				clivas.line("\n");
			}
		});
	}

	else if(argv.s === "tpb") {
		mgSrch.pbay(argv._[0], argv.p-1, argv.k, function(resultArr) {
			clivas.line("\n");
			for(var i=resultArr[0].length-1; i>=0; i--) {
				clivas.line("{bold:"+resultArr[0][i]+"}");
				clivas.line("{cyan:"+resultArr[1][i]+"}");
				clivas.line("{green:"+resultArr[2][i]+"}");
				clivas.line("{red:"+resultArr[3][i]+"}");
				clivas.line("\n");
			}
		});
	}
	else if(argv.s === "opb") {
		mgSrch.oldpbay(argv._[0], argv.p, argv.k, function(resultArr) {
			clivas.line("\n");
			for(var i=resultArr[0].length-1; i>=1; i--) {
				clivas.line("{bold:"+resultArr[0][i]+"}");
				clivas.line("{cyan:"+resultArr[1][i]+"}");
				clivas.line("{green:"+resultArr[2][i]+"}");
				clivas.line("{red:"+resultArr[3][i]+"}");
				clivas.line("\n");
			}
		});
	}
}