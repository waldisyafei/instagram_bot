var username = '';
var password = '';
var search = 'exploretuban';

require('events').EventEmitter.prototype._maxListeners = 100;

var Nightmare = require('nightmare');
require('nightmare-evaluate-with-callback')(Nightmare);
var result = [];

var x = Date.now();
var nightmare = Nightmare({ show: true });

nightmare
	.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
	.goto('https://www.instagram.com/accounts/login/')
	.wait()	
	.type('input[name="username"]', username)
	.type('input[name="password"]', password)
	.wait()	
	.click('button._qv64e._gexxb._4tgw8._njrw0') 
	.wait('input[placeholder="Search"]')
	.type('input[placeholder="Search"]', search)
	.wait('div._dv59m')	
	.click('a._gimca')
	.wait('header._mainc')	
	.click("a[href*='follower']")
	.wait('div._gs38e')	
	.evaluateWithCallback(function(callback) {
		var i = 0;
		var following=0
		function start(counter){
			while (i <= counter) {
				(function(i) {
					setTimeout(function() {
						var objDiv = document.getElementsByClassName("_gs38e"); 
						objDiv[0].scrollTop = objDiv[0].scrollHeight;
						following = document.getElementsByClassName('_qv64e _gexxb _4tgw8 _njrw0').length;
						
						if(counter==i) { callback(); }
					}, Math.round(Math.random()*10000) + (i*10000) )
				})(i++)
			}
		}
		var loop=5;
		start(loop);
	})
	.evaluateWithCallback(function(callback) {
		following = document.getElementsByClassName('_qv64e _gexxb _4tgw8 _njrw0').length;
		for (var i = 0; i < following; i++) {
			setTimeout(function() {
				document.querySelectorAll("button[class='_qv64e _gexxb _4tgw8 _njrw0']")[1].click();	
			}, Math.round(Math.random()*10000) + (i*17000));
		}
		setTimeout(function() {
			callback(following);
		}, following * 21000)
	})
	.then(function (result) {
		console.log('Following: ' + result)
	})
	.click('button._dcj9f')
	.wait()
	.click('a._8scx2._gvoze.coreSpriteDesktopNavProfile')
	.wait('button._q8y0e.coreSpriteMobileNavSettings._8scx2')
	.click('button._q8y0e.coreSpriteMobileNavSettings._8scx2')
	.wait('button._h74gn')
	.evaluate(function(result){
		document.querySelectorAll("button[class='_h74gn']")[3].click();
		return result;
	})	
	.wait('div._f9sjj')
	.end();
