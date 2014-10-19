function Car(color, speed) {
	this.color = color;
	this.speed = speed;
}

Car.prototype.getSpeed = function () {
	console.log(this.speed);
}

function Ferrari(color, speed) {
	Car.call(this, color, speed);
}

Ferrari.prototype = Object.create(Car.prototype);
Ferrari.prototype.constructor = Ferrari;

myFer = new Ferrari('red', 300);


reg = [];

reg.push(myFer.getSpeed)

delete myFer;

console.log(reg);
