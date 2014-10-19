define([
	'threejs',
	'tweenjs'
], function() {
	"use strict";

	/**
	 * @constructor
	 */
	function GameCamera() {
		var scope = this;

		this.camera = new THREE.PerspectiveCamera(
			75, window.innerWidth / window.innerHeight, 0.1, 10);

		this.orientation = {
			x: 1,
			y: 1,
			targetX: 0,
			targetY: 0
		};

		this.orientationTween = new TWEEN.Tween(this.orientation, {
			repeat: 100
		});

		this.init();

		window.addEventListener('resize', function(e){
			scope.recalculateAspect(e);
		}, false);

		window.addEventListener('GameRender', function(e){
			scope.updateFrame(e);
		}, false);

		window.addEventListener('deviceorientation', function(e){
			scope.orientationChanged(e);
		}, false);
	}

	/**
	 *
	 */
	GameCamera.prototype.init = function() {
		this.camera.position.z = 3;
	};

	/**
	 * Recalculates camera's aspect
	 */
	GameCamera.prototype.recalculateAspect = function() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	};

	/**
	 * @param e
	 */
	GameCamera.prototype.updateFrame = function(e) {
		this.camera.rotation.y = this.orientation.y;
		this.camera.rotation.x = this.orientation.x;
	};

	/**
	 * @param e
	 */
	GameCamera.prototype.orientationChanged = function(e) {
		var x = e.beta ? e.beta : e.y * 90;
		var y = e.gamma ? e.gamma : e.x * 90;

//		x = (x < 0) ? 0 : x;
//		y = (y < 0) ? 0 : y;
//
//		x = (x > 180) ? 180 : x;
//		y = (y > 180) ? 180 : y;
//
//		x = ((x / 360) < 0.3) ? x : 360 * 0.3;
//		y = ((y / 360) < 0.3) ? y : 360 * 0.3;

		if (!this.orientation.x || !this.orientation.y) {
			this.orientation.x = x;
			this.orientation.y = y;
		}
		else {
			var positionX = this.orientation.x - x;
			var positionY = this.orientation.y - y;

			var phoneAnglePercentageX = (positionX / 360);
			var phoneAnglePercentageY = (positionY / 360);

			this.orientation.targetX = phoneAnglePercentageX * (2 * Math.PI);
			this.orientation.targetY = phoneAnglePercentageY * (2 * Math.PI);
		}

		this.orientationTween.stop();
		this.orientationTween.to({
			x: this.orientation.targetX,
			y: this.orientation.targetY
		}, 100);
		this.orientationTween.start();
	};

	return GameCamera;
});
