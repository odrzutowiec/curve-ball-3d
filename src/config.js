define(function() {
	"use strict";

	var config = {
		modulesPath: 'node_modules',
		scriptPath: 'src',
		resourcesPath: 'res'
	};

	requirejs.config({
		baseUrl: '',
		paths: {
//			tweenjs: config.modulesPath + '/tween.js/index',
			gsap: config.modulesPath + '/gsap/src/minified/TweenMax.min',
			threejs: config.modulesPath + '/three/three',
			stats: config.modulesPath + '/stats/build/stats.min',
			config: config.scriptPath + '/config',
			GameCamera: config.scriptPath + '/GameCamera',
			GameRenderer: config.scriptPath + '/GameRenderer',
			GameScene: config.scriptPath + '/GameScene',
			GameBackground: config.scriptPath + '/GameBackground',
			ScreenLog: config.scriptPath + '/ScreenLog'
		}
	});

	return config;
});

// Converts from degrees to radians.
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
};

