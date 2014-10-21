define([
	'GameCamera',
	'GameRenderer',
	'GameScene',
	'GameBackground'
], function(GameCamera, GameRenderer, GameScene, GameBackground) {
	"use strict";

	/**
	 * screen lock
	 */
	window.addEventListener('touchmove', function(e){
		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	var scene = new GameScene();
	var camera = new GameCamera();
	var renderer = new GameRenderer(scene.scene, camera.camera);
	var background = new GameBackground();

	scene.add(background.mesh);



//
//
//	///
//
//	var position = { x : 0, y: 0 };
//
//	var ball = document.getElementById('ball');
//
//	var orientationInitialVector = {x: 0, y: 0, targetX: 0, targetY: 0};
//
//	var correctOrientationInitialTween = new TWEEN.Tween(orientationInitialVector, {
//		loop: false
//	});
//
//
//	correctOrientationInitialTween.stop();
//	correctOrientationInitialTween.start();
//
//
//	correctOrientationInitialTween.to({
//		x: orientationInitialVector.targetX,
//		y: orientationInitialVector.targetY
//	}, 500);
//
//	//////
//
//	var globalGyroPos = {x: 0, y: 0, targetX: 0, targetY: 0};
//
//	var moveCameraTween = new TWEEN.Tween(globalGyroPos, {
//		loop: false
//	});
//
//	function handleOrientationEvent(event) {
//		var x = event.beta ? event.beta : event.y * 90;
//		var y = event.gamma ? event.gamma : event.x * 90;
//
////		x = (x < 0) ? 0 : x;
////		y = (y < 0) ? 0 : y;
////
////
////		x = (x > 180) ? 180 : x;
////		y = (y > 180) ? 180 : y;
////
////		x = ((x / 360) < 0.3) ? x : 360 * 0.3;
////		y = ((y / 360) < 0.3) ? y : 360 * 0.3;
//
//		if (!orientationInitialVector.x || !orientationInitialVector.y)
//		{
//			orientationInitialVector.x = x;
//			orientationInitialVector.y = y;
//		}
//		else
//		{
//			var positionX = orientationInitialVector.x - x;
//			var positionY = orientationInitialVector.y - y;
//
//			var phoneAnglePercentageX = (positionX / 360);
//			var phoneAnglePercentageY = (positionY / 360);
//
//			globalGyroPos.targetX = phoneAnglePercentageX * (2 * Math.PI);
//			globalGyroPos.targetY = phoneAnglePercentageY * (2 * Math.PI);
//		}
//
//		orientationInitialVector.targetX = x;
//		orientationInitialVector.targetY = y;
//
//		moveCameraTween.to({
//			x: globalGyroPos.targetX,
//			y: globalGyroPos.targetY
//		}, 100);
//
//		moveCameraTween.start();
//	}
//
//	// Webkit en Mozilla variant beide registreren.
//	window.addEventListener("deviceorientation", handleOrientationEvent, true);
//	//     window.addEventListener("touchmove", handleOrientationEvent, true);
//
//	//rendering function
//	function render(deltaTime) {
//		requestAnimationFrame(render);
//		TWEEN.update(deltaTime);
//
//		camera.rotation.y = globalGyroPos.y;
//		camera.rotation.x = globalGyroPos.x;
//
//		renderer.render(scene, camera);
//	}
//
//	render();
});
