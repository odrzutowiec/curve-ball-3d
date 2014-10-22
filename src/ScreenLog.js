define(function() {
	"use strict";

	ScreenLog.prototype.instance = undefined;

	function ScreenLog() {};


	/**
	 * Adds object to the scene
	 * @param object
	 */
	ScreenLog.prototype.log = function(log) {
		if(typeof log == 'object') {
			var logmsg = '';
			for(var i in log) {
				if (i.isPrototypeOf(log)) {
					continue;
				}
				logmsg += '<div>' + log[i] + '</div>';
			}
		}
		else {
			var logmsg = log;
		}
		window.document.querySelector('#console').innerHTML = logmsg;
	};

	function _instance() {
		if (!ScreenLog.prototype.instance) {
			ScreenLog.prototype.instance = new ScreenLog();
		}
		return ScreenLog.prototype.instance;
	}

	return _instance();
});
