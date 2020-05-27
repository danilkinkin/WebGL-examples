var width  = 512;
var tangs = [];
var sizeN = 5;
var octave = 10;
var yO = 0;

function setup() {
	createCanvas(512, 512);
	background(0);
	frameRate(10);
	for(var i=0; i<octave; i++){
		tangs[i] = getGradients(sizeN*(i+1))
	}

	console.log(tangs);

	paint(width, octave, 0);

	/*var s = width/(sizeN+1);
	stroke(15);
	for(var x=0; x<sizeN+1; x++) line(x*s, 0, x*s, height);
	for(var y=0; y<sizeN+1; y++) line(0, y*s, width, y*s);

	stroke(255, 0, 0);
	fill(255, 0, 0)
	for(var x=0; x<sizeN+1; x++){
		for(var y=0; y<sizeN+1; y++){
			line(x*s, y*s, tangs[0][x][y].x*s*0.5+x*s, tangs[0][x][y].y*s*0.5+y*s);
			ellipse(tangs[0][x][y].x*s*0.5+x*s, tangs[0][x][y].y*s*0.5+y*s, 5, 5);
		}
	}*/
	
}

function paint(sx, octaveMax, offsetY){
	console.log(offsetY)
	background(0);
	var xx;
	var yy;
	var sc;
	var s;
	//var count = 0;
	for(var x=0; x<sx; x++){
		for(var y=offsetY; y<sx; y++){
			sc = 0;
			//count = count+1;
			//console.log("pixel")
			for(var i=0; i<octaveMax; i++){
				s = sx/(sizeN*(i+1));
				xx = Math.floor(x/s);
				yy = Math.floor(y/s);
				//console.log(getPoint(tangs[i], xx, yy, (x-xx*s)/s, (y-yy*s)/s))
				sc += getPoint(tangs[i], xx, yy, (x-xx*s)/s, (y-yy*s)/s)*(1/(i+1));
			}	
			stroke(128*sc+128);
			point(x, y);
		}
	}
	//console.log(count)
}

function draw(){
	//paint(25, octave, yO);
	//yO = yO+1;
}

function scalar(a, b){
	return a.x*b.x+a.y*b.y;
}

function getGradients(count){
	var tangs = [];
	for(var x=0; x<count+1; x++){
		tangs[x] = [];
		for(var y=0; y<count+1; y++){
			var tan = Math.random()*2-1;
			tangs[x][y] = {
				x: (Math.round(Math.random())*2-1)*Math.cos(tan),
				y: Math.sin(tan)
			};
			if(!Math.round(Math.random())){
				tangs[x][y].x += tangs[x][y].y;
				tangs[x][y].y = tangs[x][y].x-tangs[x][y].y;
				tangs[x][y].x -= tangs[x][y].y;
			}

		}
	}
	return tangs;
}

function getPoint(vectors, xTan, yTan, x, y){
	var s1 = scalar({x: x,   y: y  }, {x: vectors[xTan][yTan].x,     y: vectors[xTan][yTan].y    });
	var s2 = scalar({x: x-1, y: y  }, {x: vectors[xTan+1][yTan].x,   y: vectors[xTan+1][yTan].y  });
	var s3 = scalar({x: x-1, y: y-1}, {x: vectors[xTan+1][yTan+1].x, y: vectors[xTan+1][yTan+1].y});
	var s4 = scalar({x: x,   y: y-1}, {x: vectors[xTan][yTan+1].x,   y: vectors[xTan][yTan+1].y  });

	var inter_1 = interpolation(s4, s3, smoothstep(x));
	var inter_2 = interpolation(s1, s2, smoothstep(x));

	return interpolation(inter_2, inter_1, smoothstep(y));
}

function interpolation(a, b, t){
	return a*(1-t)+b*t;
}

function smoothstep(t){
	return t*t*(3-2*t);
}