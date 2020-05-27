var shake;
var food;
var width  = 40;
var height = 40;
var isDead = false;
var foodSize = false;

function setup() {
	createCanvas(40, 40);
	background(5, 34, 5);
	frameRate(10);
	start();
}

function start(){
	background(5, 34, 5);
	isDead = false;
	shake = new Shake();
	shake.dir(1, 0);
	generateFood();
}

function draw() {
	background(5, 34, 5);
	shake.update();
	shake.x = (shake.x < 0)? width-1 : (shake.x > width-1)? 0 : shake.x;
	shake.y = (shake.y < 0)? height-1 : (shake.y > height-1)? 0 : shake.y;
	shake.draw();

	stroke(76, 175, 80);
	if(foodSize) point(food.x, food.y);
	else{
		noStroke();
		fill(60 ,179, 60);
		rect(food.x-1, food.y-1 , 3, 3);
	}
	foodSize = !foodSize;

	if(food.x == shake.x && food.y == shake.y){
		shake.grow();
		generateFood();
	}
}

function generateFood(){
	food = createVector(Math.round(random(width-1)), Math.round(random(height-1)));
}

function keyPressed(){
	switch (keyCode) {
		case UP_ARROW:
			if(shake.speedY != 0) break;
			shake.dir(0, -1); 
			break;
		case DOWN_ARROW:
			if(shake.speedY != 0) break;
			shake.dir(0, 1);
			break;
		case LEFT_ARROW:
			if(shake.speedX != 0) break;
			shake.dir(-1, 0);
			break;
		case RIGHT_ARROW:
			if(shake.speedX != 0) break;
			shake.dir(1, 0);
			break;
		default:
			if(!isDead) break;
			start();
	}
}