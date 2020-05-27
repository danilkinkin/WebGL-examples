function Noise(){
	this.scale   = 1;
	this.octaves = 1;
	this.size    = 64;

	var vectors = [];

	this.offsetX = function(x){
		
	}

	this.offsetY = function(y){
		vectors[vectors.length] = generationLine()
	}

	this.GetPixel = function(x, y){

	}

	var scalar = (a, b)=>(a.X*b.X+a.Y*b.Y);

	var interpolation = (a, b, t)=>(a*(1-t)+b*t);

	var smoothstep = (t)=>(t*t*(3-2*t));


}