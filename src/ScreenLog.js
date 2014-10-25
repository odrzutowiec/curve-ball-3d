define(function() {
	"use strict";

	ScreenLog.prototype.instance = undefined;
	ScreenLog.prototype.logData = {};
	ScreenLog.prototype.ticker = undefined;

	function ScreenLog() {
		var scope = this;

		if(typeof ScreenLog.prototype.ticker === 'undefined') {
			ScreenLog.prototype.ticker = setInterval(scope.tick.bind(scope), 1000);
		}
	};

	ScreenLog.prototype.tick = function() {
		this.cleanUp();
	}

	ScreenLog.prototype.cleanUp = function() {
		for(var i in ScreenLog.prototype.logData) {
			if (
				ScreenLog.prototype.logData[i].expire
				 && new Date().getTime() > ScreenLog.prototype.logData[i].expire
			) {
				delete ScreenLog.prototype.logData[i];
			}
		}
	}

	/**
	 * Adds object to the scene
	 * @param object
	 */
	ScreenLog.prototype.log = function(name, value, expire) {
		this.logData[name] = {
			value: value,
			expire: (expire) ? new Date().getTime() + expire : 0,
			name: name,
			render: '<div>'
				+ name
				+ (
					typeof value !== 'undefined'
						? ': ' + value
						: ''
				)
				+ '</div>'
		};
	};

	ScreenLog.prototype.stop = function(name) {
		delete this.logData[name];
	}

	ScreenLog.prototype.display = function() {
		var logmsg = '';
		for (var i in this.logData) {
			logmsg += this.logData[i].render;
		}
		window.document.querySelector('#console').innerHTML = logmsg;
	}

	function _instance() {
		if (!ScreenLog.prototype.instance) {
			ScreenLog.prototype.instance = new ScreenLog();
		}
		return ScreenLog.prototype.instance;
	}

	return _instance();
});
