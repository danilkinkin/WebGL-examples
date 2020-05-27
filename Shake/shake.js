function Shake(){
	this.x = 0;
	this.y = 0;
	this.speedX = 0;
	this.speedY = 0;

	this.tail = [];

	this.update = function(){
		if(isDead) return;
		if(this.tail.length > 0){
			for(var i=0; i<this.tail.length-1; i++){
				this.tail[i] = this.tail[i+1];
			}
			this.tail[this.tail.length-1] = createVector(this.x, this.y);
		}
		this.x += this.speedX;
		this.y += this.speedY;
		for(var i=0; i<this.tail.length; i++) 
			if(this.tail[i].x == this.x  && this.tail[i].y == this.y){
				console.log("dead");
				isDead = true;
				this.speedX = 0;
				this.speedY = 0;
			}
	}

	this.draw = function(){
		stroke(60 ,179, 60);
		point(this.x, this.y);
		for(var i=0; i<this.tail.length; i++){
			point(this.tail[i].x, this.tail[i].y);
		}
	}

	this.dir = function(sx, sy){
		this.speedX = sx;
		this.speedY = sy;
	}

	this.grow = function(){
		this.tail[this.tail.length] = createVector(this.x, this.y);
		console.log("TOTAL: "+this.tail.length)
	}
}