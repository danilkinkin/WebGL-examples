var width  = 640;
var height = 640;
var tangs = [];
var count = 10;
var s = width/count;

function setup() {
	createCanvas(640, 640);
	background(0);
	
	var o1_count = 10;
	var o1_tangs = randomizeVectors(o1_count);
	var o1_size = width/o1_count;

	var o2_count = 20;
	var o2_tangs = randomizeVectors(o2_count);
	var o2_size = width/o2_count;

	var o3_count = 40;
	var o3_tangs = randomizeVectors(o3_count);
	var o3_size = width/o3_count;

	var o4_count = 80;
	var o4_tangs = randomizeVectors(o4_count);
	var o4_size = width/o4_count;

	for(var x=0; x<width; x++){
		var ocv_1 = getPoint(o1_tangs, Math.floor(x/o1_size), x, o1_size);
		var ocv_2 = getPoint(o2_tangs, Math.floor(x/o2_size), x, o2_size);
		var ocv_3 = getPoint(o3_tangs, Math.floor(x/o3_size), x, o3_size);
		var ocv_4 = getPoint(o4_tangs, Math.floor(x/o4_size), x, o4_size);

		/*stroke(255, 0, 0);
		anintilizingPoint(x, ocv_1+height*0.5);
		stroke(0, 255, 0);
		anintilizingPoint(x, ocv_1+ocv_2+height*0.5);*/
		stroke(0, 0, 255);
		anintilizingPoint(x, ocv_1+ocv_2+ocv_3+ocv_4+height*0.5);

	}
}

function draw(){

}

function interpolation(a, b, t){
	return a*(1-t)+b*t;
}

function smoothstep(t){
	return t*t*(3-2*t);
}

function anintilizingPoint(x, y){
	point(x, y);
}

function getPoint(t, i, x, size){
	return interpolation(t[i]*(x-i*size), t[i+1]*(x-i*size-size), smoothstep((x-i*size)/size));
}

function randomizeVectors(count){
	var tangs = [];
	for(var i=0; i<count+1; i++) tangs[i] = Math.random()*2-1;
	return tangs;
}

function Perlin(x, y, seed){
	return x+y;
}