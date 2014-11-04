define([
	'ScreenLog',
	'gsap',
	'threejs',
], function(ScreenLog) {
	"use strict";

	/**
	 * @constructor
	 */
	function GameCamera() {
		var scope = this;

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
	 * Initialize variables
	 */
	GameCamera.prototype.init = function() {
		this.camera = new THREE.PerspectiveCamera(
			75, window.innerWidth / window.innerHeight, 0.1, 10);

		this.camera.position.z = 3;

		this.orientation = {
			x: 0,
			y: 0,
		};

		this.correction = {
			x: 0,
			y: 0,
		};

		this.orientationTween = new TweenMax(
			this.orientation,
			1, {
				x: 0,
				y: 0
			}
		);

		this.correctionTween = new TweenMax(this.correction, 1, {
			x: 0,
			y: 0,
			repeat: -1,
			onRepeatScope: this,
			onRepeat: function () {


				this.correctionTween.updateTo({
					x: this.orientation.x,
					y: this.orientation.y
				}, false);

				ScreenLog.log('orient x', this.correction.x);
				ScreenLog.log('orient y', this.correction.y);
			},
		});

//		this.correctionTween.repeat(-1);
//		this.correctionTween.onRepeat(-1);
//		this.correctionTween.play();
	};

	/**
	 * Recalculate camera aspect
	 * event listener
	 */
	GameCamera.prototype.recalculateAspect = function() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	};

	/**
	 * event listener
	 * @param e
	 */
	GameCamera.prototype.updateFrame = function(e) {
		this.camera.rotation.x = Math.radians(this.orientation.x - this.correction.x);
		this.camera.rotation.y = Math.radians(this.orientation.y - this.correction.y);
	};

	/**
	 * event listener
	 * @param e event
	 */
	GameCamera.prototype.orientationChanged = function(e) {
		var z = e.alpha ? e.alpha : 0;
		var x = e.beta ? e.beta : 0;
		var y = e.gamma ? e.gamma : 0;

//
//			var phoneAnglePercentageX = Math.round(((positionX + 90) / 180) * 100, 2);
//			var phoneAnglePercentageY = Math.round(((positionY + 180) / 360) * 100, 2);
//
//			this.orientation.targetX = 2 * Math.PI * phoneAnglePercentageX / 100;
//			this.orientation.targetY = 2 * Math.PI * phoneAnglePercentageY / 100;

		this.orientationTween.updateTo({x: x, y: y}, true);

		ScreenLog.log('gyro raw x', x);
		ScreenLog.log('gyro raw y', y);
	};

	return GameCamera;
});
