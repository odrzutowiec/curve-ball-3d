define([
	'threejs'
], function() {
	"use strict";

	/**
	 * @constructor
	 */
	function GameBackground() {
		var scope = this;

		this.texture = null;
		this.material = null;
		this.mesh = null;

		this.init();
	}

	/**
	 * Initialize object, texture, material and mesh
	 */
	GameBackground.prototype.init = function() {
		this.texture = THREE.ImageUtils.loadTexture('res/gfx/crate.jpg');
		this.texture.wrapT = false;
		this.texture.wrapS = false;
		this.texture.repeat.set(5, 5);

		this.material = new THREE.MeshBasicMaterial({
			map: this.texture,
			side: THREE.BackSide,
			shading: THREE.NoShading,
		});

		this.mesh = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 5),
			this.material
		);

		this.mesh.name = 'cube';
	};

	return GameBackground;
});
