define([
	'ScreenLog',
	'threejs',
	'tweenjs'
], function(ScreenLog) {
	"use strict";

	/**
	 * @constructor
	 */
	function GameCamera() {
		var scope = this;

		this.camera = new THREE.PerspectiveCamera(
			75, window.innerWidth / window.innerHeight, 0.1, 10);

		this.orientation = {
			x: 0,
			y: 0,
			targetX: 0,
			targetY: 0
		};

		this.correction = {
			x: 0,
			y: 0,
			targetX: 0,
			targetY: 0
		};

		this.orientationTween = new TWEEN.Tween(this.orientation, {
			repeat: true
		});

		this.correctionTween = new TWEEN.Tween(this.correction, {
			repeat: true
		});

//		setInterval(function(){
//			scope.correctionTween.stop();
//			scope.correctionTween.to({
//				x: scope.correction.targetX,
//				y: scope.correction.targetY
//			}, 500);
//			scope.correctionTween.start();
//		}, 100);

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
		var x = (e.beta ? e.beta : 0);
		var y = (e.gamma ? e.gamma : 0);

//		x = (x < 0) ? 0 : x;
//		y = (y < 0) ? 0 : y;
//
//		x = (x > 180) ? 180 : x;
//		y = (y > 180) ? 180 : y;
//
//		x = ((x / 360) < 0.3) ? x : 360 * 0.3;
//		y = ((y / 360) < 0.3) ? y : 360 * 0.3;

		var log = [
			'in x: ' + x,
			'in y: ' + y,
		];

//		if (!this.correction.x || !this.correction.y) {
//			this.correction.x = 0;
//			this.correction.y = 0;
//		}
//		else {
			var positionX = this.correction.x - x;
			var positionY = this.correction.y - y;

			positionX = x;
			positionY = y;

			var phoneAnglePercentageX = Math.round(((positionX + 90) / 180) * 100, 2);
			var phoneAnglePercentageY = Math.round(((positionY + 180) / 360) * 100, 2);

			log.push('x: ' + phoneAnglePercentageX + '%');
			log.push('y: ' + phoneAnglePercentageY + '%');



			this.orientation.targetX = 2 * Math.PI * phoneAnglePercentageX / 100;
			this.orientation.targetY = 2 * Math.PI * phoneAnglePercentageY / 100;


			log.push('x ang: ' + phoneAnglePercentageX/100 * 360 + '%');
			log.push('y ang: ' + phoneAnglePercentageY/100 * 360 + '%');
//		}

		this.correction.targetX = x;
		this.correction.targetY = y;

//		this.orientationTween.stop();
//		this.orientationTween.to({
//			x: this.orientation.targetX,
//			y: this.orientation.targetY
//		}, 100);
//		this.orientationTween.start();

		ScreenLog.log(log);
	};

	return GameCamera;
});
