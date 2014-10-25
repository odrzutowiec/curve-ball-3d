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

		this.camera.rotation.x = Math.radians(this.orientation.targetX);
//		this.camera.rotation.y = Math.radians(this.orientation.y);

		ScreenLog.display();
	};

	/**
	 * @param e
	 */
	GameCamera.prototype.orientationChanged = function(e) {
		var z = (e.alpha ? e.alpha : 0);
		var x = (e.beta ? e.beta : 0);
		var y = (e.gamma ? e.gamma : 0);


//		if (!this.correction.x || !this.correction.y) {
//			this.correction.x = 0;
//			this.correction.y = 0;
//		}
//		else {
//			var positionX = this.correction.x - x;
//			var positionY = this.correction.y - y;
//
//			positionX = x;
//			positionY = y;
//
//			var phoneAnglePercentageX = Math.round(((positionX + 90) / 180) * 100, 2);
//			var phoneAnglePercentageY = Math.round(((positionY + 180) / 360) * 100, 2);
//
//			this.orientation.targetX = 2 * Math.PI * phoneAnglePercentageX / 100;
//			this.orientation.targetY = 2 * Math.PI * phoneAnglePercentageY / 100;


//			log.push('x ang: ' + phoneAnglePercentageX+ '%');
//			log.push('y ang: ' + phoneAnglePercentageY+ '%');
//		}

		this.orientation.targetX = x;
		this.orientation.targetY = y;

		ScreenLog.log('orient x', this.orientation.x);
		ScreenLog.log('orient y', this.orientation.y);

		ScreenLog.log('orient targ x', this.orientation.targetX);
		ScreenLog.log('orient targ y', this.orientation.targetY);

		this.orientationTween.stop();
		this.orientationTween.to({
			x: this.orientation.targetX,
			y: this.orientation.targetY
		}, 100);
		this.orientationTween.start();
	};

	return GameCamera;
});
