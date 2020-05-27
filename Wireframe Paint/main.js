//Инициализация серии
var width  = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var camera = //new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 1, 1000);
			 new THREE.PerspectiveCamera( 45, width / height, 1, 900);
camera.position.set(0, -200, 200);
camera.lookAt(0, 0, 0);
/*var camera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 1, 1000);
camera.position.set(0, 0, 0);
camera.lookAt(0, 0, 0);*/

var scene = new THREE.Scene();


//create a triangular geometry
/*var dots = [];
for(var x = 0; x<50; x++){
	dots[x] = [];
	for(var y = 0; y<50; y++){
		dots[x][y] = addSphere(x*2-50, y*2-50);
	}
}	

*/


var material = new THREE.MeshBasicMaterial({
	color: 0xffff00,
	wireframe: true
});
var geometry = new THREE.Geometry();

var size = 30;

for(var y=0; y<size; y++)
	for(var x=0; x<size; x++){
		geometry.vertices.push(new THREE.Vector3(x*10-size/2*10+5, y*10-size/2*10+5, 0));
	}
for(var y=0; y<size-1; y++)
	for(var x=0; x<size-1; x++){
		geometry.faces.push(new THREE.Face3(x+(y+1)*size, x+1+y*size, x+y*size));
	}
for(var y=1; y<size; y++)
	for(var x=1; x<size; x++){
		geometry.faces.push(new THREE.Face3(x+(y-1)*size, x-1+y*size, x+y*size));
	}

/*console.log(geometry.vertices)*/
var mesh = new THREE.Mesh( geometry, material );
//var mesh = new THREE.Points( geometry, material );
mesh.drawMode = THREE.TrianglesDrawMode; //default

scene.add(mesh);
//scene.overrideMaterial = new THREE.PointsMaterial( { color: 0x888888 } );
renderer.render(scene, camera);

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
var gPlane = new THREE.PlaneGeometry((size-1)*10, (size-1)*10);
plane = new THREE.Mesh( gPlane, new THREE.MeshBasicMaterial( { visible: false, color: 0xffffff } ) );
scene.add( plane );
var paint = false;
var b = true;

function update(time){
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObject(plane);
	if(!!intersects.length){
		var px = Math.round((intersects[0].point.x+(size-1)*5)/10);
		var py = Math.round((intersects[0].point.y+(size-1)*5)/10);
		
		for(var y=0; y<size; y++)
			for(var x=0; x<size; x++){
				//Math.abs((x-px))>5
				//if(!geometry.vertices[x+y*size]){
					//console.log(y+" | "+x)
				//}
				//console.log(y)
				var sx = Math.abs(x-px);
				sx = sx>3?0:sx/3-1;

				var sy = Math.abs(y-py);
				sy = sy>3?0:sy/3-1;

				if(paint) geometry.vertices[x+y*size].z += ((b)? +1 : -1)*Math.sin(sx*sy);
				//else geometry.vertices[x+y*size].z = Math.sin(sx*sy)*20;
			}
	}

	// calculate objects intersecting the picking ray
	//var intersects = raycaster.intersectsPlane()



	/*for(var y=0; y<size; y++)
		for(var x=0; x<size; x++){
			//dots[x][y].position.set(dots[x][y].position.x, dots[x][y].position.y, Math.sin(x+y+time/1000)*2)
			geometry.vertices[x+y*size].z = Math.sin(x+y+time/500)*2;
		}*/
	mesh.geometry.verticesNeedUpdate=true;
	renderer.render(scene, camera);
	requestAnimationFrame(update);
}
update();

renderer.domElement.onmousemove = function(e){	
	mouse.x = (e.clientX/width)*2-1;
	mouse.y = -(e.clientY/height)*2+1;
}

renderer.domElement.onmousedown = function(e){
	console.log(e.button)
	if(e.button == 1) return;
	b = e.button == 0;
	paint = true;
}
renderer.domElement.onmouseup = function(e){
	paint = false;
}

window.onresize = function() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	width  = window.innerWidth;
	height = window.innerHeight;
}