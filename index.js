var request = require('request');
var cheerio = require('cheerio');

exports.search = function(s, callback) {
	var ss="";
	var retArr = [];
	for(var tmp=0; tmp<s.length; tmp++) {
		if(s.charAt(tmp) === ' ') {
			ss+='%20';
		}
		else {
			ss+=s.charAt(tmp);
		}
	}
	var url = 'https://www.gutenberg.org/ebooks/search/?query='+ss;
	request(url, function(error, response, html){
		var title = [];
		var author = [];
		var download = [];
		var link = [];
		if(!error){
			var i=0;
			var $ = cheerio.load(html);
//			if($('#recaptcha_response_field') !== undefined) {
//				console.log("captcha prompted...");
//				//console.log($('#recaptcha_image').filter("[width]").attr('width'));
//			}
			$('.booklink').each(function(a, b){
				title.push($('.title', b).text());
				if($('.subtitle', b).text() === "") {
					author.push("N.A");
				}
				else {
					author.push($('.subtitle', b).text());
				}
				download.push($('.extra', b).text());
				link.push($('a', b).filter("[href]").attr('href'));
			});
		}
		retArr[0]=title;
		retArr[1]=author;
		retArr[2]=download;
		retArr[3]=link;
		return callback(retArr);
	});
};

exports.select = function(s, callback) {
	var ss="";
	var retArr;
	for(var tmp=0; tmp<s.length; tmp++) {
		if(s.charAt(tmp) === ' ') {
			ss+='%20';
		}
		else {
			ss+=s.charAt(tmp);
		}
	}
	
	var url = 'https://www.gutenberg.org'+ss;
	request(url, function(error, response, html){
		if(!error){
			var i=0;
			var $ = cheerio.load(html);
			$('.link').filter(function(a, b){
				//console.log($(this).text());
				if($(this).attr('type') === "text/plain") {
					request("https:"+$(this).attr('href'), function(error, response, html){
						return callback(response.body);
					});
				}
			});
		}
	});
};