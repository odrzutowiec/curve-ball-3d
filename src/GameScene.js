define([
	'threejs'
], function() {
	"use strict";

	/**
	 * @constructor
	 */
	function GameScene() {
		this.scene = new THREE.Scene();
	}

	/**
	 * Adds object to the scene
	 * @param object
	 */
	GameScene.prototype.add = function(object) {
		this.scene.add(object);
	};

	return GameScene;
});
