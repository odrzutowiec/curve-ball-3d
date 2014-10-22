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
			tweenjs: config.modulesPath + '/tween.js/index',
			threejs: config.modulesPath + '/three/three',
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
