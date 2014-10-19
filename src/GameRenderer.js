define([
	'threejs',
	'tweenjs'
], function(scene, camera) {
	"use strict";

	/**
	 * @constructor
	 */
	function GameRenderer(scene, camera) {
		var scope = this;

		this.scene = scene;
		this.camera = camera;
		this.renderer = new THREE.WebGLRenderer();
		this.previousRenderTimestamp = 0;

		window.addEventListener('resize', function(e){
			scope.renderer.setSize(window.innerWidth, window.innerHeight);
		}, false);

		this.init();
	}

	/**
	 * Initialize renderer
	 */
	GameRenderer.prototype.init = function() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor("000000");
		document.body.appendChild(this.renderer.domElement);
		this.render();
	};

	/**
	 * Renders each frame
	 * @param int deltaTime
	 */
	GameRenderer.prototype.render = function(renderTimestamp) {
		var scope = this;

		requestAnimationFrame(function(renderTimestamp){
			scope.render(renderTimestamp);
		});

		var deltaTime = renderTimestamp - this.previousRenderTimestamp;

		var renderEvent = new Event('GameRender');
		renderEvent.deltaTime = deltaTime;
		window.dispatchEvent(renderEvent);

		TWEEN.update(renderTimestamp);
		this.renderer.render(this.scene, this.camera);
		this.previousRenderTimestamp = renderTimestamp;
	}

	return GameRenderer;
});